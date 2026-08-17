import React, { memo } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserExplaining from '../../components/TeaserExplaining';
import TeaserMBrandReport from './components/TeaserMBrandReport';
import TeaserMDefault from './components/TeaserMDefault';
import TeaserMDossier from './components/TeaserMDossier';
import TeaserMLandingPage from './components/TeaserMLandingPage';
import TeaserMOpinion from './components/TeaserMOpinion';
import TeaserMSpecial from './components/TeaserMSpecial';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_SEATCHANGE,
  DOSSIER_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  TEASER_LAYOUT_IS_SPECIAL,
  TEASER_LAYOUT_LANDINGPAGE,
  TEASER_LAYOUT_SPECIAL,
} from '../../../../../../../shared/constants/teaser';
import { TeaserProps } from '../../typings';

const Teaser = (props: TeaserProps) => {
  let type = props.subtypeValue || props.__typename || null;

  if (props.__typename === LANDING_PAGE_CONTENT_TYPE) {
    type = TEASER_LAYOUT_LANDINGPAGE;

    //if a sponsor is set, render default secondary teaser
    if (props.sponsor) {
      type = null;
    }

    //if a special is set render landingpage teaser special
    if (props?.channel?.channelType === TEASER_LAYOUT_IS_SPECIAL) {
      type = TEASER_LAYOUT_SPECIAL;
    }
  }

  // component switch does not work because ARTICLE_TYPE_OPINION is not defined on init
  switch (type) {
    case ARTICLE_TYPE_OPINION: {
      return (
        <TestFragment data-testid="teaserM-opinion-wrapper">
          <TeaserMOpinion {...props} />
        </TestFragment>
      );
    }

    case ADVERTISING_TYPE_BRANDREPORT: {
      return (
        <TestFragment data-testid="teaserM-brandreport-wrapper">
          <TeaserMBrandReport {...props} />
        </TestFragment>
      );
    }

    case DOSSIER_CONTENT_TYPE: {
      return (
        <TestFragment data-testid="teaserM-dossier-wrapper">
          <TeaserMDossier {...props} />
        </TestFragment>
      );
    }

    case EXPLAINING_ARTICLE_CONTENT_TYPE: {
      return (
        <TestFragment data-testid="teaserM-explaining-wrapper">
          <TeaserExplaining {...props} />
        </TestFragment>
      );
    }

    case TEASER_LAYOUT_LANDINGPAGE: {
      return (
        <TestFragment data-testid="teaserM-landingpage-wrapper">
          <TeaserMLandingPage {...props} />
        </TestFragment>
      );
    }

    case TEASER_LAYOUT_SPECIAL: {
      return (
        <TestFragment data-testid="teaserM-special-wrapper">
          <TeaserMSpecial {...props} />
        </TestFragment>
      );
    }

    case ARTICLE_TYPE_SEATCHANGE:
    default: {
      return (
        <TestFragment data-testid="teaserM-default-wrapper">
          <TeaserMDefault {...props} />
        </TestFragment>
      );
    }
  }
};

export default memo<TeaserProps>(Teaser);
