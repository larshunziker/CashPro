import React from 'react';
import { isInsideColumn } from '../../../../../../shared/helpers/isInsideColumn';
import BookTeaserParagraph from '../BookTeaserParagraph';
import { BOOK_TEASER_PARAGRAPH } from './index';
import { SECTION_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { ARTICLE_TYPE_LONG_READ } from '../../../../../../../shared/constants/content';
import { TeaserParagraphProps } from './typings';

const TeaserParagraph = ({
  teaserParagraph: { teasers },
  hasNext = false,
  origin,
}: TeaserParagraphProps) => {
  const teaser = teasers?.edges?.[0]?.node as TeaserInterface;

  if (!teaser) {
    return null;
  }
  const isInLongFormSectionParagraph =
    origin === `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_LONG_READ}`;
  const teaserType = teaser?.__typename || null;

  switch (teaserType) {
    case BOOK_TEASER_PARAGRAPH:
      return (
        <BookTeaserParagraph
          bookTeaser={teaser as Product}
          hasNext={hasNext}
          hasContainer={
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
            !isInsideColumn(origin) && !isInLongFormSectionParagraph
          }
        />
      );
    default:
      return null;
  }
};

export default TeaserParagraph;
