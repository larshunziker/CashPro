import React, { memo } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserHeroDefault from './components/TeaserHeroDefault';
import TeaserHeroLandingPage from './components/TeaserHeroLandingPage';
import {
  LANDING_PAGE_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { TEASER_LAYOUT_LANDINGPAGE } from '../../../../../../../shared/constants/teaser';
import { TeaserProps } from '../../typings';

const TeaserHero = (props: TeaserProps) => {
  let type = props.subtypeValue || props.__typename || null;

  if (
    props.__typename === LANDING_PAGE_CONTENT_TYPE ||
    props.__typename === PAGE_CONTENT_TYPE
  ) {
    type = TEASER_LAYOUT_LANDINGPAGE;

    //if a sponsor is set, render default secondary teaser
    if (props?.sponsor) {
      type = null;
    }
  }

  switch (type) {
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
