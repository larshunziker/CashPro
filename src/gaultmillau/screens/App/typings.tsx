export type AppProps = Pick<RouterProps, 'location'> & {
  root: Record<string, any>;
};
