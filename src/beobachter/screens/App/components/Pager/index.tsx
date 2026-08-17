/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import LazyLoader from './components/LazyLoader';
import LazyLoading from './components/LazyLoading';
import PageLoader from './components/PageLoader';
import SectionPager from './components/SectionPager';

export const PAGER_TYPE_LAZY_LOADER = 'pager/type-lazy-loader';
export const PAGER_TYPE_LAZY_LOADING = 'pager/type-lazy-loading';
export const PAGER_TYPE_PAGE_LOADER = 'pager/type-page-loader';
export const PAGER_TYPE_SECTION_PAGER = 'pager/type-section-pager';

const footerLayouts: Object = {
  [PAGER_TYPE_PAGE_LOADER]: PageLoader,
  [PAGER_TYPE_LAZY_LOADER]: LazyLoader,
  [PAGER_TYPE_LAZY_LOADING]: LazyLoading,
  [PAGER_TYPE_SECTION_PAGER]: SectionPager,
};

export default createComponentSwitch(footerLayouts);
