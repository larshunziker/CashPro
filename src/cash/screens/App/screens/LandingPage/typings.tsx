export type LandingPageProps = Pick<RouterProps, 'location' | 'page'> & {
  landingPage: LandingPage;
  origin?: string;
  isAdSuppressed?: boolean;
};
