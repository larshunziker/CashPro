import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
jest.mock('Picture');

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] BlogLead', () => {
  it('Should render nothing if there is no node', () => {
    const { container, queryByTestId } = render(<Component node={{}} />);
    expect(container).toMatchSnapshot();
    expect(queryByTestId('blog-lead-wrapper')).toBeNull();
  });

  it('Should render correctly with given props', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('blog-lead-wrapper')).not.toBeNull();
  });
});
