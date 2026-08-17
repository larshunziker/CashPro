import { ReactElement } from 'react';

export type LongReadHeaderProps = {
  node: Article;
  page: number;
};

export type LongReadHeaderFactoryStyles = {
  ArticleImage: string;
  ArticleImageCredit: string;
  ArticleLead: string;
  Caption: string;
  CaptionWrapper: string;
  Figure: string;
  OverlappingTextWrapper: string;
  OverlappingText: string;
  TeaserWrapper: string;
  Title: string;
  Wrapper: string;
};

export type LongReadHeaderFactoryOptions = {
  renderTitleBadge?: Function;
  renderAuthorsAndDateElement?: Function;
  renderLead?: Function;
  grid: Record<string, any>;
  styles: LongReadHeaderFactoryStyles;
  sourceMessage?: string;
};

export type LongReadHeaderComponent = (
  props: LongReadHeaderProps,
) => ReactElement;
