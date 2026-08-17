import { connect } from 'react-redux';
import classNames from 'classnames';
import entityQueueParagraphFactory from '../../../../../../../common/components/Paragraphs/components/EntityQueueParagraph/factory';
import { ensureTeaserInterfaces } from '../../../Teaser/shared/helpers';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import TeaserGrid from '../../../TeaserGrid';
import { TeaserLayout } from '../../../TeaserGrid/gridConfigs';
import {
  TRACKING_CLASS_ENTITY_QUEUE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_FAMILY,
  MAIN_CHANNEL_HOME,
  MAIN_CHANNEL_PEOPLE,
  MAIN_CHANNEL_STYLE,
} from '../../../../../App/constants';
import { MENU_OVERLAY } from '../../../Navigation/components/NavigationMenu/constants';
import {
  GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM,
  GRID_LAYOUT_BODY_AND_HEALTH_TOP,
  GRID_LAYOUT_FAMILY_TOP,
  GRID_LAYOUT_HOME_BOTTOM,
  GRID_LAYOUT_HOME_TOP,
  GRID_LAYOUT_MENU_OVERLAY,
  GRID_LAYOUT_PEOPLE_TOP,
  GRID_LAYOUT_STYLE_BOTTOM,
  GRID_LAYOUT_STYLE_TOP,
} from '../../../TeaserGrid/gridConfigs/constants';
import { ENTITY_QUEUE_STYLE_SPLIT_TOP } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { EntityQueueParagraphProps } from '../../../../../../../common/components/Paragraphs/components/EntityQueueParagraph/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type EntityQueueParagraphPropsInner = EntityQueueParagraphProps & {
  activeMainChannel: ActiveMainChannel;
};

export const getGridLayoutByProps = ({
  activeMainChannel,
  entityQueue,
  origin = '',
}: EntityQueueParagraphPropsInner): string => {
  let gridLayout: TeaserLayout = 'mixed';

  switch (activeMainChannel) {
    case MAIN_CHANNEL_HOME:
      if (entityQueue.style === ENTITY_QUEUE_STYLE_SPLIT_TOP) {
        gridLayout = GRID_LAYOUT_HOME_TOP;
      } else {
        gridLayout = GRID_LAYOUT_HOME_BOTTOM;
      }
      break;
    case MAIN_CHANNEL_PEOPLE:
      if (entityQueue.style === ENTITY_QUEUE_STYLE_SPLIT_TOP) {
        gridLayout = GRID_LAYOUT_PEOPLE_TOP;
      } else {
        gridLayout = GRID_LAYOUT_HOME_BOTTOM;
      }
      break;
    case MAIN_CHANNEL_STYLE:
      if (entityQueue.style === ENTITY_QUEUE_STYLE_SPLIT_TOP) {
        gridLayout = GRID_LAYOUT_STYLE_TOP;
      } else {
        gridLayout = GRID_LAYOUT_STYLE_BOTTOM;
      }
      break;
    case MAIN_CHANNEL_FAMILY:
      if (entityQueue.style === ENTITY_QUEUE_STYLE_SPLIT_TOP) {
        gridLayout = GRID_LAYOUT_FAMILY_TOP;
      } else {
        gridLayout = GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM;
      }
      break;
    case MAIN_CHANNEL_BODY_HEALTH:
      if (entityQueue.style === ENTITY_QUEUE_STYLE_SPLIT_TOP) {
        gridLayout = GRID_LAYOUT_BODY_AND_HEALTH_TOP;
      } else {
        gridLayout = GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM;
      }
      break;
  }

  // Special case: use GRID_LAYOUT_MENU_OVERLAY if paragraphsrenderer is called from Menu-Overlay
  if (origin === MENU_OVERLAY) {
    gridLayout = GRID_LAYOUT_MENU_OVERLAY;
  }

  return gridLayout;
};

const EntityQueueParagraph = entityQueueParagraphFactory({
  ensureTeaserInterface: ensureTeaserInterfaces,
  TeaserGrid,
  gridConfigLayout: getGridLayoutByProps,
  trackingClass: classNames(
    TRACKING_CLASS_PARAGRAPH,
    TRACKING_CLASS_ENTITY_QUEUE_PARAGRAPH,
  ),
  styles: {
    InnerContainer: grid.Container,
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(EntityQueueParagraph);
