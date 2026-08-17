export type ListicleItemParagraphFactoryOptionsStyles = {
  Title: string;
  Content?: string;
  ContentBox?: string;
  Footer?: string;
  ImageBox?: string;
  ImageBoxFirst?: string;
  Image?: string;
  Even?: string;
  Odd?: string;
  Wrapper?: string;
  ListicleItemWrapper?: string;
  ListicleItemInnerWrapper?: string;
  InnerWrapper?: string;
  IsNested?: string;
  ContentWrapper?: string;
};

export type ListicleItemParagraphFactoryOptions = {
  pictureStyle?: string[];
  styles:
    | ListicleItemParagraphFactoryOptionsStyles
    | ((
        props: ListicleItemParagraphProps,
      ) => ListicleItemParagraphFactoryOptionsStyles);
};

export type ListicleItemParagraphProps = {
  listicleItem: ListicleItemParagraph;
  listicleIndex: number;
  isNested?: boolean;
  origin?: string;
  pageLayoutType?: string;
};
