export type PlaceholderParagraphProps = {
  placeholderParagraph: PlaceholderParagraph;
};

export type PlaceholderParagraphFactoryOptionsStyles = {
  Wrapper: string;
  TitleWrapper: string;
  Title: string;
};

export type PlaceholderParagraphFactoryOptions = {
  styles:
    | PlaceholderParagraphFactoryOptionsStyles
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    | ((props) => PlaceholderParagraphFactoryOptionsStyles);
};
