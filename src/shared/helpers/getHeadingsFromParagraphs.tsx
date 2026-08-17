import { SECTION_PARAGRAPH, TEXT_PARAGRAPH } from '../constants/paragraphs';
import { HeadingElement } from '../../common/components/TableOfContents/typings';

const getHeadingsFromParagraphs = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'paragraphs' implicitly has an 'any' type. */
  paragraphs,
): (HeadingElement | HeadingElement[])[] => {
  return paragraphs
    ?.filter(
      (paragraph: TextParagraph | SectionParagraph) =>
        (paragraph.__typename === TEXT_PARAGRAPH && !!paragraph.header) ||
        paragraph.__typename === SECTION_PARAGRAPH,
    )
    .map((navigableParagraph: TextParagraph | SectionParagraph) => {
      if (navigableParagraph.__typename === SECTION_PARAGRAPH) {
        if (navigableParagraph.title) {
          return [
            {
              anchorLink:
                navigableParagraph.anchorId ||
                navigableParagraph.title.replace(/\s/g, ''),
              text: navigableParagraph.title,
              isSectionTitle: true,
            },
            ...getHeadingsFromParagraphs(navigableParagraph.body),
          ];
        }
        return getHeadingsFromParagraphs(navigableParagraph.body);
      }
      return {
        anchorLink:
          navigableParagraph.anchorId ||
          /* @ts-ignore TODO: TS2339 ->  Property 'header' does not exist on type 'SectionParagraph | TextParagraph'. */
          navigableParagraph.header.replace(/\s/g, ''),
        /* @ts-ignore TODO: TS2339 ->  Property 'header' does not exist on type 'SectionParagraph | TextParagraph'. */
        text: navigableParagraph.header,
      };
    });
};

export default getHeadingsFromParagraphs;
