import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import MockedProvider from '../../../../../../../../../../shared/tests/components/MockedProvider';

jest.mock('../components/MinistageNewsletterSignup', () => {
  return () => {
    return null;
  };
});
describe('[Paragraphs] MinistageParagraph - MinistageNewsletter', () => {
  it('Should not render if there is no [props.ministageNewsletter]', () => {
    const { queryByTestId } = render(
      <MockedProvider>
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MinistageNewsletter'. */}
        <Component ministageNewsletter={null} />
      </MockedProvider>,
    );
    expect(queryByTestId('ministage-newsletter-signup-default')).toBeNull();
  });
  it('Should render MinistageNewsletter correctly', () => {
    const ministageNewsletter = {
      type: '',
    };
    const { queryByTestId } = render(
      <MockedProvider>
        <Component ministageNewsletter={ministageNewsletter} />
      </MockedProvider>,
    );
    expect(queryByTestId('ministage-newsletter-signup-default')).not.toBeNull();
  });
});
