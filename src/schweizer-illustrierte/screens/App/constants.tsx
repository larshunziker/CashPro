import { ROUTE_HOME_SI } from '../../../shared/constants/publications';
import { ActiveMainChannel } from './../../shared/types';

export const SOCIAL_MEDIA_LINK_GOOGLE_NEWS =
  'https://news.google.com/publications/CAAqBwgKMMbSoAkwisNw?hl=de&gl=CH&ceid=CH%3Ade';

export const DEFAULT_PUBLICATION = 'SI';
export const PUBLISHER = 'schweizer-illustrierte.ch';
export const SITE_TITLE = 'Schweizer Illustrierte';
export const ADVERTORIAL = 'Publireportage';
export const ROUTE_HOME = ROUTE_HOME_SI;
export const ROUTE_SI_BLOGS = 'blogs-si';
export const ROUTE_HOROSCOPE = 'horoskop';
export const ROUTE_LATEST = 'latest';
export const ROUTE_VIDEOS = 'videos';
export const ROUTE_BLOGS = 'blogs';
export const ROUTE_PEOPLE = 'people';
export const ROUTE_ENTERTAINMENT = 'entertainment';
export const ROUTE_STYLE = 'style';
export const ROUTE_FAMILY = 'family';
export const ROUTE_BODY_HEALTH = 'body-health';
export const ROUTE_ALERTS = 'profile/alerts';
export const ROUTE_ACCOUNT = 'account';
export const ROUTE_SEARCH = 'suche/:searchQuery';
export const ROUTE_UNSUBSCRIBE_EMAIL_ALERTS = `${ROUTE_ALERTS}/unsubscribe/email`;
export const ROUTE_BOOKMARKS = 'profile/merkliste';
export const ROUTE_LOGOUT = 'logout';
export const ROUTE_451 = '451';
export const ROUTE_PUZZLES = 'raetselecke';
export const ROUTE_PUZZLES_PLAY = 'raetselecke/play';
export const ROUTE_STYLEGUIDE = 'styleguide';
export const ROUTE_AUTHORS = 'unsere-redaktion';

export const ROUTES_WITH_CUSTOM_PIANO_TRACKING = [ROUTE_451];
export const SI_CHANNELS_VOCABULARY = 'channels_schweizer_illustrierte';
export const CHANNEL_TYPE_BLOGS = 'Blog';
export const CHANNEL_TYPE_VIDEOS = 'VideoBlog';
export const OVERVIEW_VISIBLE_TYPE_BLOGS: ActiveMainChannel = 'Blogs';
export const OVERVIEW_VISIBLE_TYPE_VIDEOS = 'Videos';

export const MODAL_ROOT_ID = 'modal-root';

export const MAIN_CHANNEL_DEFAULT: ActiveMainChannel = 'Default';
export const MAIN_CHANNEL_HOME: ActiveMainChannel = 'Home';
export const MAIN_CHANNEL_PEOPLE: ActiveMainChannel = 'People';
export const MAIN_CHANNEL_ENTERTAINMENT: ActiveMainChannel = 'Entertainment';
export const MAIN_CHANNEL_STYLE: ActiveMainChannel = 'Style';
export const MAIN_CHANNEL_FAMILY: ActiveMainChannel = 'Family';
export const MAIN_CHANNEL_BODY_HEALTH: ActiveMainChannel = 'Body & Health';
export const MAIN_CHANNEL_SPECIALS: ActiveMainChannel = 'Specials';
export const MAIN_CHANNEL_BLOGS: ActiveMainChannel =
  OVERVIEW_VISIBLE_TYPE_BLOGS;

export const THEME_DEFAULT = 'SI';
export const THEME_SY = 'SY';

export const BRIGHTCOVE_ACCOUNT_ID = '2112711546001';
export const BRIGHTCOVE_PLAYER_ID = 'aM4DpruyD';

export const GOOGLE_RECAPTCHA_KEY = '6LfE_eAUAAAAACBwz58i-wKLXgRRT0r8cuesIhFS';

export const SUBSCRIPTION_TYPE_PUZZLES = 'XRB!mvz*nxb*zxa6pzn';
export const SUBSCRIPTION_TYPE_PUZZLES_PRINT = 'qFODrs5FBz';
export const API_ENDPOINT_PUZZLES = 'https://raetselfabrik.de/api/integration/';
export const API_SECRET_PUZZLES = 'xMLmqCMKhS';
