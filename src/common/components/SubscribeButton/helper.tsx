import {
  AUTHOR_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
} from '../../../shared/constants/content';

export const getAlertItemTypeByTypename: Function = (
  typename: string,
): string => {
  switch (typename) {
    case KEYWORD_CONTENT_TYPE:
      return 'term';

    case AUTHOR_CONTENT_TYPE:
      return 'author';

    default:
      return 'node';
  }
};
