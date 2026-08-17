import classNames from 'classnames';
import entityQueueParagraphFactory, {
  EntityQueueParagraphPropsInner,
} from '../../../../../../../common/components/Paragraphs/components/EntityQueueParagraph/factory';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import TeaserGrid from '../../../TeaserGrid';
import Icon from '../../../Icon';
import {
  TRACKING_CLASS_ENTITY_QUEUE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
  GRID_LAYOUT_ENTITY_QUEUE_DEFAULT_FIRST,
} from '../../../TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

export const getGridLayoutByProps = ({
  isFirst,
}: EntityQueueParagraphPropsInner) => {
  return isFirst
    ? GRID_LAYOUT_ENTITY_QUEUE_DEFAULT_FIRST
    : GRID_LAYOUT_ENTITY_QUEUE_DEFAULT;
};

const EntityQueueParagraph = entityQueueParagraphFactory({
  ensureTeaserInterface,
  TeaserGrid,
  Icon,
  gridConfigLayout: getGridLayoutByProps,
  trackingClass: classNames(
    TRACKING_CLASS_PARAGRAPH,
    TRACKING_CLASS_ENTITY_QUEUE_PARAGRAPH,
  ),
  styles: {
    TitleWrapper: '',
    InnerContainer: classNames(grid.Container, styles.TitleWrapper),
    Title: styles.Title,
    IconRight: styles.IconRight,
  },
});

export default EntityQueueParagraph;
