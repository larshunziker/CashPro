import { ReactElement } from 'react';
import { TeaserComponent } from '../../../Teaser/typings';

export type NativeAdvertisingCarouselParagraphComponent = (
  props: NativeAdvertisingCarouselParagraphProps,
) => ReactElement;

export type NativeAdvertisingCarouselParagraphProps = {
  nativeAdvertisingCarouselParagraph: NativeAdvertisingCarouselParagraph;
  className?: string;
  parentDimensions: DOMRect;
  fadeInactive: boolean;
  fullScreen: boolean;
};

export type NativeAdvertisingCarouselParagraphFactoryOptionsStyles = {
  SliderWrapper: string;
  NavBtns: string;
  TeaserWrapper: string;
};

export type NativeAdvertisingCarouselParagraphFactoryOptions = {
  Slider: any; // TODO: add Slider typing here
  sliderIndicator?: string;
  sliderIndicatorPosition?: string;
  autoplay: boolean;
  opacityInactive: number;
  Teaser: any; // TODO: add Teaser typing here
  teaserLayout: string;
  trackingClassNAParagraph: string;
  trackingClass: string;
  ensureTeaserInterface: (item: Record<string, any>) => Array<any>;
  detectParentDimensionsMemoized: (Component: any) => any;
  detectParentDimensionsCacheKey: string;
  getAspectRatio: () => string;
  tealiumTrackEvent: ({ type, payload }: TealiumTrackEventProps) => void;
  styles: NativeAdvertisingCarouselParagraphFactoryOptionsStyles;
};

export type NativeAdvertisingCarouselParagraphFactoryOptionsStyles2 = {
  Wrapper: string;
  Slide: string;
};

export type NativeAdvertisingCarouselParagraphFactoryOptions2 = {
  Teaser: TeaserComponent;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  DotsIndicator: (props) => ReactElement;
  teaserLayout: string;
  tealiumTrackEvent: ({ type, payload }: TealiumTrackEventProps) => void;
  ensureTeaserInterface: (item: Record<string, any>) => Array<any>;
  trackingClassNAParagraph: string;
  trackingClass: string;
  styles: NativeAdvertisingCarouselParagraphFactoryOptionsStyles2;
};

export type NativeAdvertisingCarouselParagraphProps2 = {
  nativeAdvertisingCarouselParagraph: NativeAdvertisingCarouselParagraph;
};
