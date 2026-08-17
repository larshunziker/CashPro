export type LegalAdviceArticleTypesProps = Pick<RouterProps, 'location'> & {
  types: ArticleType[];
};

export type ArticleType = {
  id: string;
  title: string;
  numberOfArticles: number;
};
