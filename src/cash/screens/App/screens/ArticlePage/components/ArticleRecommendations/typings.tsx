export type ArticleRecommendationsProps = Pick<Article, 'gcid' | 'keywords'> & {
  isNativeAdvertising: boolean;
};
