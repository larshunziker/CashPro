import { getIsSocialBarVisible } from '../helper';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_LONG_READ,
  DOSSIER_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';

describe('[Component] Header - HeaderInner Helper', () => {
  test.each`
    typename                           | hasSocialBar
    ${DOSSIER_CONTENT_TYPE}            | ${false}
    ${LANDING_PAGE_CONTENT_TYPE}       | ${false}
    ${ARTICLE_CONTENT_TYPE}            | ${true}
    ${ARTICLE_TYPE_LONG_READ}          | ${true}
    ${NATIVE_ADVERTISING_CONTENT_TYPE} | ${true}
    ${EXPLAINING_ARTICLE_CONTENT_TYPE} | ${true}
    ${IMAGE_GALLERY_CONTENT_TYPE}      | ${true}
  `(
    'Should render Icon for content type $typename properly',
    ({ hasSocialBar, typename }) => {
      expect(getIsSocialBarVisible(typename)).toBe(hasSocialBar);
    },
  );
});
