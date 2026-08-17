import { ReactNode } from 'react';

export type ArticleHeroProps = {
  type?: string;
  children?: ReactNode;
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
  component?: string;
  pageLayoutType?: string;
};
