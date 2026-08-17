import { Action } from 'redux';
import { HelmetComponent } from './../../components/Helmet/typings';

export type AccountProps = Partial<RouterProps>;

export type AccountFactoryOptions = {
  styles: {
    readonly AccountPanel?: string;
    readonly AccountWrapper?: string;
    readonly Background?: string;
    readonly Title?: string;
    readonly Wrapper?: string;
  };
  Helmet: HelmetComponent;
  title: string;
  seoTitle?: string;
  setLoading?: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady?: (screenReady: boolean, trackingData: TaeliumData) => Action;
};
