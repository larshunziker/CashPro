export type RankingListParagraphProps = {
  rankingList: RankingListParagraph;
};

export type RankingListParagraphFactoryOptionsStyles = {
  Wrapper: string;
};

export type RankingListParagraphFactoryOptions = {
  // start factory2 new css grid props
  gridLayout?: string;
  teaserGridLayout?: string;
  // end factory2 props
  gridConfig: GridConfig | ((props: RankingListParagraphProps) => GridConfig);
  ensureTeaserInterface: Function;
  TeaserGrid: any; // TODO: add TeaserGrid typing here
  windowStateSelector?: WindowStateSelector;
  trackingClass?: string;
  styles: RankingListParagraphFactoryOptionsStyles;
};
