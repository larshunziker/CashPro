import { fbAppId } from '../../../../shared/helpers/metaData';
import {
  UTILITY_BAR_GOOGLE_NEWS_LABEL,
  UTILITY_BAR_SHARE_LABEL,
  UTILITY_BAR_SHARE_LABEL_FR,
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_GOOGLE_NEWS,
  UTILITY_TYPE_LINKEDIN,
  UTILITY_TYPE_MESSENGER,
  UTILITY_TYPE_PINTEREST,
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_WHATSAPP,
} from '../../../../../shared/constants/utilitybar';
import {
  SVG_ICONS_TYPE_GM_FACEBOOK,
  SVG_ICONS_TYPE_GM_GOOGLE_NEWS,
  SVG_ICONS_TYPE_GM_LINKEDIN,
  SVG_ICONS_TYPE_GM_MAIL,
  SVG_ICONS_TYPE_GM_MESSENGER,
  SVG_ICONS_TYPE_GM_PINTEREST,
  SVG_ICONS_TYPE_GM_SHARE,
  SVG_ICONS_TYPE_GM_TWITTER,
  SVG_ICONS_TYPE_GM_WHATSAPP,
} from '../../components/SVGIcon/constants';
import { SOCIAL_MEDIA_LINK_GOOGLE_NEWS } from '../../constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import { UtilityItemProps } from '../../../../../common/components/UtilityBar/typings';
export {
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_PINTEREST,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_WHATSAPP,
};

export const AVAILABLE_UTILITIES: Array<UtilityItemProps> = [
  {
    id: UTILITY_TYPE_WHATSAPP,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_WHATSAPP,
    targetType: '_blank',
    url: 'whatsapp://send?text=[field_short_title]:[field_title] | Gault&Millau | [url]',
    referrer: `utm_source=${UTILITY_TYPE_WHATSAPP.toLowerCase()}&utm_medium=social&utm_campaign=share-button`,
    addClass: grid.HiddenSmUp,
  },
  {
    id: UTILITY_TYPE_MESSENGER,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_MESSENGER,
    url: `https://www.facebook.com/dialog/send?app_id=${fbAppId}&link=[url]&redirect_uri=[url]`,
    referrer: `utm_source=messenger&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_PINTEREST,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_PINTEREST,
    url: 'https://www.pinterest.ch/pin/create/button/?description=[field_lead]&media=[field_og_image]&url=[url]',
    referrer: `utm_source=pinterest&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_FACEBOOK,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_FACEBOOK,
    url: 'https://www.facebook.com/sharer/sharer.php?u=[url]',
    referrer: `utm_source=facebook&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_SHARE,
    iconLabel: UTILITY_BAR_SHARE_LABEL,
    iconType: SVG_ICONS_TYPE_GM_SHARE,
    url: '',
  },
  {
    id: UTILITY_TYPE_TWITTER,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_TWITTER,
    url:
      'https://twitter.com/share?url=[url]' +
      '&text=[field_social_media_title]&via=GaultMillau',
    referrer: `utm_source=twitter&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_LINKEDIN,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_LINKEDIN,
    url: 'http://www.linkedin.com/shareArticle?url=[url]&title=[field_short_title]&summary=[field_lead]',
    referrer: `utm_source=linkedin&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_EMAIL,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_MAIL,
    referrer: `utm_source=mail&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
    url:
      'mailto:?subject=Empfohlener%20Artikel%20von%20gaultmillau.ch&body=Guten%20Tag%2C%0A%0AIhnen%20' +
      'wurde%20dieser%20Artikel%20von%20gaultmillau.ch%20empfohlen%3A%0A%0A[url] - [field_short_title]',
  },
  {
    id: UTILITY_TYPE_GOOGLE_NEWS,
    iconLabel: UTILITY_BAR_GOOGLE_NEWS_LABEL,
    iconType: SVG_ICONS_TYPE_GM_GOOGLE_NEWS,
    url: SOCIAL_MEDIA_LINK_GOOGLE_NEWS,
    targetType: '_blank',
  },
];

export const AVAILABLE_UTILITIES_FR: Array<UtilityItemProps> = [
  {
    id: UTILITY_TYPE_WHATSAPP,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_WHATSAPP,
    targetType: '_blank',
    url: 'whatsapp://send?text=[field_short_title]:[field_title] | Gault&Millau | [url]',
    referrer: `utm_source=${UTILITY_TYPE_WHATSAPP.toLowerCase()}&utm_medium=social&utm_campaign=share-button`,
    addClass: grid.HiddenSmUp,
  },
  {
    id: UTILITY_TYPE_MESSENGER,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_MESSENGER,
    url: `https://www.facebook.com/dialog/send?app_id=${fbAppId}&link=[url]&redirect_uri=[url]`,
    referrer: `utm_source=messenger&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_PINTEREST,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_PINTEREST,
    url: 'https://www.pinterest.ch/pin/create/button/?description=[field_lead]&media=[field_og_image]&url=[url]',
    referrer: `utm_source=pinterest&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_FACEBOOK,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_FACEBOOK,
    url: 'https://www.facebook.com/sharer/sharer.php?u=[url]',
    referrer: `utm_source=facebook&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_SHARE,
    iconLabel: UTILITY_BAR_SHARE_LABEL_FR,
    iconType: SVG_ICONS_TYPE_GM_SHARE,
    url: '',
  },
  {
    id: UTILITY_TYPE_TWITTER,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_TWITTER,
    url:
      'https://twitter.com/share?url=[url]' +
      '&text=[field_social_media_title]&via=GaultMillau',
    referrer: `utm_source=twitter&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_LINKEDIN,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_LINKEDIN,
    url: 'http://www.linkedin.com/shareArticle?url=[url]&title=[field_short_title]&summary=[field_lead]',
    referrer: `utm_source=linkedin&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
  },
  {
    id: UTILITY_TYPE_EMAIL,
    iconLabel: '',
    iconType: SVG_ICONS_TYPE_GM_MAIL,
    referrer: `utm_source=mail&utm_medium=social&utm_campaign=share-button`,
    targetType: '_blank',
    url: 'mailto:?subject=Article%20recommandé%20par%20gaultmillau.ch&body=Bonjour%2C%0A%0ACet%20article%20vous%20est%20recommandé%20par%20gaultmillau.ch%3A%0A%0A[url] - [field_short_title]',
  },
];

export const UTILITYBAR_OVERLAY_CONFIG = [
  UTILITY_TYPE_WHATSAPP,
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_PINTEREST,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_MESSENGER,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_LINKEDIN,
];

export const UTILITYBAR_CONFIG = [UTILITY_TYPE_SHARE];
