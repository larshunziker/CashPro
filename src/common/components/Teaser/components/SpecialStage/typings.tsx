import { ReactElement } from 'react';

export type SpecialStageFactoryProps = {
  teaserStage: TeaserStageParagraph;
  paragraphType: string;
  paragraphIndex?: number;
};

export type SpecialStageFactoryOptionsStyles = {
  SpecialLWrapper: string;
  ImageWrapper: string;
  InnerWrapper: string;
  ColumnLeft: string;
  ColumnRight: string;
  PublicationLogo?: string;
  LandingPageLink: string;
  Spacing: string;
  SpecialImage: string;
  ShortTitle: string;
  Title: string;
  ReferenceArticleWrapper: string;
  ReferenceArticleLink: string;
  ReferenceArticleShortTitle: string;
  ReferenceArticleTitle: string;
  MainSponsorLink: string;
  MainSponsorImage: string;
  PartnersWrapper: string;
  PartnersRow: string;
  PartnersColumn: string;
  PartnerItem: string;
};

export type SpecialStageFactoryOptions = {
  teaserStage: TeaserStageParagraph;
  Img: React.ComponentType<any>;
  button: ReactElement;
  publicationLogo?: ReactElement;
  backgroundImage: ReactElement;
  mainSponsorImage: ReactElement;
  styles: SpecialStageFactoryOptionsStyles;
  paragraphType: string;
  paragraphIndex: number;
};
