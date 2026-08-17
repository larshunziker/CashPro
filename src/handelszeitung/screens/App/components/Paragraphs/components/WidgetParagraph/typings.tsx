export type WidgetParagraphProps = {
  origin?: string;
  widgetParagraph: WidgetParagraphType;
};

export type WidgetParagraphType = WidgetParagraph &
  Maybe<Pick<Widget, 'sponsor' | 'preferredUri'>>;
