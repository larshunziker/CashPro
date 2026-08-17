import React from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { mapUrlToPopCityEnum } from '../../../../shared/helpers/popRestaurantsUrlMap';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Link from '../../../../../common/components/Link';
import EditButtons from '../../components/EditButtons';
import ExpansionPanel from '../../components/ExpansionPanel';
import TeaserGrid from '../../components/TeaserGrid';
import NotFound from '../NotFound';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../components/Pager';
import { getPianoLayout } from '../../../../shared/helpers/pianoLayouts';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import {
  DE_CITY_FILTER_LIST,
  FR_CITY_FILTER_LIST,
  PAGE_SIZE,
} from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { PopRestaurantsProps } from './typings';

type ExtendedOrganization = Organization & {
  cloneContentUri?: string;
};

export const popRestaurantsMsgs = defineMessages({
  cityFilterPlaceholder: {
    id: 'app.popRestaurants.filter',
    description:
      'City filter placeholder text on pop restaurants overview page',
    defaultMessage: 'Alle städte',
  },
});

/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'url' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'popCity' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'intl' implicitly has an 'any' type. */
const doRenderFilterListItems = ({ label, url }, index, popCity, intl) => {
  if (!label) {
    return null;
  }

  return (
    <li key={`city-filter-item-${index}`}>
      <Link
        className={classNames(styles.FilterItem, {
          [styles.Active]:
            mapUrlToPopCityEnum(popCity).label === label ||
            (mapUrlToPopCityEnum(popCity).label === '' &&
              label ===
                intl.formatMessage(popRestaurantsMsgs.cityFilterPlaceholder)),
        })}
        path={url}
        label={label}
      />
    </li>
  );
};

const Restaurants = ({
  data,
  page,
  popCity = '',
  renderFilterListItems,
  language,
}: PopRestaurantsProps) => {
  if (!mapUrlToPopCityEnum(popCity.toLowerCase())?.popCityEnum) {
    return <NotFound />;
  }

  if (
    !data ||
    !data?.environment?.routeByPath ||
    !data?.environment?.routeByPath.object
  ) {
    return null;
  }

  const restaurantPage =
    (data?.environment?.routeByPath?.object as ExtendedOrganization) || {};

  return (
    <div className={classNames('restaurants-overview', styles.Wrapper)}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string'. */
        editContentUri={restaurantPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={restaurantPage?.editRelationUri}
        cloneContentUri={restaurantPage?.cloneContentUri}
      />
      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={styles.Header}>
            <div className={grid.ColXs24}>
              <h1 className={styles.HeaderTitle}>{restaurantPage.title}</h1>
            </div>
            <div
              className={classNames(
                grid.ColSm20,
                grid.ColXl16,
                grid.ColOffsetSm2,
                grid.ColOffsetXl4,
              )}
            >
              <span className={styles.Lead}>{restaurantPage.lead}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <ExpansionPanel
              title={mapUrlToPopCityEnum(popCity, language).label}
            >
              <ul className={styles.FilterItemsList}>
                {(language === 'fr'
                  ? FR_CITY_FILTER_LIST
                  : DE_CITY_FILTER_LIST
                ).map(renderFilterListItems)}
              </ul>
            </ExpansionPanel>
          </div>
        </div>
      </div>
      {(data?.environment?.globalSearch &&
        data?.environment?.globalSearch.edges &&
        Array.isArray(data?.environment?.globalSearch.edges) &&
        data?.environment?.globalSearch.edges.length > 0 && (
          <div>
            <TeaserGrid
              items={ensureTeaserInterface(
                data?.environment?.globalSearch?.edges,
              )}
              layout={getPianoLayout(
                data?.environment?.globalSearch?.edges?.length,
              )}
            />
            <div className={grid.Container}>
              <Pager
                itemsCount={data?.environment?.globalSearch?.count || 0}
                itemsPerPage={PAGE_SIZE}
                currentPage={page}
                component={PAGER_TYPE_PAGE_LOADER}
              />
            </div>
          </div>
        )) || (
        <div className={sections.Container}>
          <FormattedMessage
            id="app.poprestaurants.nothingfound"
            description="The text displayed if there are no restaurant found"
            defaultMessage="Keine Restaurants gefunden"
          />
        </div>
      )}
    </div>
  );
};

const extendWithHandler = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  renderFilterListItems: (props: any) => (item, index) =>
    doRenderFilterListItems(item, index, props.popCity, props.intl),
});

export default compose<any, any>(
  withParams,
  injectIntl,
  extendWithHandler,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps.data?.environment?.globalSearch?.count || 0,
    pageSize: PAGE_SIZE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps.data?.environment?.globalSearch?.edges,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    hasBreadcrumbs: () => false,
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
      }),
  }),
)(Restaurants);
