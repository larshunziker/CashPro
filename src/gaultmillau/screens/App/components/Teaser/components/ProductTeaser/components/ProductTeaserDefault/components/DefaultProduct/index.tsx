import React from 'react';
import classNames from 'classnames';
import { truncateByWord } from '../../../../../../../../../../../shared/helpers/utils';
import Link from '../../../../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../../../../common/components/Picture';
import { STYLE_SCALEW_440 } from '../../../../../../../../../../../shared/constants/images';
import { TEASER_PRODUCT_DEFAULT_IDENTIFIER } from '../../../../../../constants';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ProductTeaserProps } from '../../typings';

const ProductTeaserDefault = ({
  teaserParagraph,
  colStyle,
}: ProductTeaserProps) => {
  const teaser = teaserParagraph?.teasers?.edges?.[0]?.node || null;
  if (!teaser) {
    return null;
  }

  return (
    <div
      data-testid="default-product-wrapper"
      className={classNames(TEASER_PRODUCT_DEFAULT_IDENTIFIER, {
        [grid.Row]: !!colStyle,
      })}
    >
      <div className={colStyle}>
        <div className={styles.ImageWrapper}>
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
                alt={String(teaser?.title || '')}
                style_320={STYLE_SCALEW_440}
                className={styles.Image}
                disableWrapperClassName
              />
            </Link>
          )}
        </div>
        <div className={styles.Caption}>
          <div className={styles.Title}>
            {truncateByWord(teaser?.title || '', 45)}
          </div>
          <div
            className={styles.Text}
            dangerouslySetInnerHTML={{
              __html: teaser?.description || '',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductTeaserDefault;
