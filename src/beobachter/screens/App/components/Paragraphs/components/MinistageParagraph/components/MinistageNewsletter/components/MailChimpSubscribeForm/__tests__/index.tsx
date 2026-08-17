import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import mockData from './mockData.json';

let initialProps: any = {};

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] MailChimpSubscribeForm', () => {
  it('Should render correctly', () => {
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });
});
