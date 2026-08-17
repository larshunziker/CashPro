export type ArticleProps = Pick<RouterProps, 'location'> & {
  article: (Article | NativeAdvertising) & {
    subtypeValue: string;
    trackingDetailImpression: string;
    issue: Issue;
    topics: any;
  };
  pageLayoutType: string;
};
