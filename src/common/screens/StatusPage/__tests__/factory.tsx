import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { noop } from './../../../../shared/helpers/utils';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';

/* @ts-ignore TODO: TS7034 ->  Variable 'factoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
let factoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'renderComponent' implicitly has type 'any' in some locations where its type cannot be determined. */
let renderComponent;

beforeEach(() => {
  factoryOptions = {
    statusCodeConfig: {
      404: {
        title: { text: '404-title' },
        description: { text: '404-description' },
        icon: <div>404-icon</div>,
        metaTitle: '404-metatitle',
        showSearchForm: true,
      },
      451: {
        title: { text: '451-title' },
        description: { text: '451-description' },
        icon: <div>451-icon</div>,
        metaTitle: '451-metatitle',
        showSearchForm: true,
      },
    },
    searchForm: <div>search form</div>,
    Helmet: () => null,
    styles: {
      Wrapper: 'wrapper-classname',
      Container: 'container-classname',
      Row: 'row-classname',
      Columns: 'columns-classname',
      HeaderWrapper: 'headerwrapper-classname',
      IconWrapper: 'iconwrapper-classname',
      Icon: 'icon-classname',
      Title: 'title-classname',
      Description: 'description-classname',
      SearchWrapper: 'searchwrapper-classname',
    },
  };

  initialProps = {
    statusCode: 404,
    setStatusCode: noop,
  };
  initialState = {};

  Component = componentFactory(factoryOptions);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  renderComponent = (props) =>
    render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...props} />,
        </HelmetProvider>
      </ReduxProvider>,
    );
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'queryByTestId' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'selector' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'textContent' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'className' implicitly has an 'any' type. */
const assertElement = (queryByTestId, selector, textContent, className) => {
  const element = queryByTestId(selector);
  // @ts-ignore
  expect(element).toHaveTextContent(textContent);
  // @ts-ignore
  expect(element).toHaveClass(className);
};

describe('[Screen] StatusPage', () => {
  it('Should render 404 message with searchform', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'renderComponent' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = renderComponent(initialProps);
    expect(queryByTestId('status-page-wrapper')).not.toBeNull();

    assertElement(
      queryByTestId,
      'status-page-icon-wrapper',
      '404-icon',
      'iconwrapper-classname',
    );
    assertElement(
      queryByTestId,
      'status-page-title-wrapper',
      '404-title',
      'title-classname',
    );
    assertElement(
      queryByTestId,
      'status-page-description-wrapper',
      '404-description',
      'description-classname',
    );

    expect(queryByTestId('status-page-searchform-wrapper')).not.toBeNull();
  });

  it('Should render 404 message without searchform', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'factoryOptions' implicitly has an 'any' type. */
    factoryOptions.searchForm = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'factoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(factoryOptions);
    /* @ts-ignore TODO: TS7005 ->  Variable 'renderComponent' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = renderComponent(initialProps);
    expect(queryByTestId('status-page-wrapper')).not.toBeNull();
    assertElement(
      queryByTestId,
      'status-page-icon-wrapper',
      '404-icon',
      'iconwrapper-classname',
    );
    assertElement(
      queryByTestId,
      'status-page-title-wrapper',
      '404-title',
      'title-classname',
    );
    assertElement(
      queryByTestId,
      'status-page-description-wrapper',
      '404-description',
      'description-classname',
    );

    expect(queryByTestId('status-page-searchform-wrapper')).toBeNull();
  });

  it('Should render 451 message with searchform', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'factoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(factoryOptions);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.statusCode = 451;
    /* @ts-ignore TODO: TS7005 ->  Variable 'renderComponent' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = renderComponent(initialProps);
    expect(queryByTestId('status-page-wrapper')).not.toBeNull();

    assertElement(
      queryByTestId,
      'status-page-icon-wrapper',
      '451-icon',
      'iconwrapper-classname',
    );
    assertElement(
      queryByTestId,
      'status-page-title-wrapper',
      '451-title',
      'title-classname',
    );
    assertElement(
      queryByTestId,
      'status-page-description-wrapper',
      '451-description',
      'description-classname',
    );

    expect(queryByTestId('status-page-searchform-wrapper')).not.toBeNull();
  });

  it('Should render 451 message without searchform', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'factoryOptions' implicitly has an 'any' type. */
    factoryOptions.searchForm = null;

    /* @ts-ignore TODO: TS7005 ->  Variable 'factoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(factoryOptions);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.statusCode = 451;

    /* @ts-ignore TODO: TS7005 ->  Variable 'renderComponent' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = renderComponent(initialProps);
    expect(queryByTestId('status-page-wrapper')).not.toBeNull();

    assertElement(
      queryByTestId,
      'status-page-icon-wrapper',
      '451-icon',
      'iconwrapper-classname',
    );
    assertElement(
      queryByTestId,
      'status-page-title-wrapper',
      '451-title',
      'title-classname',
    );
    assertElement(
      queryByTestId,
      'status-page-description-wrapper',
      '451-description',
      'description-classname',
    );

    expect(queryByTestId('status-page-searchform-wrapper')).toBeNull();
  });
});
