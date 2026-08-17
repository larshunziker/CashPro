import classNames from 'classnames';
import entityQueueParagraphFactory from '../../../../../../../common/components/Paragraphs/components/EntityQueueParagraph/factory';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import Icon from '../../../Icon';
import TeaserGrid from '../../../TeaserGrid';
import {
  TRACKING_CLASS_ENTITY_QUEUE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import { FULLQUOTE_PAGE_TYPE } from '../../../../screens/FullquotePage/constants';
import {
  GRID_LAYOUT_TEASER_STAGE_2_ITEMS,
  GRID_LAYOUT_TEASER_STAGE_3_ITEMS,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { GRID_LAYOUT_ENTITY_QUEUE_DEFAULT } from '../../../TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';
import { EntityQueueParagraphProps } from '../../../../../../../common/components/Paragraphs/components/EntityQueueParagraph/typings';

export const getGridLayoutByProps = ({
  origin = '',
  entityQueue,
}: EntityQueueParagraphProps): string => {
  let gridLayout = GRID_LAYOUT_ENTITY_QUEUE_DEFAULT;

  // on fullquote pages, we want to show the fullquote teaser grid layout by given pageType
  if (origin && origin.indexOf(`${FULLQUOTE_PAGE_TYPE}-`) > -1) {
    gridLayout = origin.replace(`${FULLQUOTE_PAGE_TYPE}-`, '');
  }

  if (entityQueue?.style === 'teaser_stage') {
    const itemsCount = entityQueue?.entityQueue?.items?.edges?.length || 0;
    // minimum 2 items guaranteed by backend
    if (itemsCount === 2) {
      gridLayout = GRID_LAYOUT_TEASER_STAGE_2_ITEMS;
    } else if (itemsCount >= 3) {
      gridLayout = GRID_LAYOUT_TEASER_STAGE_3_ITEMS;
    }
  }

  return gridLayout;
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
    InnerContainer: '',
    Title: styles.Title,
    IconRight: styles.IconRight,
  },
});

export default EntityQueueParagraph;
