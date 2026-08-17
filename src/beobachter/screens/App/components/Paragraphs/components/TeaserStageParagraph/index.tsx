import classNames from 'classnames';
import teaserStageParagraphFactory from '../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/factory';
import TeaserGrid from '../../../TeaserGrid';
import { TeaserLayout } from '../../../TeaserGrid/gridConfigs';
import SVGIcon from '../../../SVGIcon';
import { TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST } from '../../../../../../../shared/constants/paragraphs';
import { PAGE_SCREEN_MARKETING_TYPE } from '../../../../screens/PageScreen/constants';
import {
  GRID_LAYOUT_ENTITY_QUEUE_COLUMN_MIXED,
  GRID_LAYOUT_SHOP_PRODUCT,
} from '../../../TeaserGrid/gridConfigs/constants';
import {
  GRID_LAYOUT_TEASER_STAGE_1_ITEM,
  GRID_LAYOUT_TEASER_STAGE_2_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_3_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_DEFAULT,
  GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST,
  GRID_LAYOUT_TEASER_STAGE_UNLIMITED,
  TYPE_RIGHT_WIDGET,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
import styles from './styles.legacy.css';
import { TeaserStageParagraphProps } from '../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
export const getStyleByProps = ({ origin }) => ({
  SectionTitle: styles.SectionTitle,
  TitleLink: classNames(styles.TitleLink, {
    [styles.MarketingPage]: origin === PAGE_SCREEN_MARKETING_TYPE,
  }),
  Header: styles.Header,
  Icon: styles.Icon,
});

export const getGridLayoutByProps = ({
  teaserStage,
  pageLayoutType,
  origin,
}: TeaserStageParagraphProps): TeaserLayout => {
  const itemsCount = teaserStage?.entities?.edges?.length || 0;
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TeaserLayout'. */
  let layout: TeaserLayout = null;
  const isInColumn = pageLayoutType === RIGHT_COLUMN_PAGE_LAYOUT_TYPE;

  if (teaserStage.anchorId === '__SHOP__') {
    return GRID_LAYOUT_SHOP_PRODUCT;
  }

  if (origin === TYPE_RIGHT_WIDGET) {
    return GRID_LAYOUT_ENTITY_QUEUE_COLUMN_MIXED;
  }

  switch (itemsCount) {
    case 1:
      layout = GRID_LAYOUT_TEASER_STAGE_1_ITEM;
      break;
    case 2:
      layout = GRID_LAYOUT_TEASER_STAGE_2_ITEMS;
      break;
    case 3:
      layout = GRID_LAYOUT_TEASER_STAGE_3_ITEMS;
      break;
    case 4:
      layout = isInColumn
        ? GRID_LAYOUT_TEASER_STAGE_2_ITEMS
        : GRID_LAYOUT_TEASER_STAGE_DEFAULT;
      break;

    default:
      layout = isInColumn
        ? GRID_LAYOUT_TEASER_STAGE_2_ITEMS
        : GRID_LAYOUT_TEASER_STAGE_UNLIMITED;
      break;
  }

  if (teaserStage.style === TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST) {
    layout = GRID_LAYOUT_TEASER_STAGE_RANDOMIZED_LIST;
  }

  return layout;
};

const TeaserStageParagraph = teaserStageParagraphFactory({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  ensureTeaserInterface: (item) => item,
  gridLayout: getGridLayoutByProps,
  /* @ts-ignore TODO: TS2322 ->  Type 'FunctionComponent<TeaserGridProps<TeaserLayout>>' is not assignable to type '(props */
  TeaserGridRenderer: () => TeaserGrid,
  SVGIcon,
  styles: getStyleByProps,
});

export default TeaserStageParagraph;
