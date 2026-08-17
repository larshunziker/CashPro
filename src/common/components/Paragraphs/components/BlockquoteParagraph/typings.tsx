export type BlockquoteParagraphProps = {
  origin?: string;
  blockquoteParagraph: BlockquoteParagraph;
};

export type BlockquoteParagraphFactoryOptionsStyles = {
  Wrapper: string;
  Quote: string;
  QuoteAuthor: string;
};

export type BlockquoteParagraphFactoryOptions = {
  styles:
    | BlockquoteParagraphFactoryOptionsStyles
    | ((
        props: BlockquoteParagraphProps,
      ) => BlockquoteParagraphFactoryOptionsStyles);
};
