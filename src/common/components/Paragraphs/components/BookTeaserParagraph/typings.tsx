export type BookTeaserParagraphProps = {
  bookTeaser: Product;
  hasNext: boolean;
  hasContainer?: boolean;
};

export type BookTeaserParagraphFactoryOptionsStyles = {
  Wrapper: string;
  InnerWrapper?: string;
  AlignToNext?: string;
  AlignToPrev?: string;
  InnerContainer: string;
  ImageWrapper?: string;
  TextColumn: string;
  Title?: string;
  ImageColumn: string;
  CallToAction?: string;
  CallToActionIcon?: string;
  HeadingTitle?: string;
};

export type BookTeaserParagraphFactoryOptions = {
  Icon: React.ComponentType<any>;
  style_320: string;
  title?: string;
  truncateTitle?: boolean;
  isDescriptionVisible?: boolean;
  callToAction?: string;
  callToActionButton?: Function;
  hasInlineCTA?: boolean;
  styles: BookTeaserParagraphFactoryOptionsStyles;
};
