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
  getIsBottomLineVisibleByProps,
  getTitleBadgeByProps,
} from '../../../../shared/helpers';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_LONGFORM,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
} from '../../../../../../../../../shared/constants/content';
import {
  STYLE_16X9_560,
  STYLE_16X9_700,
  STYLE_1X1_280,
  STYLE_3X2_440,
} from '../../../../../../../../../shared/constants/images';
import { LOGO_ABO_BADGE_SLLLL } from '../../../../../Logo/constants';
import {
  TEASER_HERO_DEFAULT_IDENTIFIER,
  TEASER_IMAGE_IDENTIFIER,
  TEASER_LEAD_LENGTH,
  TEASER_LEAD_SUFFIX_TEXT,
} from '../../../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../../../typings';

type TeaserHeroDefaultPropsInner = TeaserProps & TeaserInterface;

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getStylesByProps = (props) => ({
  Wrapper: classNames(TEASER_HERO_DEFAULT_IDENTIFIER, styles.Wrapper),
  ContentWrapper: styles.Right,
  ImageWrapper: styles.Left,
  Image: classNames(styles.Image, TEASER_IMAGE_IDENTIFIER),
  Title: styles.TeaserTitleWrapper,
  TitleInner: styles.Title,
  Lead: styles.Lead,
  BottomLine: styles.BottomLine,
  ShortTitle: classNames(styles.ShortTitle, {
    [styles.ShortTitleNA]:
      props.subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE ||
      props.subtypeValue === ADVERTISING_TYPE_LONGFORM,
    [styles.ShortTitleAdvertorial]:
      props.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
  }),
});

const TeaserHeroDefault = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, channel, link, } */
  badge: getBadgeByProps(styles.Badge),
  /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo } */
  icon: getIconByProps(styles.Icon),
  teaserImageStyles: {
    style_320: STYLE_16X9_560,
    style_760: STYLE_1X1_280,
    style_960: STYLE_3X2_440,
    style_1680: STYLE_16X9_700,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, contentBoxType, publicationDate, } */
  titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE_SLLLL),
  isIconPositionOnImage: true,
  trackingTeaserHandler: withTeaserTrackingHandler,
  formattedPublicationDate: getFormattedPublicationDateByProps,
  isPublicationDateVisible: false,
  isAuthorVisible: getIsBottomLineVisibleByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  innerContent: getInnerContentByProps(styles.SponsoredContent),
  leadOptions: {
    truncateCount: TEASER_LEAD_LENGTH,
    append: TEASER_LEAD_SUFFIX_TEXT,
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
