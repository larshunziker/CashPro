import { fbAppId } from '../../../../shared/helpers/metaData';
import CommentLink from './components/UtilityLink/components/CommentLink';
import { COMMENTS_ANCHOR_ID } from '../../../../../shared/constants/comments';
import {
  SVG_ICONS_TYPE_BOOKMARK_ACTIVE,
  SVG_ICONS_TYPE_BOOKMARK_INACTIVE,
  SVG_ICONS_TYPE_COMMENT,
  SVG_ICONS_TYPE_FACEBOOK,
  SVG_ICONS_TYPE_GOOGLE_NEWS,
  SVG_ICONS_TYPE_MAIL,
  SVG_ICONS_TYPE_MESSENGER,
  SVG_ICONS_TYPE_PINTEREST,
  SVG_ICONS_TYPE_SHARE,
  SVG_ICONS_TYPE_TWITTER,
  SVG_ICONS_TYPE_WHATSAPP,
} from '../../../../../shared/constants/svgIcons';
import {
  UTILITY_BAR_BOOKMARKS_ACTIVE_LABEL,
  UTILITY_BAR_BOOKMARKS_INACTIVE_LABEL,
  UTILITY_BAR_COMMENTS_LABEL,
  UTILITY_BAR_EMAIL_LABEL,
  UTILITY_BAR_FACEBOOK_LABEL,
  UTILITY_BAR_GOOGLE_NEWS_LABEL,
  UTILITY_BAR_MESSENGER_LABEL,
  UTILITY_BAR_PINTEREST_LABEL,
  UTILITY_BAR_SHARE_LABEL,
  UTILITY_BAR_TWITTER_LABEL,
  UTILITY_BAR_WHATSAPP_LABEL,
  UTILITY_TYPE_BOOKMARKS,
  UTILITY_TYPE_COMMENTS,
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_GOOGLE_NEWS,
  UTILITY_TYPE_MESSENGER,
  UTILITY_TYPE_PINTEREST,
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_WHATSAPP,
  UTILITY_TYPE_WHATSAPP_DESKTOP,
} from '../../../../../shared/constants/utilitybar';
import { SOCIAL_MEDIA_LINK_GOOGLE_NEWS } from '../../constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import { UtilityItemProps } from '../../../../../common/components/UtilityBar/typings';

export {
  UTILITY_TYPE_WHATSAPP,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_COMMENTS,
  UTILITY_TYPE_MESSENGER,
  UTILITY_TYPE_PINTEREST,
  UTILITY_TYPE_BOOKMARKS,
  UTILITY_BAR_WHATSAPP_LABEL,
  UTILITY_BAR_FACEBOOK_LABEL,
  UTILITY_BAR_MESSENGER_LABEL,
  UTILITY_BAR_PINTEREST_LABEL,
  UTILITY_BAR_TWITTER_LABEL,
  UTILITY_BAR_EMAIL_LABEL,
  UTILITY_BAR_SHARE_LABEL,
  UTILITY_BAR_COMMENTS_LABEL,
  UTILITY_BAR_BOOKMARKS_INACTIVE_LABEL,
  UTILITY_BAR_BOOKMARKS_ACTIVE_LABEL,
  UTILITY_TYPE_GOOGLE_NEWS,
  UTILITY_BAR_GOOGLE_NEWS_LABEL,
};

export const AVAILABLE_UTILITIES: Array<UtilityItemProps> = [
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
    url: `#${COMMENTS_ANCHOR_ID}`,
    OverwriteUtilityLink: CommentLink,
  },
  {
    id: UTILITY_TYPE_WHATSAPP,
    iconLabel: UTILITY_BAR_WHATSAPP_LABEL,
    iconType: SVG_ICONS_TYPE_WHATSAPP,
    targetType: '_blank',
    url: 'whatsapp://send?text=[field_title]: [url]',
    referrer: `utm_source=whatsapp&utm_medium=social&utm_campaign=share-button`,
    addClass: grid.HiddenSmUp,
  },
  {
    id: UTILITY_TYPE_WHATSAPP_DESKTOP,
    iconLabel: UTILITY_BAR_WHATSAPP_LABEL,
    iconType: SVG_ICONS_TYPE_WHATSAPP,
    targetType: '_blank',
    url: 'https://api.whatsapp.com/send?text=[field_title]: [url]',
    referrer: `utm_source=whatsapp&utm_medium=social&utm_campaign=share-button`,
    addClass: grid.HiddenSmDown,
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
    url: 'https://twitter.com/share?url=[url]&text=[field_title]&via=[twitter]',
    referrer: `utm_source=twitter&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_EMAIL,
    iconLabel: UTILITY_BAR_EMAIL_LABEL,
    iconType: SVG_ICONS_TYPE_MAIL,
    url:
      'mailto:?subject=Empfohlener%20Artikel%20von%20schweizer-illustrierte.ch&body=Guten%20Tag%2C%0A%0AIhnen%20' +
      'wurde%20dieser%20Artikel%20von%20schweizer-illustrierte.ch%20empfohlen%3A%0A%0A[url] - [field_title]',
    referrer: `utm_source=mail&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_MESSENGER,
    iconLabel: UTILITY_BAR_MESSENGER_LABEL,
    iconType: SVG_ICONS_TYPE_MESSENGER,
    url: `https://www.facebook.com/dialog/send?app_id=${fbAppId}&link=[url]&redirect_uri=[url]`,
    referrer: `utm_source=messenger&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_PINTEREST,
    iconLabel: UTILITY_BAR_PINTEREST_LABEL,
    iconType: SVG_ICONS_TYPE_PINTEREST,
    url: 'https://www.pinterest.ch/pin/create/button/?description=[field_lead]&media=[field_og_image]&url=[url]',
    referrer: `utm_source=pinterest&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
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
  {
    id: UTILITY_TYPE_GOOGLE_NEWS,
    iconLabel: UTILITY_BAR_GOOGLE_NEWS_LABEL,
    iconType: SVG_ICONS_TYPE_GOOGLE_NEWS,
    url: SOCIAL_MEDIA_LINK_GOOGLE_NEWS,
    targetType: '_blank',
  },
];
