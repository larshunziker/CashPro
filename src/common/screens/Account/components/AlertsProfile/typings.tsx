import { ComponentType } from 'react';
import { Action } from 'redux';
import { NoItemsComponent } from '../../../../components/NoItems/typings';
import { RasHelmetProps } from '../../../../components/Helmet/typings';

export type AlertsProfileFactoryOptions = {
  styles: {
    AlertsProfileWrapper: string;
    AlertListWrapper?: string;
    LoginWrapper: string;
    Title: string;
    Description: string;
    ItemsWrapper: string;
  };
  grid: any; // TODO: maybe add a global typing for grid.legacy.css?
  titleText?: string;
  descriptionText?: string;
  loginText?: string;
  LoginForm: ComponentType<any>;
  NoItems: NoItemsComponent;
  LoadingSpinner: ComponentType;
  AlertList: ComponentType<any>;
  Helmet: ComponentType<RasHelmetProps>;
  setLoading?: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady?: (screenReady: boolean, tealiumData: TaeliumData) => Action;
  hasContainer?: boolean;
};

export type AlertsProfileComponent = ComponentType<AlertsProfileProps>;

export type AlertsProfileProps = Partial<RouterProps>;
