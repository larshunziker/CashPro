/* istanbul ignore file */

import React from 'react';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
// import { getTitleBadgeByProps } from '../../shared/helpers';
import { CONTENT_SOURCE_MOST_READ } from '../../../../../../../shared/constants/content';
// import { LOGO_ABO_BADGE } from '../../../Logo/constants';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'contentBoxType' implicitly has an 'any' type. */
const getBadgeByProps = ({ index, contentBoxType }) => {
  if (!index || (index && contentBoxType !== CONTENT_SOURCE_MOST_READ)) {
    return null;
  }
  return (
    <div className={styles.NumberWrapper}>
      <span className={styles.Number}>{index}</span>
    </div>
  );
};

const TeaserText = teaserFactory({
  isShortTitleHidden: true,
  /* @ts-ignore TODO: TS2322 ->  Type '({ index, contentBoxType } */
  badge: getBadgeByProps,
  // titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE),
  styles: {
    Wrapper: styles.Wrapper,
    ContentWrapper: styles.ContentWrapper,
    Title: styles.TeaserTitle,
    TitleTickerBox: styles.TitleTickerBox,
  },
});

export default TeaserText;
