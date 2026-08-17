import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../../../../common/components/Picture';
import { STYLE_MEDIUM } from '../../../../../../../../../../../shared/constants/images';
import { TEASER_PRODUCT_FULL_WIDTH_IDENTIFIER } from '../../../../../../constants';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ProductTeaserProps } from '../../typings';

const FullWidthImageLeftProduct = ({ teaserParagraph }: ProductTeaserProps) => {
  const teaser = teaserParagraph?.teasers?.edges?.[0]?.node || null;

  if (!teaser) {
    return null;
  }

  return (
    <div
      data-testid="full-width-image-left-product-wrapper"
      className={classNames(
        TEASER_PRODUCT_FULL_WIDTH_IDENTIFIER,
        styles.Wrapper,
      )}
    >
      <div className={styles.Inner}>
        <div
          className={classNames(styles.ImageWrapper, grid.ColSm6, grid.ColMd4)}
        >
          {teaser?.teaserImage?.image?.file?.relativeOriginPath && (
            <Link path={teaser.link && teaser.link.path && teaser.link.path}>
              <Picture
                relativeOrigin={
                  teaser.teaserImage.image.file.relativeOriginPath
                }
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointX={teaser?.teaserImage?.image?.file?.focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointY={teaser?.teaserImage?.image?.file?.focalPointY}
                style_320={STYLE_MEDIUM}
                alt={String(teaser.title || '')}
                className={styles.Image}
                disableWrapperClassName
              />
            </Link>
          )}
        </div>

        <div
          className={classNames(
            styles.Caption,
            styles.Text,
            grid.ColSm18,
            grid.ColMd20,
          )}
        >
          <div className={styles.Title}>{teaser.title || ''}</div>
          <span
            dangerouslySetInnerHTML={{
              __html: teaser.description || '',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FullWidthImageLeftProduct;
