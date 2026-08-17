import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Picture from '../../../../../../../common/components/Picture';
import {
  STYLE_16X9_1180,
  STYLE_16X9_340,
  STYLE_16X9_360,
  STYLE_16X9_560,
  STYLE_16X9_700,
  STYLE_16X9_800,
} from '../../../../../../../shared/constants/images';
import { TRACKING_CLASS_IMAGE_GALLERY_HERO_PARAGRAPH } from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { HeroProps } from './typings';

type HeroPropsInner = HeroProps & {
  teaserImage: Image;
  activeMainChannel: ActiveMainChannel;
};

const imageStyles = {
  style_320: STYLE_16X9_340,
  style_480: STYLE_16X9_360,
  style_540: STYLE_16X9_560,
  style_760: STYLE_16X9_700,
  style_960: STYLE_16X9_800,
  style_1680: STYLE_16X9_1180,
};

const Hero = ({
  shortTitle,
  title,
  teaserImage,
  activeMainChannel,
}: HeroPropsInner) => {
  if (
    !teaserImage ||
    Object.keys(teaserImage).length === 0 ||
    !shortTitle ||
    !title
  ) {
    return null;
  }
  const heroCredit = teaserImage?.image?.credit || '';
  const shouldDisplayImageCredit = !(teaserImage as any)?.suppressSource;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  const relativeOriginPath = teaserImage?.image?.file?.relativeOriginPath || '';
  const focalPointX = teaserImage?.image?.file?.focalPointX || null;
  const focalPointY = teaserImage?.image?.file?.focalPointY || null;

  if (!relativeOriginPath) {
    return null;
  }
  return (
    <div
      className={classNames(
        TRACKING_CLASS_IMAGE_GALLERY_HERO_PARAGRAPH,
        getThemedClass('Wrapper'),
      )}
      data-testid="hero-image-container"
    >
      {(relativeOriginPath && (
        <>
          <Picture
            relativeOrigin={relativeOriginPath}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointX={focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointY={focalPointY}
            alt={teaserImage?.image?.file?.alt || ''}
            className={styles.Image}
            {...imageStyles}
            disableWrapperClassName
            disableLineHeightResetClassName
            downloadPriority="high"
          />
          {shouldDisplayImageCredit && (
            <p className={getThemedClass('ImageCredit')}>{heroCredit}</p>
          )}
        </>
      )) ||
        null}
      <div className={getThemedClass('ContentWrapper')}>
        <div className={getThemedClass('ShortTitle')}>{shortTitle}</div>
        <div className={getThemedClass('Title')}>
          <h1 className={getThemedClass('TitleInner')}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default compose<any, any>(connect(mapStateToProps))(Hero);
