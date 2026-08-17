import { ReactElement } from 'react';
import { Action } from 'redux';
import { StatusPageComponent } from '../StatusPage/typings';

export type StyleguideProps = Partial<RouterProps>;

export type StyleguideFactoryOptions = {
  StatusPage?: StatusPageComponent;
  StyleguideComponents?: () => ReactElement;
  breadcrumbs?: ReactElement;
  title: string;
  styles: {
    Wrapper?: string;
    Title?: string;
    ContentWrapper?: string;
    InputLabel?: string;
    Input?: string;
  };
  setLoading?: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady?: (
    screenReady: boolean,
    trackingData: Record<string, string>,
  ) => Action;
};
