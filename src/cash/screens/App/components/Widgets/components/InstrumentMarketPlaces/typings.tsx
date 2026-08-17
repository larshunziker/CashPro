export type InstrumentMarketPlacesProps = {
  widgetParagraph: WidgetParagraph;
};

export type QueryResult = {
  getInstrumentsByValor: {
    items: {
      mCur?: string;
      lval: string;
      mName?: string;
      market?: string;
      tur?: string;
      lvalDatetime?: string;
      iNetVperprVPr?: string;
      fullquoteUri?: string;
    }[];
  };
};
