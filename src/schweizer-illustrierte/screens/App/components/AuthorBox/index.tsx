import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../common/components/Picture';
import { STYLE_TEASER_1_1 } from '../../../../../shared/constants/images';
import { HOROSCOPE_DETAIL_DEFAULT } from '../../screens/HoroscopeDetail/constants';
import helpers from '../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
//@ts-ignore
import grid from '@grid.legacy.css';
import { AuthorBoxProps } from './typings';

export type AuthorBoxPropsInner = AuthorBoxProps;

const AuthorBox = ({
  author,
  origin,
}: AuthorBoxPropsInner): ReactElement | null => {
  if (!author || !author.name) {
    return null;
  }

  const imagePath =
    author?.imageParagraph?.image?.file?.relativeOriginPath || '';
  const focalPointX = author?.imageParagraph?.image?.file?.focalPointX || null;
  const focalPointY = author?.imageParagraph?.image?.file?.focalPointY || null;
  const imageAlt = author?.imageParagraph?.image?.file?.alt || '';
  return (
    <div data-testid="article-author-box-wrapper" className={styles.Wrapper}>
      {imagePath && (
        <div
          data-testid="article-author-box-img-wrapper"
          className={classNames(
            helpers.TextLineHeightZero,
            grid.ColXsAuto,
            grid.ColSm4,
            grid.ColXl5,
            {
              [grid.ColOffsetXl2]: origin === HOROSCOPE_DETAIL_DEFAULT,
              [grid.ColXl6]: origin === HOROSCOPE_DETAIL_DEFAULT,
            },
          )}
        >
          <Picture
            relativeOrigin={imagePath}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointX={focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointY={focalPointY}
            alt={imageAlt}
            className={styles.AuthorImg}
            style_320={STYLE_TEASER_1_1}
          />
        </div>
      )}
      <div
        className={classNames(grid.ColSm20, grid.ColXl19, styles.FlexOne, {
          [grid.ColOffsetSm4]: !author.imageParagraph,
          [grid.ColOffsetXl5]: !author.imageParagraph,
        })}
      >
        <div
          data-testid="article-author-box-name"
          className={classNames(styles.AuthorText, styles.AuthorName)}
        >
          <span>{author.name}</span>{' '}
        </div>
        {author.description && (
          <div
            data-testid="article-author-box-description"
            className={classNames(styles.AuthorText, styles.AuthorDescription)}
          >
            <span dangerouslySetInnerHTML={{ __html: author.description }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorBox;
