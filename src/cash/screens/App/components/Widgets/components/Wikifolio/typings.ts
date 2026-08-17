export type WikifolioProps = {
  widgetParagraph: WidgetParagraph;
};

export type QueryResult = {
  integration: {
    wikifolio: {
      portfolios: Pf[];
    };
  };
};
