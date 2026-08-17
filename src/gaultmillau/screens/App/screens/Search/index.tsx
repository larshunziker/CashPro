/**
 * @file    search results page
 * @author  Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date    2019-04-09
 *
 */

import React from 'react';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import { useMatch } from 'react-router-dom';
import compose from 'recompose/compose';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import EmptyResult from './components/EmptyResult';
import SearchResult from './components/SearchResult';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import SearchForm, {
  TYPE_SEARCH_FORM_DEFAULT,
} from '../../components/Search/components/SearchForm';
import { headerInnerMsgs } from '../../components/Header/components/HeaderInner';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { URL_DE_SEARCH, URL_FR_SEARCH } from '../../constants';
import { PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SearchProps } from './typings';

type SearchPropsInner = SearchProps & {
  intl: IntlShape;
};
const Search = ({
  data,
  loading,
  intl,
  page,
  language,
  query,
}: SearchPropsInner) => {
  const isSearchDE = useMatch(`${URL_DE_SEARCH}/:query`);
  const isSearchFR = useMatch(`${URL_FR_SEARCH}/:query`);
  const searchLoading = loading && (isSearchDE || isSearchFR);
  const globalSearch = data?.environment?.globalSearch || null;
  const resultsCount = parseInt(globalSearch?.count, 10) || 0;
  const hasResults = resultsCount > 0;

  return (
    <div className="search-page">
      <div className={styles.RedBackground}>
        <div className={styles.Header}>
          <SearchForm
            initialQuery={query}
            placeholder={intl.formatMessage(headerInnerMsgs.searchPlaceholder)}
            addClass={styles.SearchForm}
            onSubmitRoute={language === 'fr' ? URL_FR_SEARCH : URL_DE_SEARCH}
            component={TYPE_SEARCH_FORM_DEFAULT}
          />
        </div>
      </div>

      <div className={styles.Wrapper}>
        {hasResults && (
          <>
            <SearchResult
              /* @ts-ignore TODO: TS2322 ->  Type 'false | (TeasableInterfaceGraphList & { count */
              list={typeof data === 'object' && data?.environment?.globalSearch}
            />
            <div className={grid.Container}>
              <Pager
                component={PAGER_TYPE_PAGE_LOADER}
                currentPage={page}
                itemsCount={resultsCount}
                itemsPerPage={PAGE_SIZE}
                key={`search-result-pager-${query}`}
              />
            </div>
          </>
        )}

        {!searchLoading && !hasResults && (
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div className={grid.ColXs24}>
                <EmptyResult />
              </div>
            </div>
          </div>
        )}

        {searchLoading && !hasResults && (
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div className={grid.ColXs24}>
                <h1>
                  <FormattedMessage
                    id="app.search.loading"
                    description="Text that shows during search is performed"
                    defaultMessage="Wir suchen..."
                  />
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default compose<any, any>(
  withParams,
  injectIntl,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps.data?.environment?.globalSearch?.count || 0,
    pageSize: PAGE_SIZE,
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
        articleType: 'LandingPage',
        contentType: 'Search',
        articleId: `search_${props.query}`,
        subsection: props.query,
      }),
  }),
)(Search);
