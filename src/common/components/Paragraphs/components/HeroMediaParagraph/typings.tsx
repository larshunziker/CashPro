import { ReactElement } from 'react';

export type HeroMediaParagraphFactoryOptions = {
  ImageParagraph: any;
  paragraphsRenderer?: (props: HeroMediaParagraphProps) => ReactElement;
  icon?: ReactElement;
  styles: HeroMediaParagraphFactoryOptionsStyles;
};

export type HeroMediaParagraphFactoryOptionsStyles = {
  Wrapper: string;
  ContentWrapper?: string;
  ImageWrapper?: string;
  ParagraphsWrapper?: string;
  InnerContainer?: string;
  InnerWrapper?: string;
  InnerGrid?: string;
  Title?: string;
  ShortTitle: string;
  SubTitle?: string;
  Lead: string;
  Button?: string;
  CenteredContent?: string;
  ImageParagraph?: string;
};

export type HeroMediaParagraphProps = {
  entry: HeroMediaParagraph;
  hasTwoColumns?: boolean;
  isCentered?: boolean;
};
