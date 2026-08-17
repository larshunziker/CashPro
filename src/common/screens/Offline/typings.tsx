import { ReactNode } from 'react';
import { SVGIconComponent } from 'src/common/components/SVGIcon/typings';
import { HelmetComponent } from './../../components/Helmet/typings';

export type OfflineFactoryOptions = {
  styles: {
    readonly Wrapper: string;
    readonly Title: string;
    readonly Icon?: string;
    readonly Description: string;
    readonly CallToActionWrapper?: string;
  };
  Helmet: HelmetComponent;
  SVGIcon?: SVGIconComponent;
  callToAction?: ReactNode;
  iconType?: string;
};
