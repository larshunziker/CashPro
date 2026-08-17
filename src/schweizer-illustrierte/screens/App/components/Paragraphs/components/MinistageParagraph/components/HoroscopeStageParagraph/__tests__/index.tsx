import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const initialState = {};

beforeEach(() => {
  initialProps = { ...mockData };
});

describe('[Paragraphs] HoroscopeStageParagraph', () => {
  it('Should render nothing if there are no passed props', () => {
    initialProps = {};
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2741 ->  Property 'ministageParagraph' is missing in type '{}' but required in type 'HoroscopeStageParagraphProps'. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('horoscope-stage-container')).toBeNull();
  });

  it('Should render horoscope-stage-container if the correct props are passed', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('horoscope-stage-container')).not.toBeNull();
    expect(queryByTestId('horoscope-stage-container-name')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('horoscope-stage-container-name')).toHaveTextContent(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.ministageParagraph.ministage.name,
    );

    expect(
      queryByTestId('horoscope-stage-container-shortTitle'),
    ).not.toBeNull();

    expect(
      queryByTestId('horoscope-stage-container-shortTitle'),
      //@ts-ignore
    ).toHaveTextContent(initialProps.ministageParagraph.ministage.shortTitle);

    expect(
      queryAllByTestId('horoscope-stage-zodiacsign-container'),
    ).toHaveLength(12);
  });
});
