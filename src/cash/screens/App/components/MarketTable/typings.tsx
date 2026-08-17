export type MarketTableProps = {
  /** comma separated listingKeys: `2222-4-1,33343-4-1,4563-1-4` */
  instrumentKeys?: string;
  /** instrumentKey -> name (can be used as fallback for inactive instruments) */
  fallbackNames?: Record<string, string>;
  widgetParagraph?: WidgetParagraph;
  isExtended?: boolean;
};
