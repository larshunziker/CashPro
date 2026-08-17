import { contentStage } from './contentStage';
import { contentStageFirst } from './contentStageFirst';
import { entityQueueAdditionalPublications } from './entityQueueAdditionalPublications';
import { entityQueueAdditionalPublicationsFirst } from './entityQueueAdditionalPublicationsFirst';
import { entityQueueDefault } from './entityQueueDefault';
import { entityQueueHZBHome } from './entityQueueHZBHome';
import { entityQueueHome } from './entityQueueHome';
import { entityQueueSv } from './entityQueueSv';
import { entityQueueSvHome } from './entityQueueSvHome';
import { landingPageDefault } from './landingPageDefault';
import { latestHeadlessStories } from './latestHeadlessStories';
import { organizationInNews3x2 } from './organizationInNews3x2';
import { teamMembers } from './teamMembers';
import { teaser3x2 } from './teaser3x2';
import { teaser3x2First } from './teaser3x2First';
import { teaser3x3 } from './teaser3x3';
import { teaser3x4 } from './teaser3x4';
import { teaser3x4NoAds } from './teaser3x4NoAds';
import { teaser3x6 } from './teaser3x6';
import { teaser4x4 } from './teaser4x4';
import { teaserRanking } from './teaserRanking';
import { teaserRankingList } from './teaserRankingList';
import { teaserRecommendations } from './teaserRecommendations';
import { teaserSM } from './teaserSM';
import { teaserStage1Item } from './teaserStage/teaserStage1Item';
import { teaserStage2Items } from './teaserStage/teaserStage2Items';
import { teaserStage3Items } from './teaserStage/teaserStage3Items';
import { teaserStageDefault } from './teaserStage/teaserStageDefault';
import { teaserStageRandomizedList } from './teaserStage/teaserStageRandomizedList';
import { teaserStageUnlimited } from './teaserStage/teaserStageUnlimited';
import { videoBlogs } from './videoBlogs';
import {
  GlobalTeaserLayout,
  globalGridConfig,
} from '../../../../../../common/components/TeaserGrid/gridConfigs';
import {
  GRID_LAYOUT_TEASER_STAGE_1_ITEM,
  GRID_LAYOUT_TEASER_STAGE_2_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_3_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_DEFAULT,
  GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST,
  GRID_LAYOUT_TEASER_STAGE_UNLIMITED,
} from '../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  GRID_LAYOUT_CONTENT_STAGE,
  GRID_LAYOUT_CONTENT_STAGE_FIRST,
  GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS,
  GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST,
  GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
  GRID_LAYOUT_ENTITY_QUEUE_HOME,
  GRID_LAYOUT_ENTITY_QUEUE_HZB,
  GRID_LAYOUT_ENTITY_QUEUE_HZB_HOME,
  GRID_LAYOUT_ENTITY_QUEUE_SV_HOME,
  GRID_LAYOUT_ENTITY_QUEUE_SWISS_INSURANCE,
  GRID_LAYOUT_LANDINGPAGE_DEFAULT,
  GRID_LAYOUT_LATEST_HEADLESS,
  GRID_LAYOUT_ORGANIZATION_IN_NEWS_3X2,
  GRID_LAYOUT_RECOMMENDATIONS,
  GRID_LAYOUT_SM,
  GRID_LAYOUT_TEAM_MEMBERS,
  GRID_LAYOUT_TEASER_3X2,
  GRID_LAYOUT_TEASER_3X2_FIRST,
  GRID_LAYOUT_TEASER_3X3,
  GRID_LAYOUT_TEASER_3X4,
  GRID_LAYOUT_TEASER_3X4_NO_ADS,
  GRID_LAYOUT_TEASER_3X6,
  GRID_LAYOUT_TEASER_4X4,
  GRID_LAYOUT_TEASER_RANKING,
  GRID_LAYOUT_TEASER_RANKING_LIST,
  GRID_LAYOUT_VIDEO_BLOGS,
} from './constants';
import teaserStageRandomizedListStyles from '../../../../../../common/components/TeaserGrid/gridConfigs/teaserStage/teaserStageRandomizedList/styles.legacy.css';
import contentStageStyles from './contentStage/styles.legacy.css';
import contentStageFirstStyles from './contentStageFirst/styles.legacy.css';
import entityQueueAdditionalPublicationsStyles from './entityQueueAdditionalPublications/styles.legacy.css';
import entityQueueAdditionalPublicationsFirstStyles from './entityQueueAdditionalPublicationsFirst/styles.legacy.css';
import entityQueueDefaultStyles from './entityQueueDefault/styles.legacy.css';
import entityQueueHZBHomeStyles from './entityQueueHZBHome/styles.legacy.css';
import entityQueueHomeStyles from './entityQueueHome/styles.legacy.css';
import entityQueueSvStyles from './entityQueueSv/styles.legacy.css';
import entityQueueSvHomeStyles from './entityQueueSvHome/styles.legacy.css';
import landingPageDefaultStyles from './landingPageDefault/styles.legacy.css';
import latestHeadlessStoriesStyles from './latestHeadlessStories/styles.legacy.css';
import organizationInNews3x2Styles from './organizationInNews3x2/styles.legacy.css';
import teamMembersStyles from './teamMembers/styles.legacy.css';
import teaser3x2Styles from './teaser3x2/styles.legacy.css';
import teaser3x2FirstStyles from './teaser3x2First/styles.legacy.css';
import teaser3x3Styles from './teaser3x3/styles.legacy.css';
import teaser3x4Styles from './teaser3x4/styles.legacy.css';
import teaser3x4NoAdsStyles from './teaser3x4NoAds/styles.legacy.css';
import teaser3x6Styles from './teaser3x6/styles.legacy.css';
import teaser4x4Styles from './teaser4x4/styles.legacy.css';
import teaserRankingStyles from './teaserRanking/styles.legacy.css';
import teaserRankingListStyles from './teaserRankingList/styles.legacy.css';
import teaserRecommendationsStyles from './teaserRecommendations/styles.legacy.css';
import teaserSMStyles from './teaserSM/styles.legacy.css';
import teaserStage1ItemStyles from './teaserStage/teaserStage1Item/styles.legacy.css';
import teaserStage2ItemsStyles from './teaserStage/teaserStage2Items/styles.legacy.css';
import teaserStage3ItemsStyles from './teaserStage/teaserStage3Items/styles.legacy.css';
import teaserStageDefaultStyles from './teaserStage/teaserStageDefault/styles.legacy.css';
import teaserStageUnlimitedStyles from './teaserStage/teaserStageUnlimited/styles.legacy.css';
import videoBlogsStyles from './videoBlogs/styles.legacy.css';

export type TeaserLayout =
  | typeof GRID_LAYOUT_ENTITY_QUEUE_HOME
  | typeof GRID_LAYOUT_ENTITY_QUEUE_SV_HOME
  | typeof GRID_LAYOUT_ENTITY_QUEUE_HZB_HOME
  | typeof GRID_LAYOUT_ENTITY_QUEUE_DEFAULT
  | typeof GRID_LAYOUT_ENTITY_QUEUE_SWISS_INSURANCE
  | typeof GRID_LAYOUT_ENTITY_QUEUE_HZB
  | typeof GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS
  | typeof GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST
  | typeof GRID_LAYOUT_CONTENT_STAGE
  | typeof GRID_LAYOUT_CONTENT_STAGE_FIRST
  | typeof GRID_LAYOUT_LATEST_HEADLESS
  | typeof GRID_LAYOUT_ORGANIZATION_IN_NEWS_3X2
  | typeof GRID_LAYOUT_TEASER_3X2
  | typeof GRID_LAYOUT_TEASER_3X2_FIRST
  | typeof GRID_LAYOUT_TEASER_3X3
  | typeof GRID_LAYOUT_TEASER_3X4
  | typeof GRID_LAYOUT_TEASER_3X4_NO_ADS
  | typeof GRID_LAYOUT_TEASER_3X6
  | typeof GRID_LAYOUT_TEASER_4X4
  | typeof GRID_LAYOUT_RECOMMENDATIONS
  | typeof GRID_LAYOUT_SM
  | typeof GRID_LAYOUT_LANDINGPAGE_DEFAULT
  | typeof GRID_LAYOUT_TEAM_MEMBERS
  | typeof GRID_LAYOUT_TEASER_RANKING
  | typeof GRID_LAYOUT_TEASER_RANKING_LIST
  | typeof GRID_LAYOUT_VIDEO_BLOGS
  | GlobalTeaserLayout;

type GridConfig = Record<
  TeaserLayout,
  { config: Record<string, any>; styles: Record<string, string> }
>;

export const gridConfig: GridConfig = {
  ...globalGridConfig,
  [GRID_LAYOUT_ENTITY_QUEUE_SWISS_INSURANCE]: {
    config: entityQueueSv,
    styles: entityQueueSvStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST]: {
    config: entityQueueAdditionalPublicationsFirst,
    styles: entityQueueAdditionalPublicationsFirstStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS]: {
    config: entityQueueAdditionalPublications,
    styles: entityQueueAdditionalPublicationsStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_DEFAULT]: {
    config: entityQueueDefault,
    styles: entityQueueDefaultStyles,
  },
  [GRID_LAYOUT_CONTENT_STAGE]: {
    config: contentStage,
    styles: contentStageStyles,
  },
  [GRID_LAYOUT_CONTENT_STAGE_FIRST]: {
    config: contentStageFirst,
    styles: contentStageFirstStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_SV_HOME]: {
    config: entityQueueSvHome,
    styles: entityQueueSvHomeStyles,
  },
  [GRID_LAYOUT_ENTITY_QUEUE_HZB_HOME]: {
    config: entityQueueHZBHome,
    styles: entityQueueHZBHomeStyles,
  },
  [GRID_LAYOUT_LATEST_HEADLESS]: {
    config: latestHeadlessStories,
    styles: latestHeadlessStoriesStyles,
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
  [GRID_LAYOUT_ENTITY_QUEUE_HOME]: {
    config: entityQueueHome,
    styles: entityQueueHomeStyles,
  },
  [GRID_LAYOUT_TEASER_3X2]: {
    config: teaser3x2,
    styles: teaser3x2Styles,
  },
  [GRID_LAYOUT_TEASER_3X2_FIRST]: {
    config: teaser3x2First,
    styles: teaser3x2FirstStyles,
  },
  [GRID_LAYOUT_TEASER_3X3]: {
    config: teaser3x3,
    styles: teaser3x3Styles,
  },
  [GRID_LAYOUT_TEASER_3X4]: {
    config: teaser3x4,
    styles: teaser3x4Styles,
  },
  [GRID_LAYOUT_TEASER_3X4_NO_ADS]: {
    config: teaser3x4NoAds,
    styles: teaser3x4NoAdsStyles,
  },
  [GRID_LAYOUT_TEASER_3X6]: {
    config: teaser3x6,
    styles: teaser3x6Styles,
  },
  [GRID_LAYOUT_TEASER_4X4]: {
    config: teaser4x4,
    styles: teaser4x4Styles,
  },
  [GRID_LAYOUT_TEASER_RANKING]: {
    config: teaserRanking,
    styles: teaserRankingStyles,
  },
  [GRID_LAYOUT_TEASER_RANKING_LIST]: {
    config: teaserRankingList,
    styles: teaserRankingListStyles,
  },
  [GRID_LAYOUT_ORGANIZATION_IN_NEWS_3X2]: {
    config: organizationInNews3x2,
    styles: organizationInNews3x2Styles,
  },
  [GRID_LAYOUT_TEAM_MEMBERS]: {
    config: teamMembers,
    styles: teamMembersStyles,
  },
  [GRID_LAYOUT_RECOMMENDATIONS]: {
    config: teaserRecommendations,
    styles: teaserRecommendationsStyles,
  },
  [GRID_LAYOUT_SM]: {
    config: teaserSM,
    styles: teaserSMStyles,
  },
  [GRID_LAYOUT_LANDINGPAGE_DEFAULT]: {
    config: landingPageDefault,
    styles: landingPageDefaultStyles,
  },
  [GRID_LAYOUT_VIDEO_BLOGS]: {
    config: videoBlogs,
    styles: videoBlogsStyles,
  },
};
