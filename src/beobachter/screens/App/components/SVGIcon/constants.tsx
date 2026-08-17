// @ts-ignore
import { ReactComponent as StatusPageBEO404 } from '../../../../../common/components/SVGIcon/assets/statusPage/beo_404.svg';
// @ts-ignore
import { ReactComponent as StatusPageBEO451 } from '../../../../../common/components/SVGIcon/assets/statusPage/beo_451.svg';
// @ts-ignore
import { ReactComponent as StatusPageBEO500 } from '../../../../../common/components/SVGIcon/assets/statusPage/beo_500.svg';
// @ts-ignore
import { ReactComponent as BottomBarHomeIcon } from './assets/bottom-bar/home.svg';
// @ts-ignore
import { ReactComponent as BottomBarBeratungIcon } from './assets/bottom-bar/beratung.svg';
// @ts-ignore
import { ReactComponent as BottomBarChatbotIcon } from './assets/bottom-bar/chatbot.svg';
// @ts-ignore
import { ReactComponent as BottomBarToolsIcon } from './assets/bottom-bar/tools.svg';
// @ts-ignore
import { ReactComponent as BottomBarProfileIcon } from './assets/bottom-bar/profile.svg';
import { SVG_ICONS_DEFAULT_CONFIG } from '../../../../../shared/constants/svgIcons';

export const SVG_ICONS_TYPE_BEO_404 = 'svg-icons/type/beo-404';
export const SVG_ICONS_TYPE_BEO_451 = 'svg-icons/type/beo-451';
export const SVG_ICONS_TYPE_BEO_500 = 'svg-icons/type/beo-500';
export const SVG_ICONS_TYPE_BOTTOM_BAR_HOME = 'svg-icons/type/bottom-bar-home';
export const SVG_ICONS_TYPE_BOTTOM_BAR_BERATUNG =
  'svg-icons/type/bottom-bar-beratung';
export const SVG_ICONS_TYPE_BOTTOM_BAR_CHATBOT =
  'svg-icons/type/bottom-bar-chatbot';
export const SVG_ICONS_TYPE_BOTTOM_BAR_TOOLS =
  'svg-icons/type/bottom-bar-tools';
export const SVG_ICONS_TYPE_BOTTOM_BAR_PROFILE =
  'svg-icons/type/bottom-bar-profile';

export const SVG_ICONS_CONFIG = {
  ...SVG_ICONS_DEFAULT_CONFIG,
  [SVG_ICONS_TYPE_BEO_404]: StatusPageBEO404,
  [SVG_ICONS_TYPE_BEO_451]: StatusPageBEO451,
  [SVG_ICONS_TYPE_BEO_500]: StatusPageBEO500,
  [SVG_ICONS_TYPE_BOTTOM_BAR_HOME]: BottomBarHomeIcon,
  [SVG_ICONS_TYPE_BOTTOM_BAR_BERATUNG]: BottomBarBeratungIcon,
  [SVG_ICONS_TYPE_BOTTOM_BAR_CHATBOT]: BottomBarChatbotIcon,
  [SVG_ICONS_TYPE_BOTTOM_BAR_TOOLS]: BottomBarToolsIcon,
  [SVG_ICONS_TYPE_BOTTOM_BAR_PROFILE]: BottomBarProfileIcon,
};
