import { ReactElement } from 'react';

export type ScrollToTopProps = {
  pixelsScrolledToFadeInComponent?: number;
};

export type ScrollToTopFactoryOptionsStyles = {
  ButtonWrapper: string;
  ScrollToTopFadeIn: string;
  ScrollToTopFadeOut: string;
  ButtonToTop: string;
};

export type ScrollToTopFactoryOptions = {
  pixelsScrolledToFadeInComponentDefault: number;
  icon: ReactElement;
  styles: ScrollToTopFactoryOptionsStyles;
  anchorTagScrollToTop: string;
};
