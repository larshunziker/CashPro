export type ArticlePageProps = Pick<RouterProps, 'location'> & {
  article: NativeAdvertising | Article;
};
