import React from 'react';
import { IntlFormatters, defineMessages, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import EditButtons from '../../components/EditButtons';
import TeaserGrid from '../../components/TeaserGrid';
import SearchForm, {
  TYPE_SEARCH_FORM_RESTAURANT,
} from '../../components/Search/components/SearchForm';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../components/Pager';
import { getPianoLayout } from '../../../../shared/helpers/pianoLayouts';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import {
  URL_DE_RESTAURANTS_SEARCH,
  URL_FR_RESTAURANTS_SEARCH,
} from '../../constants';
import { PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { RestaurantsProps } from './typings';

type RestaurantsPropsInner = RestaurantsProps & {
  intl: IntlFormatters;
};

export const restaurantsMsgs = defineMessages({
  searchPlaceholder: {
    id: 'app.landingPageStatic.restaurants.search',
    description: 'Search placeholder text on restaurants overview page',
    defaultMessage: 'Chef, Restaurant, Ort',
  },
});

const Restaurants = ({ data, intl, page, language }: RestaurantsPropsInner) => {
  if (
    !data ||
    !data?.environment?.routeByPath ||
    !data?.environment?.routeByPath.object ||
    !data?.environment?.restaurantsSearch
  ) {
    return null;
  }

  const restaurantPage = data?.environment?.routeByPath.object as LandingPage;

  return (
    <div className={classNames('restaurants-overview', styles.Wrapper)}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={restaurantPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={restaurantPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={restaurantPage?.cloneContentUri}
      />
      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <div className={styles.Header}>
              <h1 className={styles.HeaderTitle}>{restaurantPage.title}</h1>
              <span className={styles.Lead}>{restaurantPage.lead}</span>
            </div>
          </div>
        </div>
      </div>

      <SearchForm
        addClass={styles.SearchForm}
        onSubmitRoute={
          language === 'fr'
            ? URL_FR_RESTAURANTS_SEARCH
            : URL_DE_RESTAURANTS_SEARCH
        }
        initialFilter="Organization"
        placeholder={intl.formatMessage(restaurantsMsgs.searchPlaceholder)}
        component={TYPE_SEARCH_FORM_RESTAURANT}
      />
      {data?.environment?.restaurantsSearch &&
        data?.environment?.restaurantsSearch.edges &&
        data?.environment?.restaurantsSearch.edges.length > 0 && (
          <>
            <TeaserGrid
              items={ensureTeaserInterface(
                data?.environment?.restaurantsSearch.edges,
              )}
              layout={getPianoLayout(
                data?.environment?.restaurantsSearch?.edges?.length,
              )}
            />

            <div className={grid.Container}>
              <Pager
                itemsCount={data?.environment?.restaurantsSearch?.count || 0}
                itemsPerPage={PAGE_SIZE}
                currentPage={page}
                component={PAGER_TYPE_PAGE_LOADER}
              />
            </div>
          </>
        )}
    </div>
  );
};

export default compose<any, any>(
  injectIntl,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps.data?.environment?.restaurantsSearch?.count || 0,
    pageSize: PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) =>
      mapProps.data?.environment?.restaurantsSearch?.edges,
    hasBreadcrumbs: () => false,
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'Restaurants',
      }),
  }),
)(Restaurants);
