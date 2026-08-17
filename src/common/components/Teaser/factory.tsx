// include polyfill
// https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill
import 'helpers/intersection-observer';

import React, { Component, ReactElement, ReactNode } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import GAImpressionScore from './components/GAImpressionScore/factory';
import {
  DEFAULT_AUTHOR_PREFIX_LANGUAGE,
  authorPrefixConfig,
} from '../../../shared/helpers/authors';
import { noop, truncateByWord } from '../../../shared/helpers/utils';
import { createTeaserTealiumTrackEventProps, doHandleTealium } from './helpers';
import bookmarkListStateSelector from '../../../shared/selectors/bookmarkListStateSelector';
import TestFragment from '../../../shared/tests/components/TestFragment';
import Link from '../Link';
import Picture from '../Picture';
import {
  ADVERTISING_TYPE_EXTERNAL,
  ADVERTISING_TYPE_EXTERNAL_LABEL,
  CONTENT_SOURCE_TICKER,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../shared/constants/content';
import {
  PUBLICATION_BEOBACHTER,
  PUBLICATION_BIL,
  PUBLICATION_GM,
  PUBLICATION_GM_FR,
  PUBLICATION_HZ,
  PUBLICATION_HZB,
  PUBLICATION_SI,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../shared/constants/publications';
import skeletonStyles from './skeleton.legacy.css';
import factoryStyles from './styles.legacy.css';
// @ts-ignore
import LogoBEO from '../../assets/graphics/beo-logo.svg';
// @ts-ignore
import LogoBIL from '../../assets/graphics/bil-logo.svg';
// @ts-ignore
import LogoGM from '../../assets/graphics/gm-logo.svg';
// @ts-ignore
import LogoHZ from '../../assets/graphics/hz-logo.svg';
// @ts-ignore
import LogoHZB from '../../assets/graphics/hzb_logo.svg';
// @ts-ignore
import LogoSI from '../../assets/graphics/si-logo.svg';
// @ts-ignore
import LogoSV from '../../assets/graphics/sv-logo.svg';
import {
  TeaserComponent,
  TeaserFactoryLeadOptions,
  TeaserFactoryOptions,
  TeaserFactoryOptionsStyles,
  TeaserFactoryProps,
  TeaserFactoryState,
  TeaserFactoryTeaserImage,
} from './typings';

// TODO: remove this
export type {
  TeaserFactoryOptionsStyles,
  TeaserFactoryProps,
  TeaserFactoryPropsInner,
  TeaserFactoryTeaserImage,
};

type TeaserFactoryPropsInner = TeaserFactoryProps;

type getFormattedDateType = (publicationDate: string | number) => string;

type getPublicationLogoByPublicationOptions = {
  publication: string;
  styles: TeaserFactoryOptionsStyles;
};

type getPublicationLogoByPublicationType = (
  options: getPublicationLogoByPublicationOptions,
) => null | ReactElement;

type RenderTeaserParams = {
  styles: TeaserFactoryOptionsStyles;
  badge: ReactElement | null;
  shortTitle: string | null;
  shortTitleElement: ReactElement | null;
  title: string | null;
  contentBoxType?: string;
  lead: string;
  summary: string;
  publication?: string;
  leadOptions: TeaserFactoryLeadOptions;
  sponsorImage: ReactElement | null;
  titleBadge: ReactElement | null;
  hasPublicationLogo: boolean;
  isPublicationDateVisible?: boolean;
  isAuthorVisible?: boolean;
  authorPrefix?: string;
  isAuthorPrefixVisible?: boolean;
  publicationDate: string;
  formattedPublicationDate: string | ReactElement;
  teaserImageRelativePath: string;
  focalPointX: number;
  focalPointY: number;
  teaserImageAlt: string;
  teaserImageStyles: ImageStylesObject;
  children: ReactNode;
  icon: ReactElement | null;
  isIconPositionOnImage: boolean;
  isTicker: boolean;
  isShortTitleHidden: boolean;
  innerContent: ReactElement;
  disableWrapperClassName: boolean;
  disableLineHeightResetClassName: boolean;
  allowHtmlTagsInTitle?: boolean;
  downloadPriority?: 'high' | 'default';
  showUpdated?: boolean;
  authors?: AuthorConnection;
  useAutoHyphens?: boolean;
};

type RenderSkeletonParams = {
  styles: TeaserFactoryOptionsStyles;
  skeletonPlaceholderImg: string;
};

/* @ts-ignore TODO: TS2322 ->  Type '(date */
export const getFormattedDate: getFormattedDateType = (date) => {
  if (!date) {
    return null;
  }

  let safariSafeDate = date;

  // safari can not parse a date string containing a timezone value like 2019-03-08T06:49:02+0100
  // to workaround this issue w/o loosing the timezone info, we format the date to a value like
  // 2019-03-08T06:49:02+01:00 (hh:mm instead of hhmm). this way it works on all major browsers
  if (typeof safariSafeDate === 'string' && safariSafeDate.indexOf('+') > -1) {
    const parts = safariSafeDate.split('+');
    if (parts[1] && parts[1].length === 4) {
      safariSafeDate = `${parts[0]}+${parts[1].substr(0, 2)}:${parts[1].substr(
        2,
        2,
      )}`;
    }
  }

  const finalDate = new Date(safariSafeDate).toISOString();

  return finalDate.split('T')[0].split('-').reverse().join('.');
};

const getPublicationLogoByPublication: getPublicationLogoByPublicationType = ({
  publication,
  styles,
}) => {
  if (
    !publication ||
    publication === 'none' ||
    publication.indexOf(__APP_NAME__.replace(/\-/g, '_')) !== -1
  ) {
    return null;
  }

  let logo = '';

  switch (publication) {
    case PUBLICATION_BEOBACHTER:
      logo = LogoBEO;
      break;

    case PUBLICATION_BIL:
      logo = LogoBIL;
      break;

    case PUBLICATION_SI:
      logo = LogoSI;
      break;

    case PUBLICATION_GM:
    case PUBLICATION_GM_FR:
      logo = LogoGM;
      break;

    case PUBLICATION_HZ:
      logo = LogoHZ;
      break;

    case PUBLICATION_SWISS_INSURANCE:
      logo = LogoSV;
      break;

    case PUBLICATION_HZB:
      logo = LogoHZB;
      break;

    default:
      return null;
  }

  return (
    <img
      className={classNames(publication, styles.PublicationLogo)}
      src={logo}
      alt={`${publication} Logo`}
    />
  );
};

const renderTeaser = ({
  authors,
  authorPrefix,
  styles,
  badge,
  shortTitle,
  shortTitleElement,
  title,
  lead,
  summary,
  publication = '',
  leadOptions,
  sponsorImage,
  titleBadge,
  hasPublicationLogo,
  isPublicationDateVisible,
  isAuthorVisible,
  isAuthorPrefixVisible,
  publicationDate,
  formattedPublicationDate,
  teaserImageRelativePath,
  focalPointX,
  focalPointY,
  teaserImageAlt = '',
  teaserImageStyles,
  children,
  icon,
  isTicker,
  isIconPositionOnImage,
  isShortTitleHidden,
  innerContent,
  disableWrapperClassName,
  disableLineHeightResetClassName,
  allowHtmlTagsInTitle = false,
  downloadPriority = 'default',
  useAutoHyphens,
}: RenderTeaserParams): ReactElement => {
  const formattedPublicationDatePlain = getFormattedDate(publicationDate);
  const isBottomLineVisible =
    hasPublicationLogo ||
    (publicationDate && isPublicationDateVisible) ||
    (authors && isAuthorVisible);
  return (
    <>
      {(teaserImageRelativePath && teaserImageStyles && (
        <div
          className={styles.ImageWrapper}
          data-testid="teaser-factory-image-wrapper"
        >
          <Picture
            downloadPriority={downloadPriority}
            relativeOrigin={teaserImageRelativePath}
            focalPointX={focalPointX}
            focalPointY={focalPointY}
            alt={teaserImageAlt}
            className={styles.Image}
            disableWrapperClassName={disableWrapperClassName}
            disableLineHeightResetClassName={disableLineHeightResetClassName}
            {...teaserImageStyles}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
            title={title}
          />
          {isIconPositionOnImage && icon}
          {isIconPositionOnImage && badge}
          {sponsorImage}
        </div>
      )) ||
        null}
      <div
        className={classNames(styles.ContentWrapper, {
          [factoryStyles.AutoHyphens]: useAutoHyphens,
        })}
      >
        {!isIconPositionOnImage && icon}
        {!isIconPositionOnImage && badge}
        {!shortTitleElement && shortTitle && !isShortTitleHidden && (
          <div className={styles.ShortTitle}>{shortTitle}</div>
        )}
        {shortTitleElement}
        <div
          className={classNames({
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.TitleTickerBox]: isTicker,
            [styles.Title]: !isTicker,
          })}
        >
          {allowHtmlTagsInTitle ? (
            <span
              className={styles.TitleInner}
              dangerouslySetInnerHTML={{
                __html: title || '',
              }}
            />
          ) : (
            <span className={styles.TitleInner}>
              {titleBadge || null}
              {title || ''}
            </span>
          )}
        </div>
        {lead && leadOptions && Object.keys(leadOptions).length > 0 && (
          <div className={styles.Lead}>
            {truncateByWord(
              lead,
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'number | undefined' is not assignable to parameter of type 'number'. */
              leadOptions.truncateCount,
              leadOptions.append || '',
            )}
            {leadOptions?.suffixText && (
              <span className={styles.ShowMore}>
                {` ${leadOptions.suffixText || ''}`}
              </span>
            )}
          </div>
        )}
        {!lead && summary && (
          <div className={styles.Summary}>
            <span
              dangerouslySetInnerHTML={{
                __html: summary,
              }}
            />
          </div>
        )}

        {isBottomLineVisible && (
          <div className={styles.BottomLineWrapper}>
            {(hasPublicationLogo &&
              getPublicationLogoByPublication({ publication, styles })) ||
              null}
            {isPublicationDateVisible && formattedPublicationDatePlain && (
              <div className={styles.BottomLine}>
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
            {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
            {authors?.edges?.length > 0 && isAuthorVisible && (
              <div className={styles.BottomLine}>
                {isAuthorPrefixVisible && authorPrefix && (
                  <span>
                    {
                      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ by */
                      authorPrefixConfig[authorPrefix][
                        DEFAULT_AUTHOR_PREFIX_LANGUAGE
                      ]
                    }
                  </span>
                )}
                {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<AuthorEdge>'. */}
                {authors.edges.map(({ node }, index) => (
                  <span key={`author-${node.id}`}>
                    {index !== 0 ? ', ' : ''}
                    {node.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {innerContent}
      </div>
      {children}
    </>
  );
};

const renderSkeleton = ({
  styles,
  skeletonPlaceholderImg,
}: RenderSkeletonParams): ReactElement => (
  <section className={styles.SkeletonWrapper}>
    {(skeletonPlaceholderImg && (
      <div className={styles.ImageWrapper}>
        <img
          src={skeletonPlaceholderImg}
          className={classNames(
            skeletonStyles.SkeletonPlaceholderImage,
            styles.Image,
          )}
          alt=""
        />
      </div>
    )) ||
      null}
    <div
      className={classNames(
        styles.ContentWrapper,
        styles.SkeletonContentWrapper,
      )}
    >
      <div className={classNames(styles.ShortTitle, styles.SkeletonShortTitle)}>
        &nbsp;
      </div>
      <div className={classNames(styles.Title, styles.SkeletonTitle)}>
        &nbsp;
      </div>
    </div>
  </section>
);

const teaserFactory = ({
  badge: appBadge,
  children: appChildren,
  innerContent: appInnerContent,
  outerContent: appOuterContent,
  icon: appIcon,
  titleBadge: appTitleBadge,
  sponsorImage: appSponsorImage,
  formattedPublicationDate: appFormattedPublicationDate,
  hasPublicationLogo = false,
  isPublicationDateVisible: appIsPublicationDateVisible,
  isAuthorVisible: appIsAuthorVisible,
  isAuthorPrefixVisible: appIsAuthorPrefixVisible,
  isShortTitleHidden: appIsShortTitleHidden,
  isIconPositionOnImage: appIsIconPositionOnImage,
  leadOptions,
  shortTitleElement: appShortTitleElement,
  styles: appStyles,
  teaserImageStyles: appTeaserImageStyles,
  teaserImage: appTeaserImage,
  trackingTeaserHandler = noop,
  fullScreenHashTeaserClick = '',
  fullScreenHash,
  disableWrapperClassName = false,
  disableLineHeightResetClassName = false,
  allowHtmlTagsInTitle = false,
}: TeaserFactoryOptions<any>): TeaserComponent => {
  class Teaser extends Component<TeaserFactoryProps, TeaserFactoryState> {
    ref = React.createRef<any>();
    isImpressionTracked = false;
    observer: IntersectionObserver | null = __CLIENT__
      ? new IntersectionObserver(
          ([entry]: Array<IntersectionObserverEntry>) => {
            if (entry.isIntersecting) {
              this.observer && this.observer.disconnect();
            }
            if (
              this.state.isInView !== entry.isIntersecting ||
              this.state.id !== this.props.id
            ) {
              this.setState({
                isInView: entry.isIntersecting,
                id: this.props.id,
              });
            }
          },
          {
            rootMargin: '0px',
            threshold: 0,
          },
        )
      : null;

    state: TeaserFactoryState = {
      isInView: false,
      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
      id: this.props.gcid,
    };
    componentDidMount() {
      if (this.observer && this.ref.current) {
        this.observer.observe(this.ref.current);
      }
    }
    /* @ts-ignore TODO: TS7006 ->  Parameter 'prevProps' implicitly has an 'any' type. */
    getSnapshotBeforeUpdate(prevProps): boolean {
      return this.props.id === prevProps.id;
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'prevProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'prevState' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'snapshotValue' implicitly has an 'any' type. */
    componentDidUpdate(prevProps, prevState, snapshotValue) {
      if (!snapshotValue) {
        this.isImpressionTracked = false;
      }
    }

    static getDerivedStateFromProps(
      nextProps: TeaserFactoryProps,
      prevState: TeaserFactoryState,
    ): TeaserFactoryState | null {
      if (nextProps.id !== prevState.id && !prevState.isInView) {
        return {
          isInView: false,
          id: nextProps.id,
        };
      }
      return null;
    }

    componentWillUnmount() {
      if (this.observer && this.ref.current) {
        this.observer.unobserve(this.ref.current);
      }
    }

    render(): ReactElement {
      const {
        gcid = '',
        preferredUri,
        channel,
        title,
        contentBoxType,
        lead = '',
        summary = '',
        publication,
        publicationDate,
        shortTitle,
        link,
        __typename,
        body,
        openInFullscreen = false,
        trackingEnabled = false,
        trackingSelector = '',
        trackingData,
        trackingTeaserClick,
        trackingTeaserImpression,
        sponsor,
        subtypeValue = '',
        isSkeleton = false,
        skeletonPlaceholderImg = '',
        downloadPriority = 'default',
        showUpdated,
        authors,
        authorPrefix,
        useAutoHyphens,
      } = this.props;

      const defaultStyles: TeaserFactoryOptionsStyles = {
        Wrapper: '',
        Image: '',
        ImageWrapper: '',
        Title: '',
        TitleInner: '',
        ShortTitle: '',
        ContentWrapper: '',
        IconStyle: '',
      };

      const styles =
        (typeof appStyles === 'function' && appStyles(this.props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      const teaserImageStyles =
        (typeof appTeaserImageStyles === 'function' &&
          appTeaserImageStyles(this.props)) ||
        (typeof appTeaserImageStyles === 'object' && appTeaserImageStyles) ||
        null;

      const isPublicationDateVisible =
        (typeof appIsPublicationDateVisible === 'function' &&
          appIsPublicationDateVisible(this.props)) ||
        (typeof appIsPublicationDateVisible === 'boolean' &&
          appIsPublicationDateVisible) ||
        false;

      const isAuthorVisible =
        (typeof appIsAuthorVisible === 'function' &&
          appIsAuthorVisible(this.props)) ||
        (typeof appIsAuthorVisible === 'boolean' && appIsAuthorVisible) ||
        false;

      const isAuthorPrefixVisible =
        (typeof appIsAuthorPrefixVisible === 'function' &&
          appIsAuthorPrefixVisible(this.props)) ||
        (typeof appIsAuthorPrefixVisible === 'boolean' &&
          appIsAuthorPrefixVisible) ||
        false;

      const isShortTitleHidden =
        (typeof appIsShortTitleHidden === 'function' &&
          appIsShortTitleHidden(this.props)) ||
        (typeof appIsShortTitleHidden === 'boolean' && appIsShortTitleHidden) ||
        false;

      /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
      const icon: ReactElement =
        (typeof appIcon === 'function' && appIcon(this.props)) || null;

      const teaserImage =
        (typeof appTeaserImage === 'function' && appTeaserImage(this.props)) ||
        (typeof appTeaserImage === 'object' && appTeaserImage) ||
        this.props?.teaserImage;

      const teaserImageRelativePath =
        teaserImage?.image?.file?.relativeOriginPath;
      const focalPointX =
        teaserImage?.image?.file?.focalPointX ||
        this.props?.image?.file?.focalPointX;
      const focalPointY =
        teaserImage?.image?.file?.focalPointY ||
        this.props?.image?.file?.focalPointX;

      const teaserImageAlt = teaserImage?.image?.file?.alt || '';

      /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
      const sponsorImage: ReactElement =
        (typeof appSponsorImage === 'function' &&
          appSponsorImage(this.props)) ||
        null;

      /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
      const titleBadge: ReactElement =
        (typeof appTitleBadge === 'function' && appTitleBadge(this.props)) ||
        null;

      /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
      const shortTitleElement: ReactElement =
        (typeof appShortTitleElement === 'function' &&
          appShortTitleElement(this.props)) ||
        null;

      const formattedPublicationDate =
        (typeof appFormattedPublicationDate === 'function' &&
          appFormattedPublicationDate(this.props)) ||
        '';

      const isIconPositionOnImage =
        (typeof appIsIconPositionOnImage === 'function' &&
          appIsIconPositionOnImage(this.props)) ||
        (typeof appIsIconPositionOnImage === 'boolean' &&
          appIsIconPositionOnImage) ||
        false;

      /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
      const badge: ReactElement =
        (typeof appBadge === 'function' && appBadge(this.props)) || null;

      const children: ReactNode =
        (typeof appChildren === 'function' && appChildren(this.props)) ||
        (typeof appChildren === 'object' && appChildren) ||
        null;

      /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
      const innerContent: ReactElement =
        (typeof appInnerContent === 'function' &&
          appInnerContent(this.props)) ||
        (typeof appInnerContent === 'object' && appInnerContent) ||
        null;

      /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
      const outerContent: ReactElement =
        (typeof appOuterContent === 'function' &&
          appOuterContent(this.props)) ||
        (typeof appOuterContent === 'object' && appOuterContent) ||
        null;
      /* This logic is currently only used by SI */
      /* If another publication needs the same, it can be reused here*/

      const firstFullscreenImageId: string =
        (body &&
          Object.keys(body).length === 1 &&
          Array.isArray(body) &&
          body[0].id) ||
        null;

      const uri =
        (__typename === IMAGE_GALLERY_CONTENT_TYPE &&
          typeof firstFullscreenImageId === 'string' &&
          fullScreenHashTeaserClick &&
          fullScreenHash &&
          openInFullscreen &&
          preferredUri +
            `#${
              fullScreenHashTeaserClick +
              fullScreenHash +
              firstFullscreenImageId
            }`) ||
        (subtypeValue === ADVERTISING_TYPE_EXTERNAL && link?.path) ||
        preferredUri;

      /* Tealium tracking logic for click and impression */
      const isNativeContentTeaser =
        __typename === NATIVE_ADVERTISING_CONTENT_TYPE;

      const isEnabledExternalTeaser =
        __typename === 'Teaser' && trackingEnabled;

      const isExternalAd =
        isNativeContentTeaser && subtypeValue === ADVERTISING_TYPE_EXTERNAL;

      const isTicker = contentBoxType === CONTENT_SOURCE_TICKER;

      /* @ts-ignore TODO: TS7034 ->  Variable 'tealiumClickTrackingData' implicitly has type 'any' in some locations where its type cannot be determined. */
      let tealiumClickTrackingData;

      if (isNativeContentTeaser || isEnabledExternalTeaser || isExternalAd) {
        const tealiumTrackingDataOptions = {
          __typename: isExternalAd
            ? ADVERTISING_TYPE_EXTERNAL_LABEL
            : __typename,
          subtypeValue,
          gcid: isExternalAd ? null : gcid,
          preferredUri,
          channel,
          title,
          sponsor,
        };

        tealiumClickTrackingData = createTeaserTealiumTrackEventProps(
          'teaser_click',
          /* @ts-ignore TODO: TS2345 ->  Argument of type '{ __typename */
          tealiumTrackingDataOptions,
        );
        const tealiumImpressionTrackingData =
          createTeaserTealiumTrackEventProps(
            'teaser_impression',
            /* @ts-ignore TODO: TS2345 ->  Argument of type '{ __typename */
            tealiumTrackingDataOptions,
          );

        if (!this.isImpressionTracked && this.state.isInView) {
          doHandleTealium(tealiumImpressionTrackingData);
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
          trackingTeaserHandler(trackingTeaserImpression);
          this.isImpressionTracked = true;
        }
      }

      return (
        <div ref={this.ref} className={styles.OuterWrapper}>
          {isNativeContentTeaser && (
            <GAImpressionScore
              // @ts-ignore
              score={this.props?.node?.score?.toString() || null}
            />
          )}
          {uri || link?.path ? (
            <TestFragment data-testid="teaser-factory-link-wrapper">
              <Link
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                path={uri || link?.path}
                className={classNames(styles.Wrapper, {
                  [trackingSelector]: !!trackingSelector,
                })}
                trackingData={trackingData || []}
                nofollow={subtypeValue === ADVERTISING_TYPE_EXTERNAL}
                onClick={
                  ((trackingTeaserClick || tealiumClickTrackingData) &&
                    (() => {
                      trackingTeaserClick &&
                        trackingTeaserHandler(trackingTeaserClick);
                      /* @ts-ignore TODO: TS7005 ->  Variable 'tealiumClickTrackingData' implicitly has an 'any' type. */
                      tealiumClickTrackingData &&
                        /* @ts-ignore TODO: TS7005 ->  Variable 'tealiumClickTrackingData' implicitly has an 'any' type. */
                        doHandleTealium(tealiumClickTrackingData);
                    })) ||
                  undefined
                }
              >
                {(isSkeleton &&
                  renderSkeleton({
                    styles,
                    skeletonPlaceholderImg,
                  })) ||
                  renderTeaser({
                    styles,
                    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string | null'. */
                    shortTitle,
                    shortTitleElement,
                    title,
                    lead,
                    summary,
                    publication,
                    /* @ts-ignore TODO: TS2322 ->  Type 'TeaserFactoryLeadOptions | undefined' is not assignable to type 'TeaserFactoryLeadOptions'. */
                    leadOptions,
                    badge,
                    sponsorImage,
                    contentBoxType,
                    titleBadge,
                    hasPublicationLogo,
                    isPublicationDateVisible,
                    isAuthorVisible,
                    isAuthorPrefixVisible,
                    publicationDate,
                    formattedPublicationDate,
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                    teaserImageRelativePath,
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                    focalPointX,
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                    focalPointY,
                    teaserImageAlt,
                    /* @ts-ignore TODO: TS2322 ->  Type 'ImageStylesObject | null' is not assignable to type 'ImageStylesObject'. */
                    teaserImageStyles,
                    children,
                    icon,
                    isTicker,
                    isIconPositionOnImage,
                    isShortTitleHidden,
                    innerContent,
                    disableWrapperClassName,
                    disableLineHeightResetClassName,
                    allowHtmlTagsInTitle,
                    downloadPriority,
                    showUpdated,
                    authors,
                    authorPrefix,
                    useAutoHyphens,
                  })}
              </Link>
              {outerContent}
            </TestFragment>
          ) : (
            <div
              data-testid="teaser-factory-anchor-link-wrapper"
              className={styles.Wrapper}
            >
              {(isSkeleton &&
                renderSkeleton({
                  styles,
                  skeletonPlaceholderImg,
                })) ||
                renderTeaser({
                  styles,
                  /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string | null'. */
                  shortTitle,
                  shortTitleElement,
                  title,
                  lead,
                  summary,
                  publication,
                  /* @ts-ignore TODO: TS2322 ->  Type 'TeaserFactoryLeadOptions | undefined' is not assignable to type 'TeaserFactoryLeadOptions'. */
                  leadOptions,
                  badge,
                  sponsorImage,
                  contentBoxType,
                  titleBadge,
                  hasPublicationLogo,
                  isPublicationDateVisible,
                  isAuthorVisible,
                  isAuthorPrefixVisible,
                  formattedPublicationDate,
                  publicationDate,
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                  teaserImageRelativePath,
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                  focalPointX,
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                  focalPointY,
                  teaserImageAlt,
                  /* @ts-ignore TODO: TS2322 ->  Type 'ImageStylesObject | null' is not assignable to type 'ImageStylesObject'. */
                  teaserImageStyles,
                  children,
                  icon,
                  isTicker,
                  isIconPositionOnImage,
                  isShortTitleHidden,
                  innerContent,
                  disableWrapperClassName,
                  disableLineHeightResetClassName,
                  allowHtmlTagsInTitle,
                  downloadPriority,
                  showUpdated,
                  authors,
                  authorPrefix,
                  useAutoHyphens,
                })}
            </div>
          )}
        </div>
      );
    }
  }
  const mapStateToProps = (
    state: Record<string, any>,
  ): Record<string, any> => ({
    bookmarkListState: bookmarkListStateSelector(state),
  });

  return connect(mapStateToProps)(Teaser);
};

export default teaserFactory;
