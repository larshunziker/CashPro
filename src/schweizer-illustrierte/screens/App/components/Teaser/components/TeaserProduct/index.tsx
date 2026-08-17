import React, { ReactElement, memo } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import ArrowButton from '../../../ArrowButton';
import { TeaserPropsInner } from '../../../Teaser';
import { STYLE_BOOK_TEASER } from '../../../../../../../shared/constants/images';
import { ARROW_BUTTON_THEME_SKIN } from '../../../ArrowButton/constants';
import styles from './styles.legacy.css';

type TeaserComponentsPropsInner = TeaserPropsInner & TeaserInterface & Product;

const TeaserProduct = ({
  shortTitle,
  teaserImage,
  title,
  link,
  price,
  pricePrefix,
  trackingData,
  trackingSelector = '',
}: TeaserComponentsPropsInner): ReactElement | null => {
  if (!link || !link.path) {
    return null;
  }

  const teaserImgPath: string =
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    teaserImage.image?.file?.relativeOriginPath || '';
  const focalPointX = teaserImage?.image?.file?.focalPointX || null;
  const focalPointY = teaserImage?.image?.file?.focalPointY || null;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const teaserImgAlt: string = teaserImage.image?.file?.alt || '';

  return (
    <TestFragment data-testid="teaserproduct-container">
      <Link
        path={link.path}
        target="_blank"
        className={classNames(styles.Item, 'ArrowButtonHoverArea', {
          [trackingSelector]: !!trackingSelector,
        })}
        trackingData={trackingData}
      >
        <>
          {teaserImgPath && (
            <div className={styles.ImageWrapper}>
              <Picture
                relativeOrigin={teaserImgPath}
                /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                focalPointX={focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                focalPointY={focalPointY}
                alt={teaserImgAlt}
                className={styles.Image}
                style_320={STYLE_BOOK_TEASER}
              />
            </div>
          )}
          <div className={styles.ContentWrapper}>
            {shortTitle && (
              <div className={styles.ShortTitle}>{shortTitle}</div>
            )}
            {title && <div className={styles.Title}>{title}</div>}
            {price && (
              <div className={styles.Price} data-testid="teaserproduct-price">
                {pricePrefix && `${pricePrefix} `}
                <span className={styles.Currency}>CHF</span>{' '}
                <span>
                  {price === Math.round(price)
                    ? `${price}.—`
                    : Number(price).toFixed(2)}
                </span>
              </div>
            )}
            {link.label && (
              <div className={styles.Button}>
                <ArrowButton theme={ARROW_BUTTON_THEME_SKIN} large>
                  {link.label}
                </ArrowButton>
              </div>
            )}
          </div>
        </>
      </Link>
    </TestFragment>
  );
};

export default memo<TeaserComponentsPropsInner>(TeaserProduct);
