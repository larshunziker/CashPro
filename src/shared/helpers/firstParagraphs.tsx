import lodashSlice from 'lodash/slice';
import { SECTION_PARAGRAPH } from '../constants/paragraphs';

const firstParagraphs = (paragraphsCount: number, paragraphs: any) => {
  let finalParagraphCounter = 0;
  const reducedBody =
    (Array.isArray(paragraphs) &&
      paragraphs.length > 0 &&
      paragraphs.reduce((finalParagraphs, paragraph: any) => {
        if (finalParagraphCounter === paragraphsCount) {
          return finalParagraphs;
        }
        if (paragraph.__typename === SECTION_PARAGRAPH) {
          if (paragraph.body.length >= paragraphsCount) {
            finalParagraphCounter = paragraphsCount;
            return [
              ...finalParagraphs,
              { ...paragraph, body: [...lodashSlice(paragraph.body, 0, 2)] },
            ];
          } else {
            finalParagraphCounter++;
            return [...finalParagraphs, paragraph];
          }
        }
        finalParagraphCounter++;
        return [...finalParagraphs, paragraph];
      }, [])) ||
    [];
  return reducedBody;
};
export default firstParagraphs;
