import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import {
  getBadgeByProps,
  getFormattedPublicationDateByProps,
  getIconByProps,
  getIsBottomLineVisibleByProps,
  getShortTitleElementByProps,
  getTitleBadgeByProps,
} from '../../../../shared/helpers';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_LONGFORM,
} from '../../../../../../../../../shared/constants/content';
import { LOGO_ABO_BADGE_SSSSM } from '../../../../../Logo/constants';
import {
  TEASER_IMAGE_IDENTIFIER,
  TEASER_LEAD_LENGTH,
  TEASER_LEAD_SUFFIX_TEXT,
} from '../../../../constants';
import defaultStyles from './styles.legacy.css';
import { TeaserProps } from '../../../../typings';
import { TeaserMLDefaultFactoryOptions } from './typings';

type TeaserMLDefaultPropsInner = TeaserProps & TeaserInterface;

const getStylesByPropsConfig =
  /* @ts-ignore TODO: TS7031 ->  Binding element 'styles' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'teaserIdentifier' implicitly has an 'any' type. */


    ({ styles, teaserIdentifier }) =>
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    (props) => ({
      OuterWrapper: defaultStyles.OuterWrapper,
      Wrapper: classNames(defaultStyles.Wrapper, teaserIdentifier, {
        [styles.MinimumHeight]: !!styles && !props.isHeadless,
      }),
      Title: defaultStyles.TeaserTitleWrapper,
      ImageWrapper: defaultStyles.TeaserImageWrapper,
      Image: classNames(defaultStyles.Image, TEASER_IMAGE_IDENTIFIER),
      TitleInner: defaultStyles.TeaserTitle,
      BottomLine: defaultStyles.BottomLine,
      Lead: defaultStyles.TeaserLead,
      ShortTitle: classNames(defaultStyles.ShortTitle, {
        [defaultStyles.ShortTitleAdvertorial]:
          props.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
        [defaultStyles.ShortTitleNA]:
          props.subtypeValue === ADVERTISING_TYPE_LONGFORM,
      }),
    });

export default ({
  teaserImageStyles,
  teaserIdentifier,
  styles,
}: TeaserMLDefaultFactoryOptions) => {
  const TeaserMLDefault = teaserFactory({
    trackingTeaserHandler: withTeaserTrackingHandler,
    /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo } */
    icon: getIconByProps(defaultStyles.Icon),
    /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, channel, link, } */
    badge: getBadgeByProps(defaultStyles.Badge),
    /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, contentBoxType, publicationDate, } */
    titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE_SSSSM),
    isIconPositionOnImage: true,
    formattedPublicationDate: getFormattedPublicationDateByProps,
    isPublicationDateVisible: false,
    isAuthorVisible: getIsBottomLineVisibleByProps,
    /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, shortTitle } */
    shortTitleElement: getShortTitleElementByProps(
      defaultStyles.ShortTitleAdvertorialSvg,
    ),
    teaserImageStyles,
    leadOptions: {
      truncateCount: TEASER_LEAD_LENGTH,
      append: TEASER_LEAD_SUFFIX_TEXT,
    },
    styles: getStylesByPropsConfig({ styles, teaserIdentifier }),
  });

  const withUpdatePolicy = shouldUpdate<any>(
    (props: TeaserMLDefaultPropsInner, nextProps: TeaserMLDefaultPropsInner) =>
      props.title !== nextProps.title,
  );

  return compose<any, any>(withUpdatePolicy)(TeaserMLDefault);
};
