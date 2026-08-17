import React from 'react';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialState = {
    route: {
      ...routeInitialState,
      clientUrl: 'http://develop.publication.ch',
    },
  };
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[MinistageParagraphs] MinistageListicleParagraph', () => {
  it('Should render correct Ministage Title', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageListicle.name = 'Something else';

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('ministage-name')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('ministage-name').innerHTML).toBe('Something else');
  });
});
