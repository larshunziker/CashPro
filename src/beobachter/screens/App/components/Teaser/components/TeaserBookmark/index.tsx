import React, { memo } from 'react';
import TeaserWide from '../TeaserWide';
import BookmarkButton from '../../../BookmarkButton';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../typings';

const TeaserBookmark = (props: TeaserProps) => {
  return (
    <div className={styles.BookmarkTeaserWrapper}>
      <TeaserWide {...props} />
      <BookmarkButton id={props.id} />
    </div>
  );
};

export default memo<TeaserProps>(TeaserBookmark);
