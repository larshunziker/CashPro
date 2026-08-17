import React, { memo } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserXSBrandReport from './components/TeaserXSBrandReport';
import TeaserXSDefault from './components/TeaserXSDefault';
import TeaserXSDossier from './components/TeaserXSDossier';
import TeaserXSLandingPage from './components/TeaserXSLandingPage';
import TeaserXSOpinion from './components/TeaserXSOpinion';
import TeaserXSSpecial from './components/TeaserXSSpecial';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_SEATCHANGE,
  DOSSIER_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  TEASER_LAYOUT_IS_SPECIAL,
  TEASER_LAYOUT_LANDINGPAGE,
  TEASER_LAYOUT_SPECIAL,
} from '../../../../../../../shared/constants/teaser';
import { TeaserFactoryProps } from '../../../../../../../common/components/Teaser/typings';

type TeaserXSProps = TeaserFactoryProps & TeasableInterfaceGraphListItem;

const Teaser = (props: TeaserXSProps) => {
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
        <TestFragment data-testid="teaserXS-opinion-wrapper">
          <TeaserXSOpinion {...props} />
        </TestFragment>
      );
    }

    case ADVERTISING_TYPE_BRANDREPORT: {
      return (
        <TestFragment data-testid="teaserXS-brandReport-wrapper">
          <TeaserXSBrandReport {...props} />
        </TestFragment>
      );
    }

    case DOSSIER_CONTENT_TYPE: {
      return (
        <TestFragment data-testid="teaserXS-dossier-wrapper">
          <TeaserXSDossier {...props} />
        </TestFragment>
      );
    }

    case TEASER_LAYOUT_LANDINGPAGE: {
      return (
        <TestFragment data-testid="teaserXS-landingpage-wrapper">
          <TeaserXSLandingPage {...props} />
        </TestFragment>
      );
    }

    case TEASER_LAYOUT_SPECIAL: {
      return (
        <TestFragment data-testid="teaserXS-special-wrapper">
          <TeaserXSSpecial {...props} />
        </TestFragment>
      );
    }

    case ARTICLE_TYPE_SEATCHANGE:
    default: {
      return (
        <TestFragment data-testid="teaserXS-default-wrapper">
          <TeaserXSDefault {...props} />
        </TestFragment>
      );
    }
  }
};

export default memo(Teaser);
