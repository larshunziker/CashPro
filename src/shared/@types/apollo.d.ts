declare type ApolloConfigOptions = {
  variables?: Record<any, any>;
  fetchPolicy?:
    | 'cache-first'
    | 'cache-and-network'
    | 'network-only'
    | 'cache-only'
    | 'no-cache';
  pollInterval?: number;
  mutate?: Function;
  context?: Record<any, any>;
};

declare type ApolloData = {
  loading: boolean;
  error: Record<any, any>;
  networkStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  variables: Record<any, any>;
  refetch: Function;
  fetchMore: (options: ApolloConfigOptions) => Object;
};

declare type ApolloMutation = {
  mutate: Function;
};

declare type ApolloConfigProps = {
  data: ApolloData;
};

declare type ApolloConfig = {
  options?: ApolloConfigOptions | ((props: Object) => ApolloConfigOptions);
  props?: (props: Record<any, any>) => ApolloConfigProps;
  skip?: (props: Record<any, any>) => boolean;
  name?: string;
  withRef?: boolean;
  alias?: string;
};
