export type MultipleInstrumentsGenericDataProps = {
  widgetParagraph: WidgetParagraph;
  callbackData?: CallbackData;
};

type CallbackData = {
  loading: boolean;
  listingKeys: string;
  constituents: boolean;
};
