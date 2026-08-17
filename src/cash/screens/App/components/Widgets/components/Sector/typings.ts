export type SectorProps = {
  widgetParagraph: WidgetParagraph & QueryResult;
};

export type QueryResult = {
  getSectorQuotes: { sectorQuotes: { count: number; edges: Edge[] } };
};

type Edge = {
  node: Instrument;
};
