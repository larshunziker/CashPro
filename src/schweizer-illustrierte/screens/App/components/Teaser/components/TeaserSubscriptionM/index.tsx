import React, { ReactElement, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import isStyleDesignByChannel from '../../../../../../shared/helpers/isStyleDesignByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import ArrowButton from '../../../ArrowButton';
import { STYLE_BOOK_TEASER } from '../../../../../../../shared/constants/images';
import {
  ARROW_BUTTON_THEME_LIGHT,
  ARROW_BUTTON_THEME_SKIN,
} from '../../../ArrowButton/constants';
import {
  TEASER_STYLE_SI,
  TEASER_STYLE_SY,
} from '../../../Teaser/components/TeaserSubscriptionL/constants';
import styles from './styles.legacy.css';
import { TeaserFactoryProps } from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserSubscriptionMPropsInner = TeaserFactoryProps &
  TeaserInterface & {
    style: string;
    activeMainChannel: ActiveMainChannel;
  };

const TeaserSubscriptionM = ({
  shortTitle,
  teaserImage,
  title,
  link,
  style,
  activeMainChannel,
  trackingData,
  trackingSelector = '',
}: TeaserSubscriptionMPropsInner): ReactElement => {
  if (!link || !link.path || !link.label || !title) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const teaserImgPath = teaserImage.image?.file?.relativeOriginPath || '';
  const focalPointX = teaserImage?.image?.file?.focalPointX || null;
  const focalPointY = teaserImage?.image?.file?.focalPointY || null;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const teaserImgAlt = teaserImage.image?.file?.alt || '';

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
    <Link
      className={classNames(
        getThemedClass('TeaserWrapper'),
        'ArrowButtonHoverArea',
        {
          [trackingSelector]: !!trackingSelector,
          [styles.WrapperStyleSY]: style === TEASER_STYLE_SY,
          [styles.WrapperStyleSI]: style === TEASER_STYLE_SI,
        },
      )}
      trackingData={trackingData}
      path={link.path}
      target={'_blank'}
    >
      <>
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
        <div className={getThemedClass('BannerWrapper')}>
          {teaserImgPath && (
            <Picture
              relativeOrigin={teaserImgPath}
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
              focalPointX={focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
              focalPointY={focalPointY}
              alt={teaserImgAlt}
              className={getThemedClass('Image')}
              disableWrapperClassName
              style_320={STYLE_BOOK_TEASER}
            />
          )}

          <ArrowButton
            theme={ArrowButtonTheme}
            large
            addClass={getThemedClass('ArrowButtonStyle')}
          >
            {link.label}
          </ArrowButton>
        </div>
      </>
    </Link>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(
  memo<TeaserSubscriptionMPropsInner>(TeaserSubscriptionM),
);
