import { ROUTE_HOME_HZ } from '../../../shared/constants/publications';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch-stack/ */
import variables from './assets/styles/variables.legacy.css';

export const MAIN_CONTENT_ID = 'main';
export const SITE_TITLE = 'Handelszeitung';
export const DEFAULT_PUBLICATION = 'HZ';

export const MODAL_ROOT_ID = 'modal-root';
export const SOCIAL_MEDIA_LINK_FACEBOOK =
  'https://www.facebook.com/handelszeitung';
export const SOCIAL_MEDIA_LINK_INSTAGRAM =
  'https://www.instagram.com/handelszeitung';
export const SOCIAL_MEDIA_LINK_LINKEDIN =
  'https://www.linkedin.com/company/handelszeitung';
export const SOCIAL_MEDIA_LINK_GOOGLE_NEWS =
  'https://news.google.com/publications/CAAqBwgKMMyalgswj7-tAw?hl=de&gl=CH&ceid=CH%3Ade';
export const SOCIAL_MEDIA_LINK_GOOGLE_NEWS_BIL =
  'https://news.google.com/publications/CAAqBwgKMIHQjAswyI3sAg?hl=de&gl=CH&ceid=CH%3Ade';
export const SOCIAL_MEDIA_LINK_TWITTER = 'https://twitter.com/Handelszeitung';
export const SOCIAL_MEDIA_LINK_XING =
  'https://www.xing.com/news/pages/handelszeitung-ch-1997?sc_o=da980_e'; // eslint-disable-line max-len
export const BRIGHTCOVE_ACCOUNT_ID = '2112711546001';
export const BRIGHTCOVE_PLAYER_ID = 'uPXZ2TfDG';

export const HZ_CHANNELS_VOCABULARY = 'channels_handelszeitung';
export const CHANNEL_TYPE_BLOGS = 'Blog';
export const CHANNEL_TYPE_VIDEOS = 'VideoBlog';
export const CHANNEL_TYPE_VIDEO_BLOG = 'video_blog';
export const OVERVIEW_VISIBLE_TYPE_BLOGS = 'Blogs';
export const OVERVIEW_VISIBLE_TYPE_VIDEOS = 'Videos';

export const ROUTE_HOME = ROUTE_HOME_HZ;
export const ROUTE_451 = '451';
export const ROUTE_VIDEOS = 'videos';
export const ROUTE_BRAND_REPORT = 'brandreport';
export const ROUTE_ACCOUNT = 'account';
export const ROUTE_PROFILE = 'profile';
export const ROUTE_ALERTS = `${ROUTE_PROFILE}/alerts`;
export const ROUTE_UNSUBSCRIBE_EMAIL_ALERTS = `${ROUTE_ALERTS}/unsubscribe/email`;
export const ROUTE_BOOKMARKS = `${ROUTE_PROFILE}/merkliste`;
export const ROUTE_BIL = 'https://www.bilanz.ch';
export const ROUTE_SWISS_INSURANCE = '/insurance';
export const ROUTE_HZB = '/banking';
export const ROUTE_SUBSCRIPTIONS =
  'https://shop.handelszeitung.ch/abo-angebote';
export const ROUTE_SUBSCRIPTIONS_BIL = `https://shop.bilanz.ch/abo-angebote`;
export const ROUTE_SUBSCRIPTIONS_SWISS_INSURANCE = `${ROUTE_SWISS_INSURANCE}/hz-insurance-premium`;
export const ROUTE_SUBSCRIPTIONS_HZB = `${ROUTE_SWISS_INSURANCE}/hz-banking-premium`;
export const ROUTE_SERVICE_DIGITAL_SUBSCRIPTION = '/service/hz-digital-abos';
export const ROUTE_EVENT_CALENDAR = 'veranstaltungskalender';
export const ROUTE_FINANCE_LEXICON = 'finanzlexikon';
export const ROUTE_FINANCE_LEXICON_LIST = 'finanzlexikon/list';
export const ROUTE_KEYWORDS = 'stichworte';
export const ROUTE_KEYWORDS_SEARCH = `${ROUTE_KEYWORDS}/:searchString`;
export const ROUTE_SEARCH = 'suche';
export const ROUTE_LOGOUT = 'logout';
export const ROUTE_STYLEGUIDE = 'styleguide';
export const ROUTE_STYLEGUIDE_PARAGRAPHS = 'styleguide/paragraphs';
export const ROUTE_STYLEGUIDE_TYPOGRAPHY = 'styleguide/typography/*';
export const ROUTE_STYLEGUIDE_BUTTONS = '/styleguide/buttons/*';
export const ROUTE_LATEST = 'latest';
export const ROUTE_AUTHORS = 'unsere-redaktion';

export const NEWSLETTER_TRACKING_PARAMS =
  '?promo_name=newsletterbutton&promo_position=header';

export const NEWSLETTER_URL_SV = '/insurance/hz-insurance-newsletter';
export const NEWSLETTER_URL_HZB = '/banking/hz-banking-newsletter';

export const NEWSLETTER_URL = '/newsletter';
export const SUBSCRIPTION_TRACKING_PARAMS =
  '?promo_name=abobutton&promo_position=header';

export const GOOGLE_RECAPTCHA_KEY = '6LeN_eAUAAAAAFsN74e-nhSM93dr1vH_TYgZqjk6';
export const ROUTES_WITH_CUSTOM_PIANO_TRACKING = [ROUTE_451];

export const ARTICLE_SCROLL_OFFSET = parseInt(variables.headerHeight, 10);

// GrowthBook constants
export const ABO_BADGE_REMOVAL_FEATURE = 'abo-badge-removal-hz';
