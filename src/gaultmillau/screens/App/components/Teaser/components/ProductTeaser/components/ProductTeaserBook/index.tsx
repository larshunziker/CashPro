import React from 'react';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import BookTeaserParagraph from '../../../../../Paragraphs/components/BookTeaserParagraph';
import { ProductTeaserProps } from '../ProductTeaserDefault/typings';

const ProductTeaserBook = ({
  teaserParagraph,
  hasNext,
}: ProductTeaserProps) => {
  const teaser = teaserParagraph?.teasers?.edges?.[0]?.node || null;

  if (!teaser) {
    return null;
  }

  return (
    <TestFragment data-testid="product-teaser-book">
      {/* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */}
      <BookTeaserParagraph bookTeaser={teaser} hasNext={hasNext} />
    </TestFragment>
  );
};

export default ProductTeaserBook;
