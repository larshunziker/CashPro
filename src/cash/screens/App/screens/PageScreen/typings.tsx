export type PageScreenProps = Pick<RouterProps, 'location'> & {
  pageScreen: Partial<Page> & Partial<NativeAdvertising>;
  updatePage: (currentPage: number) => void;
  routePathname: string;
};
