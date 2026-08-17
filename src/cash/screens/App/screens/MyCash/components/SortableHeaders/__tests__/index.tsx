import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

const mockedSetSearchParams = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useNavigationType: jest.fn(() => 'PUSH'),
    useInRouterContext: jest.fn(() => true),
    useMatch: jest.fn(() => true),
    useParams: jest.fn(() => ({
      query: 'test',
    })),
    useNavigate: jest.fn(() => jest.fn()),
    useSearchParams: () => [null, mockedSetSearchParams],
    useLocation: jest.fn(() => {
      return {
        pathname: '/suche/*',
        search: '',
      };
    }),
  };
});

let initialProps: any = {};

beforeEach(() => {
  initialProps = {
    column: 'name',
    isDirtySortTableRef: { current: true },
    children: <div>children</div>,
    hasCustomOrder: false,
    group: 'no-grouping',
    location: { query: { sortBy: 'name', direction: 'asc' } },
  };
});

describe('[Component] SortableHeaders', () => {
  it('Should render SortableHeaders with active sorting', async () => {
    // @ts-ignore
    const { container } = render(<Component {...initialProps}></Component>);

    expect(container).toMatchSnapshot();
  });
  it('Should render SortableHeaders with inactive sorting', async () => {
    initialProps.group = 'currency';
    // @ts-ignore
    const { container } = render(<Component {...initialProps}></Component>);

    expect(container).toMatchSnapshot();
  });
  it('Should render SortableHeaders and change url params on btn click', async () => {
    const { container, queryByTestId } = render(
      <Component {...initialProps}></Component>,
    );

    const btn = queryByTestId('sortable-header-btn');

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    btn.click();

    expect(mockedSetSearchParams).toHaveBeenCalledTimes(1);

    expect(container).toMatchSnapshot();
  });
});
