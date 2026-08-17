import { landscape } from './landscape';
import { mixed } from './mixed';
import { portrait } from './portrait';
import { teaserBookmark4x4 } from './teaserBookmark4x4';
import { teaserS4x4 } from './teaserS4x4';
import { teaserStage1Item } from './teaserStage/teaserStage1Item';
import { teaserStage2Items } from './teaserStage/teaserStage2Items';
import { teaserStage3Items } from './teaserStage/teaserStage3Items';
import { teaserStageDefault } from './teaserStage/teaserStageDefault';
import { teaserStageRandomizedList } from './teaserStage/teaserStageRandomizedList';
import { teaserStageUnlimited } from './teaserStage/teaserStageUnlimited';
import {
  GRID_LAYOUT_LANDSCAPE,
  GRID_LAYOUT_MIXED,
  GRID_LAYOUT_PORTRAIT,
  GRID_LAYOUT_TEASER_BOOKMARK_4X4,
  GRID_LAYOUT_TEASER_STAGE_1_ITEM,
  GRID_LAYOUT_TEASER_STAGE_2_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_3_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_DEFAULT,
  GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST,
  GRID_LAYOUT_TEASER_STAGE_UNLIMITED,
  GRID_LAYOUT_TEASER_S_4X4,
} from './constants';
import landscapeStyles from './landscape/styles.legacy.css';
import mixedStyles from './mixed/styles.legacy.css';
import portraitStyles from './portrait/styles.legacy.css';
import teaserBookmark4x4Styles from './teaserBookmark4x4/styles.legacy.css';
import teaserS4x4Styles from './teaserS4x4/styles.legacy.css';
import teaserStage1ItemStyles from './teaserStage/teaserStage1Item/styles.legacy.css';
import teaserStage2ItemsStyles from './teaserStage/teaserStage2Items/styles.legacy.css';
import teaserStage3ItemsStyles from './teaserStage/teaserStage3Items/styles.legacy.css';
import teaserStageDefaultStyles from './teaserStage/teaserStageDefault/styles.legacy.css';
import teaserStageRandomizedListStyles from './teaserStage/teaserStageRandomizedList/styles.legacy.css';
import teaserStageUnlimitedStyles from './teaserStage/teaserStageUnlimited/styles.legacy.css';

export type GlobalTeaserLayout =
  | typeof GRID_LAYOUT_TEASER_S_4X4
  | typeof GRID_LAYOUT_TEASER_BOOKMARK_4X4
  | typeof GRID_LAYOUT_TEASER_STAGE_1_ITEM
  | typeof GRID_LAYOUT_TEASER_STAGE_2_ITEMS
  | typeof GRID_LAYOUT_TEASER_STAGE_3_ITEMS
  | typeof GRID_LAYOUT_TEASER_STAGE_DEFAULT
  | typeof GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST
  | typeof GRID_LAYOUT_TEASER_STAGE_UNLIMITED
  | typeof GRID_LAYOUT_PORTRAIT
  | typeof GRID_LAYOUT_LANDSCAPE
  | typeof GRID_LAYOUT_MIXED;

type GlobalGridConfig = Record<GlobalTeaserLayout, any>;

export const globalGridConfig: GlobalGridConfig = {
  [GRID_LAYOUT_TEASER_S_4X4]: {
    config: teaserS4x4,
    styles: teaserS4x4Styles,
  },
  [GRID_LAYOUT_TEASER_BOOKMARK_4X4]: {
    config: teaserBookmark4x4,
    styles: teaserBookmark4x4Styles,
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
  [GRID_LAYOUT_TEASER_STAGE_DEFAULT]: {
    config: teaserStageDefault,
    styles: teaserStageDefaultStyles,
  },
  [GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST]: {
    config: teaserStageRandomizedList,
    styles: teaserStageRandomizedListStyles,
  },
  [GRID_LAYOUT_TEASER_STAGE_UNLIMITED]: {
    config: teaserStageUnlimited,
    styles: teaserStageUnlimitedStyles,
  },
  [GRID_LAYOUT_PORTRAIT]: {
    config: portrait,
    styles: portraitStyles,
  },
  [GRID_LAYOUT_LANDSCAPE]: {
    config: landscape,
    styles: landscapeStyles,
  },
  [GRID_LAYOUT_MIXED]: {
    config: mixed,
    styles: mixedStyles,
  },
};
