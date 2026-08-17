import React, { memo } from 'react';
import TeaserMAdvertorial from './components/TeaserMAdvertorial';
import TeaserMBrandReport from './components/TeaserMBrandReport';
import TeaserMDefault from './components/TeaserMDefault';
import TeaserMExplaining from './components/TeaserMExplaining';
import TeaserMGuide from './components/TeaserMGuide';
import TeaserMOpinion from './components/TeaserMOpinion';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_EXTERNAL,
  ADVERTISING_TYPE_LONGFORM,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_OPINION,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { TeaserProps } from '../../typings';

const TeaserM = (props: TeaserProps) => {
  const type = props.subtypeValue || props.__typename || null;
  switch (type) {
    case ARTICLE_TYPE_OPINION: {
      return <TeaserMOpinion {...props} />;
    }

    case ADVERTISING_TYPE_EXTERNAL:
    case ADVERTISING_TYPE_LONGFORM:
    case ADVERTISING_TYPE_NATIVE_ARTICLE:
    case ADVERTISING_TYPE_ADVERTORIAL: {
      return <TeaserMAdvertorial {...props} />;
    }

    case EXPLAINING_ARTICLE_CONTENT_TYPE: {
      return <TeaserMExplaining {...props} />;
    }

    case ADVERTISING_TYPE_BRANDREPORT: {
      return <TeaserMBrandReport {...props} />;
    }

    case ARTICLE_TYPE_GUIDE: {
      return <TeaserMGuide {...props} />;
    }

    default: {
      return <TeaserMDefault {...props} />;
    }
  }
};

export default memo<TeaserProps>(TeaserM);
