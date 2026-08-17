import { SET_REFETCHING_DATA } from '../../../shared/actions/route';

// Route action types
export const SET_STATUS_CODE = 'route/set-status-code';
export const SET_SCREEN_READY = 'route/set-screen-ready';
export const ON_LOCATION_CHANGE = 'route/on-router-location-change';
export const SET_LOADING = 'route/set-loading';

type RouteStateActionTypesGM =
  | typeof SET_REFETCHING_DATA
  | 'route/set-status-code'
  | 'route/set-screen-ready'
  | 'route/set-loading'
  | 'route/on-router-location-change';

export type RouteStateActionGM<T> = {
  type: RouteStateActionTypesGM;
  payload: T;
};

export const HOME = 'vertical/home-gm';
export const HOME_FR = 'vertical/home-gm-fr';
export const NEWS_FR = 'vertical/news-gm-fr';
export const RESTAURANTS = 'vertical/restaurants';
export const ZUERI_ISST = 'vertical/zueri-isst';
export const ATELIER_CAMINADA = 'vertical/atelier-caminada';
export const STARCHEFS = 'vertical/starchefs';
export const STARCHEFS_FR = 'vertical/les-chefs';
export const RECIPE = 'vertical/recipe';
export const VIDEOS = 'vertical/videos';
export const WINE_DRINKS = 'vertical/wine-and-drinks';
export const LIFE_STYLE = 'vertical/life-and-style';
export const LIFE_STYLE_FR = 'vertical/life-and-style-fr';
export const HOTEL_TIPP = 'vertical/hotel-tipp';
export const BOOKS = 'vertical/books';
export const HOT_TEN = 'vertical/hot-ten';
export const PARTNER = 'vertical/partner';
export const POP = 'vertical/pop';
export const OTHER_TOPICS = 'vertical/other-topics';
export const DEFAULT = 'vertical/default';
export const SEARCH = 'vertical/search';
export const FAMILY: string = DEFAULT;
export const MONEY: string = DEFAULT;
export const HABITATION: string = DEFAULT;
export const WORK: string = DEFAULT;
export const CONSUMPTION: string = DEFAULT;
export const CONSULTATION: string = DEFAULT;
export const HEALTH: string = DEFAULT;
export const HEALTH_ONMEDA: string = DEFAULT;

export const VERTICAL_TITLES = {
  [HOME]: 'Startseite',
  [HOME_FR]: 'Home',
  [SEARCH]: 'Suche',
  [RESTAURANTS]: 'Restaurants',
  [ZUERI_ISST]: 'Züri isst',
  [ATELIER_CAMINADA]: 'Atelier Caminada',
  [POP]: 'Pop',
  [STARCHEFS]: 'Starchefs',
  [STARCHEFS_FR]: 'Les chefs',
  [RECIPE]: 'Rezepte',
  [VIDEOS]: 'Videos',
  [WINE_DRINKS]: 'Wine & Drinks',
  [LIFE_STYLE]: 'Life & Style',
  [HOT_TEN]: 'Hot Ten',
  [BOOKS]: 'Bücher',
  [HOTEL_TIPP]: 'Hotel Tipp',
  [PARTNER]: 'Partner',
  [OTHER_TOPICS]: 'Weitere Themen',
  [NEWS_FR]: 'les-news',
  [DEFAULT]: '',
};

// create map url segment : constant
export const URL_SEGMENT_TO_VERTICAL_MAP = {
  restaurants: RESTAURANTS,
  'zueri-isst': ZUERI_ISST,
  'zuri-isst': ZUERI_ISST,
  'atelier-caminada': ATELIER_CAMINADA,
  starchefs: STARCHEFS,
  rezepte: RECIPE,
  videos: VIDEOS,
  'wine-and-drinks': WINE_DRINKS,
  'wine-drinks': WINE_DRINKS,
  'life-style': LIFE_STYLE,
  'life-and-style': LIFE_STYLE,
  'hot-ten': HOT_TEN,
  partner: PARTNER,
  suche: SEARCH,
  evader: LIFE_STYLE_FR,
  sevader: LIFE_STYLE_FR,
  'romandie-gourmande': ZUERI_ISST,
  'le-studio-des-chefs': ATELIER_CAMINADA,
  chefs: STARCHEFS_FR,
  recettes: RECIPE,
  bar: WINE_DRINKS,
  'les-bar': WINE_DRINKS,
  partenaires: PARTNER,
  pop: POP,
  news: NEWS_FR,
  'les-news': NEWS_FR,
  lesnews: NEWS_FR,
};

// // create map url segment for onmeda
export const URL_SEGMENT_TO_FULL_PATH = {
  '/life-and-style/hotel-tipp': HOTEL_TIPP,
  '/life-style/hotel-tipp': HOTEL_TIPP,
  '/life-and-style/buecher': BOOKS,
  '/life-style/hot-ten': HOT_TEN,
  '/life-and-style/bucher': BOOKS,
  '/life-style/buecher': BOOKS,
  '/life-style/bucher': BOOKS,
};

export const setScreenReady = (
  screenReady: boolean,
  tealiumData: TaeliumData,
  hasCustomTracking = false,
): RouteStateActionGM<Record<string, any>> => ({
  type: SET_SCREEN_READY,
  payload: {
    screenReady,
    ...tealiumData,
    hasCustomTracking,
  },
});

export const setLoading = (
  loading: boolean,
): RouteStateActionGM<{ loading: boolean }> => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export const onLocationChange = (
  location: RaschRouterLocation,
): RouteStateActionGM<RaschRouterLocation> => ({
  type: ON_LOCATION_CHANGE,
  payload: location,
});
