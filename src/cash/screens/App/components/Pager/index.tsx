import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import LazyLoader from './components/LazyLoader';
import LazyLoading from './components/LazyLoading';
import PageLoader from './components/PageLoader';
import PageLoaderMemory from './components/PageLoaderMemory';
import PrevNextLoader from './components/PrevNextLoader';
import SectionPager from './components/SectionPager';

export const PAGER_TYPE_LAZY_LOADER = 'pager/type-lazy-loader';
export const PAGER_TYPE_LAZY_LOADING = 'pager/type-lazy-loading';
export const PAGER_TYPE_PAGE_LOADER = 'pager/type-page-loader';
export const PAGER_TYPE_PAGE_LOADER_MEMORY = 'pager/type-page-loader-memory';
export const PAGER_TYPE_SECTION_PAGER = 'pager/type-section-pager';
export const PAGER_TYPE_PREV_NEXT = 'pager/type-prev-next';

const pagerLayouts = {
  [PAGER_TYPE_PAGE_LOADER]: PageLoader,
  [PAGER_TYPE_PAGE_LOADER_MEMORY]: PageLoaderMemory,
  [PAGER_TYPE_LAZY_LOADER]: LazyLoader,
  [PAGER_TYPE_LAZY_LOADING]: LazyLoading,
  [PAGER_TYPE_SECTION_PAGER]: SectionPager,
  [PAGER_TYPE_PREV_NEXT]: PrevNextLoader,
};

const Pager = createComponentSwitch(pagerLayouts);

export default Pager;
