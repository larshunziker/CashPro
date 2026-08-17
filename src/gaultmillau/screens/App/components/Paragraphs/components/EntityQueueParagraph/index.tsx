import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { generateMetaLinks } from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import selectLocationState from '../../../../../../../shared/selectors/locationStateSelector';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Helmet from '../../../Helmet';
import TeaserGrid from '../../../TeaserGrid';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../Pager';
import { LANDING_PAGE_TYPE_HOME } from '../../../../../../../shared/constants/content';
import {
  TRACKING_CLASS_ENTITY_QUEUE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import { LANDING_PAGE_GRID_ITEMS } from '../../../../screens/LandingPage/constants';
import {
  GRID_LAYOUT_HERO_SLIDER,
  GRID_LAYOUT_HOME_BOTTOM,
  GRID_LAYOUT_HOME_TOP,
  GRID_LAYOUT_MIXED,
} from '../../../TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { EntityQueueParagraphProps } from './typings';

export type EntityQueueParagraphPropsInner = EntityQueueParagraphProps & {
  locationBeforeTransitions: Partial<RaschRouterLocation>;
};

const EntityQueueParagraph = ({
  entityQueue,
  locationBeforeTransitions,
  page,
  origin,
}: EntityQueueParagraphPropsInner) => {
  if (
    !entityQueue ||
    !entityQueue.entityQueue ||
    !entityQueue.entityQueue.items ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    entityQueue.entityQueue.items.edges.length === 0
  ) {
    return null;
  }

  const isHome = origin === LANDING_PAGE_TYPE_HOME;

  const numberCount = entityQueue.entityQueue.items.count || 0;
  const totalPages = Math.ceil(numberCount / LANDING_PAGE_GRID_ITEMS);
  let metaLinks: Array<Record<string, string>>;
  if (!isHome) {
    metaLinks = generateMetaLinks(
      locationBeforeTransitions,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string | undefined'. */
      null,
      page,
      totalPages,
    );
  }

  const layoutTable = {
    true: {
      'split-top': GRID_LAYOUT_HOME_TOP,
      'split-bottom': GRID_LAYOUT_HOME_BOTTOM,
    },
    false: {
      'split-top': GRID_LAYOUT_MIXED,
      'split-bottom': GRID_LAYOUT_MIXED,
    },
  };

  const gridLayout =
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ true */
    layoutTable[isHome.toString()][entityQueue.style] || GRID_LAYOUT_MIXED;

  const hasHeroSlider = gridLayout === GRID_LAYOUT_HOME_TOP;

  const entityQueueItems =
    (!hasHeroSlider && entityQueue.entityQueue.items.edges) ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    entityQueue.entityQueue.items.edges.slice(3);

  return (
    <div
      data-testid="entity-queue-paragraph-wrapper"
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_ENTITY_QUEUE_PARAGRAPH,
      )}
    >
      {
        // splitting EQ items for heroSlider on Home (first 3 items)
        hasHeroSlider && (
          <div className="container-wrapper">
            <TeaserGrid
              items={ensureTeaserInterface(
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                entityQueue.entityQueue.items.edges.slice(0, 3),
              )}
              layout={GRID_LAYOUT_HERO_SLIDER}
            />
          </div>
        )
      }
      <TeaserGrid
        items={ensureTeaserInterface(entityQueueItems)}
        layout={gridLayout}
      />
      {!isHome && (
        <TestFragment data-testid="entity-queue-paragraph-pager">
          {/* @ts-ignore TODO: TS2454 ->  Variable 'metaLinks' is used before being assigned. */}
          <Helmet link={metaLinks} />
          <div className={grid.Container}>
            <Pager
              itemsCount={numberCount}
              itemsPerPage={LANDING_PAGE_GRID_ITEMS}
              currentPage={page}
              component={PAGER_TYPE_PAGE_LOADER}
            />
          </div>
        </TestFragment>
      )}
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (state) => ({
  locationBeforeTransitions:
    selectLocationState(state).locationBeforeTransitions,
});

export default connect(mapStateToProps)(EntityQueueParagraph);
