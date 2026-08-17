import type { ReactNode } from 'react';
import { LinkComponent } from '../Link/typings';

export type SponsorBannerProps = {
  children: ReactNode;
  label: string;
  sponsor?: Sponsor;
  isLabelOnTop?: boolean;
  backgroundColor?: string;
};

export type SponsorBannerFactoryOptionsStyles = {
  Wrapper: string;
  Section: string;
  Container: string;
  Banner: string;
  SponsorLabelWrapper?: string;
  Label: string;
};

export type SponsorBannerFactoryOptions = {
  Link: LinkComponent;
  styles: SponsorBannerFactoryOptionsStyles;
};
