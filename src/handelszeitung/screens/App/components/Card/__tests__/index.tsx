import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

const initialProps = {
  title: 'title',
  urlLabel: 'urlLabel',
  url: 'https://www.sommeurl.com',
  addClass: 'css-class',
  children: <span>Im a child</span>,
};

jest.mock('Link');
describe('[Component] Card', () => {
  it('Should match the snapshot', () => {
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });
});
