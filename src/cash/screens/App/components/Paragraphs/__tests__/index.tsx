import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

jest.mock(
  '../../../screens/MyCash/components/Musterportfolio/MusterportfolioTable',
);

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialState = {
    window: windowInitialState,
  };
  initialProps = {
    pageBody: [],
    origin: '',
  };
});

describe('[Component] Paragraphs', () => {
  it('Should render nothing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render the paragraphs wrapper, if pageBody is not empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = ['test-1', 'test-2'];

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />,
      </ReduxProvider>,
    );
    expect(queryByTestId('paragraphs-wrapper')).not.toBeNull();
  });
});
