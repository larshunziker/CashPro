import React from 'react';
import { useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Helmet from '../../components/Helmet';
import SearchForm from '../../components/SearchForm';
import TeaserGrid from '../../components/TeaserGrid';
import EmptyResult from './components/EmptyResult';
import SortOrder from './components/SortOrder';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { SEARCH_FORM_THEME_BLUE } from '../../components/SearchForm/constants';
import { GRID_LAYOUT_TEASER_3X2_FIRST } from '../../components/TeaserGrid/gridConfigs/constants';
import { SITE_TITLE } from '../../constants';
import { PAGE_SIZE } from './constants';
import styles from './styles.legacy.css';
import { SearchProps } from './typings';

type SearchPropsInner = SearchProps & {
  searchQuery: string;
};

const loadingJsx = (
  <div className={styles.EmptyResultWrapper}>
    <h2 className={styles.EmptyResultTitle}>Wir suchen ...</h2>
  </div>
);

const Search = (props: SearchPropsInner) => {
  const { data, page } = props;
  const { searchQuery } = useParams();
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);
  const isSearch = useMatch('/suche/:searchQuery');
  const searchLoading = loading && isSearch;
  const globalSearch = data?.environment?.globalSearch || null;

  return (
    <div className={classNames(styles.OuterWrapper, 'search-page')}>
      <div className={styles.Background}>
        <div className={styles.ContentWrapper}>
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
          <div className={styles.Header}>
            <div className={styles.Subtitle}>Suchergebnisse für:</div>
            <SearchForm
              minQueryLength={2}
              initialQuery={searchQuery}
              placeholder="Suchbegriff"
              theme={SEARCH_FORM_THEME_BLUE}
              focusOnMount
            />
          </div>
        </div>
      </div>

      <div className={styles.Wrapper}>
        {(searchLoading &&
          (!globalSearch || !globalSearch?.count || globalSearch?.count < 1) &&
          loadingJsx) ||
          null}
        {(!searchLoading &&
          (!globalSearch ||
            !globalSearch?.count ||
            globalSearch?.count < 1) && <EmptyResult />) ||
          null}
      </div>
      {(globalSearch && globalSearch?.count && globalSearch?.count > 0 && (
        <>
          <div className={styles.Wrapper}>
            <SortOrder />
          </div>
          <div className={`search-result ${styles.SearchResultWrapper}`}>
            <TeaserGrid
              layout={GRID_LAYOUT_TEASER_3X2_FIRST}
              items={ensureTeaserInterface(globalSearch.edges)}
            />
          </div>
          <div className={styles.Wrapper}>
            <Pager
              component={PAGER_TYPE_PAGE_LOADER}
              currentPage={page}
              itemsCount={globalSearch.count}
              itemsPerPage={PAGE_SIZE}
              key={`search-result-pager-${searchQuery}`}
            />
          </div>
        </>
      )) ||
        null}
    </div>
  );
};

export default compose<any, any>(
  withParams,
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
        contentType: 'Search',
        articleId: `search_${props?.searchQuery}`,
        subsection: props?.searchQuery,
      }),
  }),
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps?.data?.environment?.globalSearch?.count || 0,
    pageSize: PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) =>
      mapProps?.data?.environment?.globalSearch?.edges || [],
  }),
)(Search);
