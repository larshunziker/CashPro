import { SET_REFETCHING_DATA } from '../../../shared/actions/route';

export const SET_SCREEN_READY = 'route/set-screen-ready';
export const ON_LOCATION_CHANGE = 'route/on-router-location-change';
export const SET_VERTICAL = 'route/set-vertical';
export const SET_LOADING = 'route/set-loading';

type RouteStateActionTypesBEO =
  | 'route/set-screen-ready'
  | 'route/on-router-location-change'
  | 'route/set-loading'
  | 'route/set-vertical'
  | typeof SET_REFETCHING_DATA;

export type RouteStateActionBEO<T> = {
  type: RouteStateActionTypesBEO;
  payload: T;
};

export const CONSULTATION = 'vertical/consultation';
export const CONSUMPTION = 'vertical/consumption';
export const COMMUNITY = 'vertical/community';
export const CROSSWORD = 'vertical/crossword';
export const DEFAULT = 'vertical/default';
export const EDUCATION = 'vertical/education';
export const ENVIRONMENT = 'vertical/environment';
export const FAMILY = 'vertical/family';
export const HABITATION = 'vertical/habitation';
export const HEALTH = 'vertical/health';
export const HEALTH_ONMEDA = 'vertical/health-onmeda';
export const HOME = 'vertical/home';
export const LEGAL_DICTIONARY = 'vertical/legal-dictionary';
export const MOBILITY = 'vertical/mobility';
export const MONEY = 'vertical/money';
export const NUTRITION = 'vertical/nutrition';
export const OTHER_TOPICS = 'vertical/other-topics';
export const SEARCH = 'vertical/search';
export const SOS_BEOBACHTER = 'vertical/sos-beobachter';
export const WORK = 'vertical/work';
export const DIGITAL = 'vertical/digital';
export const DEATH = 'vertical/death';
export const NEWSLETTER = 'vertical/newsletter';
export const PRIX_COURAGE = 'vertical/prix-courage';
export const SOCIETY = 'vertical/society';
export const ECONOMY = 'vertical/economy';
export const POLITICS = 'vertical/politics';
export const MARKETING_PAGE = 'vertical/marketing-page';
export const MARKETING_PAGE_DEFAULT_HEADER =
  'vertical/marketing-page-default-header';

export const VERTICAL_TITLES = {
  [CONSULTATION]: 'Beratung',
  [CONSUMPTION]: 'Konsum',
  [COMMUNITY]: 'Community',
  [CROSSWORD]: 'Kreuzworträtsel',
  [DEFAULT]: '',
  [EDUCATION]: 'Bildung',
  [ENVIRONMENT]: 'Umwelt',
  [FAMILY]: 'Familie',
  [HABITATION]: 'Wohnen',
  [LEGAL_DICTIONARY]: 'Rechtslexikon',
  [HEALTH]: 'Gesundheit',
  [HEALTH_ONMEDA]: 'Gesundheit',
  [HOME]: '',
  [MOBILITY]: 'Mobilität',
  [MONEY]: 'Geld',
  [NUTRITION]: 'Ernährung',
  [OTHER_TOPICS]: 'Weitere Themen',
  [SEARCH]: 'Suche',
  [SOS_BEOBACHTER]: 'SOS Beobachter',
  [WORK]: 'Arbeit',
  [DIGITAL]: 'Digital',
  [DEATH]: 'Todesfall',
  [NEWSLETTER]: 'Newsletter',
  [PRIX_COURAGE]: 'Prix-Courage',
  [SOCIETY]: 'Gesellschaft',
  [ECONOMY]: 'Wirtschaft',
  [POLITICS]: 'Politik',
};

// create map url segment : constant
export const URL_SEGMENT_TO_VERTICAL_MAP = {
  ahviv: OTHER_TOPICS,
  'administrativ-versorgte': OTHER_TOPICS,
  arbeit: WORK,
  'arbeit-bildung': WORK,
  arbeitgeber: WORK,
  auslaender: OTHER_TOPICS,
  beratung: CONSULTATION,
  bildung: EDUCATION,
  'buerger-verwaltung': OTHER_TOPICS,
  community: COMMUNITY,
  default: DEFAULT,
  ernahrung: NUTRITION,
  erwachsenenschutz: OTHER_TOPICS,
  familie: FAMILY,
  freizeit: OTHER_TOPICS,
  'ausfluge-freizeit': OTHER_TOPICS,
  geld: MONEY,
  'geld-sicherheit': MONEY,
  'gesetze-recht': OTHER_TOPICS,
  gesellschaft: SOCIETY,
  gesundheit: HEALTH,
  justiz: OTHER_TOPICS,
  'leben-gesundheit': HEALTH,
  'lehre-studium': OTHER_TOPICS,
  konsum: CONSUMPTION,
  konsumentenschutz: CONSUMPTION,
  kreuzwortraetsel: CROSSWORD,
  natur: OTHER_TOPICS,
  'natur-umwelt': OTHER_TOPICS,
  politik: POLITICS,
  rechtslexikon: LEGAL_DICTIONARY,
  rezepte: OTHER_TOPICS,
  schule: OTHER_TOPICS,
  'sos-beobachter': SOS_BEOBACHTER,
  suche: SEARCH,
  strassenverkehr: OTHER_TOPICS,
  umwelt: ENVIRONMENT,
  'weitere-themen': OTHER_TOPICS,
  weiterbildung: OTHER_TOPICS,
  wirtschaft: ECONOMY,
  wohnen: HABITATION,
  digital: DIGITAL,
  todesfall: DEATH,
  newsletter: NEWSLETTER,
  'prix-courage': PRIX_COURAGE,
  mobilitat: MOBILITY,
  mobilitaet: MOBILITY,
};

export const setScreenReady = (
  screenReady: boolean,
  tealiumData: TaeliumData,
  hasCustomTracking = false,
): RouteStateActionBEO<Record<string, any>> => ({
  type: SET_SCREEN_READY,
  payload: {
    screenReady,
    ...tealiumData,
    hasCustomTracking,
  },
});

export const onLocationChange = (
  location: RaschRouterLocation,
): RouteStateActionBEO<RaschRouterLocation> => ({
  type: ON_LOCATION_CHANGE,
  payload: location,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

// set vertical
export const setVertical = (
  vertical: string,
): RouteStateActionBEO<{ vertical: string }> => ({
  type: SET_VERTICAL,
  payload: {
    vertical,
  },
});
