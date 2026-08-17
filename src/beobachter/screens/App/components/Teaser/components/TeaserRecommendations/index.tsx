import React from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryOptionsStyles,
} from '../../../../../../../common/components/Teaser/factory';
import { getShortTitleElementByProps } from '../../../Teaser/shared/helpers';
import PaidArticleBadge from '../../shared/components/PaidArticleBadge';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../shared/constants/content';
import {
  STYLE_16X9_280,
  STYLE_3X2_280,
} from '../../../../../../../shared/constants/images';
import { TEASER_RECOMMENDATIONS_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../typings';

export const getStylesByProps = ({
  addClass,
}: TeaserProps): TeaserFactoryOptionsStyles => {
  return {
    Wrapper: classNames(TEASER_RECOMMENDATIONS_IDENTIFIER, styles.Wrapper, {
      addClass: !!addClass,
    }),
    ImageWrapper: styles.ImageWrapper,
    Image: styles.Image,
    ContentWrapper: styles.TeaserText,
    Title: styles.TeaserTitle,
    SkeletonWrapper: styles.SkeletonWrapper,
    SkeletonContentWrapper: styles.SkeletonContentWrapper,
    SkeletonShortTitle: styles.SkeletonShortTitle,
    SkeletonTitle: styles.SkeletonTitle,
  };
};

export const BeoPlusBadge = ({ restrictionStatus }: TeaserProps) => {
  if (restrictionStatus === RESTRICTION_STATUS_PAID) {
    return (
      <div className={styles.PaidArticleBadge}>
        <PaidArticleBadge />
      </div>
    );
  }
  return null;
};

const TeaserRecommendations = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus } */
  icon: BeoPlusBadge,
  isIconPositionOnImage: true,
  /* @ts-ignore TODO: TS2322 ->  Type '({ shortTitle, link, ...props } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitle),
  styles: getStylesByProps,
  teaserImageStyles: {
    style_320: STYLE_16X9_280,
    style_760: STYLE_3X2_280,
  },
});

export default TeaserRecommendations;
