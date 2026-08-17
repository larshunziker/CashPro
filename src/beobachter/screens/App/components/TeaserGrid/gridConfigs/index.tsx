import { entityQueueDefaultFirst } from './entityQueueDefaultFirst';
import { teaserSMColumn } from './teaserSMColumn';
import { teaserSMRow } from './teaserSMRow';
import { teaserWideColumn } from './teaserWideColumn';
import { channelPageDefault } from './channelPageDefault';
import { ministageAuthors } from './ministageAuthors';
import { teaser1x18 } from './teaser1x18';
import { teaser1x18NoAds } from './teaser1x18NoAds';
import { teaser3x2 } from './teaser3x2';
import { teaserRecommendations } from './teaserRecommendations';
import { teaserNewRecommendations } from './teaserNewRecommendations';
import { teaserMostRead } from './teaserMostRead';
import { teaserSponsors } from './teaserSponsors';
import { teaserStage1Item } from './teaserStage/teaserStage1Item';
import { teaserStage2Items } from './teaserStage/teaserStage2Items';
import { teaserStage3Items } from './teaserStage/teaserStage3Items';
import { teaserStageDefault } from './teaserStage/teaserStageDefault';
import { teaserStageRandomizedList } from './teaserStage/teaserStageRandomizedList';
import { teaserStageShopProduct } from './teaserStage/teaserStageShopProduct';
import { teaserStageUnlimited } from './teaserStage/teaserStageUnlimited';
import { teaserBookmark } from './teaserBookmark';
import { teaserTools } from './teaserTools';
import { teaserKeywords } from './teaserKeywords';
import {
  GlobalTeaserLayout,
  globalGridConfig,
} from '../../../../../../common/components/TeaserGrid/gridConfigs';
import { entityQueueColumn } from './entityQueueColumn';
import { entityQueueColumnMixed } from './entityQueueColumnMixed';
import { entityQueueDefault } from './entityQueueDefault';
import { teaser3x2NoContainer } from './teaser3x2NoContainer';
import { teaser4x2 } from './teaser4x2';
import { teaserLegalAdvices } from './teaserLegalAdvices';
import {
  GRID_LAYOUT_TEASER_STAGE_1_ITEM,
  GRID_LAYOUT_TEASER_STAGE_2_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_3_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_DEFAULT,
  GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST,
  GRID_LAYOUT_TEASER_STAGE_UNLIMITED,
} from '../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  GRID_LAYOUT_ENTITY_QUEUE_COLUMN,
  GRID_LAYOUT_ENTITY_QUEUE_COLUMN_MIXED,
  GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
  GRID_LAYOUT_ENTITY_QUEUE_DEFAULT_FIRST,
  GRID_LAYOUT_RECOMMENDATIONS,
  GRID_LAYOUT_SHOP_PRODUCT,
  GRID_LAYOUT_TEASER_1X18,
  GRID_LAYOUT_TEASER_1X18_NO_ADS,
  GRID_LAYOUT_TEASER_3X2,
  GRID_LAYOUT_TEASER_SPONSOR,
  GRID_LAYOUT_TEASER_SM_COLUMN,
  GRID_LAYOUT_TEASER_MOST_READ,
  GRID_LAYOUT_TEASER_3X2_NO_CONTAINER,
  GRID_LAYOUT_CHANNEL_PAGE_DEFAULT,
  GRID_LAYOUT_TEASER_4X2,
  GRID_LAYOUT_TEASER_WIDE_COLUMN,
  GRID_LAYOUT_TEASER_NEW_RECOMMENDATIONS,
  GRID_LAYOUT_TEASER_AUTHOR,
  GRID_LAYOUT_TEASER_SM_ROW,
  GRID_LAYOUT_TEASER_BOOKMARK,
  GRID_LAYOUT_TEASER_TOOLS,
  GRID_LAYOUT_TEASER_LEGAL_ADVICES,
  GRID_LAYOUT_KEYWORDS,
} from './constants';
import entityQueueColumnStyles from './entityQueueColumn/styles.legacy.css';
import entityQueueColumnMixedStyles from './entityQueueColumnMixed/styles.legacy.css';
import entityQueueDefaultStyles from './entityQueueDefault/styles.legacy.css';
import entityQueueDefaultFirstStyles from './entityQueueDefaultFirst/styles.legacy.css';
import teaserSMColumnStyles from './teaserSMColumn/styles.legacy.css';
import teaserSMRowStyles from './teaserSMRow/styles.legacy.css';
import teaserWideColumnStyles from './teaserWideColumn/styles.legacy.css';
import channelPageDefaultStyles from './channelPageDefault/styles.legacy.css';
import ministageAuthorStyles from './ministageAuthors/styles.legacy.css';
import teaser1x18Styles from './teaser1x18/styles.legacy.css';
import teaser1x18NoAdsStyles from './teaser1x18NoAds/styles.legacy.css';
import teaser3x2Styles from './teaser3x2/styles.legacy.css';
import teaser4x2Styles from './teaser4x2/styles.legacy.css';
import teaser3x2NoContainerStyles from './teaser3x2NoContainer/styles.legacy.css';
import teaserMostReadStyles from './teaserMostRead/styles.legacy.css';
import teaserBookmarkStyles from './teaserBookmark/styles.legacy.css';
import teaserRecommendationsStyles from './teaserRecommendations/styles.legacy.css';
import teaserNewRecommendationsStyles from './teaserNewRecommendations/styles.legacy.css';
import teaserSponsorsStyles from './teaserSponsors/styles.legacy.css';
import teaserStage1ItemStyles from './teaserStage/teaserStage1Item/styles.legacy.css';
import teaserStage2ItemsStyles from './teaserStage/teaserStage2Items/styles.legacy.css';
import teaserStage3ItemsStyles from './teaserStage/teaserStage3Items/styles.legacy.css';
import teaserStageDefaultStyles from './teaserStage/teaserStageDefault/styles.legacy.css';
import teaserStageRandomizedListStyles from '../../../../../../common/components/TeaserGrid/gridConfigs/teaserStage/teaserStageRandomizedList/styles.legacy.css';
import teaserStageShopProductStyles from './teaserStage/teaserStageShopProduct/styles.legacy.css';
import teaserStageUnlimitedStyles from './teaserStage/teaserStageUnlimited/styles.legacy.css';
import teaserToolsStyles from './teaserTools/styles.legacy.css';
import teaserLegalAdvicesStyles from './teaserLegalAdvices/styles.legacy.css';
import teaserKeywordsStyles from './teaserKeywords/styles.legacy.css';

export type TeaserLayout =
  | typeof GRID_LAYOUT_RECOMMENDATIONS
  | typeof GRID_LAYOUT_TEASER_NEW_RECOMMENDATIONS
  | typeof GRID_LAYOUT_ENTITY_QUEUE_COLUMN
  | typeof GRID_LAYOUT_ENTITY_QUEUE_COLUMN_MIXED
  | typeof GRID_LAYOUT_ENTITY_QUEUE_DEFAULT
  | typeof GRID_LAYOUT_ENTITY_QUEUE_DEFAULT_FIRST
  | typeof GRID_LAYOUT_TEASER_3X2
  | typeof GRID_LAYOUT_TEASER_3X2_NO_CONTAINER
  | typeof GRID_LAYOUT_SHOP_PRODUCT
  | typeof GRID_LAYOUT_TEASER_BOOKMARK
  | typeof GRID_LAYOUT_TEASER_SPONSOR
  | typeof GRID_LAYOUT_TEASER_1X18
  | typeof GRID_LAYOUT_TEASER_1X18_NO_ADS
  | typeof GRID_LAYOUT_TEASER_SM_COLUMN
  | typeof GRID_LAYOUT_TEASER_SM_ROW
  | typeof GRID_LAYOUT_TEASER_WIDE_COLUMN
  | typeof GRID_LAYOUT_TEASER_MOST_READ
  | typeof GRID_LAYOUT_CHANNEL_PAGE_DEFAULT
  | typeof GRID_LAYOUT_TEASER_4X2
  | typeof GRID_LAYOUT_TEASER_AUTHOR
  | typeof GRID_LAYOUT_TEASER_TOOLS
  | typeof GRID_LAYOUT_TEASER_LEGAL_ADVICES
  | typeof GRID_LAYOUT_KEYWORDS
  | GlobalTeaserLayout;

type GridConfig = Record<
  TeaserLayout,
  { config: Record<string, any>; styles: Record<string, string> }
>;

export const gridConfig: GridConfig = {
  ...globalGridConfig,
  [GRID_LAYOUT_RECOMMENDATIONS]: {
    config: teaserRecommendations,
    styles: teaserRecommendationsStyles,
  },
  [GRID_LAYOUT_TEASER_NEW_RECOMMENDATIONS]: {
    config: teaserNewRecommendations,
    styles: teaserNewRecommendationsStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_COLUMN]: {
    config: entityQueueColumn,
    styles: entityQueueColumnStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_COLUMN_MIXED]: {
    config: entityQueueColumnMixed,
    styles: entityQueueColumnMixedStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_DEFAULT]: {
    config: entityQueueDefault,
    styles: entityQueueDefaultStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_DEFAULT_FIRST]: {
    config: entityQueueDefaultFirst,
    styles: entityQueueDefaultFirstStyles,
  },
  [GRID_LAYOUT_TEASER_3X2]: {
    config: teaser3x2,
    styles: teaser3x2Styles,
  },
  [GRID_LAYOUT_TEASER_3X2_NO_CONTAINER]: {
    config: teaser3x2NoContainer,
    styles: teaser3x2NoContainerStyles,
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
  [GRID_LAYOUT_SHOP_PRODUCT]: {
    config: teaserStageShopProduct,
    styles: teaserStageShopProductStyles,
  },
  [GRID_LAYOUT_TEASER_BOOKMARK]: {
    config: teaserBookmark,
    styles: teaserBookmarkStyles,
  },
  [GRID_LAYOUT_TEASER_SPONSOR]: {
    config: teaserSponsors,
    styles: teaserSponsorsStyles,
  },
  [GRID_LAYOUT_TEASER_1X18]: {
    config: teaser1x18,
    styles: teaser1x18Styles,
  },
  [GRID_LAYOUT_TEASER_1X18_NO_ADS]: {
    config: teaser1x18NoAds,
    styles: teaser1x18NoAdsStyles,
  },
  [GRID_LAYOUT_TEASER_SM_COLUMN]: {
    config: teaserSMColumn,
    styles: teaserSMColumnStyles,
  },
  [GRID_LAYOUT_TEASER_SM_ROW]: {
    config: teaserSMRow,
    styles: teaserSMRowStyles,
  },
  [GRID_LAYOUT_TEASER_WIDE_COLUMN]: {
    config: teaserWideColumn,
    styles: teaserWideColumnStyles,
  },
  [GRID_LAYOUT_TEASER_MOST_READ]: {
    config: teaserMostRead,
    styles: teaserMostReadStyles,
  },
  [GRID_LAYOUT_CHANNEL_PAGE_DEFAULT]: {
    config: channelPageDefault,
    styles: channelPageDefaultStyles,
  },
  [GRID_LAYOUT_TEASER_4X2]: {
    config: teaser4x2,
    styles: teaser4x2Styles,
  },
  [GRID_LAYOUT_TEASER_AUTHOR]: {
    config: ministageAuthors,
    styles: ministageAuthorStyles,
  },
  [GRID_LAYOUT_TEASER_TOOLS]: {
    config: teaserTools,
    styles: teaserToolsStyles,
  },
  [GRID_LAYOUT_TEASER_LEGAL_ADVICES]: {
    config: teaserLegalAdvices,
    styles: teaserLegalAdvicesStyles,
  },
  [GRID_LAYOUT_KEYWORDS]: {
    config: teaserKeywords,
    styles: teaserKeywordsStyles,
  },
};
