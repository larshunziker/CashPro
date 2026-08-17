import { heroMixed } from './heroMixed';
import { heroSlider } from './heroSlider';
import { homeBottom } from './homeBottom';
import { homeTop } from './homeTop';
import { mixed } from './mixed';
import { mixedWithPiano } from './mixedWithPiano';
import { mixedWithPiano1 } from './mixedWithPiano1';
import { mixedWithPiano2 } from './mixedWithPiano2';
import { mixedWithPiano3 } from './mixedWithPiano3';
import { mixedWithPiano4 } from './mixedWithPiano4';
import { teaser2x2 } from './teaser2x2';
import { teaser2x5 } from './teaser2x5';
import { teaser3x2 } from './teaser3x2';
import { teaser3x3 } from './teaser3x3';
import { teaser3x4 } from './teaser3x4';
import { teaser3x6 } from './teaser3x6';
import { teaserStage1Item } from './teaserStage/teaserStage1Item';
import { teaserStage2Items } from './teaserStage/teaserStage2Items';
import { teaserStage3Items } from './teaserStage/teaserStage3Items';
import { teaserStageRandomizedList } from './teaserStage/teaserStageRandomizedList';
import { teaserStageUnlimited } from './teaserStage/teaserStageUnlimited';
import {
  GlobalTeaserLayout,
  globalGridConfig,
} from '../../../../../../common/components/TeaserGrid/gridConfigs';
import {
  GRID_LAYOUT_TEASER_STAGE_1_ITEM,
  GRID_LAYOUT_TEASER_STAGE_2_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_3_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST,
  GRID_LAYOUT_TEASER_STAGE_UNLIMITED,
} from '../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  GRID_LAYOUT_HERO_MIXED,
  GRID_LAYOUT_HERO_SLIDER,
  GRID_LAYOUT_HOME_BOTTOM,
  GRID_LAYOUT_HOME_TOP,
  GRID_LAYOUT_MIXED,
  GRID_LAYOUT_MIXED_WITH_PIANO,
  GRID_LAYOUT_MIXED_WITH_PIANO_1,
  GRID_LAYOUT_MIXED_WITH_PIANO_2,
  GRID_LAYOUT_MIXED_WITH_PIANO_3,
  GRID_LAYOUT_MIXED_WITH_PIANO_4,
  GRID_LAYOUT_TEASER_2X2,
  GRID_LAYOUT_TEASER_2X5,
  GRID_LAYOUT_TEASER_3X2,
  GRID_LAYOUT_TEASER_3X3,
  GRID_LAYOUT_TEASER_3X4,
  GRID_LAYOUT_TEASER_3X6,
} from './constants';
import heroMixedStyles from './heroMixed/styles.legacy.css';
import heroSliderStyles from './heroSlider/styles.legacy.css';
import homeBottomStyles from './homeBottom/styles.legacy.css';
import homeTopStyles from './homeTop/styles.legacy.css';
import mixedStyles from './mixed/styles.legacy.css';
import mixedWithAdStyles from './mixedWithPiano/styles.legacy.css';
import mixedWithAd1Styles from './mixedWithPiano1/styles.legacy.css';
import mixedWithAd2Styles from './mixedWithPiano2/styles.legacy.css';
import mixedWithAd3Styles from './mixedWithPiano3/styles.legacy.css';
import mixedWithAd4Styles from './mixedWithPiano4/styles.legacy.css';
import teaser2x2Styles from './teaser2x2/styles.legacy.css';
import teaser2x5Styles from './teaser2x5/styles.legacy.css';
import teaser3x2Styles from './teaser3x2/styles.legacy.css';
import teaser3x3Styles from './teaser3x3/styles.legacy.css';
import teaser3x4Styles from './teaser3x4/styles.legacy.css';
import teaser3x6Styles from './teaser3x6/styles.legacy.css';
import teaserStage1ItemStyles from './teaserStage/teaserStage1Item/styles.legacy.css';
import teaserStage2ItemsStyles from './teaserStage/teaserStage2Items/styles.legacy.css';
import teaserStage3ItemsStyles from './teaserStage/teaserStage3Items/styles.legacy.css';
import teaserStageRandomizedListStyles from './teaserStage/teaserStageRandomizedList/styles.legacy.css';
import teaserStageUnlimitedStyles from './teaserStage/teaserStageUnlimited/styles.legacy.css';

export type TeaserLayout =
  | typeof GRID_LAYOUT_HERO_MIXED
  | typeof GRID_LAYOUT_MIXED_WITH_PIANO
  | typeof GRID_LAYOUT_MIXED_WITH_PIANO_1
  | typeof GRID_LAYOUT_MIXED_WITH_PIANO_2
  | typeof GRID_LAYOUT_MIXED_WITH_PIANO_3
  | typeof GRID_LAYOUT_MIXED_WITH_PIANO_4
  | typeof GRID_LAYOUT_TEASER_2X2
  | typeof GRID_LAYOUT_TEASER_2X5
  | typeof GRID_LAYOUT_TEASER_3X2
  | typeof GRID_LAYOUT_TEASER_3X3
  | typeof GRID_LAYOUT_TEASER_3X4
  | typeof GRID_LAYOUT_TEASER_3X6
  | typeof GRID_LAYOUT_HERO_SLIDER
  | typeof GRID_LAYOUT_HOME_TOP
  | typeof GRID_LAYOUT_HOME_BOTTOM
  | GlobalTeaserLayout;

type GridConfig = Record<
  TeaserLayout,
  { config: Record<string, any>; styles: Record<string, string> }
>;

export const gridConfig: GridConfig = {
  ...globalGridConfig,
  [GRID_LAYOUT_HERO_MIXED]: {
    config: heroMixed,
    styles: heroMixedStyles,
  },
  [GRID_LAYOUT_MIXED]: {
    config: mixed,
    styles: mixedStyles,
  },
  [GRID_LAYOUT_MIXED_WITH_PIANO]: {
    config: mixedWithPiano,
    styles: mixedWithAdStyles,
  },
  [GRID_LAYOUT_MIXED_WITH_PIANO_1]: {
    config: mixedWithPiano1,
    styles: mixedWithAd1Styles,
  },
  [GRID_LAYOUT_MIXED_WITH_PIANO_2]: {
    config: mixedWithPiano2,
    styles: mixedWithAd2Styles,
  },
  [GRID_LAYOUT_MIXED_WITH_PIANO_3]: {
    config: mixedWithPiano3,
    styles: mixedWithAd3Styles,
  },
  [GRID_LAYOUT_MIXED_WITH_PIANO_4]: {
    config: mixedWithPiano4,
    styles: mixedWithAd4Styles,
  },
  [GRID_LAYOUT_TEASER_2X2]: {
    config: teaser2x2,
    styles: teaser2x2Styles,
  },
  [GRID_LAYOUT_TEASER_2X5]: {
    config: teaser2x5,
    styles: teaser2x5Styles,
  },
  [GRID_LAYOUT_TEASER_3X3]: {
    config: teaser3x3,
    styles: teaser3x3Styles,
  },
  [GRID_LAYOUT_TEASER_3X2]: {
    config: teaser3x2,
    styles: teaser3x2Styles,
  },
  [GRID_LAYOUT_TEASER_3X4]: {
    config: teaser3x4,
    styles: teaser3x4Styles,
  },
  [GRID_LAYOUT_TEASER_3X6]: {
    config: teaser3x6,
    styles: teaser3x6Styles,
  },
  [GRID_LAYOUT_HERO_SLIDER]: {
    config: heroSlider,
    styles: heroSliderStyles,
  },
  [GRID_LAYOUT_HOME_TOP]: {
    config: homeTop,
    styles: homeTopStyles,
  },
  [GRID_LAYOUT_HOME_BOTTOM]: {
    config: homeBottom,
    styles: homeBottomStyles,
  },
  [GRID_LAYOUT_TEASER_STAGE_1_ITEM]: {
    config: teaserStage1Item,
    styles: teaserStage1ItemStyles,
  },
  [GRID_LAYOUT_TEASER_STAGE_2_ITEMS]: {
    config: teaserStage2Items,
    styles: teaserStage2ItemsStyles,
  },
  [GRID_LAYOUT_TEASER_STAGE_3_ITEMS]: {
    config: teaserStage3Items,
    styles: teaserStage3ItemsStyles,
  },
  [GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST]: {
    config: teaserStageRandomizedList,
    styles: teaserStageRandomizedListStyles,
  },
  [GRID_LAYOUT_TEASER_STAGE_UNLIMITED]: {
    config: teaserStageUnlimited,
    styles: teaserStageUnlimitedStyles,
  },
};
