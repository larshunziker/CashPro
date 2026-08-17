export type ArticleHeadProps = {
  article: Article & {
    subtypeValue: string;
    heroImageBody: ParagraphInterface &
      [
        {
          __typename: string;
          image: {
            credit: string;
          };
          gallery: {
            __typename: string;
            items: [
              {
                __typename: string;
                image: {
                  credit: string;
                };
              },
            ];
          };
          video: Object;
        },
      ];
  };
  articleColStyle: string;
  component: string;
  withComments?: boolean;
  pageLayoutType?: string;
};
