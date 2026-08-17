export const SET_SCREEN_READY = 'route/set-screen-ready';
export const ON_LOCATION_CHANGE = 'route/on-router-location-change';
export const SET_REFETCHING_DATA = 'route/set-refetching-data';
export const SET_VERTICAL = 'route/set-vertical';
export const SET_LOADING = 'route/set-loading';

export const BLOG = 'vertical/blog';
export const BUSINESS = 'vertical/business';
export const DEFAULT = 'vertical/default';
export const ECONOMY = 'vertical/economy';
export const HOME = 'vertical/home';
export const JOB = 'vertical/job';
export const LIFESTYLE = 'vertical/lifestyle';
export const MANAGEMENT = 'vertical/management';
export const MONEY = 'vertical/money';
export const NO_ADS = 'vertical/no-ads';
export const OTHER_TOPICS = 'vertical/other-topics';
export const POLITIC = 'vertical/politic';
export const SEARCH = 'vertical/search';
export const SPECIALS = 'vertical/specials';
export const SWISS_INSURANCE = 'vertical/swiss-insurance';
export const TECH = 'vertical/tech';
export const BILANZ = 'vertical/bilanz';
export const BANKING = 'vertical/banking';
export const PANORAMA = 'vertical/panorama';
export const MARKETING_PAGE = 'vertical/marketing-page';
export const MARKETING_PAGE_DEFAULT_HEADER =
  'vertical/marketing-page-default-header';

type RouteStateActionTypesHZ =
  | 'route/set-status-code'
  | 'route/set-screen-ready'
  | 'route/set-refetching-data'
  | 'route/set-vertical'
  | 'route/set-loading'
  | 'route/on-router-location-change';

export type RouteStateActionHZ<T> = {
  type: RouteStateActionTypesHZ;
  payload: T;
};

// create map url segment : constant
export const URL_SEGMENT_TO_VERTICAL_MAP = {
  default: DEFAULT,
  unternehmen: BUSINESS,
  suche: SEARCH,
  management: JOB,
  beruf: JOB,
  blog: BLOG,
  politik: POLITIC,
  'politik-0': POLITIC,
  invest: MONEY,
  geld: MONEY,
  specials: SPECIALS,
  lifestyle: LIFESTYLE,
  konjunktur: ECONOMY,
  'weitere-themen': OTHER_TOPICS,
  'digital-switzerland': TECH,
  'schweizer-versicherung': SWISS_INSURANCE,
  insurance: SWISS_INSURANCE,
  tech: TECH,
  bilanz: BILANZ,
  panorama: PANORAMA,
  banking: BANKING,
  // 'who-is-who': BILANZ, // example: map route /who-is-who to bilanz channel
};

// create map url segment for matching route
export const URL_SEGMENT_TO_FULL_PATH = {
  '/service/hz-abonnements': NO_ADS,
};

export const setScreenReady = (
  screenReady: boolean,
  tealiumData: TaeliumData,
  hasCustomTracking = false,
): RouteStateActionHZ<Record<string, any>> => ({
  type: SET_SCREEN_READY,
  payload: {
    screenReady,
    ...tealiumData,
    hasCustomTracking,
  },
});

// set vertical
export const setVertical = (
  vertical: string,
): RouteStateActionHZ<{ vertical: string }> => ({
  type: SET_VERTICAL,
  payload: {
    vertical,
  },
});

export const setLoading = (
  loading: boolean,
): RouteStateActionHZ<{ loading: boolean }> => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export const onLocationChange = (
  location: RaschRouterLocation,
): RouteStateActionHZ<RaschRouterLocation> => ({
  type: ON_LOCATION_CHANGE,
  payload: location,
});
