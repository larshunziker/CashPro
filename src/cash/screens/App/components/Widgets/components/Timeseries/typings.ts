export type TimeseriesProps = {
  widgetParagraph: WidgetParagraph;
};

export type TimeseriesResponse = {
  integration: {
    id: string;
    solid: {
      chart: Pick<Chart, 'timeserie'>;
    };
  };
};

export type PriceWithAutoupdateState = {
  price: ExtendedPrice;
  isNew: boolean;
};
