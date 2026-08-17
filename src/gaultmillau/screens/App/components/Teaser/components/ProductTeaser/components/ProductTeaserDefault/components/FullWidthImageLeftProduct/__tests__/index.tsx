import React from 'react';
import { render } from '@testing-library/react';
import Component from '../../FullWidthImageLeftProduct';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
beforeEach(() => {
  initialProps = {
    teaserParagraph: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] FullWidthImageLeftProduct', () => {
  it('Should not render Teaser if TeaserParagraph empty', () => {
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('full-width-image-left-product-wrapper')).toBeNull();
  });

  it('Should not render Teaser correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      queryByTestId('full-width-image-left-product-wrapper'),
    ).not.toBeNull();
  });
});
