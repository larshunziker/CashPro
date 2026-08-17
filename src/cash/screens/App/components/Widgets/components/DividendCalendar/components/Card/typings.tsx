import { CalendarData } from '../../typings';

export type CardProps = {
  data: CalendarData;
  cardsPerViewport: number;
  origin?: string;
};
