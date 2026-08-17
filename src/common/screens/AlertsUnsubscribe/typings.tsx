import { ComponentType, ReactElement } from 'react';
import { Action } from 'redux';
import loadingSpinnerFactory from '../../components/LoadingSpinner/factory';
import { LoginFormProps } from '../../components/LoginForm/typings';

export type AlertsUnsubscribeFactoryOptions = {
  styles: {
    AlertsUnsubscribeWrapper: string;
    Icon: string;
    Text: string;
    Wrapper: string;
    LoginWrapper: string;
  };
  pleaseWaitText?: string;
  successText?: string;
  loginText?: string;
  actionFailedText?: string;
  LoginForm: ComponentType<LoginFormProps>;
  LoadingSpinner: ReturnType<typeof loadingSpinnerFactory>;
  checkmarkIcon: ReactElement;
  button?: ReactElement;
  setLoading?: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady?: (screenReady: boolean, tealiumData: TaeliumData) => Action;
};

export type AlertsUnsubscribeComponent = ComponentType<AlertsUnsubscribeProps>;

export type AlertsUnsubscribeProps = Partial<RouterProps>;
