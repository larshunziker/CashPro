import React, { useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import compose from 'recompose/compose';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setSearchQuery } from '../../../../../shared/actions/search';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import TestFragment from '../../../../../../src/shared/tests/components/TestFragment';
import AppNexus from '../../components/AppNexus';
import Helmet from '../../components/Helmet';
import SearchResults from '../../components/SearchResults';
import EmptySearch from './components/EmptyResult';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import { SITE_TITLE } from '../../../../screens/App/constants';
import { TOP_AD_1 } from '../../components/AppNexus/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SearchCategory, SearchProps } from './typings';

type SearchPropsInner = SearchProps & {
  data: ApolloData &
    Maybe<Query> & {
      textSearch: SearchResults;
      wikifolio: IntegrationsResults;
      newEmission: IntegrationsResults;
    };
  searchQuery: string;
  searchCategory: string;
  setStatusCode: typeof setStatusCode;
  setSearchQuery: typeof setSearchQuery;
};

const Search = (props: SearchPropsInner) => {
  const {
    data,
    setStatusCode,
    searchQuery,
    searchCategory,
    page,
    setSearchQuery,
  } = props;

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);
  const isSearch = useMatch('/suche/:searchCategory/:searchQuery');
  const searchLoading = loading && isSearch;
  const searchWrapperRef = useRef(null);

  let envWithoutExternalNA = data?.environment?.globalSearch?.edges?.filter(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (edge) => edge?.node?.advertisingType !== 'External',
  );

  if (!searchCategory) {
    envWithoutExternalNA = envWithoutExternalNA?.slice(0, 3);
  }

  const dataWithoutExternalNA = {
    ...data,
    environment: {
      ...data?.environment,
      globalSearch: {
        ...data?.environment?.globalSearch,
        edges: envWithoutExternalNA,
        count: data?.environment?.globalSearch?.count,
      },
    },
  };

  const dataAfterDerivateCleanup = {
    ...dataWithoutExternalNA,
  };

  const hasSwissDotsResults =
    data?.textSearch?.derivative?.items?.map(
      (item: any) => item.market === 'SwissDots',
    ).length === 1;

  const hasNewEmission = dataWithoutExternalNA?.newEmission?.items?.[0];

  if (hasSwissDotsResults && hasNewEmission) {
    dataAfterDerivateCleanup.newEmission = {
      ...dataWithoutExternalNA?.newEmission,
      count: 0,
      items: [],
    };
  }

  const hasResults =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.textSearch?.derivative?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.textSearch?.equity?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.textSearch?.fund?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.textSearch?.index?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.textSearch?.diverse?.items?.length > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.textSearch?.news?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.textSearch?.bond?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.newEmission?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.textSearch?.cryptoCurrency?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.wikifolio?.count > 0 ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    data?.environment?.globalSearch?.count > 0;

  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
    // this click on the wrapper is necessary to hide the native keyboard on mobile devices
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    searchWrapperRef.current.click();

    return () => {
      // remove search query from input field when leaving search page
      setSearchQuery('');
    };
  }, [isSearch, setSearchQuery, searchQuery]);

  if (__SERVER__ && !searchLoading && !hasResults) {
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

      <div className="ad-wrapper ad-wrapper-mobile header-apn-zone">
        <AppNexus slot={TOP_AD_1} deviceType="mobile" />
      </div>
      <div className={styles.Wrapper} ref={searchWrapperRef}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            {hasResults ? (
              <div>
                <SearchResults
                  /* @ts-ignore TODO: TS2322 ->  Type 'number | undefined' is not assignable to type 'number'. */
                  page={page}
                  data={dataAfterDerivateCleanup}
                  searchQuery={searchQuery}
                  category={(searchCategory as SearchCategory) || 'alle'}
                />
              </div>
            ) : (
              <>
                {(!searchLoading && (
                  <EmptySearch searchQuery={searchQuery} />
                )) ||
                  null}
              </>
            )}
          </div>
        </div>
      </div>
    </TestFragment>
  );
};

const mapDispatchToProps = {
  setStatusCode,
  setSearchQuery,
};

export default compose<any, any>(
  withParams,
  connect(null, mapDispatchToProps),
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
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
)(Search);
