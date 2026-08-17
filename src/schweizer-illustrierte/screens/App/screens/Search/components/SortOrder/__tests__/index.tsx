import React from 'react';
import { render } from '@testing-library/react';
import { noop } from '../../../../../../../../shared/helpers/utils';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider/index';
import Component from '../../SortOrder';
import {
  GLOBAL_SEARCH_SORT_BY_DATE,
  GLOBAL_SEARCH_SORT_BY_RELEVANCE,
} from '../../../../../../../../shared/constants/globalSearch';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
let initialState = {};

beforeEach(() => {
  initialProps = {
    clickHandler: noop,
    currentSortOrder: '',
  };
  initialState = { route: routeInitialState };
});

describe('[Component] SortOrder', () => {
  test('Should render correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        {/* @ts-ignore */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('sort-order-wrapper')).not.toBe(null);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('sort-order-filter-wrapper').children).toHaveLength(3);
  });

  test('Should render the active filter by date label', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.currentSortOrder = GLOBAL_SEARCH_SORT_BY_DATE;
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        {/* @ts-ignore */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('sort-order-wrapper')).not.toBe(null);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('sort-order-filter-wrapper').getElementsByClassName(
        'ActiveFilterItem',
      ),
    ).toHaveLength(1);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('sort-order-filter-wrapper').getElementsByClassName(
        'ActiveFilterItem',
      )[0].innerHTML,
    ).toEqual('Aktualität');
  });

  test('Should render the active filter by relevance label', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.currentSortOrder = GLOBAL_SEARCH_SORT_BY_RELEVANCE;
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('sort-order-wrapper')).not.toBe(null);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('sort-order-filter-wrapper').getElementsByClassName(
        'ActiveFilterItem',
      ),
    ).toHaveLength(1);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('sort-order-filter-wrapper').getElementsByClassName(
        'ActiveFilterItem',
      )[0].innerHTML,
    ).toEqual('Relevanz');
  });
});
