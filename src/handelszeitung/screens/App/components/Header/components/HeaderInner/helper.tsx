import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_LONG_READ,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';

export const getIsSocialBarVisible = (headerContentType: string) =>
  [
    ARTICLE_CONTENT_TYPE,
    ARTICLE_TYPE_LONG_READ,
    NATIVE_ADVERTISING_CONTENT_TYPE,
    EXPLAINING_ARTICLE_CONTENT_TYPE,
    IMAGE_GALLERY_CONTENT_TYPE,
  ].includes(headerContentType);

export const navigateBack = () => {
  if (__CLIENT__) {
    if (global?.history?.state) {
      global.history.back();
    } else {
      window.location.href = '/';
    }
  }
};
