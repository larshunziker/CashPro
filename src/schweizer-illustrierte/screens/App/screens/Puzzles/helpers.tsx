import {
  DATE_FORMAT_MONTHNAME,
  DATE_FORMAT_SIMPLYBOOK,
  formatDate,
} from '../../../../../shared/helpers/dateTimeElapsed';
import { SUBSCRIPTION_TYPE_PUZZLES } from '../../constants';
import { GAME_MAP, GameType } from './constants';
import { Day } from './typings';

export const getGameDetails = (name: string, isFreeGame = false): GameType => {
  if (isFreeGame) {
    /* @ts-ignore TODO: TS2322 ->  Type '{ title */
    return { ...GAME_MAP['free'] }[name];
  }
  /* @ts-ignore TODO: TS2322 ->  Type '{ title */
  return { ...GAME_MAP['full'] }[name];
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'dt' implicitly has an 'any' type. */
const isMonday = (dt) => dt.getDay() === 1;

const getDate = (startDate: Date) => {
  const date = getUrlDateFormat(startDate);
  const dateFormatted = formatDate(startDate, DATE_FORMAT_MONTHNAME);

  return { date: date, dateFormatted: dateFormatted };
};

export const getWeekArray = (start: Date, end: Date): Day[] => {
  const mondays = [];
  for (
    const startDate = new Date(start);
    startDate <= new Date(end);
    startDate.setDate(startDate.getDate() + 1)
  ) {
    isMonday(startDate) && mondays.push(getDate(startDate));
  }
  return mondays.reverse();
};

export const getDaysArray = (start: Date, end: Date): Day[] => {
  const days = [];

  for (
    const startDate = new Date(start);
    startDate <= new Date(end);
    startDate.setDate(startDate.getDate() + 1)
  ) {
    days.push(getDate(startDate));
  }
  return days.reverse();
};

const getUrlDateFormat = (date: Date = new Date()) =>
  formatDate(date, DATE_FORMAT_SIMPLYBOOK);

export const getHasAccess = (subscriptions: string[]) =>
  subscriptions?.includes(SUBSCRIPTION_TYPE_PUZZLES) || false;
