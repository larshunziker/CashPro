export type TopFlopProps = {
  widgetParagraph: WidgetParagraph & QueryResult;
};

export type QueryResult = {
  quoteList: { quoteList: { count: number; edges: Edge[] } };
};

type Edge = {
  node: Instrument;
};
