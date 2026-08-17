import React from 'react';
import { render } from '@testing-library/react';
import { initialStates } from '../../../../../shared/reducers';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import LoadingBar from '../index';

jest.mock('react-redux', () => ({
  // @ts-ignore
  ...jest.requireActual('react-redux'),
  useSelector: jest
    .fn()
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(true),
}));

let initialState = {};

const renderComponent = () =>
  render(
    <ReduxProvider initialState={initialState}>
      <LoadingBar />
    </ReduxProvider>,
  );

beforeEach(() => {
  initialState = JSON.parse(JSON.stringify(initialStates));
});

describe('[Component] LoadingBar', () => {
  it('Should render and match snapshot', () => {
    const { container } = renderComponent();
    expect(container.innerHTML).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
