import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import {
  getIconAndBorderByProps,
  getInnerContentByProps,
  getShortTitleElementByProps,
} from '../../shared/helpers';
import { ORGANIZATION_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import {
  STYLE_TEASER_3_2,
  STYLE_TEASER_3_2_LARGE,
  STYLE_TEASER_3_2_SMALL,
} from '../../../../../../../shared/constants/images';
import { ORGANIZATION_TYPE_POP } from '../../../../screens/PopRestaurants/constants';
import { TEASER_ML_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import { TeaserFactoryOptionsStyles } from '../../../../../../../common/components/Teaser/typings';
import { TeaserProps } from '../../shared/typings';

const getStylesByProps = ({
  __typename,
  organizationType,
}: TeaserProps): TeaserFactoryOptionsStyles => {
  const isRestaurantTeaser =
    __typename === ORGANIZATION_CONTENT_TYPE &&
    // @ts-ignore Todo: fix this
    organizationType !== ORGANIZATION_TYPE_POP;

  return {
    Wrapper: classNames(TEASER_ML_IDENTIFIER, styles.Wrapper),
    ContentWrapper: classNames(styles.ContentWrapper, {
      [styles.ContentWrapperRestaurant]: isRestaurantTeaser,
    }),
    ImageWrapper: styles.ImageWrapper,
    Image: styles.Image,
    Title: styles.Title,
    Lead: styles.Lead,
    SkeletonShortTitle: styles.SkeletonShortTitle,
    SkeletonTitle: styles.SkeletonTitle,
  };
};

const TeaserML = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_TEASER_3_2_SMALL,
    style_960: STYLE_TEASER_3_2,
    style_1680: STYLE_TEASER_3_2_LARGE,
  },
  isIconPositionOnImage: true,
  icon: getIconAndBorderByProps(styles.PlayIcon),
  shortTitleElement: getShortTitleElementByProps(styles, styles.ShortTitle),
  innerContent: getInnerContentByProps(styles.Lead),
  styles: getStylesByProps,
});

export default TeaserML;
