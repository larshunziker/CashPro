import React, { ReactElement } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryOptionsStyles,
} from '../../../../../../../common/components/Teaser/factory';
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
import { TeaserFactoryProps } from '../../../../../../../common/components/Teaser/typings';

type TeaserProps = TeaserFactoryProps & {
  changeDate: string;
  createDate: string;
};

const getStylesByProps = ({
  id,
  bookmarkListState,
}: TeaserProps): TeaserFactoryOptionsStyles => ({
  OuterWrapper: styles.OuterWrapper,
  Wrapper: classNames(styles.Wrapper, TEASER_BOOKMARK_IDENTIFIER, {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    [styles.Removed]: !bookmarkListState[id],
  }),
  ContentWrapper: styles.ContentWrapper,
  Image: styles.Image,
  ImageWrapper: styles.ImageWrapper,
  Title: styles.Title,
});

const getInnerContentByProps = ({
  publicationDate,
  changeDate,
  createDate,
}: TeaserProps): ReactElement => (
  <div className={styles.DateWrapper}>
    Veröffentlicht{' '}
    {getFormattedElapsedDate({
      createDate: publicationDate || createDate || '',
      changeDate: changeDate,
    })}
  </div>
);

const getOuterContentByProps = ({ id }: TeaserProps): ReactElement => (
  <div className={styles.BookmarkButtonWrapper}>
    <BookmarkButton id={id} />
  </div>
);

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
});

export default TeaserBookmark;
