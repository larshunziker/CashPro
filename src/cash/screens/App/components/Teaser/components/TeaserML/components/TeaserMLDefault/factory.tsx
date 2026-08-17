import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import {
  getBadgeByProps,
  getFormattedPublicationDateByProps,
  getIconByProps,
  getIsPublicationDateVisibleByProps,
  getTitleBadgeByProps,
  isAuthorVisibleByProps,
} from '../../../../shared/helpers';
import locationStateSelector from '../../../../../../../../shared/selectors/locationStateSelector';
import { ADVERTISING_TYPE_ADVERTORIAL } from '../../../../../../../../../shared/constants/content';
import { SCREEN_SEARCH_RESULTS } from '../../../../../SearchResults/constants';
import {
  TEASER_IMAGE_IDENTIFIER,
  TEASER_LEAD_LENGTH,
} from '../../../../constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import defaultStyles from './styles.legacy.css';
import { TeaserProps } from '../../../../typings';
import { TeaserMLDefaultFactoryOptions } from './typings';

type TeaserMLDefaultPropsInner = TeaserProps & TeaserInterface;

const FALLBACK_IMAGE_HIDDEN_FOR_PATHS = [
  '/hybrid-news/boersenticker',
  '/hybrid-news/alle',
  '/news/alle',
  '/news/boersenticker',
];

/* @ts-ignore TODO: TS7006 ->  Parameter 'routePath' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const checkFallbackImageHidden = (routePath, props) =>
  FALLBACK_IMAGE_HIDDEN_FOR_PATHS.includes(routePath) &&
  props?.teaserImage?.image?.file?.relativeOriginPath.indexOf('cash_fallback') >
    -1;

const getStylesByPropsConfig =
  /* @ts-ignore TODO: TS7031 ->  Binding element 'styles' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'teaserIdentifier' implicitly has an 'any' type. */

  ({ styles, teaserIdentifier }) =>
    /* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'isHeadless' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'routePath' implicitly has an 'any' type. */
    ({ subtypeValue, origin, isHeadless, routePath, ...props }) => {
      const isFallbackImageHidden = checkFallbackImageHidden(routePath, props);

      return {
        OuterWrapper: defaultStyles.OuterWrapper,
        Wrapper: classNames(defaultStyles.Wrapper, teaserIdentifier, {
          [styles.MinimumHeight]:
            !isFallbackImageHidden || (!!styles && !isHeadless),
        }),
        Title: defaultStyles.TeaserTitleWrapper,
        ImageWrapper: classNames(defaultStyles.TeaserImageWrapper, {
          [grid.HiddenSmDown]: isFallbackImageHidden,
        }),
        Image: classNames(defaultStyles.Image, TEASER_IMAGE_IDENTIFIER),
        TitleInner: defaultStyles.TeaserTitle,
        BottomLine: classNames(
          {
            [defaultStyles.SearchPublicationDate]:
              origin === SCREEN_SEARCH_RESULTS,
          },
          defaultStyles.BottomLine,
        ),
        Lead: classNames(defaultStyles.TeaserLead, {
          [defaultStyles.SearchTeaserM]: origin === SCREEN_SEARCH_RESULTS,
        }),
        ShortTitle: classNames({
          [defaultStyles.ShortTitleAdvertorial]:
            subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
          [defaultStyles.SearchShortTitle]: origin === SCREEN_SEARCH_RESULTS,
          [defaultStyles.ShortTitle]: origin !== SCREEN_SEARCH_RESULTS,
        }),
      };
    };

export default ({
  teaserImageStyles,
  teaserIdentifier,
  styles,
}: TeaserMLDefaultFactoryOptions) => {
  const TeaserMLDefault = teaserFactory({
    trackingTeaserHandler: withTeaserTrackingHandler,
    /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo } */
    icon: getIconByProps(defaultStyles.Icon),
    /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, link } */
    badge: getBadgeByProps(defaultStyles.Badge),
    /* @ts-ignore TODO: TS2322 ->  Type '({ contentBoxType, publicationDate, subtypeValue, } */
    titleBadge: getTitleBadgeByProps(),
    isIconPositionOnImage: true,
    isAuthorVisible: isAuthorVisibleByProps,
    isAuthorPrefixVisible: true,
    /* @ts-ignore TODO: TS2322 ->  Type '(props */
    formattedPublicationDate: getFormattedPublicationDateByProps,
    isPublicationDateVisible: getIsPublicationDateVisibleByProps,
    teaserImageStyles,
    leadOptions: {
      truncateCount: TEASER_LEAD_LENGTH,
      append: '...',
    },
    styles: getStylesByPropsConfig({ styles, teaserIdentifier }),
  });

  const withUpdatePolicy = shouldUpdate<any>(
    (props: TeaserMLDefaultPropsInner, nextProps: TeaserMLDefaultPropsInner) =>
      props.title !== nextProps.title,
  );

  const mapStateToProps = (state: ReduxState) => ({
    routePath: locationStateSelector(state).locationBeforeTransitions.pathname,
  });

  return compose<any, any>(
    connect(mapStateToProps),
    withUpdatePolicy,
  )(TeaserMLDefault);
};
