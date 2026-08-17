import React, { ReactElement } from 'react';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import classNames from 'classnames';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withPagePager from '../../../../../shared/decorators/withPagePager';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Teaser from '../Teaser';
import TeaserGrid from '../TeaserGrid';
import OverviewPageHeader, {
  OVERVIEW_PAGE_HEADER_BLOG,
  OVERVIEW_PAGE_HEADER_BLOG_KEY,
  OVERVIEW_PAGE_HEADER_CELEBRITY,
  OVERVIEW_PAGE_HEADER_CELEBRITY_KEY,
  OVERVIEW_PAGE_HEADER_DEFAULT,
  OVERVIEW_PAGE_HEADER_DEFAULT_KEY,
  OVERVIEW_PAGE_HEADER_DOSSIER,
  OVERVIEW_PAGE_HEADER_DOSSIER_KEY,
  OVERVIEW_PAGE_HEADER_VIDEO_BLOG,
  OVERVIEW_PAGE_HEADER_VIDEO_BLOG_KEY,
} from '../OverviewPageHeader';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../Pager';
import { TeaserLayout } from '../TeaserGrid/gridConfigs';
import { TEASER_LAYOUT_HERO_XL } from '../../../../../shared/constants/teaser';
import {
  TRACKING_TEASER_PARAGRAPH_INDEX,
  TRACKING_TEASER_PARAGRAPH_TYPE,
  TRACKING_TEASER_POSITION,
} from '../../../../../shared/constants/tracking';
import { CHANNEL_TYPE_SPECIAL } from '../../screens/Channel/constants';
import { OVERVIEW_PAGE_SIZE } from '../TeaserGrid/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import type { OverviewPageProps } from './typings';

export type OverviewPagePropsInner = OverviewPageProps & {
  routePathname: string;
};

const overviewPageHeaderLayouts = {
  [OVERVIEW_PAGE_HEADER_DEFAULT_KEY]: OVERVIEW_PAGE_HEADER_DEFAULT,
  [OVERVIEW_PAGE_HEADER_CELEBRITY_KEY]: OVERVIEW_PAGE_HEADER_CELEBRITY,
  [OVERVIEW_PAGE_HEADER_DOSSIER_KEY]: OVERVIEW_PAGE_HEADER_DOSSIER,
  [OVERVIEW_PAGE_HEADER_BLOG_KEY]: OVERVIEW_PAGE_HEADER_BLOG,
  [OVERVIEW_PAGE_HEADER_VIDEO_BLOG_KEY]: OVERVIEW_PAGE_HEADER_VIDEO_BLOG,
};

const OverviewPage = ({
  page,
  routeObject,
  routePathname,
  gridConfig,
  termSettings,
  pageSize,
  paragraphType,
}: OverviewPagePropsInner): ReactElement => {
  if (
    !routeObject ||
    !routeObject.entities ||
    !routeObject.entities.edges ||
    !Array.isArray(routeObject.entities.edges) ||
    routeObject.entities.edges.length < 1
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const hasHeroTeaser = page === 1 && routeObject?.settings?.hasHeroTeaser;

  const gridItems =
    hasHeroTeaser &&
    routeObject &&
    routeObject.entities &&
    routeObject.entities.edges
      ? routeObject.entities.edges.slice(1)
      : routeObject?.entities?.edges || [];

  const gridLayout: TeaserLayout =
    (routeObject?.settings?.teaserGridLayout as TeaserLayout) || 'mixed';

  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<TermSettings> | undefined' is not assignable to type 'TermSettings'. */
  const settings: TermSettings = termSettings || routeObject?.settings;
  const trackingParagraphType: string = paragraphType || 'OverviewPageScreen';

  return (
    <TestFragment data-testid="overviewpage-container">
      {
        // @ts-ignore
        routeObject.channelType !== CHANNEL_TYPE_SPECIAL && (
          <OverviewPageHeader
            // @ts-ignore
            title={settings?.title || routeObject.label}
            lead={settings?.lead}
            headerImage={settings?.headerImage || null}
            component={
              (settings?.headerImage &&
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ default */
                overviewPageHeaderLayouts[
                  settings?.headerLayout || OVERVIEW_PAGE_HEADER_DEFAULT_KEY
                ]) ||
              OVERVIEW_PAGE_HEADER_DEFAULT
            }
            alertId={routeObject?.tid || ''}
            alertType={routeObject?.__typename || ''}
            showFollowButton={!settings}
          />
        )
      }
      {hasHeroTeaser && (
        <div
          className={grid.Container}
          data-testid="overviewpage-heroteaser-container"
        >
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.Col24,
                grid.ColXl18,
                grid.ColOffsetXl3,
              )}
            >
              <div className={styles.HeroWrapper}>
                <Teaser
                  key={`heroteaser-${routePathname}-${page}`}
                  component={TEASER_LAYOUT_HERO_XL}
                  {...ensureTeaserInterface(
                    routeObject?.entities?.edges?.[0]?.node,
                  )}
                  trackingData={[
                    {
                      type: TRACKING_TEASER_PARAGRAPH_TYPE,
                      value: trackingParagraphType,
                    },
                    {
                      type: TRACKING_TEASER_PARAGRAPH_INDEX,
                      value: '0',
                    },
                    {
                      type: TRACKING_TEASER_POSITION,
                      value: '1',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <TeaserGrid
        key={`heroteaser-${routePathname}-${page}`}
        layout={gridConfig || gridLayout}
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        items={gridItems.map((item) => ensureTeaserInterface(item.node))}
      />

      <div className={grid.Container}>
        <Pager
          component={PAGER_TYPE_PAGE_LOADER}
          currentPage={page}
          itemsCount={routeObject.entities.count || 0}
          itemsPerPage={pageSize || OVERVIEW_PAGE_SIZE}
        />
      </div>
    </TestFragment>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
});

export default compose<any, any>(
  connect(mapStateToProps),
  withPagePager,
)(OverviewPage);
