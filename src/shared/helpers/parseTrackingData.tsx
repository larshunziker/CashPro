import { Auth0 } from '../../common/components/Auth0Provider';
import {
  ARTICLE_CONTENT_TYPE,
  CHANNEL_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  RECIPE_CONTENT_TYPE,
  RESTRICTION_STATUS_PAID,
  RESTRICTION_STATUS_REGISTERED,
} from '../constants/content';
import { EXTRACT_DATA_FROM_PATH } from './extractDataFromPropsByConfigMap';

type RouteByPathType = {
  object: Article | Page | Keyword | LandingPage | NativeAdvertising | Topic;
};
type EnvironmentType = {
  routeByPath: RouteByPathType;
};

type Data = {
  environment?: EnvironmentType;
  routeByPath?: RouteByPathType;
};

type ParseTrackingDataProps = ConfigMap & {
  data: Data;
  articleType?: ConfigMapItem | string;
  subsection?: ConfigMapItem | string;
  publication?: string;
  articleId?: ConfigMapItem | string;
  contentType?: string;
};

const getUserStatus = () => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (global.Ads?.ikjuzglkjfroef) {
    return '1'; // paid
  }
  if (Auth0?.isAuthenticated()) {
    return '2'; // registered
  }
  return '0'; // not-logged-in
};

const parseTrackingData = (props: ParseTrackingDataProps): ConfigMap => {
  /* Make sure we have all the data we need */
  if (
    !(props.articleId && props.articleType && props.contentType) &&
    !props?.data?.environment?.routeByPath?.object &&
    !props?.data?.routeByPath?.object
  ) {
    return {
      publication: __APP_NAME__,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | ConfigMapItem | undefined'. */
      subsection: null,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | ConfigMapItem | undefined'. */
      keywords: null,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | ConfigMapItem | undefined'. */
      keywordCat: null,
      articleType: 'NotFound',
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | ConfigMapItem | undefined'. */
      articleId: null,
      usersi: getUserStatus(),
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      olid: global?.olid,
      articlePremium: '0',
    };
  }

  const hasEnvironment = props.data && props.data?.environment !== null;

  const getObjectPath = (routeQuery: string) => {
    const rootPath = hasEnvironment
      ? 'data.environment.routeByPath.object.'
      : 'data.routeByPath.object.';
    return rootPath + routeQuery;
  };

  const nodeObject = hasEnvironment
    ? props.data?.environment?.routeByPath?.object
    : props.data?.routeByPath?.object;

  const contentType = props.contentType || nodeObject?.__typename || '';

  const restrictionStatus =
    nodeObject &&
    'restrictionStatus' in nodeObject &&
    (nodeObject.restrictionStatus === RESTRICTION_STATUS_PAID ||
      nodeObject.restrictionStatus === RESTRICTION_STATUS_REGISTERED)
      ? '1'
      : '0';

  const defaultTrackingData: ConfigMap = {
    publication: __APP_NAME__,
    subsection: props.subsection || {
      type: EXTRACT_DATA_FROM_PATH,
      value: [getObjectPath('title')],
    },
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | ConfigMapItem | undefined'. */
    keywordCat: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | ConfigMapItem | undefined'. */
    keywords: null,
    articleType: props.articleType || {
      type: EXTRACT_DATA_FROM_PATH,
      value: [getObjectPath('__typename')],
    },
    articleId: props.articleId || {
      type: EXTRACT_DATA_FROM_PATH,
      value: [getObjectPath('id')],
    },
    usersi: getUserStatus(),
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    olid: global?.olid,
    articlePremium: restrictionStatus,
  };

  switch (contentType) {
    case ARTICLE_CONTENT_TYPE: {
      return {
        ...defaultTrackingData,
        subsection: {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('channel.title')],
        },
        keywords: {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('keywords.edges'), 'node.label'],
        },
      };
    }

    case EXPLAINING_ARTICLE_CONTENT_TYPE: {
      return {
        ...defaultTrackingData,
        subsection: {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('category')],
        },
        keywords: {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('keywords.edges'), 'node.label'],
        },
      };
    }

    case IMAGE_GALLERY_CONTENT_TYPE:
    case RECIPE_CONTENT_TYPE: {
      return {
        ...defaultTrackingData,
        keywords: {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('keywords.edges'), 'node.label'],
        },
      };
    }

    case KEYWORD_CONTENT_TYPE: {
      return {
        ...defaultTrackingData,
        articleId: props.articleId || {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('tid')],
        },
        subsection: props.subsection || {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('label')],
        },
      };
    }

    case CHANNEL_CONTENT_TYPE: {
      return {
        ...defaultTrackingData,
        subsection: {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('settings.title')],
        },
      };
    }

    case NATIVE_ADVERTISING_CONTENT_TYPE: {
      return {
        ...defaultTrackingData,
        subsection: {
          type: EXTRACT_DATA_FROM_PATH,
          value: [getObjectPath('subtypeValue')],
        },
      };
    }
  }
  return defaultTrackingData;
};

export default parseTrackingData;
