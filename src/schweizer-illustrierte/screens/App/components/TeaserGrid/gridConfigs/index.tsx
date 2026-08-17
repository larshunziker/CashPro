import { homeBodyAndHealthFamilyBottom } from './homeBodyAndHealthFamilyBottom';
import { homeBodyAndHealthTop } from './homeBodyAndHealthTop';
import { homeBottom } from './homeBottom';
import { homeFamilyTop } from './homeFamilyTop';
import { homePeopleTop } from './homePeopleTop';
import { homeStyleBottom } from './homeStyleBottom';
import { homeStyleTop } from './homeStyleTop';
import { homeTop } from './homeTop';
import { horoscope4x3 } from './horoscope4x3';
import { keyword } from './keyword';
import { landingPageSpecial4x3 } from './landingPageSpecial4x3';
import { landscapeSpecial } from './landscapeSpecial';
import { menuOverlay } from './menuOverlay';
import { teaser3x4 } from './teaser3x4';
import { teaserBlogPostMedium4x4 } from './teaserBlogPostMedium4x4';
import { teaserPortrait4x4 } from './teaserPortrait4x4';
import { videoBlogs } from './videoBlogs';
import {
  GlobalTeaserLayout,
  globalGridConfig,
} from '../../../../../../common/components/TeaserGrid/gridConfigs';
import { blogs } from '../../../../../../common/components/TeaserGrid/gridConfigs/blogs';
import {
  GRID_LAYOUT_BLOGS,
  GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM,
  GRID_LAYOUT_BODY_AND_HEALTH_TOP,
  GRID_LAYOUT_FAMILY_TOP,
  GRID_LAYOUT_HOME_BOTTOM,
  GRID_LAYOUT_HOME_TOP,
  GRID_LAYOUT_HOROSCOPE_4X3,
  GRID_LAYOUT_LANDINGPAGE_SPECIAL_4X3,
  GRID_LAYOUT_LANDSCAPE_SPECIAL,
  GRID_LAYOUT_MENU_OVERLAY,
  GRID_LAYOUT_PEOPLE_TOP,
  GRID_LAYOUT_STYLE_BOTTOM,
  GRID_LAYOUT_STYLE_TOP,
  GRID_LAYOUT_TEASER_3X4,
  GRID_LAYOUT_TEASER_BLOG_POST_MEDIUM_4X4,
  GRID_LAYOUT_TEASER_KEYWORD,
  GRID_LAYOUT_TEASER_PORTRAIT_4X4,
  GRID_LAYOUT_VIDEO_BLOGS,
} from './constants';
import blogsStyles from './blogs/styles.legacy.css';
import homeBodyAndHealthFamilyBottomStyles from './homeBodyAndHealthFamilyBottom/styles.legacy.css';
import homeBodyAndHealthTopStyles from './homeBodyAndHealthTop/styles.legacy.css';
import homeBottomStyles from './homeBottom/styles.legacy.css';
import homeFamilyTopStyles from './homeFamilyTop/styles.legacy.css';
import homePeopleTopStyles from './homePeopleTop/styles.legacy.css';
import homeStyleBottomStyles from './homeStyleBottom/styles.legacy.css';
import homeStyleTopStyles from './homeStyleTop/styles.legacy.css';
import homeTopStyles from './homeTop/styles.legacy.css';
import horoscope4x3Styles from './horoscope4x3/styles.legacy.css';
import keywordsStyles from './keyword/styles.legacy.css';
import landingPageSpecial4x3Styles from './landingPageSpecial4x3/styles.legacy.css';
import landscapeSpecialStyles from './landscapeSpecial/styles.legacy.css';
import menuOverlayStyles from './menuOverlay/styles.legacy.css';
import teaser3X4Styles from './teaser3x4/styles.legacy.css';
import teaserBlogPostMedium4x4Styles from './teaserBlogPostMedium4x4/styles.legacy.css';
import teaserPortrait4x4Styles from './teaserPortrait4x4/styles.legacy.css';
import videoBlogsStyles from './videoBlogs/styles.legacy.css';

export type TeaserLayout =
  | typeof GRID_LAYOUT_HOME_TOP
  | typeof GRID_LAYOUT_STYLE_TOP
  | typeof GRID_LAYOUT_STYLE_BOTTOM
  | typeof GRID_LAYOUT_PEOPLE_TOP
  | typeof GRID_LAYOUT_FAMILY_TOP
  | typeof GRID_LAYOUT_HOME_BOTTOM
  | typeof GRID_LAYOUT_BODY_AND_HEALTH_TOP
  | typeof GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM
  | typeof GRID_LAYOUT_LANDSCAPE_SPECIAL
  | typeof GRID_LAYOUT_HOROSCOPE_4X3
  | typeof GRID_LAYOUT_MENU_OVERLAY
  | typeof GRID_LAYOUT_VIDEO_BLOGS
  | typeof GRID_LAYOUT_BLOGS
  | typeof GRID_LAYOUT_LANDINGPAGE_SPECIAL_4X3
  | typeof GRID_LAYOUT_TEASER_BLOG_POST_MEDIUM_4X4
  | typeof GRID_LAYOUT_TEASER_PORTRAIT_4X4
  | typeof GRID_LAYOUT_TEASER_KEYWORD
  | typeof GRID_LAYOUT_TEASER_3X4
  | GlobalTeaserLayout;

type GridConfig = Record<
  TeaserLayout,
  { config: Record<string, any>; styles: Record<string, string> }
>;
export const gridConfig: GridConfig = {
  ...globalGridConfig,
  [GRID_LAYOUT_HOME_TOP]: {
    config: homeTop,
    styles: homeTopStyles,
  },
  [GRID_LAYOUT_HOME_BOTTOM]: {
    config: homeBottom,
    styles: homeBottomStyles,
  },
  [GRID_LAYOUT_PEOPLE_TOP]: {
    config: homePeopleTop,
    styles: homePeopleTopStyles,
  },
  [GRID_LAYOUT_STYLE_TOP]: {
    config: homeStyleTop,
    styles: homeStyleTopStyles,
  },
  [GRID_LAYOUT_STYLE_BOTTOM]: {
    config: homeStyleBottom,
    styles: homeStyleBottomStyles,
  },
  [GRID_LAYOUT_FAMILY_TOP]: {
    config: homeFamilyTop,
    styles: homeFamilyTopStyles,
  },
  [GRID_LAYOUT_BODY_AND_HEALTH_TOP]: {
    config: homeBodyAndHealthTop,
    styles: homeBodyAndHealthTopStyles,
  },
  [GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM]: {
    config: homeBodyAndHealthFamilyBottom,
    styles: homeBodyAndHealthFamilyBottomStyles,
  },
  [GRID_LAYOUT_LANDSCAPE_SPECIAL]: {
    config: landscapeSpecial,
    styles: landscapeSpecialStyles,
  },
  [GRID_LAYOUT_HOROSCOPE_4X3]: {
    config: horoscope4x3,
    styles: horoscope4x3Styles,
  },
  [GRID_LAYOUT_MENU_OVERLAY]: {
    config: menuOverlay,
    styles: menuOverlayStyles,
  },
  [GRID_LAYOUT_VIDEO_BLOGS]: {
    config: videoBlogs,
    styles: videoBlogsStyles,
  },
  [GRID_LAYOUT_BLOGS]: {
    config: blogs,
    styles: blogsStyles,
  },
  [GRID_LAYOUT_LANDINGPAGE_SPECIAL_4X3]: {
    config: landingPageSpecial4x3,
    styles: landingPageSpecial4x3Styles,
  },
  [GRID_LAYOUT_TEASER_BLOG_POST_MEDIUM_4X4]: {
    config: teaserBlogPostMedium4x4,
    styles: teaserBlogPostMedium4x4Styles,
  },
  [GRID_LAYOUT_TEASER_PORTRAIT_4X4]: {
    config: teaserPortrait4x4,
    styles: teaserPortrait4x4Styles,
  },
  [GRID_LAYOUT_TEASER_KEYWORD]: {
    config: keyword,
    styles: keywordsStyles,
  },
  [GRID_LAYOUT_TEASER_3X4]: {
    config: teaser3x4,
    styles: teaser3X4Styles,
  },
};
