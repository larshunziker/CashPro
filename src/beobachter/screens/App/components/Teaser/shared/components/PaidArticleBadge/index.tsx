import React, { FC } from 'react';
import TestFragment from '../../../../../../../../shared/tests/components/TestFragment';
import Img from '../../../../Img';
import styles from './styles.legacy.css';
import beobachterPlus from '../../../../../assets/graphics/beobachterplus.svg';

const PaidArticleBadge: FC = () => (
  <TestFragment data-testid="paid-article-teaser-badge">
    <Img
      addClass={styles.Wrapper}
      alt="Beobachter Plus"
      url={beobachterPlus}
      width={26}
      height={13}
      ignoreLandscapeClass
    />
  </TestFragment>
);

export default PaidArticleBadge;
