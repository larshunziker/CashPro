// can be either an ImageParagraph or an TeaserParagraph (configured in the CMS)

export type MultiColumnParagraphEntry = ImageParagraph | TeaserParagraph;

export type MultiColumnParagraphProps = {
  multiColumnParagraph: MultiColumnParagraph;
  origin: string;
};

export type GetGridColsByProps = (props: MultiColumnParagraphProps) => string;

export type MultiColumnParagraphFactoryOptions = {
  styles:
    | MultiColumnParagraphFactoryOptionsStyles
    | ((
        props: MultiColumnParagraphProps,
      ) => MultiColumnParagraphFactoryOptionsStyles);
  paragraphsRenderer: () => React.ComponentType<any>; //TODO: use ParagraphsComponent typings as soon as its available
  getGridColsByProps?: GetGridColsByProps;
};

export type MultiColumnParagraphFactoryOptionsStyles = {
  Container: string;
  Row: string;
};
