import { UtilityBarComponent } from '../../typings';
import { UtilityOverlayComponent } from '../UtilityOverlay/typings';

export type UtilityHeaderBarFactoryOptions = {
  UtilityBar: UtilityBarComponent;
  UtilityOverlay?: UtilityOverlayComponent;
  truncateTitleLength?: number;
  styles: UtilityHeaderBarFactoryOptionsStyles;
  appOverlayTitle?: string;
  appCurrentlyReadingMessage?: string;
};

export type UtilityHeaderBarFactoryOptionsStyles = {
  Wrapper: string;
  Move: string;
  ContentWrapper?: string;
  TitleWrapper?: string;
  Title?: string;
  UtilityBarWrapper: string;
  UtilityOverlayWrapper?: string;
  HiddenForDesktop?: string;
};

export type UtilityHeaderBarProps = {
  articleData?: ArticleData;
  isScrolledToCollapse: boolean;
  isSocialBarVisible: boolean;
  enabledUtilities: Array<string>;
  enabledOverlayUtilities?: Array<string>;
  overlayTitle?: string;
  showTitle?: boolean;
  isTopBar?: boolean;
  hideIconLabel?: boolean;
};
