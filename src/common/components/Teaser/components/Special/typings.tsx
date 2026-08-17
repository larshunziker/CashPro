import { ReactElement } from 'react';

export type SpecialFactoryOptionsStyles = {
  ContentWrapper: string;
  Image: string;
  ImageWrapper?: string;
  ShortTitle?: string;
  Title: string;
  Wrapper: string;
  SpecialWrapper: string;
  PartnerWrapper: string;
  SponsorWrapper: string;
};

export type SpecialFactoryOptions = {
  title: string;
  trackingData?: Array<TrackingData>;
  trackingSelector?: string;
  preferredUri: string;
  shortTitle?: string;
  button?: ReactElement;
  channel: Channel;
  specialImg: ReactElement;
  partnerImg: ReactElement;
  teaserImageIdentifier?: string;
  teaserImageStyles: ImageStylesObject;
  teaserImage: ImageParagraph;
  styles: SpecialFactoryOptionsStyles;
  downloadPriority?: 'high' | 'default';
};
