import {
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_RATGEBER,
} from '../../../shared/constants/content';
import { SECTION_PARAGRAPH } from '../../../shared/constants/paragraphs';

export const isInRatgeberArticleBody = (origin: string) =>
  [
    ARTICLE_TYPE_RATGEBER,
    `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_RATGEBER}`,
  ].includes(origin);

export const isInGuideArticleBody = (origin: string) =>
  [ARTICLE_TYPE_GUIDE, `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_GUIDE}`].includes(
    origin,
  );
