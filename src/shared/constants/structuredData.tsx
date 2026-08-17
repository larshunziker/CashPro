import { MetaTag } from '../../common/components/Helmet/typings';

export const ROOT_SCHEMA_TYPE_NEWS_ARTICLE = 'NewsArticle';
export const ROOT_SCHEMA_TYPE_RECIPE = 'Recipe';
export const ROOT_SCHEMA_TYPE_ORGANIZATION = 'NewsMediaOrganization';
export const ROOT_SCHEMA_TYPE_PARENT_ORGANIZATION = 'Organization';
export const ROOT_SCHEMA_TYPE_WEB_PAGE = 'WebPage';
export const ROOT_SCHEMA_TYPE_SOFTWARE = 'SoftwareApplication';
export const ROOT_SCHEMA_TYPE_WEBSITE = 'WebSite';
export const ROOT_SCHEMA_TYPE_PERSON = 'Person';
export const ROOT_SCHEMA_TYPE_IMAGE = 'ImageObject';
export const ROBOTS_META_INDEX = 'index';
export const ROBOTS_META_NOINDEX = 'noindex';
export const ROBOTS_META_FOLLOW = 'follow';
export const ROBOTS_META_NOODP = 'noodp';
export const ROBOTS_META_NOARCHIVE = 'noarchive';
export const ROBOTS_META_NOOPENER = 'noopener';
export const ROBOTS_META_INDEX_FOLLOW_NOODP_NOARCHIVE = `${ROBOTS_META_INDEX},${ROBOTS_META_FOLLOW},${ROBOTS_META_NOODP},${ROBOTS_META_NOARCHIVE}`;
export const ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE = `${ROBOTS_META_INDEX},${ROBOTS_META_FOLLOW},${ROBOTS_META_NOODP},${ROBOTS_META_NOOPENER},${ROBOTS_META_NOARCHIVE}`;
export const ROBOTS_META_NOINDEX_FOLLOW = `${ROBOTS_META_NOINDEX},${ROBOTS_META_FOLLOW}`;
export const ROBOTS_META_INDEX_FOLLOW = `${ROBOTS_META_INDEX},${ROBOTS_META_FOLLOW}`;
export const ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE = `${ROBOTS_META_NOINDEX},${ROBOTS_META_FOLLOW},${ROBOTS_META_NOODP},${ROBOTS_META_NOARCHIVE}`;
export const ROBOTS_NOINDEX_PARAMS = [
  'email_address',
  'form_build_id',
  'form_id',
  'search_form_block',
  'view_dom_id',
  'pkBerichtNr',
  '$Version',
  '$Path',
  '_ptid',
];

export const SHARED_META_DATA: MetaTag[] = [
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  },
  {
    name: 'charset',
    content: 'UTF-8',
  },
  {
    'http-equiv': 'content-type',
    content: 'text/html; charset=utf-8',
  },
  {
    name: 'mobile-web-app-capable',
    content: 'yes',
  },
  {
    property: 'og:type',
    content: 'article',
  },
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes',
  },
  {
    name: 'robots',
    content: 'max-image-preview:large',
  },
  {
    name: 'robots',
    content: 'max-video-preview:-1',
  },
  {
    name: 'robots',
    content: 'max-snippet:-1',
  },
];
