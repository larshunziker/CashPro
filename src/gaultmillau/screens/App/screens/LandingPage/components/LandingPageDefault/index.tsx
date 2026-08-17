import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { getPianoLayout } from '../../../../../../shared/helpers/pianoLayouts';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import TeaserGrid from '../../../../components/TeaserGrid';
import Lead from '../Lead';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../../../components/Pager';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../../src/shared/constants/structuredData';
import { ARTICLE_TYPE_BLOG_Q, BLOG_DATA } from '../../../../constants';
import { LANDING_PAGE_GRID_ITEMS, LANDING_PAGE_TYPE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../typings';

export const hasGridItems = (landingPage: LandingPage) =>
  landingPage.grid &&
  landingPage.grid.edges &&
  landingPage.grid.edges.length > 0;

const LandingPage = ({ landingPage, page, location }: LandingPageProps) => {
  return (
    <div
      className={classNames('landing-page', styles.Wrapper, {
        [styles.BlogQ]:
          location.pathname === `/${BLOG_DATA[ARTICLE_TYPE_BLOG_Q].url}` ||
          location.pathname === `/fr/${BLOG_DATA[ARTICLE_TYPE_BLOG_Q].url}`,
      })}
    >
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage?.cloneContentUri}
      />

      <div className={grid.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <Lead landingPage={landingPage} />
          </div>
        </div>
      </div>

      <Paragraphs
        pageBody={landingPage.body}
        page={page}
        colStyle={grid.ColXs24}
        origin={LANDING_PAGE_TYPE}
      />

      {hasGridItems(landingPage) && (
        <>
          <TeaserGrid
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<Maybe<SearchableUnionEdge>[]> | undefined' is not assignable to parameter of type 'any[]'. */
            items={ensureTeaserInterface(landingPage.grid?.edges)}
            layout={getPianoLayout(landingPage?.grid?.edges?.length || 0)}
          />
          <div className={grid.Container}>
            <Pager
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              itemsCount={landingPage.grid.count || 0}
              itemsPerPage={LANDING_PAGE_GRID_ITEMS}
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
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.landingPage,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps?.landingPage?.grid?.count || 0,
    pageSize: LANDING_PAGE_GRID_ITEMS,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.landingPage?.grid?.edges || [],
    hasBreadcrumbs: () => false,
  }),
)(LandingPage);
