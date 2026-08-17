import React, { memo } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserExplaining from '../../components/TeaserExplaining';
import TeaserSBrandReport from './components/TeaserSBrandReport';
import TeaserSDefault from './components/TeaserSDefault';
import TeaserSDossier from './components/TeaserSDossier';
import TeaserSLandingPage from './components/TeaserSLandingPage';
import TeaserSOpinion from './components/TeaserSOpinion';
import TeaserSSpecial from './components/TeaserSSpecial';
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
import { TeaserFactoryProps } from '../../../../../../../common/components/Teaser/typings';

type TeaserSProps = TeaserFactoryProps & TeasableInterfaceGraphListItem;

const Teaser = (props: TeaserSProps) => {
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
        <TestFragment data-testid="teaserS-opinion-wrapper">
          <TeaserSOpinion {...props} />
        </TestFragment>
      );
    }

    case ADVERTISING_TYPE_BRANDREPORT: {
      return (
        <TestFragment data-testid="teaserS-brandReport-wrapper">
          <TeaserSBrandReport {...props} />
        </TestFragment>
      );
    }

    case DOSSIER_CONTENT_TYPE: {
      return (
        <TestFragment data-testid="teaserS-dossier-wrapper">
          <TeaserSDossier {...props} />
        </TestFragment>
      );
    }

    case EXPLAINING_ARTICLE_CONTENT_TYPE: {
      return (
        <TestFragment data-testid="teaserS-explaining-wrapper">
          <TeaserExplaining {...props} />
        </TestFragment>
      );
    }

    case TEASER_LAYOUT_LANDINGPAGE: {
      return (
        <TestFragment data-testid="teaserS-landingpage-wrapper">
          <TeaserSLandingPage {...props} />
        </TestFragment>
      );
    }

    case TEASER_LAYOUT_SPECIAL: {
      return (
        <TestFragment data-testid="teaserS-special-wrapper">
          <TeaserSSpecial {...props} />
        </TestFragment>
      );
    }

    case ARTICLE_TYPE_SEATCHANGE:
    default: {
      return (
        <TestFragment data-testid="teaserS-default-wrapper">
          <TeaserSDefault {...props} />
        </TestFragment>
      );
    }
  }
};

export default memo<TeaserSProps>(Teaser);
