import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useMatch } from 'react-router-dom';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withPagePager from '../../../../../shared/decorators/withPagePager';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setSearchQuery } from '../../../../../shared/actions/search';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import TestFragment from '../../../../../../src/shared/tests/components/TestFragment';
import Helmet from '../../components/Helmet';
import SearchForm from '../../components/SearchForm/themes/SearchFormResultPage';
import TeaserGrid from '../../components/TeaserGrid';
import SortOrder from './components/SortOrder';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { SITE_TITLE } from '../../../../screens/App/constants';
import { PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SearchProps } from './typings';

type SearchPropsInner = SearchProps & {
  data: ApolloData & {
    globalSearch: SearchableUnionGraphList;
  };
  sort: string;
  searchQuery: string;
  setStatusCode: typeof setStatusCode;
};

const Search = (props: SearchPropsInner) => {
  const { isSSR } = useSSRContext();
  const { data, sort, page, setStatusCode, searchQuery, loading } = props;
  const isSearch = useMatch('/suche/:searchQuery');
  const searchLoading = loading && isSearch;
  const globalSearch = data?.globalSearch || null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [dispatch, searchQuery]);

  const gridItems = data?.globalSearch?.edges || [];

  if (
    isSSR &&
    !searchLoading &&
    (!Array.isArray(gridItems) || !gridItems.length)
  ) {
    setStatusCode(404);
  }

  return (
    <TestFragment data-testid="search-container">
      <Helmet
        titleTemplate={`%s - ${SITE_TITLE}`}
        title={searchQuery}
        socialMetaValues={{
          field_short_title: searchQuery,
          field_short_description: searchQuery,
          field_heroimage: '',
          field_lead: searchQuery,
        }}
      />

      <div className={classNames(grid.Container, styles.Wrapper)}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <div className={styles.InputLabel}>Suchergebnis für:</div>
            <SearchForm
              minQueryLength={2}
              initialQuery={searchQuery}
              focusOnMount
            />
          </div>
        </div>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <SortOrder currentSortOrder={sort} />
          </div>
        </div>
      </div>

      {(searchLoading &&
        (!globalSearch || !globalSearch?.count || globalSearch?.count < 1) && (
          <div
            data-testid="search-loading-container"
            className={grid.Container}
          >
            <div className={grid.Row}>
              <div className={grid.ColXs24}>
                <div className={styles.Loading}>Wird geladen ...</div>
              </div>
            </div>
          </div>
        )) ||
        null}

      {(globalSearch && globalSearch?.count && globalSearch?.count > 0 && (
        <TestFragment data-testid="search-results-container">
          <TeaserGrid
            layout="teaserS4x4"
            items={gridItems.map((item) => ensureTeaserInterface(item.node))}
          />
          <div className={grid.Container}>
            <Pager
              component={PAGER_TYPE_PAGE_LOADER}
              currentPage={page}
              itemsCount={data.globalSearch.count}
              itemsPerPage={PAGE_SIZE}
              key={`search-result-pager-${searchQuery}`}
            />
          </div>
        </TestFragment>
      )) ||
        (!searchLoading && (
          <div
            data-testid="search-no-results-container"
            className={grid.Container}
          >
            <div className={grid.Row}>
              <div className={grid.ColXs24}>
                <div className={styles.NoResults}>
                  Keine Suchresultate zu «{searchQuery}»
                </div>
              </div>
            </div>
          </div>
        ))}
    </TestFragment>
  );
};

const mapDispatchToProps = {
  setStatusCode,
};

export default compose<any, any>(
  withParams,
  connect(null, mapDispatchToProps),
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps?.data?.globalSearch?.count || 0,
    pageSize: PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.data?.globalSearch?.edges || [],
  }),
  withPagePager,
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
        contentType: 'Search',
        articleId: `search_${props.searchQuery}`,
        subsection: props?.searchQuery,
      }),
  }),
)(Search);
