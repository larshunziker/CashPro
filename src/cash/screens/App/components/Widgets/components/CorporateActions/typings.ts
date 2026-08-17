export type CorporateActionsProps = {
  widgetParagraph: WidgetParagraph;
};

export type QueryResultInstrumentData = {
  quoteList: { quoteList: { count: number; edges: Edge[] } };
};

type Edge = {
  node: Instrument;
};

export type QueryResult = {
  integration: {
    edi: {
      corporateAction: {
        jsondata: EventData[];
      };
    };
  };
};

export type EventData = Pick<
  JsonData,
  | 'eventid'
  | 'exdt'
  | 'paydt'
  | 'grossdividend'
  | 'declarationdt'
  | 'ratecurencd'
  | 'meetingdt'
  | 'eventsubtypecd'
  | 'eventcd'
  | 'evtchangedt'
  | 'effectivedt'
  | 'cashback'
  | 'ntschangedt'
>;

export type EventConfig = {
  DIV: EventConfigItem;
  RCAP: EventConfigItem;
  AGM: EventConfigItem;
};

export type EventConfigItem = {
  label: string;
  eventCollection: string[];
};
