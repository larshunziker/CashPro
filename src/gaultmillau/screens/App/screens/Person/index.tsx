import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import classname from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import EditButtons from '../../components/EditButtons';
import TeaserGrid from '../../components/TeaserGrid';
import Header from './components/Header';
import CharList, { LAYOUT_MAIN } from '../../components/CharList';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../components/Pager';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_MIXED } from '../../components/TeaserGrid/gridConfigs/constants';
import {
  DEFAULT_PERSON_HOME_DE,
  DEFAULT_PERSON_HOME_FR,
} from '../../constants';
import { OVERVIEW_PAGE_ITEMS } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PersonProps } from './typings';

const PersonOverview = ({ data, page }: PersonProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  if (
    typeof data !== 'object' ||
    !data?.environment?.routeByPath ||
    !data?.environment?.routeByPath.object
  ) {
    return null;
  }
  const personPage = data?.environment?.routeByPath.object;
  const personList = personPage?.grid || {};

  return (
    <div className={`person-overview ${styles.Wrapper}`}>
      <EditButtons
        editContentUri={personPage?.editContentUri}
        editRelationUri={personPage?.editRelationUri}
        cloneContentUri={personPage?.cloneContentUri}
      />
      <div className={styles.Header}>
        <Header />
      </div>
      <div className={grid.Container}>
        <div className={grid.Row}>
          <div className={classname(grid.ColXs24, styles.Header)}>
            <button
              className={classname(styles.OverviewLink, {
                [styles.OverviewLinkActive]: isNavigationOpen,
              })}
              onClick={(e) => {
                e.preventDefault();
                setIsNavigationOpen(!isNavigationOpen);
              }}
            >
              <FormattedMessage
                id="app.person.overview"
                description="Toggle button for a-z navigation on mobile viewports"
                defaultMessage="A-Z Liste"
              />
            </button>
          </div>
          <div
            className={classname(grid.ColXs24, {
              [grid.HiddenSmDown]: !isNavigationOpen,
            })}
          >
            <div className={styles.Divider} />
            <CharList
              layout={LAYOUT_MAIN}
              link={{
                de: `/${DEFAULT_PERSON_HOME_DE}/list/`,
                fr: `/${DEFAULT_PERSON_HOME_FR}/list/`,
              }}
            />
            <div className={styles.DividerMarginBottom} />
          </div>
        </div>
      </div>
      <>
        {personList?.edges &&
          Array.isArray(personList.edges) &&
          personList.edges.length > 0 && (
            <>
              <TeaserGrid
                items={ensureTeaserInterface(personList.edges)}
                layout={GRID_LAYOUT_MIXED}
              />
              <div className={grid.Container}>
                <Pager
                  itemsCount={personList?.count || 0}
                  itemsPerPage={OVERVIEW_PAGE_ITEMS}
                  currentPage={page}
                  component={PAGER_TYPE_PAGE_LOADER}
                />
              </div>
            </>
          )}
      </>
    </div>
  );
};

export default compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object?.grid?.count || 0,
    pageSize: OVERVIEW_PAGE_ITEMS,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object?.grid?.edges,
    hasBreadcrumbs: () => false,
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'Person',
      }),
  }),
)(PersonOverview);
