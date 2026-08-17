import React, { ReactElement } from 'react';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';

const children: ReactElement = (
  <div className={styles.ChildWrapper}>
    <div className={styles.LexicalEntry}>Zum Lexikoneintrag</div>
    <div className={styles.ArrowWrap}>
      <Icon addClass={styles.Arrow} type="IconArrowRight" />
    </div>
  </div>
);

const TeaserExplaining = teaserFactory({
  children,
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: styles.Wrapper,
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
  },
});

export default TeaserExplaining;
