export type ProductTeaserProps = {
  teaserParagraph?: TeaserParagraph & {
    teasers: {
      edges: [
        /* @ts-ignore TODO: TS7008 ->  Member 'path' implicitly has an 'any' type. */
        { node: TeaserableInterface & { link: { path }; description: string } },
      ];
    };
  };
  colStyle?: string;
  hasNext?: boolean;
};
