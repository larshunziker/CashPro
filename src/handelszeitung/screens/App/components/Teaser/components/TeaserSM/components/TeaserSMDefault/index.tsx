import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryOptionsStyles,
} from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import { getFormattedPublicationDateByProps } from '../../../../shared/helpers';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
} from '../../../../../../../../../shared/constants/content';
import { STYLE_3X2_210 } from '../../../../../../../../../shared/constants/images';
import {
  TEASER_IMAGE_IDENTIFIER,
  TEASER_SM_DEFAULT_IDENTIFIER,
} from '../../../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../../../typings';

type TeaserSMDefaultPropsInner = TeaserProps;

const getStylesByProps = ({
  addClass,
  subtypeValue,
}: TeaserSMDefaultPropsInner): TeaserFactoryOptionsStyles => ({
  OuterWrapper: styles.OuterWrapper,
  Wrapper: classNames(TEASER_SM_DEFAULT_IDENTIFIER, styles.Wrapper, {
    addClass: !!addClass,
  }),
  ImageWrapper: styles.ImageWrapper,
  Image: classNames(styles.Image, TEASER_IMAGE_IDENTIFIER),
  ContentWrapper: styles.ContentWrapper,
  Title: styles.Title,
  TitleInner: styles.TitleInner,
  BottomLine: styles.BottomLine,
  ShortTitle: classNames(styles.ShortTitle, {
    [styles.ShortTitleAdvertorial]:
      subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
    [styles.ShortTitleNA]: subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE,
  }),
  SkeletonWrapper: styles.SkeletonWrapper,
  SkeletonContentWrapper: styles.SkeletonContentWrapper,
  SkeletonShortTitle: styles.SkeletonShortTitle,
  SkeletonTitle: styles.SkeletonTitle,
});

const TeaserSMDefault = teaserFactory({
  trackingTeaserHandler: withTeaserTrackingHandler,
  formattedPublicationDate: getFormattedPublicationDateByProps,
  isIconPositionOnImage: true,
  isPublicationDateVisible: false,
  teaserImageStyles: {
    style_320: STYLE_3X2_210,
  },
  styles: getStylesByProps,
});

export default TeaserSMDefault;
