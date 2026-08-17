import React, { memo } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserHeroBrandReport from './components/TeaserHeroBrandreport';
import TeaserHeroDefault from './components/TeaserHeroDefault';
import TeaserHeroDossier from './components/TeaserHeroDossier';
import TeaserHeroLandingPage from './components/TeaserHeroLandingPage';
import TeaserHeroOpinion from './components/TeaserHeroOpinion';
import TeaserHeroSpecial from './components/TeaserHeroSpecial';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_TYPE_OPINION,
  DOSSIER_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  TEASER_LAYOUT_IS_SPECIAL,
  TEASER_LAYOUT_LANDINGPAGE,
  TEASER_LAYOUT_SPECIAL,
} from '../../../../../../../shared/constants/teaser';
import { TeaserProps } from '../../typings';

const TeaserHero = (props: TeaserProps) => {
  let type = props.subtypeValue || props.__typename || null;

  if (props?.__typename === LANDING_PAGE_CONTENT_TYPE) {
    type = TEASER_LAYOUT_LANDINGPAGE;

    //if a sponsor is set, render default secondary teaser
    if (props?.sponsor) {
      type = null;
    }

    //if a special is set render landingpage teaser special
    if (props?.channel?.channelType === TEASER_LAYOUT_IS_SPECIAL) {
      type = TEASER_LAYOUT_SPECIAL;
    }
  }

  switch (type) {
    case ADVERTISING_TYPE_BRANDREPORT: {
      return (
        <TestFragment data-testid="teaser-hero-brandreport-wrapper">
          <TeaserHeroBrandReport {...props} />
        </TestFragment>
      );
    }

    case ARTICLE_TYPE_OPINION: {
      return (
        <TestFragment data-testid="teaser-hero-opinion-wrapper">
          <TeaserHeroOpinion {...props} />
        </TestFragment>
      );
    }

    case DOSSIER_CONTENT_TYPE: {
      return (
        <TestFragment data-testid="teaser-hero-dossier-wrapper">
          <TeaserHeroDossier {...props} />
        </TestFragment>
      );
    }

    case TEASER_LAYOUT_SPECIAL: {
      return (
        <TestFragment data-testid="teaser-hero-special-wrapper">
          <TeaserHeroSpecial {...props} />
        </TestFragment>
      );
    }

    case TEASER_LAYOUT_LANDINGPAGE: {
      return (
        <TestFragment data-testid="teaser-hero-landingpage-wrapper">
          <TeaserHeroLandingPage {...props} />
        </TestFragment>
      );
    }

    default: {
      return (
        <TestFragment data-testid="teaser-hero-defualt-wrapper">
          <TeaserHeroDefault {...props} />
        </TestFragment>
      );
    }
  }
};
export default memo<TeaserProps>(TeaserHero);
