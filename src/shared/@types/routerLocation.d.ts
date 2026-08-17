declare type RouterLocation = {
  pathname: string;
  search: string;
  query: Record<string, any>;
  hash: string;
};

declare type RaschRouterLocation = Partial<Location> &
  Partial<LocationBeforeTransitions> & {
    href: string;
    params: Record<string, string>;
  };

declare type RouterProps = {
  history: Record<string, any>;
  location: Partial<RaschRouterLocation>;
  params: Record<string, any>;
  route: Record<string, any>;
  router: Record<string, any>;
  routeParams: Record<string, any>;
  routes: Array<Record<string, any>>;
  splat: string;
  replace: (searchValue: string | RegExp, replaceValue: string) => void;
  page?: number;
  loading?: Pick<LocationState, 'loading'>;
};

// new Reach Router Typings
declare type ReachRouterLocationBeforeTransitions = {
  pathname: string;
  search: string;
  hash: string;
  key: string;
  query: Record<string, any>;
};

declare type ReachRouterLocation = Partial<Location> & {
  query: Record<string, any>;
  href: string;
};

declare type ReachRouterProps = {
  history: Record<string, any>;
  location: ReachRouterLocation;
  route: Record<string, any>;
  router: Record<string, any>;
  routeParams: Record<string, any>;
  routes: Array<Record<string, any>>;
  path: string;
  page?: number;
};

type ReachRouterNavigateOptions = {
  state: Maybe<Record<string, any>>;
  replace: Maybe<boolean>;
};
