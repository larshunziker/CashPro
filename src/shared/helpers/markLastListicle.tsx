import { LISTICLE_ITEM_PARAGRAPH } from '../constants/paragraphs';

/* @ts-ignore TODO: TS7006 ->  Parameter 'pageBody' implicitly has an 'any' type. */
export function markLastListicle(pageBody) {
  if (!pageBody || !pageBody.length || pageBody.length < 1) {
    return pageBody;
  }
  for (let i = 0; i < pageBody.length; i++) {
    if (
      pageBody[i].__typename === LISTICLE_ITEM_PARAGRAPH &&
      (i === pageBody.length - 1 ||
        pageBody[i + 1].__typename !== LISTICLE_ITEM_PARAGRAPH)
    ) {
      pageBody[i].isLastOfGroup = true;
    }
  }
  return pageBody;
}
