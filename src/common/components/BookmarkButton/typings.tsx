import { ComponentType } from 'react';
import { IconComponent } from '../Icon/typings';

export type BookmarkButtonComponent = ComponentType<BookmarkButtonProps>;

export type BookmarkButtonOptionsStyles = {
  BookmarkButtonWrapper: string;
  Text?: string;
  Icon: string;
  Animating: string;
};

export type BookmarkButtonFactoryOptions = {
  styles:
    | BookmarkButtonOptionsStyles
    | ((props: BookmarkButtonProps) => BookmarkButtonOptionsStyles);
  Icon?: IconComponent;
  addToBookmarksText?: string;
  removeFromBookmarksText?: string;
  bookmarkIconTypeInactive?: string;
  bookmarkIconTypeActive?: string;
  ToastService: BookmarkButtonToastService;
};

export type BookmarkButtonProps = {
  id: string;
  isBottom?: boolean;
  subtypeValue?: string;
};

export type BookmarkButtonToastService = {
  displayDefaultSuccessToast: () => void;
  displayDefaultErrorToast: () => void;
  displayAuthenticationErrorToast: () => void;
  displayLimitExceededToast: () => void;
  displayAuthenticationInfoToast: () => void;
  displayRemoveSuccessToast: () => void;
  displaySubscriptionOnlyInfoToast?: () => void;
};
