import React, { memo } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserSMBrandReport from './components/TeaserSMBrandreport';
import TeaserSMDefault from './components/TeaserSMDefault';
import TeaserSMOpinion from './components/TeaserSMOpinion';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_TYPE_OPINION,
} from '../../../../../../../shared/constants/content';
import { TeaserProps } from '../../typings';

const Teaser = (props: TeaserProps) => {
  const type =
    props.articleType || props.subtypeValue || props.__typename || null;
  switch (type) {
    case ARTICLE_TYPE_OPINION: {
      return (
        <TestFragment data-testid="teaserSM-opinion-wrapper">
          <TeaserSMOpinion {...props} />
        </TestFragment>
      );
    }

    case ADVERTISING_TYPE_BRANDREPORT: {
      return (
        <TestFragment data-testid="teaserSM-brandreport-wrapper">
          <TeaserSMBrandReport {...props} />
        </TestFragment>
      );
    }

    default: {
      return (
        <TestFragment data-testid="teaserSM-default-wrapper">
          <TeaserSMDefault {...props} />
        </TestFragment>
      );
    }
  }
};

export default memo<TeaserProps>(Teaser);
