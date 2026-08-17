export type PageScreenProps = RouterProps & {
  pageScreen: Page & { sponsor?: Sponsor } & Pick<
      NativeAdvertising,
      'trackingDetailImpression'
    >;
  updatePage: (currentPage: number) => void;
  routePathname: string;
};
