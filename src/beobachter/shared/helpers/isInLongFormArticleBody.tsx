import { ARTICLE_TYPE_LONG_READ } from '../../../shared/constants/content';

export const isInLongFormArticleBody = (origin: string) =>
  [ARTICLE_TYPE_LONG_READ].includes(origin);
