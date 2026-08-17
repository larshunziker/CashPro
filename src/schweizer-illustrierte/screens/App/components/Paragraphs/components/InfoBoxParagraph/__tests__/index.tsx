import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
  initialState = {};
});

describe('[Paragraphs] Infobox', () => {
  it('Should render nothing if there are no passed props', () => {
    initialProps = {};
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2739 ->  Type '{}' is missing the following properties from type 'InfoBoxParagraphProps' */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render with infobox-container if the correct props are passed', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('infobox-container').innerHTML).not.toBe('');
  });
});
