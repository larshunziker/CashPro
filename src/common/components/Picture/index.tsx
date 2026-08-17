import React, { memo, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  generateImageObject,
  getImageFormatForPlaceholderCss,
  ImageObject,
  ImageStylesConfigObject,
} from './helpers';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { ParagraphIndexContext } from '../../../shared/context/paragraphs';
import { imageStylesMapping } from './imageStylesMapping';
import { DEFAULT_FOCALPOINT } from '../../../shared/constants/images';
import styles from './styles.legacy.css';
import { PictureProps } from './typings';

type PicturePropsInner = PictureProps;

const Picture = ({
  url = '',
  relativeOrigin,
  focalPointX = DEFAULT_FOCALPOINT,
  focalPointY = DEFAULT_FOCALPOINT,
  alt,
  className,
  style_320,
  style_480,
  style_540,
  style_760,
  style_960,
  style_1680,
  downloadPriority = 'default',
  disableWrapperClassName = false,
  disableLineHeightResetClassName = false,
  width,
  height,
  title = '',
  showOriginal = false,
  useIntrinsicSizes = false,
}: PicturePropsInner) => {
  const paragraphIndex = useContext(ParagraphIndexContext);
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );

  // we just want to give high download prio to pictures within the first two paragraphs
  // for landing page grids or article heros the context is set to -1 per default which
  // will allow the eager mode as well.
  const isInTopParagraph = paragraphIndex < 2;

  const initialImageStyles: ImageStylesConfigObject = {
    320: style_320,
    480: style_480,
    540: style_540,
    760: style_760,
    960: style_960,
    1680: style_1680,
  };

  // filter out all falsy image style values
  const imageStyles: ImageStylesConfigObject = {};
  let currentStyle: any = null;
  for (const style in initialImageStyles) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 320 */
    if (Boolean(initialImageStyles[style])) {
      // @ts-ignore
      if (!useIntrinsicSizes || currentStyle !== initialImageStyles[style]) {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ImageObject'. */
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 320 */
        currentStyle = initialImageStyles[style];
        // @ts-ignore
        imageStyles[style] = currentStyle;
      }
    }
  }

  const hasHighDownloadPriority =
    downloadPriority === 'high' && !!relativeOrigin && isInTopParagraph;

  // https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

  const { sources }: { sources: ImageObject } = generateImageObject({
    imageStyles: imageStyles,
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    relativeOrigin,
    focalPointX,
    focalPointY,
    hasUrl: !!url,
    clientUrl,
  });

  const initialStyle = style_320?.split('_')?.[0];
  const isSameAspectRatio = Object.values(imageStyles).every((item) => {
    const currentValue = item.split('_')[0];

    return initialStyle === currentValue;
  });
  // use width and height props if they are set, otherwise check if is the same aspect ratio across all image styles, then us the values from the imageStyleMapping
  const imageDimensions = {
    width:
      /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
      width && height ? width : imageStylesMapping?.[style_320]?.width || null,
    height:
      width && height
        ? height
        : /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
          imageStylesMapping?.[style_320]?.height || null,
  };

  // prepare preload sources incl. min and max width media query
  const preloadImages =
    (hasHighDownloadPriority &&
      Object.keys(sources).reduce(
        (
          acc: {
            imageBreakpoint: string;
            source: string;
            mediaQuery: string;
          }[],
          imageBreakpoint,
          index,
          imageBreakpoints,
        ) => {
          if (!imageBreakpoint) {
            return acc;
          }

          /**
           * example image breakpoints
           * ------------------------------------------
           * [320,760,960,1680]
           *
           * media query output
           * ------------------------------------------
           *  320 => (max-width: 759px)
           *  760 => (min-width: 760px) and (max-width: 959px)
           *  960 => (min-width: 960px) and (max-width: 1679px)
           * 1680 => (min-width: 1680px)
           */

          const mediaQueries: Array<string> = [];

          if (index > 0) {
            mediaQueries.push(`(min-width:${imageBreakpoint}px)`);
          }

          if (index + 1 < imageBreakpoints.length) {
            mediaQueries.push(
              `(max-width:${parseInt(imageBreakpoints[index + 1], 10) - 1}px)`,
            );
          }

          acc.push({
            imageBreakpoint,
            source: sources[imageBreakpoint].src,
            mediaQuery: mediaQueries.join(' and '),
          });

          return acc;
        },
        [],
      )) ||
    [];

  const isFallbackImage = relativeOrigin?.includes('fallback');
  const imgTitleTag = (title && { title }) || null;
  const preloadJsx = (
    <>
      {preloadImages.length > 0 && (
        <Helmet>
          {preloadImages.map((item) => {
            return (
              <link
                key={`preload-img-${relativeOrigin}-${item.imageBreakpoint}`}
                rel="preload"
                href={item.source}
                as="image"
                media={item.mediaQuery}
              />
            );
          })}
        </Helmet>
      )}
    </>
  );
  const sourcesJsx = (
    <>
      {sources &&
        !useIntrinsicSizes &&
        Object.keys(sources)
          .map((imageBreakpoint) => {
            if (imageBreakpoint === '320') {
              return null;
            }
            return (
              (imageBreakpoint && (
                <source
                  key={`main-img-source-tag-${relativeOrigin}-${imageBreakpoint}`}
                  media={`(min-width:${imageBreakpoint}px)`}
                  srcSet={sources[imageBreakpoint].src}
                />
              )) ||
              null
            );
          })
          .reverse()}
    </>
  );
  const sizes =
    useIntrinsicSizes &&
    Object.keys(sources).length > 1 &&
    Object.keys(sources)
      .reduce((acc: string[], imageBreakpoint, index, imageBreakpoints) => {
        if (!imageBreakpoint) {
          return acc;
        }

        const mediaQueries: Array<string> = [];

        if (index > 0 && index + 1 < imageBreakpoints.length) {
          mediaQueries.push(`(min-width:${imageBreakpoint}px)`);
        }

        if (index + 1 < imageBreakpoints.length) {
          mediaQueries.push(
            `(max-width:${parseInt(imageBreakpoints[index + 1], 10) - 1}px)`,
          );
        }

        acc.push(
          `${mediaQueries.join(' and ')} ${sources[imageBreakpoint].width}px`,
        );

        return acc;
      }, [])
      .join(',');
  let srcSet = url || sources?.[320]?.src;
  if (useIntrinsicSizes) {
    srcSet = Object.keys(sources)
      .map((imageBreakpoint) => {
        // @ts-ignore
        const source = sources[imageBreakpoint];
        return `${source.src} ${source.width}w`;
      })
      .join(', ');
  }
  const pictureJsx = (
    <>
      {preloadJsx}
      <picture>
        {sourcesJsx}
        <img
          loading={hasHighDownloadPriority ? 'eager' : 'lazy'}
          // Use fetchpriority to load top image with high priority
          // https://web.dev/articles/fetch-priority
          {...(hasHighDownloadPriority && { fetchpriority: 'high' })}
          {...(srcSet && { srcSet })}
          {...(sizes && { sizes })}
          alt={(alt && !isFallbackImage && alt) || title}
          className={classNames(className, {
            [styles.Image]: !isSameAspectRatio,
            [styles.IsSameAspectRatio]: isSameAspectRatio,
          })}
          {...imgTitleTag}
          width={imageDimensions.width}
          height={imageDimensions.height}
          key={`main-img-source-tag-${url}`}
        />
      </picture>
    </>
  );

  const placeholderClasses =
    sources &&
    Object.keys(sources).map((imageBreakpoint) => {
      const imageFormat = getImageFormatForPlaceholderCss(
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 320 */
        initialImageStyles[imageBreakpoint],
      );

      if (imageFormat) {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`Placeholder_${string}_1x1` | `Placeholder_${string}_1 */
        return styles[`Placeholder_${imageBreakpoint}_${imageFormat}`];
      }

      return null;
    });

  if (showOriginal && url) {
    return (
      <img
        srcSet={url}
        alt={(alt && !isFallbackImage && alt) || title}
        className={classNames(styles.IsSameAspectRatio, className)}
        loading={hasHighDownloadPriority ? 'eager' : 'lazy'}
        // Use fetchpriority to load top image with high priority
        // https://web.dev/articles/fetch-priority
        {...(hasHighDownloadPriority && { fetchpriority: 'high' })}
        width={imageDimensions.width}
        height={imageDimensions.height}
      />
    );
  }

  return disableLineHeightResetClassName && disableWrapperClassName ? (
    pictureJsx
  ) : (
    <div
      className={classNames({
        [placeholderClasses.join(' ')]:
          !disableWrapperClassName && !isSameAspectRatio,
        [styles.LineHeightReset]: !disableLineHeightResetClassName,
        [styles.PictureWrapper]: !disableWrapperClassName,
      })}
    >
      {pictureJsx}
    </div>
  );
};

export default memo(Picture);
