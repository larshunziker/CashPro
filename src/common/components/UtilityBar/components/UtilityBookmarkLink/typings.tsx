import { ComponentType } from 'react';
import {
  UtilityBarToastService,
  UtilityItemProps,
} from '../../../../../common/components/UtilityBar/typings';
import { LinkComponent } from '../../../Link/typings';
import { SVGIconComponent } from '../../../SVGIcon/typings';

export type UtilityBookmarkLinkComponent =
  ComponentType<UtilityBookmarkLinkProps>;

export type UtilityBookmarkLinkFactoryOptionsStyles = {
  Link: string;
  Label?: string;
  Icon: string;
  Animating: string;
  Restricted?: string;
  Active?: string;
};

export type UtilityBookmarkLinkFactoryOptions = {
  styles:
    | UtilityBookmarkLinkFactoryOptionsStyles
    | ((
        props: UtilityBookmarkLinkProps,
      ) => UtilityBookmarkLinkFactoryOptionsStyles);
  ToastService:
    | UtilityBookmarkLinkToastService
    /* @ts-ignore TODO: TS7031 ->  Binding element 'trackingSource' implicitly has an 'any' type. */
    | (({ trackingSource }) => UtilityBookmarkLinkToastService);
  Link: LinkComponent;
  SVGIcon: SVGIconComponent;
  appAriaLabelMessage?: string;
};

export type UtilityBookmarkLinkProps = {
  id: string;
  item: UtilityItemProps;
  origin?: string;
  theme?: string;
  isRestricted: boolean;
  trackingSource?: string;
  toastService?: UtilityBarToastService;
  hideIconLabel?: boolean;
};

export type UtilityBookmarkLinkToastService = {
  displayDefaultSuccessToast: () => void;
  displayDefaultErrorToast: () => void;
  displayAuthenticationErrorToast: () => void;
  displayLimitExceededToast: () => void;
  displayAuthenticationInfoToast: () => void;
  displayRemoveSuccessToast: () => void;
};
