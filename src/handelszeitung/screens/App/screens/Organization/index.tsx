/**
 * @file    organization
 * @author  Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @author  Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date    2019-04-09
 *
 */

import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import CompanyMoneyHouse from '../../components/CompanyMoneyHouse';
import EditButtons from '../../components/EditButtons';
import JobChecker from '../../components/JobChecker';
import RelatedContent from '../../components/RelatedContent';
import SalaryCheckerPerBranch from '../../components/SalaryCheckerPerBranch';
import TeamMembers from '../../components/TeamMembers';
import Timeline from '../../components/Timeline';
import { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { GRID_LAYOUT_TEASER_3X2_FIRST } from '../../components/TeaserGrid/gridConfigs/constants';
import {
  ORGANIZATION_ID_MORE_ABOUT,
  ORGANIZATION_PAGE_SIZE,
} from './constants';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { OrganizationProps } from './typings';

const SCREEN_LABEL = 'Organization';

type OrganizationPropsInner = OrganizationProps & Pick<RouterProps, 'page'>;
const OrganizationDetail = ({ organization, page }: OrganizationPropsInner) => {
  if (!organization) {
    return null;
  }

  const title =
    (organization.title && `mehr zu: ${organization.title}`) ||
    'mehr zum Thema';

  const hasRelatedArticles =
    organization?.organizationArticles?.edges?.length > 0 || false;

  const branchUri =
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    (organization.commercialSector?.branch?.edges?.length > 0 &&
      organization.commercialSector?.branch?.edges?.[0]?.node?.preferredUri) ||
    '';

  return (
    <div className={classNames(SCREEN_LABEL, styles.Wrapper)}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string'. */
        editContentUri={organization.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={organization.editRelationUri}
      />

      <div className={styles.OuterWrapper}>
        <div className={styles.HeaderBackground} />
        <div className={classNames(sections.Container, styles.InnerWrapper)}>
          {organization.activeMenuTrail && (
            <Breadcrumbs
              pageUrl={organization.preferredUri}
              items={organization.activeMenuTrail}
            />
          )}
          {organization.title && (
            <h1 className={styles.Title}>
              <p className={styles.ShortTitle}>Unternehmen</p>
              {organization.title}
            </h1>
          )}
        </div>
      </div>
      <div className={sections.Container}>
        {hasRelatedArticles && (
          <Timeline
            title={organization.title || ''}
            relatedArticles={
              (organization.organizationArticles &&
                organization.organizationArticles.edges && {
                  edges: organization.organizationArticles.edges.slice(0, 5),
                }) ||
              null
            }
            link={`#${ORGANIZATION_ID_MORE_ABOUT}`}
          />
        )}
        <CompanyMoneyHouse
          branch={
            (organization.commercialSector &&
              organization.commercialSector.title) ||
            ''
          }
          uri={branchUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
          foundationDate={organization.foundationDate || null}
          headquarter={organization.city || ''}
          legalForm={organization.legalForm || ''}
          companyDescription={organization.description || ''}
          moneyHouseLink={organization.moneyhousePreferredUri || ''}
        />
      </div>
      <div className={sections.Container}>
        <TeamMembers
          persons={organization.organizationPositions || null}
          itemsCount={6}
        />
      </div>
      <div className={sections.Container}>
        {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
        {organization.commercialSector?.branch?.edges?.length > 0 &&
          organization.commercialSector?.branch?.edges?.[0]?.node?.nid && (
            <JobChecker
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number'. */
              nid={
                organization.commercialSector.branch.edges[0].node.nid
                  ? parseInt(
                      organization.commercialSector.branch.edges[0].node.nid,
                      10,
                    )
                  : null
              }
            />
          )}
        {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
        {organization.commercialSector?.branch?.edges?.length > 0 && (
          <SalaryCheckerPerBranch
            addClass={styles.SalaryCheckerWrapper}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Branch> | undefined' is not assignable to type 'Branch | null'. */
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            branch={organization.commercialSector.branch.edges[0].node}
          />
        )}
      </div>

      {hasRelatedArticles && (
        <div id={ORGANIZATION_ID_MORE_ABOUT}>
          <RelatedContent
            /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Function | undefined'. */
            teaserGridOptions={null}
            teaserGridLayout={GRID_LAYOUT_TEASER_3X2_FIRST}
            gridOptionType={'dotted'}
            itemCount={organization.organizationArticles.count}
            title={title}
            relatedContent={organization.organizationArticles}
            page={page}
            pageSize={ORGANIZATION_PAGE_SIZE}
            pagerType={PAGER_TYPE_PAGE_LOADER}
          />
        </div>
      )}
    </div>
  );
};

const OrganizationWrapper = compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.organization,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps.organization?.organizationArticles?.count || 0,
    pageSize: ORGANIZATION_PAGE_SIZE,
  }),
)(OrganizationDetail);

export default OrganizationWrapper;
