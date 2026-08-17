import { ENTITY_QUEUE_PARAGRAPH } from '../constants/paragraphs';

// @TODO: type pageBody properly after ParagraphUnion is defined
export const latestNACounter = (pageBody: Array<any>): number => {
  let useNACount = 0;
  if (pageBody && Array.isArray(pageBody)) {
    pageBody.forEach((paragraph) => {
      if (paragraph?.__typename === ENTITY_QUEUE_PARAGRAPH) {
        paragraph.entityQueue?.items?.edges &&
          Array.isArray(paragraph.entityQueue.items.edges) &&
          paragraph.entityQueue.items.edges.length > 0 &&
          /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
          paragraph.entityQueue.items.edges.forEach(({ node }) => {
            if (node?.useNativeAdvertising) {
              useNACount = useNACount + 1;
            }
          });
      }
    });
  }
  return useNACount;
};
