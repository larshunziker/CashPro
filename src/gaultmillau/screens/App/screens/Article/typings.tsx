export type ArticleProps = {
  article: Article & {
    subtypeValue: string;
    authors: {
      edges: [
        {
          node: {
            image: ImageParagraph;
          };
        },
      ];
    };
    heroImageBody: ParagraphInterface &
      [
        (VideoParagraph | VideoLoopParagraph) & {
          __typename: string;
          image: Image;
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
          teaserImage: TeaserImageInterface;
        },
      ];
  };
};
