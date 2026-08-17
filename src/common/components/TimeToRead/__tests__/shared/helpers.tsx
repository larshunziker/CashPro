import { getTimeToReadLabel } from '../../shared/helpers';

describe('[common] TimeToRead helpers - getTimeToReadLabel', () => {
  test.each([
    { seconds: 0, result: null },
    { seconds: 1, result: '1 Minute' },
    { seconds: 2, result: '1 Minute' },
    { seconds: 59, result: '1 Minute' },
    { seconds: 60, result: '1 Minute' },
    { seconds: 61, result: '1 Minute' },
    { seconds: 89, result: '1 Minute' },
    { seconds: 90, result: '2 Minuten' },
    { seconds: 91, result: '2 Minuten' },
  ])('Should return properly label of time to read', (config) => {
    const timeToReadLabel = getTimeToReadLabel(config.seconds);

    expect(timeToReadLabel).toEqual(config.result);
  });
});
