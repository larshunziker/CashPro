import React, { ComponentType, memo } from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { getFormattedElapsedDate } from '../../../../../../../shared/helpers/dateTimeElapsed';
import BookmarkButton from '../../../BookmarkButton';
import {
  STYLE_16X9_440,
  STYLE_1X1_280,
  STYLE_3X2_210,
  STYLE_3X2_280,
} from '../../../../../../../shared/constants/images';
import { TEASER_BOOKMARK_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  GetTeaserFactoryStylesByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';

type TeaserBookmarkPropsInner = TeaserFactoryProps & {
  changeDate: string;
  createDate: string;
};

/* @ts-ignore TODO: TS2322 ->  Type '({ publicationDate, changeDate, createDate } */
export const getInnerContentByProps: GetElementByProps<
  TeaserBookmarkPropsInner
> = ({ publicationDate, changeDate, createDate }) => {
  if (!publicationDate && !changeDate && !createDate) {
    return null;
  }

  return (
    <div className={styles.DateWrapper}>
      Veröffentlicht{' '}
      {getFormattedElapsedDate({
        createDate: publicationDate || createDate || '',
        changeDate: changeDate,
      })}
    </div>
  );
};

export const getOuterContentByProps: GetElementByProps<
  TeaserBookmarkPropsInner
> = ({ id }) => (
  <div
    className={styles.BookmarkButtonWrapper}
    data-testid="teaserbookmark-bookmark-button"
  >
    <BookmarkButton id={id} />
  </div>
);

const getStylesByProps: GetTeaserFactoryStylesByProps<
  TeaserBookmarkPropsInner
> = ({ id, bookmarkListState }) => ({
  OuterWrapper: styles.OuterWrapper,
  Wrapper: classNames(styles.Wrapper, TEASER_BOOKMARK_IDENTIFIER, {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    [styles.Removed]: !bookmarkListState[id],
  }),
  ContentWrapper: styles.ContentWrapper,
  Image: styles.Image,
  ImageWrapper: styles.ImageWrapper,
  Title: styles.Title,
  ShortTitle: styles.ShortTitle,
  Lead: styles.Lead,
});

const TeaserBookmark = teaserFactory({
  innerContent: getInnerContentByProps,
  outerContent: getOuterContentByProps,
  teaserImageStyles: {
    style_320: STYLE_1X1_280,
    style_760: STYLE_3X2_210,
    style_960: STYLE_3X2_280,
    style_1680: STYLE_16X9_440,
  },
  styles: getStylesByProps,
  isShortTitleHidden: true,
}) as ComponentType<TeaserBookmarkPropsInner>;

export default memo(TeaserBookmark);
