import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import {
  getFormattedPublicationDateByProps,
  getInnerContentByProps,
  getIsBottomLineVisibleByProps,
  getTitleBadgeByProps,
} from '../../../../shared/helpers';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
} from '../../../../../../../../../shared/constants/content';
import { LOGO_ABO_BADGE_SXXXS } from '../../../../../Logo/constants';
import {
  TEASER_LEAD_SUFFIX_TEXT,
  TEASER_XS_LEAD_LENGTH,
} from '../../../../constants';
import styles from './styles.legacy.css';

const getStylesByProps = (props: TeaserFactoryProps) => ({
  OuterWrapper: styles.OuterWrapper,
  Wrapper: styles.Wrapper,
  ContentWrapper: styles.ContentWrapper,
  Title: styles.TeaserTitle,
  Lead: styles.Lead,
  BottomLine: styles.BottomLine,
  ShortTitle: classNames(styles.ShortTitle, {
    [styles.ShortTitleNA]:
      props.subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE,
    [styles.ShortTitleAdvertorial]:
      props.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
  }),
});

const TeaserXSDefault = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, contentBoxType, publicationDate, } */
  titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE_SXXXS),
  isPublicationDateVisible: false,
  isAuthorVisible: getIsBottomLineVisibleByProps,
  formattedPublicationDate: getFormattedPublicationDateByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  innerContent: getInnerContentByProps(styles.SponsoredContent),
  trackingTeaserHandler: withTeaserTrackingHandler,
  leadOptions: {
    truncateCount: TEASER_XS_LEAD_LENGTH,
    append: TEASER_LEAD_SUFFIX_TEXT,
  },
  styles: getStylesByProps,
});

export default TeaserXSDefault;
