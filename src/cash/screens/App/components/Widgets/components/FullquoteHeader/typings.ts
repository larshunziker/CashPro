export type FullquoteHeaderProps = {
  widgetParagraph: WidgetParagraph;
};

export type QueryResult = {
  quoteList: { quoteList: { count: number; edges: Edge[] } };
};

type Edge = {
  node: Instrument;
};
