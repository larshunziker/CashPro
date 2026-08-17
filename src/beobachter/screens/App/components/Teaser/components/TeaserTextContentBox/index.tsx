import React from 'react';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/factory';
import Img from '../../../Img';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import beobachterPlus from '../../../../assets/graphics/beobachterplus.svg';

const getBadgeByProps = ({ index }: TeaserFactoryProps) => {
  if (!index) {
    return null;
  }

  return (
    <div className={styles.NumberWrapper}>
      <span className={styles.Number}>{index}</span>
    </div>
  );
};

const getTitleBadgeByProps = ({ restrictionStatus }: TeaserFactoryProps) =>
  restrictionStatus === RESTRICTION_STATUS_PAID ? (
    <Img
      addClass={styles.BeoPlusLogo}
      alt="Beobachter Plus"
      url={beobachterPlus}
      width={26}
      height={13}
      ignoreLandscapeClass
    />
  ) : null;

const TeaserText = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ index } */
  badge: getBadgeByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus } */
  titleBadge: getTitleBadgeByProps,
  styles: {
    Wrapper: '',
    ContentWrapper: styles.ContentWrapper,
    Title: styles.TeaserTitle,
    ShortTitle: styles.ShortTitle,
  },
});

export default TeaserText;
