import { ComponentType, ReactElement } from 'react';
import { UtilityBookmarkLinkComponent } from './components/UtilityBookmarkLink/typings';
import {
  UtilityLinkComponent,
  UtilityLinkProps,
} from './components/UtilityLink/typings';

export type UtilityBarProps = {
  enabledUtilities: Array<string>;
  children?: (props: any) => ReactElement;
  origin?: string;
  theme?: string;
  shareUrl?: string;
  title?: string;
  shortTitle?: string;
  lead?: string;
  socialMediaTitle?: string;
  imageUrl?: string;
  hideIconLabel?: boolean;
  shouldUseSwipeable?: boolean;
};

export type UtilityBarFactoryOptionsStyles = {
  Wrapper: string;
};

export type UtilityBarToastService = {
  displaySubscriptionOnlyInfoToast: () => void;
};

export type GetAvailableUtilitiesProps<T> = (
  props: T,
) => Array<UtilityItemProps>;

export type UtilityGiftLinkProps = UtilityLinkProps & {
  restrictionStatus?: string;
  hasSubscriptions: boolean;
};

export type UtilityGiftLinkComponent = ComponentType<UtilityGiftLinkProps>;

export type UtilityBarFactoryOptions<T = {}> = {
  UtilityLink: UtilityLinkComponent;
  UtilityBookmarkLink?: UtilityBookmarkLinkComponent;
  availableUtilities: Array<UtilityItemProps> | GetAvailableUtilitiesProps<T>;
  headerStateSelector: HeaderStateSelector;
  locationStateSelector: LocationStateSelector;
  commentStateSelector: CommentStateSelector;
  UtilityGiftLink?: UtilityGiftLinkComponent;
  ToastService?:
    | UtilityBarToastService
    /* @ts-ignore TODO: TS7031 ->  Binding element 'source' implicitly has an 'any' type. */
    | (({ source }) => UtilityBarToastService);
  styles:
    | UtilityBarFactoryOptionsStyles
    | ((props: UtilityBarProps) => UtilityBarFactoryOptionsStyles);
};

export type UtilityItemProps = {
  id: string;
  iconType: string;
  iconInactiveType?: string;
  url: string;
  targetType?: '_blank' | '_self';
  addClass?: string;
  referrer?: string;
  iconLabel: string;
  iconInactiveLabel?: string;
  onClick?: (event: Event) => void;
  OverwriteUtilityLink?: (props: UtilityLinkProps) => ReactElement;
  toggleCustomOverlay?: boolean;
};

export type UtilityBarComponent = ComponentType<UtilityBarProps>;
