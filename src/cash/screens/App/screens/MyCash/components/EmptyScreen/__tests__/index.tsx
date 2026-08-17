import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import Component from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps = null;

beforeEach(() => {
  initialProps = {
    entity: null,
  };
});

describe('[EmptyScreen] MyCash', () => {
  it('Should render nothing if no entity is given', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />,
      </MemoryRouter>,
    );

    expect(queryByTestId('mycash-empty-screen')).toBe(null);
  });

  it('Should render EmptyScreen for portfolio', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entity = 'portfolio';
    const { queryByTestId, container } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />,
      </MemoryRouter>,
    );

    expect(queryByTestId('mycash-empty-screen')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render EmptyScreen for watchlist', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entity = 'watchlist';
    const { queryByTestId, container } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />,
      </MemoryRouter>,
    );

    expect(queryByTestId('mycash-empty-screen')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render EmptyScreen for alert', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entity = 'alert';
    const { queryByTestId, container } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />,
      </MemoryRouter>,
    );

    expect(queryByTestId('mycash-empty-screen')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
