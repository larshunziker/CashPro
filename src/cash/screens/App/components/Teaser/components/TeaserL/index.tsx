import React, { memo } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserLDefault from './components/TeaserLDefault';
import TeaserLLandingPage from './components/TeaserLLandingPage';
import {
  LANDING_PAGE_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { TEASER_LAYOUT_LANDINGPAGE } from '../../../../../../../shared/constants/teaser';
import { TeaserProps } from '../../typings';

const Teaser = (props: TeaserProps) => {
  let type = props.subtypeValue || props.__typename || null;

  if (
    props.__typename === LANDING_PAGE_CONTENT_TYPE ||
    props.__typename === PAGE_CONTENT_TYPE
  ) {
    type = TEASER_LAYOUT_LANDINGPAGE;

    //if a sponsor is set, render default teaser
    if (props.sponsor) {
      type = null;
    }
  }

  // component switch does not work because ARTICLE_TYPE_OPINION is not defined on init
  switch (type) {
    case TEASER_LAYOUT_LANDINGPAGE: {
      return (
        <TestFragment data-testid="teaserL-landingpage-wrapper">
          <TeaserLLandingPage {...props} />
        </TestFragment>
      );
    }

    default: {
      return (
        <TestFragment data-testid="teaserL-default-wrapper">
          <TeaserLDefault {...props} />
        </TestFragment>
      );
    }
  }
};

export default memo<TeaserProps>(Teaser);
