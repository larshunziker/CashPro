import React, { ReactElement } from 'react';
import entityQueueParagraphFactory, {
  EntityQueueParagraphPropsInner,
} from '../../../../../../../common/components/Paragraphs/components/EntityQueueParagraph/factory';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import Logo from '../../../Logo';
import TeaserGrid from '../../../TeaserGrid';
import { TeaserLayout } from '../../../TeaserGrid/gridConfigs';
import { LANDING_PAGE_TYPE_HOME } from '../../../../../../../shared/constants/content';
import {
  LANDING_PAGE_BILANZ_HOME,
  LANDING_PAGE_TYPE_BILANZ,
  LANDING_PAGE_TYPE_HZB,
  LANDING_PAGE_TYPE_HZB_HOME,
  LANDING_PAGE_TYPE_SV,
  LANDING_PAGE_TYPE_SV_HOME,
} from '../../../../screens/LandingPage/constants';
import { LOGO_BIL } from '../../../Logo/constants';
import {
  GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS,
  GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST,
  GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
  GRID_LAYOUT_ENTITY_QUEUE_HOME,
  GRID_LAYOUT_ENTITY_QUEUE_HZB,
  GRID_LAYOUT_ENTITY_QUEUE_HZB_HOME,
  GRID_LAYOUT_ENTITY_QUEUE_SV_HOME,
  GRID_LAYOUT_ENTITY_QUEUE_SWISS_INSURANCE,
} from '../../../TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

export const getGridLayoutByProps = ({
  isFirst,
  origin = '',
}: EntityQueueParagraphPropsInner): TeaserLayout => {
  if (isFirst) {
    switch (origin) {
      case LANDING_PAGE_TYPE_HOME:
        return GRID_LAYOUT_ENTITY_QUEUE_HOME;

      case LANDING_PAGE_TYPE_SV:
        return GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST;

      case LANDING_PAGE_TYPE_SV_HOME:
        return GRID_LAYOUT_ENTITY_QUEUE_SV_HOME;

      case LANDING_PAGE_TYPE_BILANZ:
      case LANDING_PAGE_TYPE_HZB:
        return GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST;

      case LANDING_PAGE_TYPE_HZB_HOME:
        return GRID_LAYOUT_ENTITY_QUEUE_HZB_HOME;
    }
  }

  switch (origin) {
    case LANDING_PAGE_TYPE_SV:
      return GRID_LAYOUT_ENTITY_QUEUE_SWISS_INSURANCE;
    case LANDING_PAGE_TYPE_HZB:
      return GRID_LAYOUT_ENTITY_QUEUE_HZB;
    case LANDING_PAGE_TYPE_BILANZ:
      return GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS;

    default:
      return GRID_LAYOUT_ENTITY_QUEUE_DEFAULT;
  }
};

export const getTitleByProps = ({
  entityQueue,
}: EntityQueueParagraphPropsInner): ReactElement | string => {
  const title = entityQueue?.landingPage?.title || entityQueue?.title || '';
  const preferredUri = entityQueue?.landingPage?.preferredUri || null;
  if (!title && !preferredUri) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  if (
    title.toUpperCase() === 'BILANZ' ||
    preferredUri === LANDING_PAGE_BILANZ_HOME
  ) {
    return (
      <>
        <span className={styles.HiddenHeader}>{title}</span>
        <div
          data-testid="entity-queue-paragraph-title"
          className={styles.LogoBilWrapper}
        >
          <Logo type={LOGO_BIL} />
        </div>
      </>
    );
  }
  return title;
};

const EntityQueueParagraph = entityQueueParagraphFactory({
  gridConfigLayout: getGridLayoutByProps,
  TeaserGrid,
  ensureTeaserInterface,
  styles: {
    InnerContainer: grid.Container,
    Title: styles.Title,
  },
  appTitle: getTitleByProps,
});

export default EntityQueueParagraph;
