import { ComponentType } from 'react';

export type PartnerBannerProps = {
  sponsors: Array<SponsorEdge>;
};

export type PartnerBannerFactoryOptionsStyles = {
  ImageContainer: string;
  BackgroundImageWrapper: string;
  BackgroundImage: string;
  PartnerLogo: string;
  Caption: string;
};

export type PartnerBannerFactoryOptions = {
  styles: PartnerBannerFactoryOptionsStyles;
};

export type PartnerBannerComponent = ComponentType<PartnerBannerProps>;
