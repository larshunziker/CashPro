import React, { ReactElement } from 'react';

import { compose } from 'recompose';
import classNames from 'classnames';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import EditButtons from '../../components/EditButtons';
import JobChecker from '../../components/JobChecker';
import OrganizationsInNews from '../../components/OrganizationsInNews';
import RelatedContent from '../../components/RelatedContent';
import SalaryCheckerPerBranch from '../../components/SalaryCheckerPerBranch';
import Timeline from '../../components/Timeline';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { GRID_LAYOUT_TEASER_3X2_FIRST } from '../../components/TeaserGrid/gridConfigs/constants';
import {
  BRANCH_ANCHOR_MORE_ABOUT,
  BRANCH_ID_MORE_ABOUT,
  BRANCH_PAGE_SIZE,
} from './constants';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { BranchProps } from './typings';

const SCREEN_LABEL = 'Branch';

type BranchDetailPropsInner = BranchProps;

const BranchDetail = ({
  branch,
  page,
}: BranchDetailPropsInner): ReactElement => {
  if (!branch) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const hasRelatedArticles =
    (branch.relatedArticles &&
      branch.relatedArticles.edges &&
      branch.relatedArticles.edges.length > 0) ||
    false;

  const title =
    (branch.title && `mehr zu: ${branch.title}`) || 'mehr zu dieser Branche';

  return (
    <div className={classNames(SCREEN_LABEL, styles.Wrapper)}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={branch.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={branch.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={branch.cloneContentUri}
      />

      <div className={styles.OuterWrapper}>
        <div className={styles.HeaderBackground} />
        <div className={classNames(sections.Container, styles.InnerWrapper)}>
          {branch.activeMenuTrail && (
            <Breadcrumbs
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              pageUrl={branch.preferredUri}
              /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
              items={branch.activeMenuTrail}
            />
          )}
          <div>
            <h1 className={styles.Title}>
              <p className={styles.ShortTitle}>Branche</p>
              {branch.title}
            </h1>
          </div>
        </div>
      </div>
      <div className={sections.Container}>
        {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<OrganizationConnection> | undefined' is not assignable to type 'OrganizationConnection'. */}
        <OrganizationsInNews organizations={branch.relatedOrganizations} />

        {hasRelatedArticles && (
          <Timeline
            /* @ts-ignore TODO: TS2322 ->  Type '{ edges */
            relatedArticles={
              (branch.relatedArticles &&
                branch.relatedArticles.edges && {
                  edges: branch.relatedArticles.edges.slice(0, 5),
                }) ||
              null
            }
            link={BRANCH_ANCHOR_MORE_ABOUT}
          />
        )}

        {/* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number'. */}
        <JobChecker nid={branch.nid ? parseInt(branch.nid, 10) : null} />
        <SalaryCheckerPerBranch branch={branch} />
      </div>

      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
      {branch?.nativeAdvertisings?.edges?.length > 0 && (
        <>
          <RelatedContent
            //@ts-ignore
            teaserGridLayout={GRID_LAYOUT_TEASER_3X2_FIRST}
            gridOptionType={'dotted'}
            title={`Mehr aus der Branche`}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<NativeAdvertisingConnection> | undefined' is not assignable to type 'RelatedContentUnionConnection | Articl */
            relatedContent={branch.nativeAdvertisings}
          />
        </>
      )}
      {hasRelatedArticles && (
        <div id={BRANCH_ID_MORE_ABOUT}>
          <RelatedContent
            //@ts-ignore
            teaserGridLayout={GRID_LAYOUT_TEASER_3X2_FIRST}
            gridOptionType={'dotted'}
            title={title}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ArticleConnection> | undefined' is not assignable to type 'RelatedContentUnionConnection | ArticleUnionConn */
            relatedContent={branch.relatedArticles}
            page={page}
            pageSize={BRANCH_PAGE_SIZE}
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            itemCount={branch.relatedArticles.count}
            hasContainer={true}
          />
          <Pager
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            itemsCount={branch.relatedArticles.count || 0}
            itemsPerPage={BRANCH_PAGE_SIZE}
            currentPage={page}
            component={PAGER_TYPE_PAGE_LOADER}
            anchorScrollId={BRANCH_ID_MORE_ABOUT}
          />
        </div>
      )}
    </div>
  );
};

export default compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.branch || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps.branch?.relatedArticles?.count || 0,
    pageSize: BRANCH_PAGE_SIZE,
  }),
)(BranchDetail);
