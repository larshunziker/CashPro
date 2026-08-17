import React, { memo } from 'react';
import TeaserHeroMainDefault from './components/TeaserHeroMainDefault';
import TeaserHeroMainGuide from './components/TeaserHeroMainGuide';
import { ARTICLE_TYPE_GUIDE } from '../../../../../../../shared/constants/content';
import { TeaserProps } from '../../typings';

const TeaserHeroMain = (props: TeaserProps) => {
  const type = props.subtypeValue || props.__typename || null;

  switch (type) {
    case ARTICLE_TYPE_GUIDE: {
      return <TeaserHeroMainGuide {...props} />;
    }

    default: {
      return <TeaserHeroMainDefault {...props} />;
    }
  }
};

export default memo<TeaserProps>(TeaserHeroMain);
