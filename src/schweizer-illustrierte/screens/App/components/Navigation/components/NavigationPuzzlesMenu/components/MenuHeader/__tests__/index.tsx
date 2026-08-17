import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

let initialProps = {};

beforeEach(() => {
  initialProps = {};
});

describe('[Component] MenuHeader', () => {
  it('Should render nothing if there are no props', () => {
    const { container } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS2769 ->  No overload matches this call. */}
        <Component {...initialProps} menuCloseHandler={null} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider>
        <Component {...initialProps} menuCloseHandler={() => jest.fn()} />,
      </ReduxProvider>,
    );

    expect(container.innerHTML).not.toBe('');
    expect(queryByTestId('logo-wrapper')).not.toBeNull();
  });
});
