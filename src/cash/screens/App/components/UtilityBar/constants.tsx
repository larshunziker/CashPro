import {
  SVG_ICONS_TYPE_BOOKMARK_ACTIVE,
  SVG_ICONS_TYPE_BOOKMARK_INACTIVE,
  SVG_ICONS_TYPE_CALCULATOR,
  SVG_ICONS_TYPE_COMMENT,
  SVG_ICONS_TYPE_CONTACT,
  SVG_ICONS_TYPE_DOWNLOAD,
  SVG_ICONS_TYPE_FACEBOOK,
  SVG_ICONS_TYPE_INFO,
  SVG_ICONS_TYPE_LINKEDIN,
  SVG_ICONS_TYPE_MAIL,
  SVG_ICONS_TYPE_PRINT,
  SVG_ICONS_TYPE_SHARE,
  SVG_ICONS_TYPE_TWITTER,
  SVG_ICONS_TYPE_WHATSAPP,
  SVG_ICONS_TYPE_XING,
} from '../../../../../shared/constants/svgIcons';
import {
  UTILITY_BAR_BOOKMARKS_ACTIVE_LABEL,
  UTILITY_BAR_BOOKMARKS_INACTIVE_LABEL,
  UTILITY_BAR_CALCULATOR_LABEL,
  UTILITY_BAR_COMMENTS_LABEL,
  UTILITY_BAR_CONTACT_LABEL,
  UTILITY_BAR_DOWNLOAD_LABEL,
  UTILITY_BAR_EMAIL_LABEL,
  UTILITY_BAR_FACEBOOK_LABEL,
  UTILITY_BAR_INFO_LABEL,
  UTILITY_BAR_LINKEDIN_LABEL,
  UTILITY_BAR_MESSENGER_LABEL,
  UTILITY_BAR_PINTEREST_LABEL,
  UTILITY_BAR_PRINT_LABEL,
  UTILITY_BAR_SHARE_LABEL,
  UTILITY_BAR_TWITTER_LABEL,
  UTILITY_BAR_WHATSAPP_LABEL,
  UTILITY_BAR_XING_LABEL,
  UTILITY_TYPE_BOOKMARKS,
  UTILITY_TYPE_CALCULATOR,
  UTILITY_TYPE_COMMENTS,
  UTILITY_TYPE_CONTACT,
  UTILITY_TYPE_DOWNLOAD,
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_INFO,
  UTILITY_TYPE_LINKEDIN,
  UTILITY_TYPE_PRINT,
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_WHATSAPP,
  UTILITY_TYPE_XING,
} from '../../../../../shared/constants/utilitybar';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import { UtilityItemProps } from '../../../../../common/components/UtilityBar/typings';

export {
  UTILITY_TYPE_WHATSAPP,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_PRINT,
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_COMMENTS,
  UTILITY_TYPE_LINKEDIN,
  UTILITY_TYPE_XING,
  UTILITY_TYPE_BOOKMARKS,
  UTILITY_BAR_WHATSAPP_LABEL,
  UTILITY_BAR_FACEBOOK_LABEL,
  UTILITY_BAR_MESSENGER_LABEL,
  UTILITY_BAR_LINKEDIN_LABEL,
  UTILITY_BAR_XING_LABEL,
  UTILITY_BAR_PINTEREST_LABEL,
  UTILITY_BAR_TWITTER_LABEL,
  UTILITY_BAR_EMAIL_LABEL,
  UTILITY_BAR_PRINT_LABEL,
  UTILITY_BAR_SHARE_LABEL,
  UTILITY_BAR_COMMENTS_LABEL,
  UTILITY_BAR_BOOKMARKS_INACTIVE_LABEL,
  UTILITY_BAR_BOOKMARKS_ACTIVE_LABEL,
};

export const AVAILABLE_UTILITIES: Array<UtilityItemProps> = [
  {
    id: UTILITY_TYPE_WHATSAPP,
    iconLabel: UTILITY_BAR_WHATSAPP_LABEL,
    iconType: SVG_ICONS_TYPE_WHATSAPP,
    url: 'whatsapp://send?text=Cash - [field_short_title] [field_lead]: [url]',
    referrer: `utm_source=whatsapp&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_FACEBOOK,
    iconLabel: UTILITY_BAR_FACEBOOK_LABEL,
    iconType: SVG_ICONS_TYPE_FACEBOOK,
    url: 'https://www.facebook.com/sharer/sharer.php?u=[url]',
    referrer: `utm_source=facebook&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_TWITTER,
    iconLabel: UTILITY_BAR_TWITTER_LABEL,
    iconType: SVG_ICONS_TYPE_TWITTER,
    url:
      'https://twitter.com/share?url=[url]' +
      '&text=[field_social_media_title]&via=cash',
    referrer: `utm_source=twitter&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_XING,
    iconLabel: UTILITY_BAR_XING_LABEL,
    iconType: SVG_ICONS_TYPE_XING,
    url: 'https://www.xing.com/spi/shares/new?url=[url]',
    referrer: `utm_source=xing&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_LINKEDIN,
    iconLabel: UTILITY_BAR_LINKEDIN_LABEL,
    iconType: SVG_ICONS_TYPE_LINKEDIN,
    url: 'https://www.linkedin.com/shareArticle?url=[url]',
    referrer: `utm_source=linkedin&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_EMAIL,
    iconLabel: UTILITY_BAR_EMAIL_LABEL,
    iconType: SVG_ICONS_TYPE_MAIL,
    referrer: `utm_source=mail&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
    url:
      'mailto:?subject=Empfohlener%20Artikel%20von%20cash.ch&body=Guten%20Tag%2C%0A%0AIhnen%20' +
      'wurde%20dieser%20Artikel%20von%20cash.ch%20empfohlen%3A%0A%0A[url] - [field_short_title]',
  },
  {
    id: UTILITY_TYPE_PRINT,
    iconLabel: UTILITY_BAR_PRINT_LABEL,
    iconType: SVG_ICONS_TYPE_PRINT,
    url: '',
    targetType: '_blank',
    onClick: () => print(),
    addClass: grid.HiddenSmDown,
  },
  {
    id: UTILITY_TYPE_SHARE,
    iconLabel: UTILITY_BAR_SHARE_LABEL,
    iconType: SVG_ICONS_TYPE_SHARE,
    url: '',
  },
  {
    id: UTILITY_TYPE_COMMENTS,
    iconLabel: UTILITY_BAR_COMMENTS_LABEL,
    iconType: SVG_ICONS_TYPE_COMMENT,
    url: '#comments',
  },
  /*
   * UtilityBookmarkLink component which works when id === UTILITY_TYPE_BOOKMARKS doesn't use url,
   * and the UtilityLink doesn't use iconInactiveLabel and iconInactiveType.
   * It should be refactored while adding component support to UtilityBar
   */
  {
    id: UTILITY_TYPE_BOOKMARKS,
    iconLabel: UTILITY_BAR_BOOKMARKS_ACTIVE_LABEL,
    iconInactiveLabel: UTILITY_BAR_BOOKMARKS_INACTIVE_LABEL,
    iconType: SVG_ICONS_TYPE_BOOKMARK_ACTIVE,
    iconInactiveType: SVG_ICONS_TYPE_BOOKMARK_INACTIVE,
    url: '',
    targetType: '_blank',
  },
  // only available on the "Investment" channel
  {
    id: UTILITY_TYPE_CONTACT,
    iconLabel: UTILITY_BAR_CONTACT_LABEL,
    iconType: SVG_ICONS_TYPE_CONTACT,
    toggleCustomOverlay: true,
    url: '',
  },
  // only available on the "Investment" channel
  {
    id: UTILITY_TYPE_CALCULATOR,
    iconLabel: UTILITY_BAR_CALCULATOR_LABEL,
    iconType: SVG_ICONS_TYPE_CALCULATOR,
    toggleCustomOverlay: true,
    url: '',
  },
  // only available on the "Investment" channel
  {
    id: UTILITY_TYPE_DOWNLOAD,
    iconLabel: UTILITY_BAR_DOWNLOAD_LABEL,
    iconType: SVG_ICONS_TYPE_DOWNLOAD,
    toggleCustomOverlay: true,
    url: '',
  },
  // only available on the "Investment" channel
  {
    id: UTILITY_TYPE_INFO,
    iconLabel: UTILITY_BAR_INFO_LABEL,
    iconType: SVG_ICONS_TYPE_INFO,
    url: '/anlegen/faq',
  },
];

// For now the configuration on HZ is the same on all screens where the utility bar is used.
export const UTILITYBAR_OVERLAY_CONFIG = [
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_WHATSAPP,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_LINKEDIN,
  UTILITY_TYPE_XING,
];

export const UTILITYBAR_CONFIG = [
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_BOOKMARKS,
  UTILITY_TYPE_PRINT,
  UTILITY_TYPE_COMMENTS,
];

export const UTILITYBAR_INVESTMENT_CONFIG = [
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_CONTACT,
  UTILITY_TYPE_CALCULATOR,
  UTILITY_TYPE_DOWNLOAD,
  UTILITY_TYPE_INFO,
];
