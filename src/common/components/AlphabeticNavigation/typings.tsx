import { ReactElement } from 'react';
import { AlphabetOverlayComponent } from './components/AlphabetOverlay/typings';

export type AlphabeticNavigationProps = {
  activeLetter: string;
  lettersUrl: string;
  enableOverlay: boolean;
  theme?: string;
};

export type AlphabeticNavigationFactoryOptionsStyles = {
  AlphabetWrapper: string;
  AlphabetOuterWrapper?: string;
  AlphabetInnerWrapper?: string;
  MobileToggle: string;
  MobileToggleWrapper: string;
  MobileToggleInnerWrapper: string;
};

export type AlphabeticNavigationFactoryOptions = {
  Alphabet: ReactElement | ((props: AlphabeticNavigationProps) => ReactElement);
  AlphabetOverlay: AlphabetOverlayComponent;
  MobileToggleContent?:
    | ReactElement
    | ((activeLetter: string, isNavigationOpen: boolean) => ReactElement)
    | string;
  styles:
    | AlphabeticNavigationFactoryOptionsStyles
    | ((
        props: AlphabeticNavigationProps,
      ) => AlphabeticNavigationFactoryOptionsStyles);
};
