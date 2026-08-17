import classNames from 'classnames';
import teaserStageParagraphFactory from '../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/factory';
import TeaserGrid from '../../../TeaserGrid';
import { TeaserLayout } from '../../../TeaserGrid/gridConfigs';
import { TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST } from '../../../../../../../shared/constants/paragraphs';
import { PAGESCREEN_MARKETING_TYPE } from '../../../../screens/PageScreen/constants';
import styles from './styles.legacy.css';
import { TeaserStageParagraphProps } from '../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'teaserStage' implicitly has an 'any' type. */
const getStyleByProps = ({ origin, teaserStage }) => ({
  Wrapper: classNames({
    [styles.Wrapper]:
      teaserStage.style === TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST,
  }),
  SectionTitle: classNames(styles.SectionTitle, {
    [styles.RandomizedList]:
      teaserStage.style === TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST,
  }),
  TitleLink: classNames(styles.TitleLink, {
    [styles.MarketingPage]: origin === PAGESCREEN_MARKETING_TYPE,
    [styles.RandomizedList]:
      teaserStage.style === TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST,
  }),
});

export const getGridLayoutByProps = ({
  teaserStage,
}: TeaserStageParagraphProps): TeaserLayout => {
  const itemsCount = teaserStage?.entities?.edges?.length || 0;
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TeaserLayout'. */
  let layout: TeaserLayout = null;

  switch (itemsCount) {
    case 1:
      layout = 'teaserStage1Item';
      break;
    case 2:
      layout = 'teaserStage2Items';
      break;
    case 3:
      layout = 'teaserStage3Items';
      break;
    case 4:
      layout = 'teaserStageDefault';
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

const TeaserStageParagraph = teaserStageParagraphFactory({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'isHeadless' implicitly has an 'any' type. */
  ensureTeaserInterface: (item, isHeadless) => ({ ...item, isHeadless }),
  gridLayout: getGridLayoutByProps,
  /* @ts-ignore TODO: TS2322 ->  Type 'FunctionComponent<TeaserGridProps<TeaserLayout>>' is not assignable to type '(props */
  TeaserGridRenderer: () => TeaserGrid,
  styles: getStyleByProps,
});

export default TeaserStageParagraph;
