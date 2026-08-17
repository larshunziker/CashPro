export type PageScreenProps = Pick<RouterProps, 'location'> & {
  pageScreen: Partial<Page> & Partial<NativeAdvertising>;
  routePathname: string;
};
