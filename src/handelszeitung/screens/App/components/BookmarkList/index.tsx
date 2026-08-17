import bookmarkListFactory from '../../../../../common/components/BookmarkList/factory';
import TeaserGrid from '../TeaserGrid';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../Pager';
import { TEASER_LAYOUT_BOOKMARKS } from '../../../../../shared/constants/teaser';

const BookmarkList = bookmarkListFactory({
  styles: {
    BookmarkListWrapper: '',
  },
  TeaserGrid,
  teaserType: TEASER_LAYOUT_BOOKMARKS,
  Pager,
  pagerType: PAGER_TYPE_PAGE_LOADER,
  withPagePagerDecorator: false,
});

export default BookmarkList;
