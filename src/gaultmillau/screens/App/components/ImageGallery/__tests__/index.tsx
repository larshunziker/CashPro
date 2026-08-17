import React from 'react';
import { render } from '@testing-library/react';
import { initialState as windowInitialState } from '../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

// eslint-disable-next-line
import styles from '../styles.legacy.css';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialState = {
    window: windowInitialState,
  };
  initialProps = {
    gallery: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] ImageGallery', () => {
  it('Should render nothing if there are no props', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component gallery={{}} styles={styles} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('image-gallery-wrapper')).toBeNull();
  });

  it('Should render correctly with given props', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} styles={styles} />
      </ReduxProvider>,
    );
    expect(queryByTestId('image-gallery-wrapper')).not.toBeNull();
  });
});
