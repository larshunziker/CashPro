export type ArticleTitleProps = {
  article: Article & { subtypeValue: Maybe<Scalars['String']> };
  articleColStyle: string;
  articleImage?: string;
};
