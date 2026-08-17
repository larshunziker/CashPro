import { WIDGET_PARAGRAPH } from './paragraphs';

export const APP_NEXUS_CLASS_PREFIX = 'apn-ad-slot-';

// platform
export const ADMEIRA_PLATFORM_DESKTOP = 'Desktop';
export const ADMEIRA_PLATFORM_MOBILE = 'MobileWeb';

// admeira viewport changes
export const ADMEIRA_VIEWPORTS: Array<any> = [
  {
    label: ADMEIRA_PLATFORM_MOBILE,
    from: 0,
    to: 759,
  },
  {
    label: ADMEIRA_PLATFORM_DESKTOP,
    from: 760,
    to: 99999,
  },
];

/**
 * slot types
 *
 * https://adm-doc.s3.eu-central-1.amazonaws.com/doc/docs/tagman-placement-types.html
 */

// New Ad Naming
export const TOP_AD = 'top_ad';
export const RIGHT_AD = 'right_ad';
export const SIDE_RIGHT_AD = 'side-right_ad';
export const DETAILS_AD = 'details_ad';
export const BOTTOM_AD = 'bottom_ad';
export const INDEX_AD = 'index_ad';

// Desktop
export const WB = 'WB'; // Wideboard
export const LB = 'LB'; // Leaderboard
export const MR = 'MR'; // Medium Rectangle
export const SKY = 'SKY'; // Skyscraper
export const SBA = 'SBA'; // Sitebar Ad
export const PA = 'PA'; // Poster Ad
export const RECOM = 'RECOM'; // Recommendation Box
export const ECB = 'ECB'; // E-Commerce Box
export const TE = 'TE'; // Teaser
export const GTE = 'GTE'; // Grand Teaser

// MOBILE
export const MWB = 'MWB'; // Mobile Wideboard
export const MMR = 'MMR'; // Mobile Medium Rectangle
export const MBA = 'MBA'; // Mobile Banner	Mobile
export const MTE = 'MTE'; // Mobile Teaser	Mobile
export const MPA = 'MPA'; // Mobile Poster Ad
export const MHPA = 'MHPA'; // Mobile Halfpage Ad

// Mobile & Desktop
export const IAV = 'IAV'; // InArticle Video
export const MIAV = 'MIAV'; // InArticle Video
// export const PREROLL = 'PREROLL'; // PreRoll
export const PREROLL = 'preroll'; // PreRoll

// AD-FREE
export const AD_FREE_SUBSCRIPTION_KEY = 'ikjuzglkjfroef';

export const PARAGRAPHS_AD_TYPE_INREAD = 'paragraphs/ad-type-inread';
export const PARAGRAPHS_AD_TYPE_DEFAULT_1 = 'paragraphs/ad-type-default-1';
export const PARAGRAPHS_AD_TYPE_DEFAULT_2 = 'paragraphs/ad-type-default-2';
export const PARAGRAPHS_AD_TYPE_MOBILE_HEADER =
  'paragraphs/ad-type-mobile-default-header';
export const RENDER_AD_TYPE_AD = 'paragraph-render-type/ad';
export const RENDER_AD_TYPE_RECOS = 'paragraph-render-type/recommendations';
export const FALLBACK_PARAGRAPH_COUNT = 'paragraph-render-type/fallback-count';

// default character count for non text paragraphs
export const PARAGRAPH_CHARACTER_COUNTS = {
  mobile: {
    [WIDGET_PARAGRAPH]: 0,
    [FALLBACK_PARAGRAPH_COUNT]: 100,
  },
  tabletDesktop: {
    [WIDGET_PARAGRAPH]: 0,
    [FALLBACK_PARAGRAPH_COUNT]: 100,
  },
};

// character count definition
// example: [IAV, Recos, WB_2, WB_3] (last item is for the repetition)
export const CHARACTER_COUNTS = {
  mobile: [400, 400, 800, 1200],
  tabletDesktop: [400, 400, 800, 1600],
};
