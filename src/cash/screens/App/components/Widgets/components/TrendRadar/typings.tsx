export interface TrendProps {
  object: TrendRadar;
  mValor: string;
  mSymb: string;
}

export interface QueryWrapperProps {
  mIsin: string;
}
export type QueryResult = {
  integration: {
    solvians: {
      trendRadar: TrendRadar[];
    };
  };
};

export type TrendRadarProps = {
  widgetParagraph: WidgetParagraph;
};
