export type LandingPageProps = Pick<RouterProps, 'location'> & {
  landingPage: LandingPage;
  page: number;
  origin?: string;
  isAdSuppressed?: boolean;
};

export type LandingPageQueryComponentProps = {
  environment: Route & {
    routeByPath: { object: LandingPage };
  };
};

export type VideoBlogOverviewProps = RouterProps &
  LandingPageProps & { enrichedPageBody: any };
