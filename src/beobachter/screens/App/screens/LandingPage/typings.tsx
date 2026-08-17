import { AppNexusFactoryProps } from '../../../../../common/components/AppNexus/typings';
import { LegalAdviceSearchResponse } from '../LegalAdvice/typings';

export type LandingPageProps = RouterProps & {
  landingPage: LandingPage;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  updatePage: (props) => void;
  origin?: string;
  legalAdvice?: LegalAdviceSearchResponse;
};

export type LandingPageQueryComponentProps = {
  environment: Route & {
    routeByPath: Route;
  };
};

export type VideoBlogOverviewProps = Pick<RouterProps, 'location' | 'page'> &
  Pick<AppNexusFactoryProps, 'isAdSuppressed'> & {
    enrichedLandingPageBody: any;
    landingPage: LandingPage;
  };
