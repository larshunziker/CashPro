export type KeywordArticlesListProps = Pick<
  RouterProps,
  'location' | 'page'
> & {
  keywordPage: Keyword;
};
