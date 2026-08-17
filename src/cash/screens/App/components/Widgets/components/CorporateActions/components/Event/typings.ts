import { EventData } from '../../typings';

export type EventProps = {
  event: EventData;
  hasSubscription: boolean;
};

export type EventConfig = Record<
  string,
  {
    icon: string;
    title: string;
    date: string;
    text: string[];
  }
>;
