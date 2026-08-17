// @ts-ignore
import { ReactComponent as FacebookIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/gm_facebook.svg';
// @ts-ignore
import { ReactComponent as LinkedInIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/gm_linkedin.svg';
// @ts-ignore
import { ReactComponent as MailIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/gm_mail.svg';
// @ts-ignore
import { ReactComponent as MessengerIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/gm_messenger.svg';
// @ts-ignore
import { ReactComponent as PinterestIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/gm_pinterest.svg';
// @ts-ignore
import { ReactComponent as ShareIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/gm_share.svg';
// @ts-ignore
import { ReactComponent as TwitterIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/gm_twitter.svg';
// @ts-ignore
import { ReactComponent as WhatsappIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/gm_whatsapp.svg';
// @ts-ignore
import { ReactComponent as GoogleNewsIconGM } from '../../../../../common/components/SVGIcon/assets/utilityBar/google-news.svg';
// @ts-ignore
import { ReactComponent as FacebookFooterIcon } from './assets/facebook-black.svg';
// @ts-ignore
import { ReactComponent as GoogleNewsIconFooter } from './assets/google-news-footer.svg';
// @ts-ignore
import { ReactComponent as InstagramFooterIcon } from './assets/instagram-black.svg';
// @ts-ignore
import { ReactComponent as LinkedinFooterIcon } from './assets/linkedin-black.svg';
// @ts-ignore
import { ReactComponent as PinterestFooterIcon } from './assets/pinterest_black.svg';
// @ts-ignore
import { ReactComponent as YoutubeFooterIcon } from './assets/youtube-black.svg';
import { SVG_ICONS_DEFAULT_CONFIG } from '../../../../../shared/constants/svgIcons';
// @ts-ignore

export const SVG_TYPE_FOOTER_FACEBOOK = 'svg-logo/type/footer-facebook';
export const SVG_TYPE_FOOTER_YOUTUBE = 'svg-logo/type/footer-youtube';
export const SVG_TYPE_FOOTER_INSTAGRAM = 'svg-logo/type/footer-instagram';
export const SVG_TYPE_FOOTER_LINKEDIN = 'svg-logo/type/footer-linkedin';
export const SVG_TYPE_FOOTER_PINTEREST = 'svg-logo/type/footer-pinterest';
export const SVG_TYPE_FOOTER_GOOGLE_NEWS = 'svg-icons/type/footer-google-news';
export const SVG_ICONS_TYPE_GM_SHARE = 'svg-icons/type/gm-share';
export const SVG_ICONS_TYPE_GM_MAIL = 'svg-icons/type/gm-mail';
export const SVG_ICONS_TYPE_GM_PINTEREST = 'svg-icons/type/gm-pinterest';
export const SVG_ICONS_TYPE_GM_MESSENGER = 'svg-icons/type/gm-messenger';
export const SVG_ICONS_TYPE_GM_FACEBOOK = 'svg-icons/type/gm-facebook';
export const SVG_ICONS_TYPE_GM_LINKEDIN = 'svg-icons/type/gm-linkedin';
export const SVG_ICONS_TYPE_GM_TWITTER = 'svg-icons/type/gm-twitter';
export const SVG_ICONS_TYPE_GM_WHATSAPP = 'svg-icons/type/gm-whatsapp';
export const SVG_ICONS_TYPE_GM_GOOGLE_NEWS = 'svg-icons/type/gm-google-news';

export const SVG_ICONS_CONFIG = {
  ...SVG_ICONS_DEFAULT_CONFIG,
  [SVG_TYPE_FOOTER_FACEBOOK]: FacebookFooterIcon,
  [SVG_TYPE_FOOTER_INSTAGRAM]: InstagramFooterIcon,
  [SVG_TYPE_FOOTER_YOUTUBE]: YoutubeFooterIcon,
  [SVG_TYPE_FOOTER_LINKEDIN]: LinkedinFooterIcon,
  [SVG_TYPE_FOOTER_PINTEREST]: PinterestFooterIcon,
  [SVG_TYPE_FOOTER_GOOGLE_NEWS]: GoogleNewsIconFooter,
  [SVG_ICONS_TYPE_GM_SHARE]: ShareIconGM,
  [SVG_ICONS_TYPE_GM_MAIL]: MailIconGM,
  [SVG_ICONS_TYPE_GM_PINTEREST]: PinterestIconGM,
  [SVG_ICONS_TYPE_GM_MESSENGER]: MessengerIconGM,
  [SVG_ICONS_TYPE_GM_FACEBOOK]: FacebookIconGM,
  [SVG_ICONS_TYPE_GM_LINKEDIN]: LinkedInIconGM,
  [SVG_ICONS_TYPE_GM_TWITTER]: TwitterIconGM,
  [SVG_ICONS_TYPE_GM_WHATSAPP]: WhatsappIconGM,
  [SVG_ICONS_TYPE_GM_GOOGLE_NEWS]: GoogleNewsIconGM,
};
