import React from 'react';
import { render } from '@testing-library/react';
import { searchInitialState } from '../../../../../../../../shared/reducers/search';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

jest.mock('../../../../../../../../common/components/Link');
jest.mock('../../../../Icon');
jest.mock(
  '../../../../../screens/MyCash/components/Musterportfolio/MusterportfolioTable',
);

beforeEach(() => {
  initialState = {
    search: searchInitialState,
  };
});

describe('[Component] HeaderInner', () => {
  it('Should render correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
