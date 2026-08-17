import { ROUTE_HOME_BEO } from '../../../shared/constants/publications';

export const MAIN_CONTENT_ID = 'main';
export const SITE_TITLE = 'Beobachter';
export const DEFAULT_PUBLICATION = 'BEO';
export const MODAL_ROOT_ID = 'modal-root';
export const ADMEIRA_IN_READ_VIDEO_WRAPPER_ID = 'admeira-inread-video-slot';
export const BRIGHTCOVE_ACCOUNT_ID = '2112711546001';
export const BRIGHTCOVE_PLAYER_ID = 'B1ew2V5JZ';
export const JWPLAYER_PLAYER_ID = 'v71Coyao';
export const JWPLAYER_SEO_PLAYER_ID = 'xhoEGaS8';

export const URL_BEOBACHTER_SHOP = 'https://shop.beobachter.ch';
export const URL_EPAPER_DESKTOP = '/link-to-epaper-app-or-store';
export const URL_EPAPER_ANDROID =
  'https://play.google.com/store/apps/details?id=com.axelspringer.beobachter&pcampaignid=web_share';
// TODO: Verify the exact App Store ID for the Beobachter E-paper iOS app
export const URL_EPAPER_IOS =
  'https://apps.apple.com/ch/app/beobachter-e-paper/id6444520371';

export const CHANNEL_TYPE_VIDEO_BLOG = 'video_blog';

export const SOCIAL_MEDIA_LINK_FACEBOOK =
  'https://www.facebook.com/beobachtermagazin';
export const SOCIAL_MEDIA_LINK_INSTAGRAM =
  'https://www.instagram.com/beobachtermagazin/';
export const SOCIAL_MEDIA_LINK_LINKEDIN =
  'https://www.linkedin.com/company/beobachtermagazin';
export const SOCIAL_MEDIA_LINK_TWITTER = 'https://twitter.com/BeobachterRat';
export const SOCIAL_MEDIA_LINK_TIKTOK =
  'https://www.tiktok.com/@beobachtermagazin';
export const SOCIAL_MEDIA_LINK_GOOGLE_NEWS =
  'https://news.google.com/publications/CAAqBwgKMI-VlgswormtAw?hl=de&gl=CH&ceid=CH%3Ade';

export const ROUTE_LOGOUT = 'logout';
export const ROUTE_VIDEOS = 'videos';
export const ROUTE_HOME = ROUTE_HOME_BEO;
export const ROUTE_BRAND_REPORT = 'brandreport';
export const ROUTE_ACCOUNT = 'account';
export const ROUTE_PROFILE = 'profile';
export const ROUTE_LEGAL_ADVICE_PARENT = 'beratung';
export const ROUTE_LEGAL_ADVICE = `${ROUTE_LEGAL_ADVICE_PARENT}/rechtsratgeber`;
export const ROUTE_ALERTS = 'profile/alerts';
export const ROUTE_UNSUBSCRIBE_EMAIL_ALERTS = `${ROUTE_ALERTS}/unsubscribe/email`;
export const ROUTE_UNSUBSCRIBE_EMAIL_ALERTS_ONESIGNAL = `${ROUTE_UNSUBSCRIBE_EMAIL_ALERTS}/:oneSignalExternalId`;
export const ROUTE_SUBSCRIPTIONS = 'abonnements';
export const ROUTE_NEWSLETTER =
  'https://shop.beobachter.ch/buecher?promo_name=buchshop-button&promo_position=header';
export const ROUTE_NEWSLETTER_PAGE = 'newsletter';
export const ROUTE_BOOKMARKS = 'profile/merkliste';
export const ROUTE_ONMEDA = 'gesundheit/:category/list';
export const ROUTE_ONMEDA_CHAR = `${ROUTE_ONMEDA}/:char`;
export const ROUTE_LEGAL_DICTIONARY = 'rechtslexikon/list';
export const ROUTE_LEGAL_DICTIONARY_CHAR = `${ROUTE_LEGAL_DICTIONARY}/:char`;
export const ROUTE_SEARCH = 'suche/:query';
export const ROUTE_FILTER_SEARCH = '/suche/:filter/:query';
export const ROUTE_KEYWORDS = 'stichworte/list';
export const ROUTE_KEYWORDS_SEARCH = `${ROUTE_KEYWORDS}/:searchString`;
export const ROUTE_451 = '451';
export const ROUTE_STYLEGUIDE = 'styleguide';
export const ROUTE_STYLEGUIDE_PARAGRAPHS = 'styleguide/paragraphs';
export const ROUTE_STYLEGUIDE_TYPOGRAPHY = 'styleguide/typography/*';
export const ROUTE_AUTHORS = 'unsere-redaktion';
export const ROUTE_LATEST = 'latest';
export const ROUTE_LAWYERS = 'anwaltsnetz/suche';

export const GOOGLE_RECAPTCHA_KEY = '6LeD_eAUAAAAAOHmZGoWdcVUGiq8qE-xsgxO4KpT';

export const ROUTES_WITH_CUSTOM_PIANO_TRACKING = [ROUTE_451];

export const AIAICHAT_KEY = process.env.__AIAICHAT_KEY__;

export const AIAICHAT_TRIGGER_ID_UNREGISTERED =
  '878f1e49-0cc4-43d3-942b-77c12377d34b';
export const AIAICHAT_TRIGGER_ID_REGISTERED =
  'fa6d7e82-4f59-46d3-bb23-997dd3ef6d22';
export const AIAICHAT_TRIGGER_ID_MEMBER =
  '60fb7d16-34bd-43f0-b78c-d6429d49dbc6';

export const NEWSLETTER_LOGIN_IFRAME = process.env.__NEWSLETTER_LOGIN_IFRAME__;
export const NEWSLETTER_LOGOUT_IFRAME =
  process.env.__NEWSLETTER_LOGOUT_IFRAME__;

export const CHATBOT_SCHLAF_ROUTES = [
  'chatbot-prototyp-schlaf',
  'chatbot-schlaf',
  'praeventionsbot-prototyp',
  'chatbot-praevention',
];

export const AIAICHAT_KEY_SCHLAF = '0931fe8b-fe2b-465a-b145-98516d0fe3a3';
export const AIAICHAT_TRIGGER_ID_ABOT = '9a656725-c8a6-4be1-b63c-1fb9899eccb9';
