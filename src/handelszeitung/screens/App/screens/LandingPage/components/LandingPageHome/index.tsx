import React from 'react';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import TeaserGrid from '../../../../components/TeaserGrid';
import { LANDING_PAGE_TYPE_HOME } from '../../../../../../../shared/constants/content';
import {
  MINISTAGE_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_ORGANIZATION } from '../../../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_ENTITY_QUEUE_HOME } from '../../../../components/TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../typings';

type LandingPagePropsInner = LandingPageProps & { isAdSuppressed?: boolean };

const LandingPageHome = ({
  landingPage,
  page,
  origin,
  isAdSuppressed,
}: LandingPagePropsInner) => {
  const isPaginationValid = page !== 0 && (landingPage?.grid?.count || 0) !== 0;

  if (!landingPage || (!isPaginationValid && landingPage.grid)) {
    return null;
  }

  // Our stack is only working correctly for ADs with an EQ on first position
  // because of the weird rule to show either MMR1 on top OR inside the EQ on second position
  // These Ministages on HZ are an exception to that rule so we take it out of the ADs logic here.
  let paragraphsWithoutAdEnrichment = [];
  let landingPageBody = landingPage.body as any; // TODO: change to ParagraphInterface when it'll be typed correctly
  if (
    Array.isArray(landingPageBody) &&
    landingPageBody.length > 0 &&
    [MINISTAGE_PARAGRAPH, PIANO_TEMPLATE_PARAGRAPH].includes(
      landingPageBody[0].__typename,
    )
  ) {
    paragraphsWithoutAdEnrichment = landingPageBody.slice(0, 1);
    landingPageBody = landingPageBody.slice(1);
  }

  const enrichedBodyWithAds = enrichOverviewBodyWithADs({
    pageBody: landingPageBody,
    hasEQsWithMMR: true,
  });

  return (
    <div className={`landing-page ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage.cloneContentUri}
      />

      <Breadcrumbs origin={LANDING_PAGE_TYPE_HOME} />

      <div className={getRestrictedClassName(landingPage.__typename)}>
        <Paragraphs
          pageBody={[...paragraphsWithoutAdEnrichment, ...enrichedBodyWithAds]}
          colStyle={grid.ColXs24}
          origin={origin || LANDING_PAGE_TYPE_HOME}
          isAdSuppressed={landingPage?.channel?.suppressAds || isAdSuppressed}
        />

        {landingPage.grid && (
          <TeaserGrid
            layout={GRID_LAYOUT_ENTITY_QUEUE_HOME}
            items={ensureTeaserInterface(
              (landingPage.grid && landingPage.grid.edges) || null,
            )}
            origin={origin || LANDING_PAGE_TYPE_HOME}
          />
        )}
      </div>
    </div>
  );
};

export default withHelmet({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
  getNode: (mapProps) => mapProps.landingPage,
  rootSchemaType: ROOT_SCHEMA_TYPE_ORGANIZATION,
})(LandingPageHome);
