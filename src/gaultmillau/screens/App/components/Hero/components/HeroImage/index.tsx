import React from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../common/components/Picture';
import { ARTICLE_TYPE_INTERVIEW } from '../../../../../../../shared/constants/content';
import {
  STYLE_1X1_660,
  STYLE_3X2_1000,
  STYLE_3X2_440,
  STYLE_HEADER_16_9_LARGE,
} from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import type { HeroImageProps } from './typings';

type HeroImagePropsInner = HeroImageProps;

const HeroImage = ({
  image,
  addClass = '',
  children,
  article,
}: HeroImagePropsInner) => {
  if (!image) {
    return null;
  }

  const isInterview: boolean = article?.subtypeValue === ARTICLE_TYPE_INTERVIEW;

  return (
    <div
      className={classNames('hero-image', styles.Wrapper, {
        [addClass]: !!addClass,
        [styles.WrapperInterview]: isInterview,
      })}
    >
      <Picture
        key={`hero-image-${
          article?.id || image?.image?.file?.relativeOriginPath || Math.random()
        }`}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        relativeOrigin={image?.image?.file?.relativeOriginPath}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
        focalPointX={image?.image?.file?.focalPointX}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
        focalPointY={image?.image?.file?.focalPointY}
        alt={image?.image?.file?.alt || ''}
        className={classNames(styles.Img, {
          [styles.ImgInterview]: isInterview,
        })}
        style_320={isInterview ? STYLE_1X1_660 : STYLE_3X2_440}
        style_760={isInterview ? STYLE_1X1_660 : STYLE_3X2_1000}
        style_960={isInterview ? STYLE_1X1_660 : STYLE_HEADER_16_9_LARGE}
        downloadPriority="high"
      />
      {children}
    </div>
  );
};

export default HeroImage;
