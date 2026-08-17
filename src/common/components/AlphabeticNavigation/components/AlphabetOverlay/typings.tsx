import { ComponentType, ReactElement, SyntheticEvent } from 'react';

export type AlphabetOverlayProps = {
  activeLetter?: string;
  lettersUrl?: string;
  isMobile?: boolean;
  isNavigationOpen?: boolean;
  toggleMobileNavigation?: (event: SyntheticEvent) => void;
  closeOnOutsideClick?: boolean;
};

export type AlphabetOverlayFactoryOptionsStyles = {
  GridRow?: string;
  GridColumns?: string;
  MobileMenu: string;
  MobileMenuOpen: string;
  MobileCloseIconWrapper: string;
  MobileMenuInner: string;
  Wrapper: string;
};

export type AlphabetOverlayFactoryOptions = {
  Alphabet: ReactElement | ((props: AlphabetOverlayProps) => ReactElement);
  CloseIcon: ReactElement;
  styles:
    | AlphabetOverlayFactoryOptionsStyles
    | ((props: AlphabetOverlayProps) => AlphabetOverlayFactoryOptionsStyles);
};

export type AlphabetOverlayComponent = ComponentType<AlphabetOverlayProps>;
