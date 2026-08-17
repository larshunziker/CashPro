import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_JOURNALISTIC,
  ARTICLE_TYPE_RESTAURANT,
  ORGANIZATION_CONTENT_TYPE,
  TEASER_CONTENT_TYPE,
} from '../../../../../../shared/constants/content';
import { ARTICLE_TYPE_BLOG_A, ARTICLE_TYPE_BLOG_B } from '../../../constants';
import { ORGANIZATION_TYPE_POP } from '../../../screens/PopRestaurants/constants';

export const getStyleByType = ({
  __typename,
  organizationType,
  teaserType,
  subtypeValue,
}: TeasableInterfaceNode) => {
  if (!__typename) {
    return '';
  }
  if (__typename === ARTICLE_CONTENT_TYPE) {
    switch (subtypeValue) {
      case ARTICLE_TYPE_BLOG_A:
        return 'Blue';
      case ARTICLE_TYPE_BLOG_B:
        return 'Purple';
      case ORGANIZATION_CONTENT_TYPE:
        return 'Gold';
      case ARTICLE_TYPE_JOURNALISTIC:
      default:
        return '';
    }
  } else if (
    __typename === ORGANIZATION_CONTENT_TYPE &&
    organizationType !== ORGANIZATION_TYPE_POP
  ) {
    return 'Gold';
  } else if (__typename === TEASER_CONTENT_TYPE && teaserType) {
    switch (teaserType) {
      case ARTICLE_TYPE_BLOG_A:
        return 'Blue';
      case ARTICLE_TYPE_BLOG_B:
        return 'Purple';
      case ARTICLE_TYPE_RESTAURANT:
        return 'Gold';
      default:
        return '';
    }
  }
  return '';
};
