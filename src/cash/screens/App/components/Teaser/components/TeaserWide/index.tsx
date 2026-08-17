import React, { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
  getFormattedDate,
} from '../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../common/components/Teaser/helpers';
import {
  DEFAULT_AUTHOR_PREFIX_LANGUAGE,
  authorPrefixConfig,
} from '../../../../../../../shared/helpers/authors';
import { truncateByWord } from '../../../../../../../shared/helpers/utils';
import {
  getBadgeByProps,
  getFormattedPublicationDateByProps,
  getIsPublicationDateVisibleByProps,
  getTitleBadgeByProps,
  isAuthorVisibleByProps,
} from '../../shared/helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import Picture from '../../../../../../../common/components/Picture';
import Icon from '../../../Icon';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  STYLE_16X9_440,
  STYLE_3X2_280,
} from '../../../../../../../shared/constants/images';
import { SCREEN_SEARCH_RESULTS } from '../../../SearchResults/constants';
import {
  TEASER_IMAGE_IDENTIFIER,
  TEASER_LEAD_LENGTH,
  TEASER_M_DEFAULT_IDENTIFIER,
} from '../../constants';
import {
  TEASER_ICON_TYPE_GALLERY_ICON,
  TEASER_ICON_TYPE_VIDEO_ICON,
} from '../TeaserIcon/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import defaultStyles from './styles.legacy.css';
import { TeaserProps } from '../../typings';

type TeaserWidePropsInner = TeaserProps & TeaserInterface;

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
  /* @ts-ignore TODO: TS7031 ->  Binding element 'teaserIdentifier' implicitly has an 'any' type. */

  ({ teaserIdentifier }) =>
    /* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'routePath' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'hasVideo' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element '__typename' implicitly has an 'any' type. */
    ({ subtypeValue, origin, routePath, hasVideo, __typename, ...props }) => {
      const isFallbackImageHidden = checkFallbackImageHidden(routePath, props);
      let hasIcon = false;
      if (
        __typename === IMAGE_GALLERY_CONTENT_TYPE ||
        (__typename === ARTICLE_CONTENT_TYPE && hasVideo) ||
        __typename === VIDEO_CONTENT_TYPE
      ) {
        hasIcon = true;
      }
      return {
        ContentWrapper: classNames(defaultStyles.ContentWrapper, {
          [defaultStyles.IsWithoutImage]: isFallbackImageHidden,
        }),
        OuterWrapper: defaultStyles.OuterWrapper,
        Wrapper: classNames(defaultStyles.Wrapper, teaserIdentifier),
        Title: classNames(defaultStyles.TeaserTitleWrapper, {
          [defaultStyles.IsWithoutImage]: isFallbackImageHidden,
        }),
        ImageWrapper: classNames(defaultStyles.TeaserImageWrapper, {
          [defaultStyles.Hidden]: isFallbackImageHidden,
          [defaultStyles.HasIcon]: hasIcon,
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
        Lead: classNames(grid.HiddenSmDown, defaultStyles.TeaserLead, {
          [defaultStyles.SearchTeaserM]: origin === SCREEN_SEARCH_RESULTS,
        }),
        ShortTitle: classNames({
          [defaultStyles.ShortTitleAdvertorial]:
            subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
          [defaultStyles.SearchShortTitle]: origin === SCREEN_SEARCH_RESULTS,
          [defaultStyles.ShortTitle]: origin !== SCREEN_SEARCH_RESULTS,
          [defaultStyles.IsWithoutImage]: isFallbackImageHidden,
        }),
      };
    };

/* @ts-ignore TODO: TS7006 ->  Parameter 'iconStyle' implicitly has an 'any' type. */
const getIconByProps = (iconStyle) => {
  /* @ts-ignore TODO: TS7031 ->  Binding element '__typename' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'hasVideo' implicitly has an 'any' type. */
  const getIconByProps = ({ __typename, hasVideo }) => {
    if (__typename === IMAGE_GALLERY_CONTENT_TYPE) {
      return (
        <div className={iconStyle}>
          <Icon
            type={TEASER_ICON_TYPE_GALLERY_ICON}
            addClass={defaultStyles.Icon}
          />
        </div>
      );
    } else if (
      (__typename === ARTICLE_CONTENT_TYPE && hasVideo) ||
      __typename === VIDEO_CONTENT_TYPE
    ) {
      return (
        <div className={iconStyle}>
          <Icon
            type={TEASER_ICON_TYPE_VIDEO_ICON}
            addClass={defaultStyles.Icon}
          />
        </div>
      );
    } else {
      return null;
    }
  };
  return getIconByProps;
};

const getInnerContentByProps = ({
  ...props
}: TeaserFactoryProps & {
  routePath: string;
  teaserImage: TeaserImageInterface;
} & AuthorConnection) => {
  const {
    title,
    lead,
    teaserImage,
    image,
    downloadPriority,
    publicationDate,
    authors,
    authorPrefix,
    routePath,
  } = props;
  const leadOptions = {
    truncateCount: 150,
    append: '...',
  };
  const teaserImageRelativePath = teaserImage?.image?.file?.relativeOriginPath;
  const focalPointX =
    teaserImage?.image?.file?.focalPointX || image?.file?.focalPointX;
  const focalPointY =
    teaserImage?.image?.file?.focalPointY || image?.file?.focalPointY;
  const teaserImageStyles = {
    style_320: STYLE_3X2_280,
    style_1680: STYLE_16X9_440,
  };
  const teaserImageAlt = teaserImage?.image?.file?.alt || '';
  const icon = getIconByProps(defaultStyles.IconWrapper)({
    __typename: props?.__typename,
    hasVideo: props?.hasVideo,
  });
  const badge = getBadgeByProps(defaultStyles.IconWrapper)(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'TeaserFactoryProps' is not assignable to parameter of type 'TeasableInterfaceNode'. */
    props as TeaserFactoryProps,
  );
  const formattedPublicationDate = getFormattedPublicationDateByProps(props);
  const isPublicationDateVisible = getIsPublicationDateVisibleByProps(props);
  const formattedPublicationDatePlain = getFormattedDate(publicationDate);
  const isFallbackImageHidden = checkFallbackImageHidden(routePath, props);
  return (
    <div className={defaultStyles.OuterContentWrapper}>
      {lead && leadOptions && Object.keys(leadOptions).length > 0 && (
        <div className={defaultStyles.TeaserLead}>
          {(teaserImageRelativePath && teaserImageStyles && (
            <div
              className={classNames(defaultStyles.TeaserImageWrapper, {
                [defaultStyles.Hidden]: isFallbackImageHidden,
                [defaultStyles.HasIcon]: !!icon,
              })}
              data-testid="teaser-factory-image-wrapper"
            >
              <>
                <Picture
                  downloadPriority={downloadPriority}
                  relativeOrigin={teaserImageRelativePath}
                  /* @ts-ignore TODO: TS2322 ->  Type 'number | undefined' is not assignable to type 'number'. */
                  focalPointX={focalPointX}
                  /* @ts-ignore TODO: TS2322 ->  Type 'number | undefined' is not assignable to type 'number'. */
                  focalPointY={focalPointY}
                  alt={teaserImageAlt}
                  className={defaultStyles.Image}
                  disableWrapperClassName={true}
                  disableLineHeightResetClassName={false}
                  {...teaserImageStyles}
                  title={title}
                />
                {icon || null}
                {badge || null}
              </>
            </div>
          )) ||
            null}
          {truncateByWord(
            lead,
            leadOptions.truncateCount,
            leadOptions.append || '',
          )}
          <div>
            {isPublicationDateVisible && formattedPublicationDatePlain && (
              <div className={defaultStyles.BottomLine}>
                {(formattedPublicationDate && (
                  <span title={formattedPublicationDatePlain}>
                    {formattedPublicationDate}
                  </span>
                )) || (
                  <span title={formattedPublicationDatePlain}>{`am ${
                    formattedPublicationDatePlain || ''
                  }`}</span>
                )}
              </div>
            )}
            {authors &&
              authors.edges &&
              authors.edges.length > 0 &&
              isAuthorVisibleByProps(props) && (
                <div className={defaultStyles.BottomLine}>
                  {authorPrefix && (
                    <span>
                      {
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ by */
                        authorPrefixConfig[authorPrefix][
                          DEFAULT_AUTHOR_PREFIX_LANGUAGE
                        ]
                      }
                    </span>
                  )}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
                  {authors.edges.map(({ node }, index) => (
                    <span key={`author-${node.id}`}>
                      {index !== 0 ? ', ' : ''}
                      {node.name}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

const TeaserWide = teaserFactory({
  trackingTeaserHandler: withTeaserTrackingHandler,
  /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo } */
  icon: getIconByProps(defaultStyles.IconWrapper),
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, link } */
  badge: getBadgeByProps(defaultStyles.Badge),
  /* @ts-ignore TODO: TS2322 ->  Type '({ contentBoxType, publicationDate, subtypeValue, } */
  titleBadge: getTitleBadgeByProps(),
  disableWrapperClassName: true,
  isIconPositionOnImage: true,
  isAuthorVisible: isAuthorVisibleByProps,
  isAuthorPrefixVisible: true,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  formattedPublicationDate: getFormattedPublicationDateByProps,
  isPublicationDateVisible: getIsPublicationDateVisibleByProps,
  teaserImageStyles: {
    style_320: STYLE_3X2_280,
    style_1680: STYLE_16X9_440,
  },
  leadOptions: {
    truncateCount: TEASER_LEAD_LENGTH,
    append: '...',
  },
  styles: getStylesByPropsConfig({
    teaserIdentifier: TEASER_M_DEFAULT_IDENTIFIER,
  }),
  children: getInnerContentByProps,
});

const withUpdatePolicy = shouldUpdate<any>(
  (props: TeaserWidePropsInner, nextProps: TeaserWidePropsInner) =>
    props.title !== nextProps.title,
);

const mapStateToProps = (state: ReduxState) => ({
  routePath: locationStateSelector(state).locationBeforeTransitions.pathname,
});

export default compose<any, any>(
  connect(mapStateToProps),
  withUpdatePolicy,
)(TeaserWide);
