import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import Component from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    ministageNewsletter: {
      type: null,
    },
  };
});

describe('[Component] MinistageNewsletter', () => {
  it('Should render default MinistageNewsletterSignup', () => {
    const { queryByTestId } = render(
      <MockedProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MockedProvider>,
    );

    expect(queryByTestId('ministage-newsletter-signup-default')).not.toBeNull();
    expect(
      queryByTestId('ministage-newsletter-signup-default'),
    ).toMatchSnapshot();
  });
});
