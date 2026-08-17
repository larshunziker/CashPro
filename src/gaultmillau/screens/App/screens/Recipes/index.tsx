import React from 'react';
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { mapUrlToRecipeCategoryEnum } from '../../../../shared/helpers/recipeCategoryUrlMap';
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
  DE_RECIPE_FILTER_LIST,
  FR_RECIPE_FILTER_LIST,
  PAGE_SIZE,
} from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RecipesProps } from './typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'url' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'recipeCategory' implicitly has an 'any' type. */
const doRenderFilterListItems = ({ label, url }, recipeCategory) => {
  if (!label) {
    return null;
  }

  return (
    <li key={`recipe-filter-item-${label}`}>
      <Link
        className={classNames(styles.FilterItem, {
          [styles.Active]:
            mapUrlToRecipeCategoryEnum(recipeCategory).label === label,
        })}
        path={url}
        label={label}
      />
    </li>
  );
};

const Recipes = ({
  data,
  page,
  language,
  renderFilterListItems,
  recipeCategory = '',
}: RecipesProps) => {
  if (
    !data ||
    !data?.environment?.routeByPath ||
    !data?.environment?.routeByPath.object
  ) {
    return null;
  }

  if (
    !mapUrlToRecipeCategoryEnum(recipeCategory.toLowerCase())
      ?.recipeCategoryEnum
  ) {
    return <NotFound />;
  }

  const recipePage = data?.environment?.routeByPath.object;

  return (
    <div className={`recipes-overview ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        editContentUri={recipePage?.editContentUri}
        editRelationUri={recipePage?.editRelationUri}
        cloneContentUri={recipePage?.cloneContentUri}
      />
      <div className={grid.Container}>
        <div className={grid.Row}>
          <div className={styles.Header}>
            <div className={grid.ColXs24}>
              <h1 className={styles.HeaderTitle}>
                {mapUrlToRecipeCategoryEnum(recipeCategory, language).title ||
                  recipePage.title ||
                  'Rezepte'}
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
              <span className={styles.Lead}>
                {mapUrlToRecipeCategoryEnum(recipeCategory, language).lead ||
                  recipePage.lead}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={grid.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <ExpansionPanel
              title={mapUrlToRecipeCategoryEnum(recipeCategory, language).label}
            >
              <ul className={styles.FilterItemsList}>
                {(language === 'fr'
                  ? FR_RECIPE_FILTER_LIST
                  : DE_RECIPE_FILTER_LIST
                ).map(renderFilterListItems)}
              </ul>
            </ExpansionPanel>
          </div>
        </div>
      </div>
      {(data?.environment?.globalSearch &&
        data?.environment?.globalSearch.edges &&
        data?.environment?.globalSearch.edges.length > 0 && (
          <div className={styles.TeaserListWrapper}>
            <TeaserGrid
              items={ensureTeaserInterface(
                data?.environment?.globalSearch.edges,
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
        <div className={grid.Container}>
          <div className={styles.EmptyResultTitle}>
            <FormattedMessage
              id="app.recipes.nothingfound"
              description="The text displayed if there are no recipes found"
              defaultMessage="Keine Rezepte gefunden"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const extendWithHandler = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  renderFilterListItems: (props: any) => (item) =>
    doRenderFilterListItems(item, props.recipeCategory),
});

export default compose<any, any>(
  withParams,
  extendWithHandler,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object || null,
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
      }),
  }),
)(Recipes);
