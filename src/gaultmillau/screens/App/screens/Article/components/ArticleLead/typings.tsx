export type ArticleType = Article & {
  subtypeValue: string;
};

export type ArticleLeadProps = {
  article: ArticleType;
  articleColStyle: string;
  component: string;
  language: string;
};
