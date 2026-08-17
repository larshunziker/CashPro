import * as utils from '../utils';
import {
  fetchJwPlayerIdByBrightcoveId,
  getResolvedJwPlayerId,
  withResolvedJwPlayerId,
} from '../videoPlayer';

let fetchSpy: jest.SpyInstance;

beforeEach(() => {
  fetchSpy = jest.spyOn(global, 'fetch' as any);
});

afterEach(() => {
  fetchSpy.mockRestore();
  jest.restoreAllMocks();
});

describe('[Helper] videoPlayer', () => {
  it('Should prefer jwPlayerId from video object', () => {
    expect(
      getResolvedJwPlayerId(
        {
          jwPlayerId: '9Xw0ABCD',
          brightcoveId: '5750322578001',
        },
        '7fAUVBk1',
      ),
    ).toBe('9Xw0ABCD');
  });

  it('Should use resolved jwPlayerId when video jwPlayerId is missing', () => {
    expect(
      getResolvedJwPlayerId(
        {
          brightcoveId: '5750322578001',
        },
        '7fAUVBk1',
      ),
    ).toBe('7fAUVBk1');
  });

  it('Should return empty string when no JW id exists', () => {
    expect(getResolvedJwPlayerId({})).toBe('');
  });

  it('Should inject resolved jwPlayerId into a video object', () => {
    expect(
      withResolvedJwPlayerId(
        {
          brightcoveId: '5750322578001',
        },
        '7fAUVBk1',
      ),
    ).toEqual({
      brightcoveId: '5750322578001',
      jwPlayerId: '7fAUVBk1',
    });
  });

  it('Should log and return null when mapper does not return jwVideoId', async () => {
    const logSpy = jest.spyOn(utils, 'log').mockImplementation(() => undefined);
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {},
      }),
    });

    const result = await fetchJwPlayerIdByBrightcoveId('5750322578002');

    expect(result).toBeNull();
    expect(logSpy).toHaveBeenCalled();
  });

  it('Should log and return null when mapper request fails', async () => {
    const logSpy = jest.spyOn(utils, 'log').mockImplementation(() => undefined);
    fetchSpy.mockRejectedValue(new Error('network-error'));

    const result = await fetchJwPlayerIdByBrightcoveId('5750322578003');

    expect(result).toBeNull();
    expect(logSpy).toHaveBeenCalled();
  });

  it('Should fetch again for sequential calls and rely on HTTP cache behavior', async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          jwVideoId: '7fAUVBk1',
          brightcoveVideoId: '5750322578001',
        },
      }),
    });

    const firstResult = await fetchJwPlayerIdByBrightcoveId('5750322578001');
    const secondResult = await fetchJwPlayerIdByBrightcoveId('5750322578001');

    expect(firstResult).toBe('7fAUVBk1');
    expect(secondResult).toBe('7fAUVBk1');
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('Should deduplicate in-flight requests for the same brightcoveId', async () => {
    let resolveFetch: ((value: unknown) => void) | undefined;

    fetchSpy.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }) as any,
    );

    const firstRequest = fetchJwPlayerIdByBrightcoveId('5750322578999');
    const secondRequest = fetchJwPlayerIdByBrightcoveId('5750322578999');

    expect(fetchSpy).toHaveBeenCalledTimes(1);

    resolveFetch?.({
      ok: true,
      json: async () => ({
        data: {
          jwVideoId: 'in-flight-jw-id',
        },
      }),
    });

    const [firstResult, secondResult] = await Promise.all([
      firstRequest,
      secondRequest,
    ]);

    expect(firstResult).toBe('in-flight-jw-id');
    expect(secondResult).toBe('in-flight-jw-id');
  });
});
