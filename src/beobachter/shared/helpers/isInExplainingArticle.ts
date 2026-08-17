import { EXPLAINING_ARTICLE_CONTENT_TYPE } from '../../../shared/constants/content';
import { SECTION_PARAGRAPH } from '../../../shared/constants/paragraphs';

/* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
export function isInExplainingArticle(origin) {
  return [
    EXPLAINING_ARTICLE_CONTENT_TYPE,
    `${SECTION_PARAGRAPH}_${EXPLAINING_ARTICLE_CONTENT_TYPE}`,
  ].includes(origin);
}
