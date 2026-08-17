import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import OverviewPageHeader from '../../components/OverviewPageHeader';
import Teaser from '../../components/Teaser';
import StatusPage from '../StatusPage';
import GridDividerLatest from './components/GridDividerLatest';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { formatDay } from './formatDay';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_WIDE } from '../../../../../shared/constants/teaser';
import { SITE_TITLE } from '../../constants';
import { MAX_ITEMS, PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LatestProps } from './typings';

type LatestPropsInner = LatestProps & {
  data: ApolloData & {
    environment: Route & {
      globalSearch: SearchableUnionConnection;
      routeByPath: Route & {
        object: { title?: string };
      };
    };
  };
  sort: string;
  routeIsInitialPage: boolean;
  routeScreenReady: boolean;
};

const DIVIDER = 'divider';
const TEASER = 'teaser';

const getFallbackTitle = (landingPage: LandingPage) =>
  `${landingPage?.title || 'Das Neueste'} - ${SITE_TITLE}`;

const Latest = ({ data: { environment }, page }: LatestPropsInner) => {
  if (!environment || !environment.globalSearch) {
    return null;
  }

  const globalSearch = environment?.globalSearch;
  const gridItems = globalSearch?.edges;
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  let previousElapsedTime: string = null;

  const landingPage = environment?.routeByPath?.object;

  const updateData = ensureTeaserInterface(gridItems).reduce(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'updateData' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    (updateData, item) => {
      const itemNode = item.node || null;

      if (
        globalSearch &&
        globalSearch.edges &&
        itemNode &&
        itemNode.publicationDate
      ) {
        const currentElapsedTime: string = itemNode
          ? formatDay(itemNode.publicationDate)
          : '';

        const isDateSameAsPreviousNode =
          currentElapsedTime === previousElapsedTime;

        if (!isDateSameAsPreviousNode) {
          updateData.items.push({
            type: DIVIDER,
            node: itemNode,
          });
        }

        previousElapsedTime = currentElapsedTime;

        updateData.items.push({
          type: TEASER,
          node: itemNode,
        });
      }

      return updateData;
    },
    {
      items: [],
    },
  );

  if (page !== 1 && !globalSearch?.edges?.length) {
    return <StatusPage />;
  }

  return (
    <TestFragment data-testid="latest-container">
      <div className={styles.Wrapper}>
        <OverviewPageHeader
          title={landingPage?.title || 'Das Neueste'}
          isCentered
        />
        {globalSearch?.count && (
          <div
            className={grid.Container}
            data-testid="search-results-container"
          >
            <div className={grid.Row}>
              <div
                className={classNames(
                  grid.ColOffsetMd4,
                  grid.ColXs24,
                  grid.ColMd16,
                )}
              >
                <div className={styles.Timeline}>
                  {updateData.items &&
                    Array.isArray(updateData.items) &&
                    updateData.items.length > 0 &&
                    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
                    /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
                    updateData.items.map((item, index) => {
                      if (item.type === DIVIDER) {
                        return (
                          <div
                            key={`latest-item-${index}`}
                            className={classNames({
                              [styles.DividerWrapper]: index > 0,
                            })}
                          >
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
                              component={TEASER_LAYOUT_WIDE}
                              {...item.node}
                            />
                          </div>
                        );
                      }
                    })}
                </div>
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
      </div>
    </TestFragment>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: LatestPropsInner) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    getFallbackTitle: (mapProps: LatestPropsInner): string =>
      getFallbackTitle(mapProps.data?.environment?.routeByPath?.object),
    getNodesCount: () => MAX_ITEMS,
    pageSize: PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
  withAppNexus({
    parseTrackingData,
  }),
)(Latest);
