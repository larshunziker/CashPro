import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockNA from './mockNativeAdvertising.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const initialState = {};

jest.mock('Breadcrumbs', () => {
  return () => {
    return null;
  };
});

beforeEach(() => {
  initialProps = {
    article: JSON.parse(JSON.stringify(mockNA)),
  };
});

afterEach(cleanup);

const MockedComponent = () => (
  <ReduxProvider initialState={initialState}>
    {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
    <Component {...initialProps} />
  </ReduxProvider>
);

describe('[Screen] NativeAdvertising', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(<MockedComponent />);
    expect(queryByTestId('NAHeader')).not.toBeNull();
  });

  // it('Should display the correct time', () => {
  //   const { queryByTestId } = render(<MockedComponent />);
  //   expect(queryByTestId('publicationDate').innerHTML).toBe(
  //     ' Veröffentlicht am 05.08.2019 - 11:56 Uhr',
  //   );
  //   expect(queryByTestId('updateDate')).toBeNull;
  // });
});
