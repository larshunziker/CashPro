export type ArticlePageAsideProps = {
  article: (Article | NativeAdvertising) & {
    subtypeValue: string;
    trackingDetailImpression: string;
    issue: Issue;
    topics: any;
  };
};
