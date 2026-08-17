import bookmarkListFactory from '../../../../../common/components/BookmarkList/factory';
import TeaserGrid from '../TeaserGrid';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../Pager';
import grid from '../../../../../common/assets/styles/grid.legacy.css';

const BookmarkList = bookmarkListFactory({
  styles: {
    BookmarkListWrapper: grid.Container,
  },
  TeaserGrid,
  teaserGridLayout: 'teaserBookmark',
  Pager,
  pagerType: PAGER_TYPE_PAGE_LOADER,
  withPagePagerDecorator: false,
});

export default BookmarkList;
