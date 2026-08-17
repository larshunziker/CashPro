/**
 * @file   Textparagraph factory
 */

import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { truncateByWord } from '../../../../../shared/helpers/utils';
import Link from '../../../Link';
import Picture from '../../../Picture';
import {
  TRACKING_CLASS_BOOK_TEASER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import grid from '../../../../assets/styles/grid.legacy.css';
import {
  BookTeaserParagraphFactoryOptions,
  BookTeaserParagraphProps,
} from './typings';

type BookTeaserParagraphPropsInner = BookTeaserParagraphProps;

export default ({
  Icon,
  style_320,
  title,
  hasInlineCTA = false,
  isDescriptionVisible = false,
  truncateTitle = false,
  callToAction,
  callToActionButton,
  styles,
}: BookTeaserParagraphFactoryOptions) => {
  const BookTeaserParagraph = ({
    bookTeaser,
    hasNext,
    hasContainer = false,
  }: BookTeaserParagraphPropsInner): ReactElement | null => {
    if (!bookTeaser) {
      return null;
    }
    const imageFile: ImageFile | null =
      bookTeaser?.teaserImage?.image?.file || null;

    const jsx = (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_BOOK_TEASER_PARAGRAPH,
          styles.Wrapper,
          {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.AlignToNext]: hasNext,
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.AlignToPrev]: !hasNext,
          },
        )}
      >
        <div className={styles.InnerContainer}>
          <div className={styles.TextColumn}>
            <div className={styles.HeadingTitle}>{title}</div>

            <div className={styles.Title}>
              {truncateTitle
                ? /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
                  truncateByWord(bookTeaser.title, 45)
                : bookTeaser.title}
            </div>

            {isDescriptionVisible && (
              <>
                <span
                  dangerouslySetInnerHTML={{
                    __html: bookTeaser.description || '',
                  }}
                />
                {hasInlineCTA &&
                  bookTeaser?.link?.path &&
                  !callToActionButton && (
                    <Link
                      className={styles.CallToAction}
                      path={bookTeaser.link.path}
                      label={bookTeaser?.link?.label || callToAction}
                    />
                  )}
              </>
            )}
            {callToActionButton && callToActionButton(bookTeaser)}
          </div>
          <div className={styles.ImageColumn}>
            {imageFile?.relativeOriginPath && (
              <Picture
                relativeOrigin={imageFile.relativeOriginPath}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointX={imageFile.focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointY={imageFile.focalPointY}
                style_320={style_320}
                alt={imageFile?.alt || bookTeaser.title || ''}
                className={styles.ImageWrapper}
                disableWrapperClassName
              />
            )}
          </div>
        </div>
        {callToAction &&
          !hasInlineCTA &&
          bookTeaser?.link?.path &&
          !callToActionButton && (
            <Link className={styles.CallToAction} path={bookTeaser.link.path}>
              <>
                {bookTeaser?.link?.label || callToAction}
                <Icon
                  type="IconArrowRight"
                  addClass={styles.CallToActionIcon}
                />
              </>
            </Link>
          )}
      </div>
    );

    return (
      <>
        {(hasContainer && (
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div className={styles.InnerWrapper}>{jsx}</div>
            </div>
          </div>
        )) ||
          jsx}
      </>
    );
  };

  return BookTeaserParagraph;
};
