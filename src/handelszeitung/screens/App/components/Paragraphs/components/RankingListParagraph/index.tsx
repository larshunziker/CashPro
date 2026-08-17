import classNames from 'classnames';
import rankingListParagraphFactory from '../../../../../../../common/components/Paragraphs/components/RankingListParagraph/factory';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import TeaserGrid from '../../../TeaserGrid';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_RANKING_LIST_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import { GRID_LAYOUT_TEASER_RANKING_LIST } from '../../../TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';

export default rankingListParagraphFactory({
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'GridConfig | ((props */
  gridConfig: null,
  gridLayout: GRID_LAYOUT_TEASER_RANKING_LIST,
  ensureTeaserInterface,
  TeaserGrid,
  trackingClass: classNames(
    TRACKING_CLASS_PARAGRAPH,
    TRACKING_CLASS_RANKING_LIST_PARAGRAPH,
  ),
  styles: {
    Wrapper: styles.Wrapper,
  },
});
