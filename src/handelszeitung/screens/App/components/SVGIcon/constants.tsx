// @ts-ignore
import { ReactComponent as StatusPageHZ404 } from '../../../../../common/components/SVGIcon/assets/statusPage/hz_404.svg';
// @ts-ignore
import { ReactComponent as StatusPageHZ451 } from '../../../../../common/components/SVGIcon/assets/statusPage/hz_451.svg';
// @ts-ignore
import { ReactComponent as StatusPageHZ500 } from '../../../../../common/components/SVGIcon/assets/statusPage/hz_500.svg';
import { SVG_ICONS_DEFAULT_CONFIG } from '../../../../../shared/constants/svgIcons';

export const SVG_ICONS_TYPE_HZ_404 = 'svg-icons/type/hz-404';
export const SVG_ICONS_TYPE_HZ_451 = 'svg-icons/type/hz-451';
export const SVG_ICONS_TYPE_HZ_500 = 'svg-icons/type/hz-500';

export const SVG_ICONS_CONFIG = {
  ...SVG_ICONS_DEFAULT_CONFIG,
  [SVG_ICONS_TYPE_HZ_404]: StatusPageHZ404,
  [SVG_ICONS_TYPE_HZ_451]: StatusPageHZ451,
  [SVG_ICONS_TYPE_HZ_500]: StatusPageHZ500,
};
