export type ArticleLeadProps = {
  article: Article & { subtypeValue: string };
  articleColStyle: string;
  component: string;
  layout?: boolean;
  pageLayoutType?: string;
};
