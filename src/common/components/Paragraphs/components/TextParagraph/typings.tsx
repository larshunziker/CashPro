import { ComponentType, ReactElement } from 'react';

export type TextParagraphProps = {
  addClass?: string;
  addHeaderClass?: string;
  isFirst?: boolean;
  origin?: string;
  style?: string;
  textParagraph: TextParagraph;
  windowWidth?: number;
};

export type TextParagraphFactoryOptionsStyles = {
  Wrapper: string;
  InnerWrapper?: string;
  Header: string;
  Overflow?: string;
  HideLeftShadow?: string;
  HideRightShadow?: string;
};

export type TextParagraphFactoryOptions = {
  header?: (
    props: TextParagraphProps,
    styles: TextParagraphFactoryOptionsStyles,
  ) => ReactElement;
  styles:
    | TextParagraphFactoryOptionsStyles
    | ((props: TextParagraphProps) => TextParagraphFactoryOptionsStyles);
};

export type TextParagraphComponent = ComponentType<TextParagraphProps>;
