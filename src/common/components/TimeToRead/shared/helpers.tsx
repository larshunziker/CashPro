import {
  TIME_ELAPSED_UNIT_MINUTES,
  getTimeUnit,
} from '../../../../shared/helpers/dateTimeElapsed';

export const getTimeToReadLabel = (
  seconds: number,
  language = 'DE',
): string | null => {
  if (!seconds || isNaN(seconds)) {
    return null;
  }

  const minutesToRead = Math.round(Math.max(seconds, 60) / 60);

  return `${minutesToRead} ${getTimeUnit(
    {
      unit: TIME_ELAPSED_UNIT_MINUTES,
      value: minutesToRead,
    },
    language,
  )}`;
};
