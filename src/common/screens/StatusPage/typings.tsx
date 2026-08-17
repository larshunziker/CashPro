import { ComponentType, ReactElement } from 'react';
import { Action } from 'redux';
import { HelmetComponent } from '../../components/Helmet/typings';

export type StatusCode = 404 | 451 | 503;

export type StatusCodeConfig = {
  [statusCode in StatusCode]?: {
    icon?: ReactElement;
    title?: {
      text?: string | ReactElement;
      readonly className?: string;
    };
    description?: {
      text?: string | ReactElement;
      readonly className?: string;
    };
    metaTitle?: string | ReactElement;
    showSearchForm?: boolean;
  };
};

export type StatusPageFactoryOptions = {
  setLoading?: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady?: (screenReady: boolean, trackingData: TaeliumData) => Action;
  statusCodeConfig: StatusCodeConfig;
  searchForm?: ReactElement;
  Helmet?: HelmetComponent;
  styles: {
    readonly Wrapper: string;
    readonly Container: string;
    readonly Row: string;
    readonly Columns: string;
    readonly HeaderWrapper: string;
    readonly IconWrapper: string;
    readonly Icon: string;
    readonly Title: string;
    readonly Description: string;
    readonly SearchWrapper: string;
  };
};

export type StatusPageProps = {
  statusCode?: StatusCode;
  logMessage?: any;
  path?: string;
  children?: (props: {
    statusCodeConfig: StatusCodeConfig[StatusCode];
    statusCode: StatusCode;
  }) => ReactElement;
};

export type StatusPageComponent = ComponentType<StatusPageProps>;
