import { EventData } from './typings';

export const cleanEvents = (
  events: EventData[],
  filter: string[],
): EventData[] => {
  const filteredEvents = filterEvents(events, filter);
  const newEvents = removeOldEvents(filteredEvents);
  const cleanedEvents = removeMissingData(newEvents);
  const sortedEvents = sortEvents(cleanedEvents);
  return sortedEvents;
};

const filterEvents = (events: EventData[], filter: string[]): EventData[] => {
  const cleanedEvents = removeOldEvents(events);
  if (!filter || (filter.length === 1 && filter[0] === 'ALLE')) {
    return sortEvents(cleanedEvents);
  }
  return sortEvents(
    cleanedEvents.filter((cleanedEvents) =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      filter.includes(cleanedEvents.eventcd),
    ),
  );
};

const removeOldEvents = (events: EventData[]): EventData[] => {
  const data: Record<string, EventData> = {};
  events.forEach((event) => {
    /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    if (!data[event.eventid]) {
      /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
      /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
      data[event.eventid] = event;
    } else {
      /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
      /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
      const date1 = Date.parse(data[event.eventid].evtchangedt);
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      const date2 = Date.parse(event.evtchangedt);
      if (date1 < date2) {
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        data[event.eventid] = event;
      }
    }
  });
  return Object.values(data);
};

const sortEvents = (events: EventData[]): EventData[] => {
  return events.sort((a, b) => {
    return timeStampByEvent(b) - timeStampByEvent(a);
  });
};

const timeStampByEvent = (event: EventData): number => {
  let date = '';
  if (event.eventcd === 'AGM') {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    date = cleanDate(event.meetingdt);
  }
  if (event.eventcd === 'DIV') {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    date = cleanDate(event.exdt);
  }
  if (event.eventcd === 'RCAP') {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    date = cleanDate(event.effectivedt);
  }
  const parts = date.split('.');
  return Date.parse(`${parts[2]}-${parts[1]}-${parts[0]}`);
};

export const cleanDate = (date: string): string => {
  const timeRemoved = date.split('T')[0];
  const cleaned = timeRemoved.replace(/(-|\/)/g, '.');
  const parts = cleaned.split('.');
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
};

const removeMissingData = (events: EventData[]): EventData[] => {
  return events.filter((event) => {
    if (event.eventcd === 'DIV') {
      const missinData =
        !event.grossdividend ||
        !event.exdt ||
        !event.paydt ||
        !event.ratecurencd;
      return !missinData;
    }
    return true;
  });
};
