import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import EditButtons from '../../components/EditButtons';
import TeaserGrid from '../../components/TeaserGrid';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../components/Pager';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_2X5 } from '../../components/TeaserGrid/gridConfigs/constants';
import { PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { HotTenProps } from './typings';

type HotTenPropsInner = HotTenProps & {
  data: {
    environment: {
      routeByPath: {
        object: LandingPage;
      };
      globalSearch: {
        count: number;
        edges: [{ node: Article }];
      };
    };
  };
};

const getFallbackTitle = () => 'hot ten';

const HotTen = ({ data, page }: HotTenPropsInner) => {
  if (
    !data ||
    !data?.environment?.routeByPath ||
    !data?.environment?.routeByPath.object ||
    !data?.environment?.globalSearch
  ) {
    return null;
  }

  const hotTenPage = data?.environment?.routeByPath.object;

  return (
    <div className={`hot-ten-overview ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={hotTenPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={hotTenPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={hotTenPage?.cloneContentUri}
      />
      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={classNames(grid.ColXs24, styles.Header)}>
            <h1 className={styles.HeaderTitle}>
              {hotTenPage.title || getFallbackTitle()}
            </h1>
          </div>
          <div
            className={classNames(
              grid.ColSm20,
              grid.ColMd16,
              grid.ColOffsetSm2,
              grid.ColOffsetMd4,
            )}
          >
            <span className={styles.Lead}>{hotTenPage.lead}</span>
          </div>
          <div className={grid.ColXs24}>
            <div className={styles.DividerThick} />
          </div>
        </div>
      </div>
      {data?.environment?.globalSearch &&
        data?.environment?.globalSearch.edges &&
        data?.environment?.globalSearch.edges.length > 0 && (
          <TeaserGrid
            items={ensureTeaserInterface(data?.environment?.globalSearch.edges)}
            layout={GRID_LAYOUT_TEASER_2X5}
          />
        )}
      {data?.environment?.globalSearch?.count && (
        <Pager
          itemsCount={data?.environment?.globalSearch?.count || 0}
          itemsPerPage={PAGE_SIZE}
          currentPage={page}
          component={PAGER_TYPE_PAGE_LOADER}
        />
      )}
    </div>
  );
};

export default compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps?.data?.routeByPath?.object || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps?.data?.environment?.globalSearch?.count || 0,
    pageSize: PAGE_SIZE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getFallbackTitle: (mapProps) => (!!mapProps && getFallbackTitle()) || '',
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps.data?.environment?.globalSearch?.edges,
    hasBreadcrumbs: () => false,
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'HotTen',
      }),
  }),
)(HotTen);
