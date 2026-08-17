import React, { ReactElement } from 'react';

import { compose } from 'recompose';
import classNames from 'classnames';
import { getRestrictedClassName } from '../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Picture from '../../../../../common/components/Picture';
import Breadcrumbs from '../../components/Breadcrumbs';
import EditButtons from '../../components/EditButtons';
import TeaserGrid from '../../components/TeaserGrid';
import StatusPage from './../StatusPage';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import {
  STYLE_16X9_280,
  STYLE_16X9_440,
  STYLE_16X9_700,
  STYLE_8X3_1130,
} from '../../../../../shared/constants/images';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_3X3 } from '../../components/TeaserGrid/gridConfigs/constants';
import { DOSSIER_LABEL, DOSSIER_PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { DossierProps } from './typings';

const PAGER_ANCHOR_SCROLL_ID = 'page';

type DossierPropsInner = DossierProps;
const DossierDetail = ({ page, dossier }: DossierPropsInner) => {
  if (!dossier || !Array.isArray(dossier.articles?.edges)) {
    return <StatusPage />;
  }

  return (
    <div className={`${DOSSIER_LABEL} ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={dossier.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={dossier.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={dossier.cloneContentUri}
      />
      <div className={styles.InnerWrapper}>
        <div className={styles.HeaderBackground} />

        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={grid.ColXs24}>
              <Breadcrumbs
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                pageUrl={dossier.preferredUri}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
                items={dossier.activeMenuTrail}
              />
            </div>
          </div>
        </div>
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={grid.ColXs24}>
              <h1 className={styles.Title}>Dossier</h1>
            </div>
          </div>
        </div>
        {dossier.teaserImage?.image?.file?.relativeOriginPath && (
          <div className={styles.HeroImageWrapper}>
            <h3 className={styles.HeroImageTitle}>
              {dossier.shortTitle || dossier.title || ''}
            </h3>
            <Picture
              relativeOrigin={
                dossier.teaserImage?.image?.file?.relativeOriginPath
              }
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={dossier.teaserImage?.image?.file?.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={dossier.teaserImage?.image?.file?.focalPointY}
              style_320={STYLE_16X9_280}
              style_540={STYLE_16X9_440}
              style_760={STYLE_16X9_700}
              style_960={STYLE_8X3_1130}
              className={styles.Image}
              disableWrapperClassName
              alt={dossier?.teaserImage?.image?.file?.alt || ''}
              title={dossier?.teaserImage?.image?.file?.alt || ''}
            />
          </div>
        )}
        {dossier.lead && (
          <div
            className={classNames(
              styles.HeaderDescriptionWrapper,
              grid.Container,
            )}
          >
            <p className={styles.HeaderDescription}>{dossier.lead}</p>
          </div>
        )}
        {dossier.articles?.edges &&
          Array.isArray(dossier.articles?.edges) &&
          dossier.articles?.edges?.length > 0 && (
            <div
              id={PAGER_ANCHOR_SCROLL_ID}
              className={getRestrictedClassName(dossier.__typename)}
            >
              <TeaserGrid
                layout={GRID_LAYOUT_TEASER_3X3}
                items={ensureTeaserInterface(dossier.articles.edges)}
              />
              <Pager
                key="dossier-pager"
                itemsCount={dossier.articles?.count || 0}
                itemsPerPage={DOSSIER_PAGE_SIZE}
                currentPage={page}
                component={PAGER_TYPE_PAGE_LOADER}
                anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
              />
            </div>
          )}
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
const Dossier: (DossierProps) => ReactElement = compose<any, any>(
  withHelmet({
    getNode: (mapProps: DossierProps) => mapProps.dossier || null,
    getNodesCount: (mapProps: DossierProps) =>
      mapProps.dossier?.articles?.count || 0,
    pageSize: DOSSIER_PAGE_SIZE,
    getFallbackTitle: () => DOSSIER_LABEL,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: DossierProps) =>
      mapProps?.dossier?.articles?.edges || [],
  }),
)(DossierDetail);

export default Dossier;
