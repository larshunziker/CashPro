import React, { ReactElement } from 'react';
import Picture from '../Picture';
import { SponsorImageFactoryOptions, SponsorImageProps } from './typings';

export type SponsorImagePropsInner = SponsorImageProps;

const SponsorImageFactory = ({
  imageStyles,
  styles,
}: SponsorImageFactoryOptions) => {
  const SponsorImage = ({
    sponsor,
  }: SponsorImagePropsInner): ReactElement | null => {
    const relativeOriginPath =
      sponsor?.teaserImage?.image?.file?.relativeOriginPath || '';
    const focalPointX = sponsor?.teaserImage?.image?.file?.focalPointX;
    const focalPointY = sponsor?.teaserImage?.image?.file?.focalPointY;
    if (!relativeOriginPath) {
      return null;
    }

    return (
      <div className={styles.Wrapper}>
        <Picture
          {...imageStyles}
          relativeOrigin={relativeOriginPath}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX={focalPointX}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY={focalPointY}
          alt={sponsor?.teaserImage?.image?.file?.alt || ''}
          className={styles.Image}
          disableLineHeightResetClassName={true}
        />
      </div>
    );
  };

  return SponsorImage;
};

export default SponsorImageFactory;
