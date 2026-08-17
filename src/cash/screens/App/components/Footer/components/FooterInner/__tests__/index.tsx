import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

jest.mock('Link');
const initialState = {};
const initialProps = JSON.parse(JSON.stringify(mockData));

describe('[Component] FooterInner', () => {
  it('Should render nothing', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Menu'. */}
        <Component footerPrimaryMenu={null} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render footer items correctly', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component footerPrimaryMenu={initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
