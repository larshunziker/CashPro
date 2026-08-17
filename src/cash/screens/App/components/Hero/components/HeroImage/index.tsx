import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../common/components/Picture';
import HeroSponsorBanner from '../shared/HeroSponsorBanner';
import {
  STYLE_16X9_1130,
  STYLE_16X9_560,
  STYLE_16X9_700,
  STYLE_16X9_890,
} from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { HeroImageProps } from './typings';

type HeroImagePropsInner = HeroImageProps;

const HeroImage = ({
  image,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Sponsor'. */
  sponsor = null,
  addClass = '',
  children,
}: HeroImagePropsInner): ReactElement => {
  if (!image?.image?.file?.relativeOriginPath) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <figure
      className={classNames('hero-image', styles.Wrapper, {
        [addClass]: !!addClass,
      })}
    >
      {/* @ts-ignore TODO: TS2786 ->  'HeroSponsorBanner' cannot be used as a JSX component. */}
      <HeroSponsorBanner {...sponsor} />
      <Picture
        relativeOrigin={image.image.file.relativeOriginPath}
        // @ts-ignore
        focalPointX={image.image.file.focalPointX}
        // @ts-ignore
        focalPointY={image.image.file.focalPointY}
        style_320={STYLE_16X9_560}
        style_540={STYLE_16X9_560}
        style_760={STYLE_16X9_700}
        style_960={STYLE_16X9_890}
        style_1680={STYLE_16X9_1130}
        alt={image?.image?.file?.alt || ''}
        className={classNames(styles.Img, 'hero-picture')}
        downloadPriority="high"
      />
      {children}
    </figure>
  );
};

export default HeroImage;
