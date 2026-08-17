import { createContext } from 'react';
import { ROUTE_HOME_CASH } from '../../../shared/constants/publications';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch-stack/ */
import variables from './assets/styles/variables.legacy.css';

export const DEFAULT_PUBLICATION = 'CASH';
export const PUBLISHER = 'ringieraxelspringer.ch';
export const SITE_TITLE = 'Cash.ch';

export const SOCIAL_MEDIA_LINK_FACEBOOK =
  'https://www.facebook.com/cashFinanzportal';
export const SOCIAL_MEDIA_LINK_LINKEDIN =
  'https://www.linkedin.com/company/cash-ch/';
export const SOCIAL_MEDIA_LINK_TWITTER = 'https://twitter.com/cashch';
export const SOCIAL_MEDIA_LINK_XING =
  'https://www.xing.com/news/pages/cash-zweiplus-ag-268';
export const SOCIAL_MEDIA_LINK_INSTAGRAM =
  'https://www.instagram.com/cash.ch/?hl=de';
export const SOCIAL_MEDIA_LINK_YOUTUBE =
  'https://www.youtube.com/user/cashFinanzportal';
export const SOCIAL_MEDIA_LINK_GOOGLE_NEWS =
  'https://news.google.com/publications/CAAqBwgKMKOjlgswhsitAw?hl=de&gl=CH&ceid=CH%3Ade';
export const ROUTE_HOME = ROUTE_HOME_CASH;
export const ROUTE_HOME_HYBRID = 'hybrid-news/top-news';
export const ROUTE_451 = '451';
export const ROUTE_VIDEOS = 'videos';

// Fullquote Pages
export const FULLQUOTE_SEMI_STATIC_PREFIX = 'fullquote-';
export const FULLQUOTE_HYBRID_SEMI_STATIC_PREFIX = `hybrid-${FULLQUOTE_SEMI_STATIC_PREFIX}`;
export const CASH_MENU_PREFIX = `cash-menu-`;
export const ROUTE_STOCK_FULLQUOTE_PAGE_SHORT = 'aktien/:valorName';
export const ROUTE_STOCK_FULLQUOTE_PAGE = 'aktien/:valorName/:market/:currency';
export const ROUTE_INDICES_FULLQUOTE_PAGE =
  'indizes/:valorName/:market/:currency';
export const ROUTE_INTEREST_FULLQUOTE_PAGE =
  'devisen-zinsen/:valorName/:market/:currency';
export const ROUTE_RAW_MATERIALS_FULLQUOTE_PAGE =
  'rohstoffe-edelmetalle/:valorName/:market/:currency';
export const ROUTE_DERIVATIVES_FULLQUOTE_PAGE =
  'derivate/:valorName/:market/:currency';
export const ROUTE_DERIVATIVES_BNP_FULLQUOTE_PAGE =
  'derivate-bnp/:valorName/:market/:currency';
export const ROUTE_DERIVATIVES_FULLQUOTE_PAGE_SIMULATOR =
  'derivate/:valorName/:market/:currency/simulator';
export const ROUTE_OBLIGATIONS_FULLQUOTE_PAGE =
  'obligationen/:valorName/:market/:currency';
export const ROUTE_FONDS_FULLQUOTE_PAGE = 'fonds/:valorName/:market/:currency';
export const ROUTE_DIVERSE_FULLQUOTE_PAGE =
  'diverse/:valorName/:market/:currency';
export const ROUTE_CRYPTO_CURRENCIES_FULLQUOTE_PAGE =
  'kryptowaehrungen/:valorName/:market/:currency';
export const ROUTE_WIKIFOLIO_FULLQUOTE_PAGE =
  'wikifolio/:valorName/:market/:currency';
export const ROUTE_NEW_EMISSIONS_FULLQUOTE_PAGE =
  'neuemissionen/:valorName/:market/:currency';

export const ROUTE_LOGIN = 'login';
export const ROUTE_LOGOUT = 'logout';
export const ROUTE_QUOTELIST_PAGE = 'kurse/*';
export const ROUTE_PROFILE = 'profile';
export const ROUTE_ALERTS = `alerts`;
export const ROUTE_EMAIL_ALERTS = `${ROUTE_PROFILE}/alerts`;
export const ROUTE_BOOKMARKS = `${ROUTE_PROFILE}/merkliste`;
export const ROUTE_ABO_SERVICES = `service/abo-services`;
export const ROUTE_UNSUBSCRIBE_EMAIL_ALERTS = `${ROUTE_EMAIL_ALERTS}/unsubscribe/email`;
export const ROUTE_PORTFOLIOS = 'portfolios';
export const ROUTE_PORTFOLIOS_ORDER = `${ROUTE_PORTFOLIOS}/eigene-reihenfolge`;
export const ROUTE_PORTFOLIO = 'portfolio';
export const ROUTE_PORTFOLIO_TRANSACTION = `/${ROUTE_PORTFOLIO}/:portfolioKey/transaktionen`;
export const ROUTE_PORTFOLIO_CASH_ITEMS = `/${ROUTE_PORTFOLIO}/:portfolioKey/konto`;
export const ROUTE_PORTFOLIO_CUSTOM_VIEW = `/${ROUTE_PORTFOLIO}/:key/:type`;
export const ROUTE_PORTFOLIO_INSTRUMENT = `${ROUTE_PORTFOLIO_TRANSACTION}/:instrumentKey`;
export const ROUTE_SUBSCRIPTIONS = 'abonnements';
export const ROUTE_WATCHLIST = 'watchlist';
export const ROUTE_WATCHLIST_CUSTOM_VIEW = `/${ROUTE_WATCHLIST}/:key/:type`;
export const ROUTE_ONLINE_TRADING = '/online-trading';
export const ROUTE_FAQ = '/faq';
export const ROUTE_EBANKING_VIDEO_TUTORIALS = '/anlegen/services/ebanking';
export const ROUTE_CONTACT = '/ueberuns/kontakt';
export const ROUTE_DICTIONARY = 'lexikon';
export const ROUTE_DICTIONARY_LIST = 'lexikon/list';
export const DICTIONARY_TITLE = 'Boersenlexikon';
export const ROUTE_TRADING_IDEAS = 'trading-ideen';
export const ROUTE_BOERSE = 'boerse';
export const ROUTE_BOERSEN_ABOS = 'services/boersenabo';
export const ROUTE_SEARCH = 'suche/alle/:searchQuery';
export const ROUTE_SEARCH_SUB_CATEGORY = 'suche/:searchCategory/:searchQuery';
export const ROUTE_STYLEGUIDE = 'styleguide';
export const ROUTE_AUTHORS = 'unsere-redaktion';

export const EBANKING_LOGIN_LINK = 'https://cash.ebanking.bankzweiplus.ch/ ';

export const MODAL_ROOT_ID = 'modal-root';
export const CONFIRM_ALERT_ID = 'rasch-confirm-alert';
export const MAIN_CONTENT_ID = 'main';

export const GOOGLE_RECAPTCHA_KEY = '6LeN_eAUAAAAAFsN74e-nhSM93dr1vH_TYgZqjk6';

//TODO: these have been copy pasted from HZ!
// We should replace them with the correct credentials for CASH
export const BRIGHTCOVE_ACCOUNT_ID = '2112711546001';
export const BRIGHTCOVE_PLAYER_ID = 'Xor966oKe';
export const JWPLAYER_PLAYER_ID = 'iDdGXVhn';
export const JWPLAYER_SEO_PLAYER_ID = 'bJhMqInH';

export const SUBSCRIPTION_TYPE_BASIC = 'abo-basic';
export const SUBSCRIPTION_TYPE_ANLEGER = 'abo-ap';
export const SUBSCRIPTION_TYPE_PROFI = 'abo-pp';
export const SUBSCRIPTION_TYPE_REALTIME = 'abo-rq';
export const SUBSCRIPTION_TYPE_BANKING = 'abo-banking';

export const SuppressAdsContext = createContext({ isAdSuppressed: false });

// CHANNELS
export const CHANNEL_TYPE_NEUEMISSIONEN = 'Neuemissionen';

const MOBILE_MARGIN_TOP = parseInt(variables.headerMarginXs, 10);
const MEDIUM_MARGIN_TOP = parseInt(variables.headerMarginLg, 10);
const LARGE_MARGIN_TOP = parseInt(variables.headerMarginXl, 10);

export const MOBILE_ARTICLE_SCROLL_OFFSET =
  parseInt(variables.headerHeightXs, 10) + MOBILE_MARGIN_TOP;
export const MEDIUM_ARTICLE_SCROLL_OFFSET =
  parseInt(variables.headerHeightSm, 10) + MEDIUM_MARGIN_TOP;
export const LARGE_ARTICLE_SCROLL_OFFSET =
  parseInt(variables.headerHeightXl, 10) + LARGE_MARGIN_TOP;
export const MOBILE_MARKETING_LANDING_PAGE_SCROLL_OFFSET =
  parseInt(variables.headerHeightMarketingPageXs, 10) + MOBILE_MARGIN_TOP;
export const MEDIUM_MARKETING_LANDING_PAGE_SCROLL_OFFSET =
  parseInt(variables.headerHeightMarketingPageSm, 10) + MEDIUM_MARGIN_TOP;
export const LARGE_MARKETING_LANDING_PAGE_SCROLL_OFFSET =
  parseInt(variables.headerHeightMarketingPageMd, 10) + LARGE_MARGIN_TOP;

export const NON_SIX_MARKETS = ['75021', '9910014']; // TTMZERO, Cryptocampare
export const NON_VISIBLE_AUTHORS = ['awp', 'reuters', 'bloomberg'];
