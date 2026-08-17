import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../common/components/Teaser/helpers';
import {
  getFormattedPublicationDateByProps,
  getInnerContentByProps,
  getIsBottomLineVisibleByProps,
  getTitleBadgeByProps,
} from '../../shared/helpers';
import { LOGO_ABO_BADGE_XXXXS } from '../../../Logo/constants';
import { TEASER_XXS_DEFAULT_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';

const TeaserXXS = teaserFactory({
  isShortTitleHidden: false,
  isPublicationDateVisible: false,
  isAuthorVisible: getIsBottomLineVisibleByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, contentBoxType, publicationDate, } */
  titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE_XXXXS),
  formattedPublicationDate: getFormattedPublicationDateByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  innerContent: getInnerContentByProps(styles.SponsoredContent),
  trackingTeaserHandler: withTeaserTrackingHandler,
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(TEASER_XXS_DEFAULT_IDENTIFIER, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.TeaserTitle,
    BottomLine: styles.BottomLine,
  },
});

export default TeaserXXS;
