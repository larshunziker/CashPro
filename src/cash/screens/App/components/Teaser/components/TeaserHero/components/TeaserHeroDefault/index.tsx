import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import {
  getBadgeByProps,
  getFormattedPublicationDateByProps,
  getIconByProps,
  getInnerContentByProps,
  getIsPublicationDateVisibleByProps,
  getTitleBadgeByProps,
  isAuthorVisibleByProps,
} from '../../../../shared/helpers';
import {
  STYLE_16X9_560,
  STYLE_16X9_700,
} from '../../../../../../../../../shared/constants/images';
// import { LOGO_ABO_BADGE_SLLLL } from '../../../../../Logo/constants';
import {
  TEASER_HERO_DEFAULT_IDENTIFIER,
  TEASER_IMAGE_IDENTIFIER,
  TEASER_LEAD_LENGTH,
} from '../../../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../../../typings';

type TeaserHeroDefaultPropsInner = TeaserProps & TeaserInterface;

const getStylesByProps = () => ({
  Wrapper: classNames(TEASER_HERO_DEFAULT_IDENTIFIER, styles.Wrapper),
  ContentWrapper: styles.Right,
  ImageWrapper: styles.Left,
  Image: classNames(styles.Image, TEASER_IMAGE_IDENTIFIER),
  Title: styles.TeaserTitleWrapper,
  TitleInner: styles.Title,
  Lead: styles.Lead,
  BottomLine: styles.BottomLine,
  ShortTitle: styles.ShortTitle,
});

const TeaserHeroDefault = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, link } */
  badge: getBadgeByProps(styles.Badge),
  /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo } */
  icon: getIconByProps(styles.Icon),
  teaserImageStyles: {
    style_320: STYLE_16X9_560,
    style_1680: STYLE_16X9_700,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ contentBoxType, publicationDate, subtypeValue, } */
  titleBadge: getTitleBadgeByProps(),
  isIconPositionOnImage: true,
  isAuthorVisible: isAuthorVisibleByProps,
  isAuthorPrefixVisible: true,
  trackingTeaserHandler: withTeaserTrackingHandler,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  formattedPublicationDate: getFormattedPublicationDateByProps,
  isPublicationDateVisible: getIsPublicationDateVisibleByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  innerContent: getInnerContentByProps(),
  leadOptions: {
    truncateCount: TEASER_LEAD_LENGTH,
    append: '...',
  },
  styles: getStylesByProps,
});

const withUpdatePolicy = shouldUpdate<any>(
  (
    props: TeaserHeroDefaultPropsInner,
    nextProps: TeaserHeroDefaultPropsInner,
  ): boolean => props.title !== nextProps.title,
);

export default compose<any, any>(withUpdatePolicy)(TeaserHeroDefault);
