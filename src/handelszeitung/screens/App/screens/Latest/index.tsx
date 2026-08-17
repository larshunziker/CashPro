import React from 'react';
import compose from 'recompose/compose';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterfaceItem } from '../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Teaser from '../../components/Teaser';
import StatusPage from '../StatusPage';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { TeasableInterface } from '../../../../../shared/@types/gql';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_XS } from '../../../../../shared/constants/teaser';
import { SITE_TITLE } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './constants'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screen */
import { MAX_ITEMS, PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

type LatestPropsInner = RouterProps & {
  data: ApolloData & {
    environment: Route & {
      globalSearch: SearchableUnionConnection;
      routeByPath: {
        object: LandingPage;
      };
    };
  };
  sort: string;
  routeIsInitialPage: boolean;
  routeScreenReady: boolean;
};

const DEFAULT_PAGE_TITLE = 'Neueste Artikel';

const getFallbackTitle = (landingPage: LandingPage) =>
  `${landingPage?.title || DEFAULT_PAGE_TITLE} - ${SITE_TITLE}`;

const Latest = ({ data: { environment }, page }: LatestPropsInner) => {
  if (
    !environment ||
    !environment.globalSearch ||
    !environment.routeByPath ||
    !environment.routeByPath.object
  ) {
    return <StatusPage />;
  }

  const globalSearch = environment?.globalSearch;
  const gridItems = globalSearch?.edges;

  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const updateData = gridItems
    .map((item) => ensureTeaserInterfaceItem(item))
    .reduce(
      (updateData, item) => {
        const itemNode: TeasableInterface = item.node || null;

        if (
          globalSearch &&
          globalSearch.edges &&
          itemNode &&
          itemNode.publicationDate
        ) {
          updateData.items.push(itemNode);
        }

        return updateData;
      },
      {
        items: [],
      },
    );

  return (
    <TestFragment data-testid="latest-container">
      <div className={styles.Wrapper}>
        <div className={grid.Container}>
          <h2 className={styles.Title}>
            {environment.routeByPath.object?.title || DEFAULT_PAGE_TITLE}
          </h2>
        </div>
        {!!globalSearch?.count && (
          <div
            className={grid.Container}
            data-testid="search-results-container"
          >
            <div className={grid.Row}>
              <div className={grid.ColXs24}>
                <div>
                  {updateData.items &&
                    Array.isArray(updateData.items) &&
                    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
                    updateData.items.map((item) => (
                      <div
                        key={`latest-item-${item.id}`}
                        className={styles.Item}
                      >
                        <Teaser component={TEASER_LAYOUT_XS} {...item} />
                      </div>
                    ))}
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
