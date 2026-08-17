import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    teaserList: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] HomeSlider', () => {
  it('Should render nothing if there are no teaser', () => {
    const { container } = render(
      <ReduxProvider>
        <Component teaserList={[]} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with given props', () => {
    const { container } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
