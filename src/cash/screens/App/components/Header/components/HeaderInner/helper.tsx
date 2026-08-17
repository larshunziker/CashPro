import {
  ARTICLE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';

export const getIsSocialBarVisible = (headerContentType: string) => {
  return [ARTICLE_CONTENT_TYPE, NATIVE_ADVERTISING_CONTENT_TYPE].includes(
    headerContentType,
  );
};
