import { ComponentType } from 'react';
import {
  UtilityBarToastService,
  UtilityItemProps,
} from '../../../../../common/components/UtilityBar/typings';
import { SVGIconComponent } from '../../../SVGIcon/typings';

export type UtilityLinkFactoryOptions = {
  SVGIcon: SVGIconComponent;
  styles:
    | ((props: UtilityLinkProps) => UtilityLinkFactoryOptionsStyles)
    | UtilityLinkFactoryOptionsStyles;
  appAriaLabel?: string;
};

export type UtilityLinkFactoryOptionsStyles = {
  Link: string;
  Active: string;
  Label?: string;
  Icon: string;
  CommentCount?: string;
  Badge?: string;
  Restricted?: string;
};

export type UtilityLinkProps = {
  item: UtilityItemProps;
  url: string;
  isActive: boolean;
  isRestricted: boolean;
  commentCount?: number | null;
  origin?: string;
  theme?: string;
  toastService?: UtilityBarToastService;
  hideIconLabel?: boolean;
  articleId?: string;
  createDate?: string;
};

export type UtilityLinkComponent = ComponentType<UtilityLinkProps>;
