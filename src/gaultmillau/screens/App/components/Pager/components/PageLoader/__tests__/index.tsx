import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, {
  Button,
  ButtonNext,
  ButtonPrevious,
  getStartPage,
} from '../index';

jest.mock('../../../../../components/Icon');
jest.mock('Link');

// Added this to avoid the "Missing Translation" error being logged
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialButtonProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialButtonProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialPageLoaderProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialPageLoaderProps;

beforeEach(() => {
  initialButtonProps = {
    itemsCount: 21,
    itemsPerPage: 10,
    component: 'pager/type-page-loader',
    routePathname: '/wine-and-cigars',
    routeQuery: {},
    queryStringName: 'page',
    currentPage: 1,
    getHref: () => null,
    intl: {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'url' implicitly has an 'any' type. */
      formatMessage: (url) => url.defaultMessage,
    },
    pager: {
      totalPages: 3,
      hasPreviousPage: () => true,
      hasNextPage: () => true,
    },
  };

  initialPageLoaderProps = {
    itemsCount: 21,
    itemsPerPage: 10,
    pager: {
      totalPages: 9,
      hasPreviousPage: () => true,
      hasNextPage: () => true,
    },
    currentPage: 2,
    ButtonPrevious,
    ButtonNext,
    Button,
  };

  initialState = {
    route: {
      vertical: 'vertical/home',
      pathname: '/',
      locationBeforeTransitions: { pathname: '/camindada', query: 'test' },
    },
  };
});

describe('[Component] Pager - PageLoader', () => {
  it('Should render ButtonPrevious correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialButtonProps' implicitly has an 'any' type. */
    const { container } = render(<ButtonPrevious props={initialButtonProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render ButtonNext correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialButtonProps' implicitly has an 'any' type. */
    const { container } = render(<ButtonNext props={initialButtonProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render Button correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialButtonProps' implicitly has an 'any' type. */
      <Button props={initialButtonProps} label={'3'} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render PageLoader correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialPageLoaderProps' implicitly has an 'any' type. */}
          <Component {...initialPageLoaderProps} />
        </IntlProvider>
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render PageLoader if total pages is 1', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialPageLoaderProps' implicitly has an 'any' type. */
    initialPageLoaderProps.itemsCount = 10;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialPageLoaderProps' implicitly has an 'any' type. */
    initialPageLoaderProps.itemsPerPage = 10;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialPageLoaderProps' implicitly has an 'any' type. */}
          <Component {...initialPageLoaderProps} />
        </IntlProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test.each`
    currentPage | totalPages | maxVisiblePages | result
    ${5}        | ${8}       | ${4}            | ${3}
    ${2}        | ${4}       | ${4}            | ${1}
    ${1}        | ${1}       | ${4}            | ${1}
    ${2}        | ${2}       | ${4}            | ${1}
    ${14}       | ${16}      | ${3}            | ${13}
    ${15}       | ${16}      | ${4}            | ${13}
    ${16}       | ${16}      | ${3}            | ${14}
  `(
    'Should return correct start page for if currentPage $currentPage and totalpages $totalPages',
    ({ currentPage, totalPages, maxVisiblePages, result }) => {
      expect(getStartPage(currentPage, totalPages, maxVisiblePages)).toBe(
        result,
      );
    },
  );
});
