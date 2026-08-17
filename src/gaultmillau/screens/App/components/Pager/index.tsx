/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import LazyLoader from './components/LazyLoader';
import LazyLoading from './components/LazyLoading';
import PageLoader from './components/PageLoader';

export const PAGER_TYPE_LAZY_LOADING = 'pager/type-lazy-loading';
export const PAGER_TYPE_LAZY_LOADER = 'pager/type-lazy-loader';
export const PAGER_TYPE_PAGE_LOADER = 'pager/type-page-loader';

const footerLayouts = {
  [PAGER_TYPE_PAGE_LOADER]: PageLoader,
  [PAGER_TYPE_LAZY_LOADER]: LazyLoader,
  [PAGER_TYPE_LAZY_LOADING]: LazyLoading,
};

export default createComponentSwitch(footerLayouts);
