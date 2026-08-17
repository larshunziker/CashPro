import React, { ReactElement, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import isStyleDesignByChannel from '../../../../../../shared/helpers/isStyleDesignByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import useInView, {
  UseInViewResponse,
} from '../../../../../../../shared/hooks/useInView';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import ArrowButton from '../../../ArrowButton';
import TeaserSubscriptionM from '../../../Teaser/components/TeaserSubscriptionM';
import { STYLE_BOOK_TEASER } from '../../../../../../../shared/constants/images';
import {
  ARROW_BUTTON_THEME_LIGHT,
  ARROW_BUTTON_THEME_SKIN,
} from '../../../ArrowButton/constants';
import { TEASER_STYLE_SI, TEASER_STYLE_SY } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { TeaserFactoryProps } from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserSubscriptionLPropsInner = TeaserFactoryProps &
  TeaserInterface & {
    style: string;
    activeMainChannel: ActiveMainChannel;
  };

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const TeaserSubscriptionL = (props): ReactElement => {
  const {
    shortTitle,
    teaserImage,
    title,
    link,
    lead,
    style,
    activeMainChannel,
    trackingData,
    trackingSelector = '',
  }: TeaserSubscriptionLPropsInner = props;

  const { setRef, isInView }: UseInViewResponse = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });

  if (!link || !link.path || !link.label || !title) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const teaserImagePath = teaserImage.image?.file?.relativeOriginPath || '';
  const focalPointX = teaserImage?.image?.file?.focalPointX || null;
  const focalPointY = teaserImage?.image?.file?.focalPointY || null;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const teaserImageAlt = teaserImage.image?.file?.alt || '';

  let ArrowButtonTheme = '';
  if (!style) {
    ArrowButtonTheme = isStyleDesignByChannel(activeMainChannel)
      ? ARROW_BUTTON_THEME_SKIN
      : ARROW_BUTTON_THEME_LIGHT;
  } else {
    if (style === TEASER_STYLE_SY) {
      ArrowButtonTheme = ARROW_BUTTON_THEME_SKIN;
    } else if (style === TEASER_STYLE_SI) {
      ArrowButtonTheme = ARROW_BUTTON_THEME_LIGHT;
    }
  }

  return (
    <>
      <div
        data-testid="subscription-l-mobile-viewport-wrapper"
        className={classNames(styles.TeaserWrapper, grid.HiddenSmUp)}
      >
        <TeaserSubscriptionM {...props} />
      </div>

      <div
        /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
        ref={setRef}
        className={classNames(
          getThemedClass('TeaserWrapper'),
          grid.HiddenSmDown,
          {
            [styles.WrapperStyleSY]: style === TEASER_STYLE_SY,
            [styles.WrapperStyleSI]: style === TEASER_STYLE_SI,
          },
        )}
      >
        <div className={getThemedClass('ContentWrapper')}>
          {shortTitle && (
            <div
              data-testid="teaser-shortTitle"
              className={getThemedClass('ShortTitle')}
            >
              {shortTitle}
            </div>
          )}
          <div data-testid="teaser-title" className={getThemedClass('Title')}>
            {title}
          </div>
          {/*
          ugly temporary hack with dangerouslySetInnerHTML, because lead field has no WYSIWYG editor in BE
          the regex matches the beginning of a string until the first colon ":"
          $& is the matched result of my regex
        */}
          {lead && (
            <div
              data-testid="teaser-lead"
              className={getThemedClass('Lead')}
              dangerouslySetInnerHTML={{
                __html: lead
                  .split('\n')
                  .map((item) =>
                    item.replace(/.+?(?=:)/, '<strong>$&</strong>'),
                  )
                  .join('\n'),
              }}
            />
          )}
        </div>
        <div className={getThemedClass('BannerWrapper')}>
          {teaserImagePath && (
            <Link
              path={link.path}
              className={classNames({
                [trackingSelector]: !!trackingSelector,
              })}
              trackingData={trackingData}
              target={'_blank'}
              aria-label={teaserImageAlt}
            >
              {isInView && (
                <Picture
                  relativeOrigin={teaserImagePath}
                  /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                  focalPointX={focalPointX}
                  /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                  focalPointY={focalPointY}
                  alt={teaserImageAlt}
                  className={getThemedClass('Image')}
                  style_320={STYLE_BOOK_TEASER}
                />
              )}
            </Link>
          )}

          <Link
            path={link.path}
            className={classNames({
              [trackingSelector]: !!trackingSelector,
            })}
            trackingData={trackingData}
            target={'_blank'}
          >
            <ArrowButton
              theme={ArrowButtonTheme}
              large
              addClass={getThemedClass('ArrowButtonStyle')}
            >
              {link.label}
            </ArrowButton>
          </Link>
        </div>
      </div>
    </>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(
  memo<TeaserSubscriptionLPropsInner>(TeaserSubscriptionL),
);
