import React from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { getIconByProps } from '../../../../shared/helpers';
import Img from '../../../../../Img';
import {
  ARTICLE_CONTENT_TYPE,
  RESTRICTION_STATUS_PAID,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../../../shared/constants/content';
import {
  STYLE_16X9_560,
  STYLE_16X9_440,
  STYLE_3X2_210,
  STYLE_3X2_280,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_M_DEFAULT_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';
import beobachterPlus from '../../../../../../assets/graphics/beobachterplus.svg';
import { TeaserProps } from '../../../../typings';

const getTitleBadgeByProps = ({ restrictionStatus }: TeaserProps) =>
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

const isIconPositionOnImage = ({ __typename, hasVideo }: TeaserProps) =>
  (__typename === ARTICLE_CONTENT_TYPE && hasVideo) ||
  __typename === VIDEO_CONTENT_TYPE;

const TeaserMDefault = teaserFactory({
  isIconPositionOnImage: isIconPositionOnImage,
  /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo } */
  icon: getIconByProps(styles.Icon),
  teaserImageStyles: {
    style_320: STYLE_16X9_560,
    style_540: STYLE_16X9_560,
    style_760: STYLE_3X2_210,
    style_960: STYLE_3X2_280,
    style_1680: STYLE_16X9_440,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus } */
  titleBadge: getTitleBadgeByProps,
  leadOptions: {
    suffixText: '',
  },
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, TEASER_M_DEFAULT_IDENTIFIER),
    ContentWrapper: styles.ContentWrapper,
    Image: styles.Image,
    ImageWrapper: styles.ImageWrapper,
    Title: styles.Title,
    ShortTitle: styles.ShortTitle,
    Lead: styles.Lead,
  },
});

export default TeaserMDefault;
