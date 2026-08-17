import { ReactElement } from 'react';
import { UtilityBarComponent } from '../../typings';

export type UtilityOverlayFactoryOptions = {
  UtilityBar: UtilityBarComponent;
  overlay?: (props: UtilityOverlayProps) => ReactElement;
  styles:
    | ((props: UtilityOverlayProps) => UtilityOverlayFactoryOptionsStyles)
    | UtilityOverlayFactoryOptionsStyles;
};

export type UtilityOverlayFactoryOptionsStyles = {
  Wrapper: string;
  Title?: string;
  CloseButton?: string;
  WrapperToggle: string;
  UtilityBarWrapper: string;
  WrapperSticky: string;
};

export type UtilityOverlayProps = {
  overlayTitle?: string;
  enabledUtilities: Array<string>;
  isOverlayVisible: boolean;
  isScrolledToCollapse?: boolean;
  origin?: string;
  isUsingPortal?: boolean;
  hasStickyness?: boolean;
  toggleOverlayVisible: (isOverlayVisible: boolean) => boolean;
  shareUrl?: string;
  title?: string;
  shortTitle?: string;
  lead?: string;
  socialMediaTitle?: string;
  imageUrl?: string;
  visibleId?: string;
};

export type UtilityOverlayComponent = (
  props: UtilityOverlayProps,
) => ReactElement;
