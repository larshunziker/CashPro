import { entityQueueDefault } from './entityQueueDefault';
import { fullquoteCryptoCurrencies } from './fullquoteCryptoCurrencies';
import { fullquoteDefault } from './fullquoteDefault';
import { fullquoteDerivateSimulator } from './fullquoteDerivateSimulator';
import { fullquoteDerivative } from './fullquoteDerivative';
import { fullquoteDiverse } from './fullquoteDiverse';
import { fullquoteFonds } from './fullquoteFonds';
import { fullquoteIndices } from './fullquoteIndices';
import { fullquoteInteractiveChart } from './fullquoteInteractiveChart';
import { fullquoteInteractiveChartHybrid } from './fullquoteInteractiveChartHybrid';
import { fullquoteInterest } from './fullquoteInterest';
import { fullquoteNewEmissions } from './fullquoteNewEmissions';
import { fullquoteObligations } from './fullquoteObligations';
import { fullquoteRawMaterials } from './fullquoteRawMaterials';
import { fullquoteStock } from './fullquoteStock';
import { fullquoteWikifolio } from './fullquoteWikifolio';
import { landingPageDefault } from './landingPageDefault';
import { portfolioNews } from './portfolioNews';
import { teaser3x2 } from './teaser3x2';
import { teaser3x4 } from './teaser3x4';
import { teaserBookmark4x4 } from './teaserBookmark4x4';
import { teaserOverviewPage } from './teaserOverviewPage';
import { teaserStage1Item } from './teaserStage/teaserStage1Item';
import { teaserStage2Items } from './teaserStage/teaserStage2Items';
import { teaserStage3Items } from './teaserStage/teaserStage3Items';
import { teaserStageDefault } from './teaserStage/teaserStageDefault';
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
  GRID_LAYOUT_TEASER_STAGE_DEFAULT,
  GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST,
  GRID_LAYOUT_TEASER_STAGE_UNLIMITED,
} from '../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
  GRID_LAYOUT_FULLQUOTE_CRYPTO_CURRENCIES,
  GRID_LAYOUT_FULLQUOTE_DEFAULT,
  GRID_LAYOUT_FULLQUOTE_DERIVATES_SIMULATOR,
  GRID_LAYOUT_FULLQUOTE_DERIVATIVE,
  GRID_LAYOUT_FULLQUOTE_DIVERSE,
  GRID_LAYOUT_FULLQUOTE_FONDS,
  GRID_LAYOUT_FULLQUOTE_INDICES,
  GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART,
  GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART_HYBRID,
  GRID_LAYOUT_FULLQUOTE_INTEREST,
  GRID_LAYOUT_FULLQUOTE_NEW_EMISSIONS,
  GRID_LAYOUT_FULLQUOTE_OBLIGATIONS,
  GRID_LAYOUT_FULLQUOTE_RAW_MATERIALS,
  GRID_LAYOUT_FULLQUOTE_STOCK,
  GRID_LAYOUT_FULLQUOTE_WIKIFOLIO,
  GRID_LAYOUT_LANDINGPAGE_DEFAULT,
  GRID_LAYOUT_PORTFOLIO_NEWS,
  GRID_LAYOUT_TEASER_3X2,
  GRID_LAYOUT_TEASER_3X4,
  GRID_LAYOUT_TEASER_BOOKMARK_4X4,
  GRID_LAYOUT_TEASER_OVERVIEWPAGE,
} from './constants';
import entityQueueDefaultStyles from './entityQueueDefault/styles.legacy.css';
import fullquoteCryptoCurrenciesStyles from './fullquoteCryptoCurrencies/styles.legacy.css';
import fullquoteDefaultStyles from './fullquoteDefault/styles.legacy.css';
import fullquoteDerivateSimulatorStyles from './fullquoteDerivateSimulator/styles.legacy.css';
import fullquoteDerivativeStyles from './fullquoteDerivative/styles.legacy.css';
import fullquoteDiverseStyles from './fullquoteDiverse/styles.legacy.css';
import fullquoteFondsStyles from './fullquoteFonds/styles.legacy.css';
import fullquoteIndicesStyles from './fullquoteIndices/styles.legacy.css';
import fullquoteInteractiveChartStyles from './fullquoteInteractiveChart/styles.legacy.css';
import fullquoteInteractiveChartHybridStyles from './fullquoteInteractiveChartHybrid/styles.legacy.css';
import fullquoteInterestStyles from './fullquoteInterest/styles.legacy.css';
import fullquoteNewEmissionsStyles from './fullquoteNewEmissions/styles.legacy.css';
import fullquoteObligationsStyles from './fullquoteObligations/styles.legacy.css';
import fullquoteRawMaterialsStyles from './fullquoteRawMaterials/styles.legacy.css';
import fullquoteStockStyles from './fullquoteStock/styles.legacy.css';
import fullquoteWikifolioStyles from './fullquoteWikifolio/styles.legacy.css';
import landingPageDefaultStyles from './landingPageDefault/styles.legacy.css';
import portfolioNewsStyles from './portfolioNews/styles.legacy.css';
import teaser3x2Styles from './teaser3x2/styles.legacy.css';
import teaser3x4Styles from './teaser3x4/styles.legacy.css';
import teaserBookmark4x4Styles from './teaserBookmark4x4/styles.legacy.css';
import teaserOverviewPageDefaultStyles from './teaserOverviewPage/styles.legacy.css';
import teaserStage1ItemStyles from './teaserStage/teaserStage1Item/styles.legacy.css';
import teaserStage2ItemsStyles from './teaserStage/teaserStage2Items/styles.legacy.css';
import teaserStage3ItemsStyles from './teaserStage/teaserStage3Items/styles.legacy.css';
import teaserStageDefaultStyles from './teaserStage/teaserStageDefault/styles.legacy.css';
import teaserStageRandomizedListStyles from './teaserStage/teaserStageRandomizedList/styles.legacy.css';
import teaserStageUnlimitedStyles from './teaserStage/teaserStageUnlimited/styles.legacy.css';

export type TeaserLayout =
  | GlobalTeaserLayout
  | typeof GRID_LAYOUT_ENTITY_QUEUE_DEFAULT
  | typeof GRID_LAYOUT_TEASER_3X2
  | typeof GRID_LAYOUT_TEASER_3X4
  | typeof GRID_LAYOUT_PORTFOLIO_NEWS
  | typeof GRID_LAYOUT_FULLQUOTE_DEFAULT
  | typeof GRID_LAYOUT_FULLQUOTE_WIKIFOLIO
  | typeof GRID_LAYOUT_FULLQUOTE_DERIVATIVE
  | typeof GRID_LAYOUT_FULLQUOTE_INDICES
  | typeof GRID_LAYOUT_FULLQUOTE_FONDS
  | typeof GRID_LAYOUT_FULLQUOTE_STOCK
  | typeof GRID_LAYOUT_FULLQUOTE_DIVERSE
  | typeof GRID_LAYOUT_FULLQUOTE_OBLIGATIONS
  | typeof GRID_LAYOUT_FULLQUOTE_RAW_MATERIALS
  | typeof GRID_LAYOUT_FULLQUOTE_NEW_EMISSIONS
  | typeof GRID_LAYOUT_FULLQUOTE_INTEREST
  | typeof GRID_LAYOUT_FULLQUOTE_CRYPTO_CURRENCIES
  | typeof GRID_LAYOUT_TEASER_OVERVIEWPAGE
  | typeof GRID_LAYOUT_LANDINGPAGE_DEFAULT
  | typeof GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART
  | typeof GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART_HYBRID
  | typeof GRID_LAYOUT_FULLQUOTE_DERIVATES_SIMULATOR;

type GridConfig = Record<
  TeaserLayout,
  { config: Record<string, any>; styles: Record<string, string> }
>;

export const gridConfig: GridConfig = {
  ...globalGridConfig,
  [GRID_LAYOUT_ENTITY_QUEUE_DEFAULT]: {
    config: entityQueueDefault,
    styles: entityQueueDefaultStyles,
  },
  [GRID_LAYOUT_TEASER_3X2]: {
    config: teaser3x2,
    styles: teaser3x2Styles,
  },
  [GRID_LAYOUT_TEASER_3X4]: {
    config: teaser3x4,
    styles: teaser3x4Styles,
  },
  [GRID_LAYOUT_PORTFOLIO_NEWS]: {
    config: portfolioNews,
    styles: portfolioNewsStyles,
  },
  [GRID_LAYOUT_TEASER_OVERVIEWPAGE]: {
    config: teaserOverviewPage,
    styles: teaserOverviewPageDefaultStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_DEFAULT]: {
    config: fullquoteDefault,
    styles: fullquoteDefaultStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_STOCK]: {
    config: fullquoteStock,
    styles: fullquoteStockStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_DERIVATIVE]: {
    config: fullquoteDerivative,
    styles: fullquoteDerivativeStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_INDICES]: {
    config: fullquoteIndices,
    styles: fullquoteIndicesStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_FONDS]: {
    config: fullquoteFonds,
    styles: fullquoteFondsStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_DIVERSE]: {
    config: fullquoteDiverse,
    styles: fullquoteDiverseStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_OBLIGATIONS]: {
    config: fullquoteObligations,
    styles: fullquoteObligationsStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_RAW_MATERIALS]: {
    config: fullquoteRawMaterials,
    styles: fullquoteRawMaterialsStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_NEW_EMISSIONS]: {
    config: fullquoteNewEmissions,
    styles: fullquoteNewEmissionsStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_CRYPTO_CURRENCIES]: {
    config: fullquoteCryptoCurrencies,
    styles: fullquoteCryptoCurrenciesStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_INTEREST]: {
    config: fullquoteInterest,
    styles: fullquoteInterestStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_WIKIFOLIO]: {
    config: fullquoteWikifolio,
    styles: fullquoteWikifolioStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_DERIVATES_SIMULATOR]: {
    config: fullquoteDerivateSimulator,
    styles: fullquoteDerivateSimulatorStyles,
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
  [GRID_LAYOUT_LANDINGPAGE_DEFAULT]: {
    config: landingPageDefault,
    styles: landingPageDefaultStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART]: {
    config: fullquoteInteractiveChart,
    styles: fullquoteInteractiveChartStyles,
  },
  [GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART_HYBRID]: {
    config: fullquoteInteractiveChartHybrid,
    styles: fullquoteInteractiveChartHybridStyles,
  },
  [GRID_LAYOUT_TEASER_BOOKMARK_4X4]: {
    config: teaserBookmark4x4,
    styles: teaserBookmark4x4Styles,
  },
};
