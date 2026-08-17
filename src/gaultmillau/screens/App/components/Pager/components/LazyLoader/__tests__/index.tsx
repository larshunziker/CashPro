import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import Component from '../index';

const currentPage = 1;

let initialProps = {
  currentPage: currentPage,
  itemsCount: 60,
  itemsPerPage: 15,
  updatePage: () => currentPage + 1,
};

beforeAll(() => {
  initialProps = {
    ...initialProps,
  };
});

beforeEach(() => {
  initialProps = {
    ...initialProps,
  };
});

describe('[Component] LazyLoader', () => {
  it('Should render component isLoading = false', () => {
    const { container } = render(
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        <Component {...initialProps} />
      </IntlProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render component component with no more results', () => {
    const { container } = render(
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        <Component {...initialProps} />
      </IntlProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});
