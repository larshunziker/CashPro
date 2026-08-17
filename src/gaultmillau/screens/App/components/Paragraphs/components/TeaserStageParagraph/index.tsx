import teaserStageParagraphFactory from '../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/factory';
import { ensureTeaserInterfaceItem } from '../../../Teaser/shared/helpers';
import TeaserGrid from '../../../TeaserGrid';
import { TeaserLayout } from '../../../TeaserGrid/gridConfigs';
import {
  GRID_LAYOUT_TEASER_STAGE_1_ITEM,
  GRID_LAYOUT_TEASER_STAGE_2_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_3_ITEMS,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST } from '../../../../../../../shared/constants/paragraphs';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { TeaserStageParagraphProps } from '../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/typings';

export type TeaserStageParagraphPropsInner = TeaserStageParagraphProps;

export const getGridLayoutByProps = ({
  teaserStage,
}: TeaserStageParagraphProps): TeaserLayout => {
  const itemsCount = teaserStage?.entities?.edges?.length || 0;
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TeaserLayout'. */
  let layout: TeaserLayout = null;

  switch (itemsCount) {
    case 1:
      layout = GRID_LAYOUT_TEASER_STAGE_1_ITEM;
      break;
    case 2:
    case 4:
      layout = GRID_LAYOUT_TEASER_STAGE_2_ITEMS;
      break;
    case 3:
      layout = GRID_LAYOUT_TEASER_STAGE_3_ITEMS;
      break;
    default:
      layout = 'teaserStageUnlimited';
      break;
  }

  if (teaserStage.style === TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST) {
    layout = 'teaserStageRandomizedList';
  }

  return layout;
};

export const getStyleByProps = ({}: TeaserStageParagraphPropsInner) => ({
  SectionTitle: styles.SectionTitle,
  TitleLink: styles.TitleLink,
  Container: grid.Container,
});

const TeaserStageParagraph = teaserStageParagraphFactory({
  ensureTeaserInterface: ensureTeaserInterfaceItem,
  gridLayout: getGridLayoutByProps,
  /* @ts-ignore TODO: TS2322 ->  Type 'FunctionComponent<TeaserGridProps<TeaserLayout>>' is not assignable to type '(props */
  TeaserGridRenderer: () => TeaserGrid,
  styles: getStyleByProps,
});

export default TeaserStageParagraph;
