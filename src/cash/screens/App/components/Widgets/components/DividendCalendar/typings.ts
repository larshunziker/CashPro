export type DividendCalendarProps = {
  widgetParagraph?: WidgetParagraph;
  origin?: string;
};

export type QueryResultInstrumentData = {
  quoteList: { quoteList: { count: number; edges: Edge[] } };
};

type Edge = {
  node: Instrument;
};

export type CalendarData = CalendarItem & {
  quote: Instrument;
};

export type QueryResult = {
  integration: {
    edi: {
      dividendCalendar: {
        count: number;
        data: CalendarItem[];
      };
    };
  };
};
