export type MinistageAccordionProps = {
  ministageParagraph: MinistageParagraph;
  origin?: string;
  colStyle?: string;
  isSplittedPageLayout?: boolean;
};

export type MinistageAccordionFactoryOptionStyles = {
  Wrapper?: string;
  InnerWrapper?: string;
  FAQInner: string;
  Title: string;
  Paragraphs?: string;
  Row?: string;
  Container?: string;
};

export type MinistageAccordionStylesByProps<T> = (
  props: T,
) => MinistageAccordionFactoryOptionStyles;

export type MinistageAccordionFactoryOptions<T> = {
  ExpansionPanel: any; //TODO: Should be changed as soon as ExpansionPanel is available as TS type;
  paragraphsRenderer: () => React.ComponentType<any>; //TODO: use ParagraphsComponent typings as soon as its available
  fallbackTitle: string;
  origin?: string;
  styles:
    | MinistageAccordionFactoryOptionStyles
    | MinistageAccordionStylesByProps<T>;
};
