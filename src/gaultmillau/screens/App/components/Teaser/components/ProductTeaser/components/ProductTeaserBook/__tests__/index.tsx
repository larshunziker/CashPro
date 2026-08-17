import React from 'react';
import { render } from '@testing-library/react';
import Component from '../../ProductTeaserBook';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
beforeEach(() => {
  initialProps = {
    teaserParagraph: JSON.parse(JSON.stringify(mockData)),
    hasNext: true,
  };
});

describe('[Component] ProductTeaserBook', () => {
  it('Should not render Teaser if TeaserParagraph empty', () => {
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('product-teaser-book')).toBeNull();
  });

  it('Should not render Teaser correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('product-teaser-book')).not.toBeNull();
  });
});
