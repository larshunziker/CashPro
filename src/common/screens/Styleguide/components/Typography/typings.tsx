import { ReactElement } from 'react';
import { Action } from 'redux';
import { StatusPageComponent } from '../../../StatusPage/typings';

export type TypographyStyleguideProps = Partial<RouterProps> & {
  viewportLabel: ViewportLabel;
};

export type TypographyByProps<T> = (props: T) => Record<string, string>;

export type TypographyStyleguideFactoryOptions<T> = {
  StatusPage?: StatusPageComponent;
  typography: Record<string, string> | TypographyByProps<T>;
  breadcrumbs?: ReactElement;
  styles: {
    Wrapper?: string;
    WrapperInner?: string;
    Title?: string;
    HeaderTitle?: string;
    Label?: string;
    ItemWrapper?: string;
    Input?: string;
    InputLabel?: string;
  };
  setLoading?: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady?: (
    screenReady: boolean,
    trackingData: Record<string, string>,
  ) => Action;
};
