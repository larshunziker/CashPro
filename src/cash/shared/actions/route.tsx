export const SET_SCREEN_READY = 'route/set-screen-ready';
export const SET_REFETCHING_DATA = 'route/set-refetching-data';
export const SET_VERTICAL = 'route/set-vertical';
export const ON_LOCATION_CHANGE = 'route/on-router-location-change';
export const SET_LOADING = 'route/set-loading';

export const HOME = 'vertical/home';
export const DEFAULT = 'vertical/default';
export const TOPNEWS = 'vertical/top-news';
export const BOERSENTICKER = 'vertical/boersenticker';
export const APPOINTMENTS = 'vertical/economic-appointments';
export const ALL_NEWS = 'vertical/all-news';
export const INSIDER = 'vertical/insider';
export const INSIDER_BRIEFING = 'vertical/insider-briefing';
export const STOCK_EXCHANGE_MARKET = 'vertical/boerse-maerkte';
export const QUOTES = 'vertical/quotes';
export const SHARES = 'vertical/shares';
export const FOREIGN_EXCHANGE_INTERESTS = 'vertical/foreign-exchange-interest';
export const RAW_MATERIALS = 'vertical/raw-materials';
export const DERIVATIVES = 'vertical/derivatives';
export const FONDS = 'vertical/fonds';
export const ETFS = 'vertical/etfs';
export const KRYPTO = 'vertical/krypto';
export const COUNSELOR = 'vertical/counselor';
export const NO_ADS = 'vertical/no-ads';
export const MARKETING_PAGE = 'vertical/marketing-page';
export const MARKETING_PAGE_DEFAULT_HEADER =
  'vertical/marketing-page-default-header';
export const INVESTMENT = 'vertical/investment';

export const VERTICAL_TITLES = {
  [INVESTMENT]: 'Anlegen',
  [TOPNEWS]: 'TopNews',
  [BOERSENTICKER]: 'BoersenTicker',
  [APPOINTMENTS]: 'Termine',
  [ALL_NEWS]: 'AlleNews',
  [INSIDER]: 'Insider',
  [INSIDER_BRIEFING]: 'InsiderBriefing',
  [STOCK_EXCHANGE_MARKET]: 'BoerseMaerkte',
  [QUOTES]: 'Kurse',
  [SHARES]: 'Aktien',
  [FOREIGN_EXCHANGE_INTERESTS]: 'DevisenZinsen',
  [RAW_MATERIALS]: 'RohstoffeEdelmetalle',
  [DERIVATIVES]: 'Derivate',
  [FONDS]: 'Fonds',
  [ETFS]: 'ETFs',
  [KRYPTO]: 'Krypto',
  [COUNSELOR]: 'Ratgeber',
};

type RouteStateActionTypesCASH =
  | 'route/set-status-code'
  | typeof SET_SCREEN_READY
  | typeof SET_REFETCHING_DATA
  | typeof SET_LOADING
  | typeof ON_LOCATION_CHANGE
  | typeof SET_VERTICAL;

export type RouteStateActionCASH<T> = {
  type: RouteStateActionTypesCASH;
  payload: T;
};

// create map url segment : constant
export const URL_SEGMENT_TO_VERTICAL_MAP = {
  default: DEFAULT,
  insider: INSIDER,
  'insider-briefing': INSIDER_BRIEFING,
  boerse: STOCK_EXCHANGE_MARKET,
  kurse: QUOTES,
  aktien: SHARES,
  'devisen-zinsen': FOREIGN_EXCHANGE_INTERESTS,
  'rohstoffe-edelmetalle': RAW_MATERIALS,
  derivate: DERIVATIVES,
  fonds: FONDS,
  etf: ETFS,
  kryptowaehrungen: KRYPTO,
  ratgeber: COUNSELOR,
};

// create map url segment for matching route
export const URL_SEGMENT_TO_FULL_PATH = {
  '/news/top-news': TOPNEWS,
  '/news/boersenticker': BOERSENTICKER,
  '/news/wirtschaftstermine': APPOINTMENTS,
  '/news/alle': ALL_NEWS,
};

// set vertical
export const setVertical = (
  vertical: string,
): RouteStateActionCASH<{ vertical: string }> => ({
  type: SET_VERTICAL,
  payload: {
    vertical,
  },
});

export const setScreenReady = (
  screenReady: boolean,
  tealiumData: TaeliumData,
  hasCustomTracking = false,
) => ({
  type: SET_SCREEN_READY,
  payload: {
    screenReady,
    ...tealiumData,
    hasCustomTracking,
  },
});

export const setLoading = (
  loading: boolean,
): RouteStateActionCASH<{ loading: boolean }> => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export const onLocationChange = (location: RaschRouterLocation) => ({
  type: ON_LOCATION_CHANGE,
  payload: location,
});
