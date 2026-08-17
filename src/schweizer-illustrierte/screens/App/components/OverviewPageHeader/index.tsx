/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import Blog from './components/Blog';
import Celebrity from './components/Celebrity';
import Default from './components/Default';
import Dossier from './components/Dossier';
import VideoBlog from './components/VideoBlog';

export const OVERVIEW_PAGE_HEADER_CELEBRITY = 'overview-page-header/celebrity';
export const OVERVIEW_PAGE_HEADER_DEFAULT = 'overview-page-header/default';
export const OVERVIEW_PAGE_HEADER_DOSSIER = 'overview-page-header/dossier';
export const OVERVIEW_PAGE_HEADER_BLOG = 'overview-page-header/blog';
export const OVERVIEW_PAGE_HEADER_VIDEO_BLOG =
  'overview-page-header/video-blog';

export const OVERVIEW_PAGE_HEADER_CELEBRITY_KEY = 'celebrity';
export const OVERVIEW_PAGE_HEADER_DEFAULT_KEY = 'default';
export const OVERVIEW_PAGE_HEADER_DOSSIER_KEY = 'dossier';
export const OVERVIEW_PAGE_HEADER_BLOG_KEY = 'blog';
export const OVERVIEW_PAGE_HEADER_VIDEO_BLOG_KEY = 'videoBlog';

const OverviewPageHeaderLayouts = {
  [OVERVIEW_PAGE_HEADER_DEFAULT]: Default,
  [OVERVIEW_PAGE_HEADER_CELEBRITY]: Celebrity,
  [OVERVIEW_PAGE_HEADER_DOSSIER]: Dossier,
  [OVERVIEW_PAGE_HEADER_BLOG]: Blog,
  [OVERVIEW_PAGE_HEADER_VIDEO_BLOG]: VideoBlog,
};

export default createComponentSwitch(OverviewPageHeaderLayouts);
