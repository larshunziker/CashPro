import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import {
  TIME_ELAPSED_FORMAT_UP_TO_YEARS,
  getFormattedElapsedDate,
} from '../../../../../shared/helpers/dateTimeElapsed';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import GridDividerLatest from '../../components/GridDividerLatest';
import Teaser from '../../components/Teaser';
import OverviewPageHeader, {
  OVERVIEW_PAGE_HEADER_DEFAULT,
} from '../../components/OverviewPageHeader';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_LATEST } from '../../components/../../../../shared/constants/teaser';
import { SITE_TITLE } from '../../constants';
import { MAX_ITEMS, PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LatestProps } from './typings';

type LatestPropsInner = LatestProps & {
  data: ApolloData & {
    environment: Route & {
      globalSearch: SearchableUnionConnection;
      routeByPath: Route;
    };
  };
  sort: string;
  routeIsInitialPage: boolean;
  routeScreenReady: boolean;
};

const DIVIDER = 'divider';
const TEASER = 'teaser';

const getFallbackTitle = (landingPage: LandingPage) =>
  `${landingPage?.title || 'Latest'} - ${SITE_TITLE}`;

const Latest = ({ data: { environment }, page }: LatestPropsInner) => {
  if (
    !environment ||
    !environment.globalSearch ||
    !environment.routeByPath ||
    !environment.routeByPath.object
  ) {
    return null;
  }

  const globalSearch = environment?.globalSearch;
  const gridItems = globalSearch?.edges;
  let previousElapsedTime: string | null = null;
  let previousChannelTitle: string | null = null;

  type LatestUpdateItem = {
    type: typeof DIVIDER | typeof TEASER;
    node: TeasableInterfaceNode;
  };

  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const updateData = gridItems
    .map((item) => ensureTeaserInterface(item))
    .reduce(
      (updateData, item) => {
        const itemNode = item.node || null;

        if (
          globalSearch &&
          globalSearch.edges &&
          itemNode &&
          itemNode.publicationDate
        ) {
          const currentElapsedTime: string | null = itemNode
            ? getFormattedElapsedDate({
                createDate: itemNode.publicationDate,
                format: TIME_ELAPSED_FORMAT_UP_TO_YEARS,
              })
            : '';

          const currentChannelTitle = itemNode?.channel?.title || '';

          const isDateSameAsPreviousNode =
            currentElapsedTime === previousElapsedTime;

          const isChannelSameAsPreviousNode =
            currentChannelTitle === previousChannelTitle;

          if (!isDateSameAsPreviousNode || !isChannelSameAsPreviousNode) {
            updateData.items.push({
              type: DIVIDER,
              node: itemNode,
            } as LatestUpdateItem);
          }

          previousElapsedTime = currentElapsedTime;
          previousChannelTitle = currentChannelTitle;

          updateData.items.push({
            type: TEASER,
            node: itemNode,
          } as LatestUpdateItem);
        }

        return updateData;
      },
      {
        items: [] as LatestUpdateItem[],
      },
    );

  return (
    <TestFragment data-testid="latest-container">
      <OverviewPageHeader
        title={'Latest'}
        component={OVERVIEW_PAGE_HEADER_DEFAULT}
      />
      {globalSearch?.count && (
        <div className={grid.Container} data-testid="search-results-container">
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColOffsetXl5,
                grid.ColOffsetSm4,
                grid.ColOffsetMd3,
                grid.ColOffsetXs2,
                grid.ColXs20,
                grid.ColSm15,
                grid.ColMd18,
                grid.ColXl14,
              )}
            >
              <div className={styles.Timeline}>
                {updateData.items &&
                  Array.isArray(updateData.items) &&
                  updateData.items.length > 0 &&
                  updateData.items.map((item: any, index: number) => {
                    /* @ts-ignore TODO: TS2339 ->  Property 'type' does not exist on type 'never'. */
                    if (item.type === DIVIDER) {
                      return (
                        <div
                          key={`latest-item-${index}`}
                          className={styles.Item}
                        >
                          {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'never'. */}
                          <GridDividerLatest data={item.node} />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={`latest-item-${index}`}
                          className={styles.Item}
                        >
                          <Teaser
                            component={TEASER_LAYOUT_LATEST}
                            /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'never'. */
                            {...item.node}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
              <div className={styles.TimeLineTrail} />
              <Pager
                component={PAGER_TYPE_PAGE_LOADER}
                currentPage={page}
                itemsCount={MAX_ITEMS}
                itemsPerPage={PAGE_SIZE}
              />
            </div>
          </div>
        </div>
      )}
    </TestFragment>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: LatestPropsInner) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    getFallbackTitle: (mapProps: LatestPropsInner): string =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<RouteObjectInterface> | undefined' is not assignable to parameter of type 'LandingPage'. */
      getFallbackTitle(mapProps.data?.environment?.routeByPath?.object),
    getNodesCount: () => MAX_ITEMS,
    pageSize: PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
  withAppNexus({
    parseTrackingData,
  }),
)(Latest);
