import {
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  ARTICLE_TYPE_RATGEBER,
} from '../../../shared/constants/content';
import { SECTION_PARAGRAPH } from '../../../shared/constants/paragraphs';

export const isInsideColumn = (origin: string) =>
  [
    ARTICLE_TYPE_GUIDE,
    `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_GUIDE}`,
    `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_RATGEBER}`,
    ARTICLE_TYPE_RATGEBER,
    ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
    ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  ].includes(origin);
