import React, { memo } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserMDefault from './components/TeaserMDefault';
import TeaserMLandingPage from './components/TeaserMLandingPage';
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

    //if a sponsor is set, render default secondary teaser
    if (props.sponsor) {
      type = null;
    }
  }

  // component switch does not work because ARTICLE_TYPE_OPINION is not defined on init
  switch (type) {
    case TEASER_LAYOUT_LANDINGPAGE: {
      return (
        <TestFragment data-testid="teaserM-landingpage-wrapper">
          <TeaserMLandingPage {...props} />
        </TestFragment>
      );
    }

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
