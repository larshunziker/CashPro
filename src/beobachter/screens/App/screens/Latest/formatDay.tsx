import {
  checkIfSameDay,
  DATE_FORMAT_MONTHNAME,
  formatDate,
} from '../../../../../shared/helpers/dateTimeElapsed';

export function formatDay(date: string) {
  if (checkIfSameDay(date, new Date())) {
    return 'Heute';
  }

  if (
    checkIfSameDay(date, new Date(new Date().setDate(new Date().getDate() - 1)))
  ) {
    return 'Gestern';
  }

  return formatDate(date, DATE_FORMAT_MONTHNAME);
}
