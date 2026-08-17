import { ComponentType } from 'react';
import { Action } from 'redux';
import { RasHelmetProps } from '../../../../components/Helmet/typings';

export type UserProfileFactoryOptions = {
  styles: {
    UserProfileWrapper: string;
    Title: string;
    DeviceIdWrapper?: string;
  };
  titleText?: string;
  LoginForm: ComponentType<any>;
  UserMenu: ComponentType;
  LoadingSpinner: ComponentType;
  Helmet: ComponentType<RasHelmetProps>;
  seoTitle?: string;
  setLoading?: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady?: (screenReady: boolean, tealiumData: TaeliumData) => Action;
  hasContainer?: boolean;
  message?: string;
};

export type UserProfileComponent = ComponentType<UserProfileProps>;

export type UserProfileProps = Partial<RouterProps>;
