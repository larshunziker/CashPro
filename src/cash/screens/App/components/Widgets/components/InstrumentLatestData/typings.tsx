import { ReactNode } from 'react';

export type QueryResult = {
  quoteList: {
    quoteList: {
      edges: { node: Instrument }[];
    };
  };
};

export type InstrumentLatestDataProps = {
  widgetParagraph: WidgetParagraph;
  title?: ReactNode;
};
