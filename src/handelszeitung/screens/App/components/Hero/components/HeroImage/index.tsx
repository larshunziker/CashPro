import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../common/components/Picture';
import SponsorBanner from '../shared/SponsorBanner';
import {
  STYLE_16X9_1130,
  STYLE_16X9_560,
  STYLE_16X9_700,
  STYLE_16X9_890,
  STYLE_SCALEW_280,
} from '../../../../../../../shared/constants/images';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../App/assets/styles/variables.legacy.css'. '/Users/bhs/code/ */
import variables from '../../../../../App/assets/styles/variables.legacy.css';
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
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  if (!image?.image?.file.relativeOriginPath) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <figure
      className={classNames('hero-image', styles.Wrapper, {
        [addClass]: !!addClass,
      })}
    >
      {sponsor?.teaserImage?.image?.file?.relativeOriginPath && (
        <SponsorBanner
          sponsor={sponsor}
          isLabelOnTop
          label={sponsor?.prefix || 'Präsentiert von'}
          backgroundColor={sponsor?.colorCode || variables.white}
        >
          <Picture
            style_320={STYLE_SCALEW_280}
            relativeOrigin={sponsor.teaserImage.image.file.relativeOriginPath}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointX={sponsor.teaserImage.image.file.focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointY={sponsor.teaserImage.image.file.focalPointY}
            alt={sponsor?.teaserImage?.image?.file?.alt || ''}
            className={styles.SponsorBannerLogo}
          />
        </SponsorBanner>
      )}
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
        className={styles.Img}
        downloadPriority="high"
      />
      {children}
    </figure>
  );
};

export default HeroImage;
