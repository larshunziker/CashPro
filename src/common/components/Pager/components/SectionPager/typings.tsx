export type SectionPagerProps = {
  sectionParagraphs: Array<SectionParagraph>;
  currentIndex?: number;
  isRight?: boolean;
  anchorScrollId?: string;
};

export type SectionPagerFactoryStyles = {
  ItemTitle: string;
  ItemText: string;
  ItemTitleIsActive: string;
  ItemTextIsActive: string;
  ItemWrapper: string;
  ItemWrapperIsActive: string;
  Link: string;
  LinkIsActive: string;
  SectionPagerItem: string;
  Title: string;
  Wrapper: string;
  WrapperRight: string;
};

export type SectionPagerFactoryOptions = {
  styles: SectionPagerFactoryStyles;
  messages?: {
    title?: string;
    chapter?: string;
  };
};
