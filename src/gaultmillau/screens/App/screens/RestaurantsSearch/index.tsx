import React from 'react';
import { IntlShape, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import { EXTRACT_DATA_FROM_PATH } from '../../../../../shared/helpers/extractDataFromPropsByConfigMap';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { WithHelmetNode } from '../../../../../beobachter/shared/decorators/withHelmet';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import EditButtons from '../../components/EditButtons';
import Helmet from '../../components/Helmet';
import EmptyResult from '../Search/components/EmptyResult';
import SearchResult from '../Search/components/SearchResult';
import SearchForm, {
  TYPE_SEARCH_FORM_RESTAURANT,
} from '../../components/Search/components/SearchForm';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../components/Pager';
import { restaurantsMsgs } from '../Restaurants';
import {
  URL_DE_RESTAURANTS_SEARCH,
  URL_FR_RESTAURANTS_SEARCH,
} from '../../constants';
import { PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RestaurantSearchProps } from './typings';

type RestaurantSearchPropsInner = RestaurantSearchProps &
  WithHelmetNode & {
    intl: IntlShape;
  };
const RestaurantsSearch = ({
  data,
  page,
  intl,
  language,
  query,
}: RestaurantSearchPropsInner) => {
  if (
    typeof data !== 'object' ||
    !data?.environment?.routeByPath ||
    !data?.environment?.routeByPath.object
  ) {
    return null;
  }

  const pageObject =
    data?.environment?.routeByPath && data?.environment?.routeByPath.object;
  const hasResults =
    (data?.environment?.restaurantsSearch &&
      data?.environment?.restaurantsSearch.count) ||
    false;

  return (
    <div className="restaurants-search-page">
      <Helmet title={pageObject.seoTitle || query} titleTemplate="%s" />
      <EditButtons
        editContentUri={pageObject?.editContentUri}
        editRelationUri={pageObject?.editRelationUri}
        cloneContentUri={pageObject?.cloneContentUri}
      />
      <div className={grid.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <div className={styles.Header}>
              <h1 className={styles.HeaderTitle}>{pageObject.title}</h1>
              <span className={styles.Lead}>{pageObject.lead || ''}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Wrapper}>
        <div className={grid.Container}>
          <SearchForm
            initialQuery={query}
            placeholder={intl.formatMessage(restaurantsMsgs.searchPlaceholder)}
            addClass={styles.SearchForm}
            initialFilter="Organization"
            onSubmitRoute={
              language === 'fr'
                ? URL_FR_RESTAURANTS_SEARCH
                : URL_DE_RESTAURANTS_SEARCH
            }
            disableGrid
            component={TYPE_SEARCH_FORM_RESTAURANT}
          />
        </div>
        {hasResults ? (
          <SearchResult list={data?.environment?.restaurantsSearch} />
        ) : (
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div className={grid.ColXs24}>
                <EmptyResult />
              </div>
            </div>
          </div>
        )}
        <Pager
          component={PAGER_TYPE_PAGE_LOADER}
          currentPage={page}
          itemsCount={
            (data?.environment?.restaurantsSearch &&
              data?.environment?.restaurantsSearch.count) ||
            0
          }
          itemsPerPage={PAGE_SIZE}
        />
      </div>
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
        subsection: {
          type: EXTRACT_DATA_FROM_PATH,
          value: ['props.query'],
        },
      }),
  }),
  injectIntl,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps.data?.environment?.restaurantsSearch.count || 0,
    pageSize: PAGE_SIZE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.data?.environment?.routeByPath?.object,
    hasBreadcrumbs: () => false,
  }),
)(RestaurantsSearch);
