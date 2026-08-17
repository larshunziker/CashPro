import { incrementPageViewCounts } from '../oneSignalChannelVisitTags';

describe('incrementPageViewCounts', () => {
  it('increments from existing string counts', () => {
    const oneSignal = {
      User: {
        getTags: () => ({ foo: '3', bar: '0' }),
      },
    };
    expect(incrementPageViewCounts(oneSignal, ['foo', 'bar'])).toEqual({
      foo: '4',
      bar: '1',
    });
  });

  it('starts at 1 when missing or non-numeric', () => {
    const oneSignal = {
      User: {
        getTags: () => ({ a: 'x', b: '-2' }),
      },
    };
    expect(incrementPageViewCounts(oneSignal, ['a', 'b', 'c'])).toEqual({
      a: '1',
      b: '1',
      c: '1',
    });
  });

  it('skips empty keys', () => {
    const oneSignal = {
      User: { getTags: () => ({}) },
    };
    expect(incrementPageViewCounts(oneSignal, ['', 'ok'])).toEqual({ ok: '1' });
  });

  it('handles null getTags', () => {
    const oneSignal = {
      User: { getTags: () => null },
    };
    expect(incrementPageViewCounts(oneSignal, ['x'])).toEqual({ x: '1' });
  });
});
