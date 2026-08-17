import { ArticlePageProps } from '../../typings';

export type ArticlePageDefaultProps = Pick<
  ArticlePageProps,
  'article' | 'vertical' | 'isCrawler' | 'location'
> & {
  isRestrictedArticle: boolean;
  shouldHideContent: boolean;
  viewportLabel?: string;
  noHeader?: boolean;
  pageLayoutType?: string;
  hasSubscriptions: boolean;
};
