import React, { useState } from 'react';
import chunk from 'lodash.chunk';
import withPagePager from '../../../shared/decorators/withPagePager';
import { ensureBookmarkListInterface } from './helper';
import {
  BookmarkListComponent,
  BookmarkListFactoryOptions,
  BookmarkListProps,
} from './typings';

type BookmarkListPropsInner = BookmarkListProps & Pick<RouterProps, 'page'>;

const BookmarkListFactory = ({
  styles,
  TeaserGrid,
  Pager,
  pagerType,
  teaserGridLayout = 'teaserBookmark4x4',
  pageSize = 16,
  withPagePagerDecorator = true,
}: BookmarkListFactoryOptions): BookmarkListComponent => {
  const BookmarkList = ({ items, page = 1 }: BookmarkListPropsInner) => {
    const [chunkedItems] = useState(chunk(items, pageSize));

    if (!items || !Array.isArray(items) || items.length === 0) {
      return null;
    }

    return (
      <div className={styles.BookmarkListWrapper}>
        <TeaserGrid
          layout={teaserGridLayout}
          items={ensureBookmarkListInterface(chunkedItems[page - 1])}
        />

        {Pager && page && pagerType && (
          <Pager
            itemsCount={items.length || 0}
            itemsPerPage={pageSize}
            currentPage={page}
            component={pagerType}
          />
        )}
      </div>
    );
  };
  // @ts-ignore
  return withPagePagerDecorator ? withPagePager(BookmarkList) : BookmarkList;
};

export default BookmarkListFactory;
