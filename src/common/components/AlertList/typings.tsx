import type { ReactElement } from 'react';
import { AlertItemComponent } from '../AlertItem/typings';
import { ExpansionPanelComponent } from '../ExpansionPanel/typings';
import { SubscribeButtonComponent } from '../SubscribeButton/typings';

export type AlertListFactoryOptionsStyles = {
  AlertListWrapper: string;
  AlertListInner: string;
  AlertListItem: string;
  OnlySingleAlertItem?: string;
  ExpansionPanelHiddenOnDesktop?: string;
  ItemCount?: string;
  ListItem?: string;
  ItemCountExpansionPanel?: string;
};

export type GetAlertListFactoryOptionsStylesByProps<T> = (
  props: T,
) => AlertListFactoryOptionsStyles;

export type AlertListFactoryOptions<T> = {
  styles:
    | AlertListFactoryOptionsStyles
    | GetAlertListFactoryOptionsStylesByProps<T>;
  AlertItem: AlertItemComponent;
  SubscribeButton: SubscribeButtonComponent;
  ExpansionPanel: ExpansionPanelComponent;
  isSplittedPageLayout?: boolean;
};

export type AlertListComponent = (props: AlertListProps) => ReactElement;

export type AlertListProps = {
  maxItemDisplayCount?: number | null;
  items: Array<any>;
  isLongRead?: boolean;
  theme?: 'light' | 'default';
  isSplittedPageLayout?: boolean;
};

export type AlertList = Array<AlertListItem>;

type AlertListItem = PersonGraphListItem &
  OrganizationGraphListItem &
  KeywordGraphListItem;
