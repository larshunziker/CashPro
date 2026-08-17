// @ts-ignore
import { ReactComponent as StatusPageSI404 } from '../../../../../common/components/SVGIcon/assets/statusPage/si_404.svg';
// @ts-ignore
import { ReactComponent as StatusPageSI451 } from '../../../../../common/components/SVGIcon/assets/statusPage/si_451.svg';
// @ts-ignore
import { ReactComponent as StatusPageSI500 } from '../../../../../common/components/SVGIcon/assets/statusPage/si_500.svg';
// @ts-ignore
import { ReactComponent as BookmarkOutlinedActiveIcon } from './assets/bookmark_outlined_active.svg';
// @ts-ignore
import { ReactComponent as BookmarkOutlinedInactiveIcon } from './assets/bookmark_outlined_inactive.svg';
// @ts-ignore
import { ReactComponent as CommentCountIcon } from './assets/comment.svg';
// @ts-ignore
import { ReactComponent as CommentIcon } from './assets/comment_lines.svg';
// @ts-ignore
import { ReactComponent as Hamburger } from './assets/hamburger.svg';
// @ts-ignore
import { ReactComponent as Latest } from './assets/latest.svg';
// @ts-ignore
import { ReactComponent as ShareIcon } from './assets/share.svg';
// @ts-ignore
import { ReactComponent as UserIcon } from './assets/user.svg';
// @ts-ignore
import { ReactComponent as UserActiveIcon } from './assets/user_active.svg';
// @ts-ignore
import { ReactComponent as Video } from './assets/video.svg';
import {
  SVG_ICONS_DEFAULT_CONFIG,
  SVG_ICONS_TYPE_BOOKMARK_ACTIVE,
  SVG_ICONS_TYPE_BOOKMARK_INACTIVE,
  SVG_ICONS_TYPE_COMMENT,
  SVG_ICONS_TYPE_SHARE,
} from '../../../../../shared/constants/svgIcons';

export const SVG_ICONS_TYPE_COMMENT_COUNT = 'svg-icons/type/comment-count';
export const SVG_ICONS_TYPE_USER = 'svg-icons/type/user';
export const SVG_ICONS_TYPE_USER_ACTIVE = 'svg-icons/type/user-active';
export const SVG_ICONS_TYPE_LATEST = 'svg-icons/type/latest';
export const SVG_ICONS_TYPE_HAMBURGER = 'svg-icons/type/hamburger';
export const SVG_ICONS_TYPE_VIDEO = 'svg-icons/type/video';
export const SVG_ICONS_TYPE_SI_404 = 'svg-icons/type/si-404';
export const SVG_ICONS_TYPE_SI_451 = 'svg-icons/type/si-451';
export const SVG_ICONS_TYPE_SI_500 = 'svg-icons/type/si-500';

export const SVG_ICONS_CONFIG = {
  ...SVG_ICONS_DEFAULT_CONFIG,
  [SVG_ICONS_TYPE_USER]: UserIcon,
  [SVG_ICONS_TYPE_USER_ACTIVE]: UserActiveIcon,
  [SVG_ICONS_TYPE_SHARE]: ShareIcon,
  [SVG_ICONS_TYPE_COMMENT]: CommentIcon,
  [SVG_ICONS_TYPE_COMMENT_COUNT]: CommentCountIcon,
  [SVG_ICONS_TYPE_BOOKMARK_ACTIVE]: BookmarkOutlinedActiveIcon,
  [SVG_ICONS_TYPE_BOOKMARK_INACTIVE]: BookmarkOutlinedInactiveIcon,
  [SVG_ICONS_TYPE_LATEST]: Latest,
  [SVG_ICONS_TYPE_HAMBURGER]: Hamburger,
  [SVG_ICONS_TYPE_VIDEO]: Video,
  [SVG_ICONS_TYPE_SI_404]: StatusPageSI404,
  [SVG_ICONS_TYPE_SI_451]: StatusPageSI451,
  [SVG_ICONS_TYPE_SI_500]: StatusPageSI500,
};
