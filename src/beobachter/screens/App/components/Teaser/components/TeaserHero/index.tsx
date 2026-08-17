import React, { memo } from 'react';
import TeaserHeroAdvertorial from './components/TeaserHeroAdvertorial';
import TeaserHeroBrandReport from './components/TeaserHeroBrandReport';
import TeaserHeroDefault from './components/TeaserHeroDefault';
import TeaserHeroExplaining from './components/TeaserHeroExplaining';
import TeaserHeroGuide from './components/TeaserHeroGuide';
import TeaserHeroOpinion from './components/TeaserHeroOpinion';
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

const TeaserHero = (props: TeaserProps) => {
  const type = props.subtypeValue || props.__typename || '';

  switch (type) {
    case ADVERTISING_TYPE_BRANDREPORT: {
      return <TeaserHeroBrandReport {...props} />;
    }

    case ARTICLE_TYPE_OPINION: {
      return <TeaserHeroOpinion {...props} />;
    }

    case ADVERTISING_TYPE_EXTERNAL:
    case ADVERTISING_TYPE_NATIVE_ARTICLE:
    case ADVERTISING_TYPE_LONGFORM:
    case ADVERTISING_TYPE_ADVERTORIAL: {
      return <TeaserHeroAdvertorial {...props} />;
    }

    case EXPLAINING_ARTICLE_CONTENT_TYPE: {
      return <TeaserHeroExplaining {...props} />;
    }

    case ARTICLE_TYPE_GUIDE: {
      return <TeaserHeroGuide {...props} />;
    }

    default: {
      return <TeaserHeroDefault {...props} />;
    }
  }
};

export default memo<TeaserProps>(TeaserHero);
