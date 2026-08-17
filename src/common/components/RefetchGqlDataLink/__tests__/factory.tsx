/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';

afterEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  delete global.refetchGQL;
  jest.clearAllMocks();
});

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

const initialFactoryOptions = {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'onClick' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'className' implicitly has an 'any' type. */
  Link: ({ children, onClick, className }) => (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  ),
  setIsRefetchingData: () => null,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  getRoutePathname: (props) => props.routePathname,
  shouldRerender: () => false,
};

let initialProps = {
  path: '/',
  setIsRefetchingData: () => null,
  routePathname: '/',
  className: 'test-classname',
};

beforeEach(() => {
  initialProps = {
    ...initialProps,
  };

  Component = componentFactory(initialFactoryOptions);
});

// INFO: I can see that listening to jest.spyOn(console, 'log'); might not be the best solution. But I didn't find any other way the test my component

describe('[Component] RefetchGqlDataLink', () => {
  it('Should not refetch data if global.refetchGQL is null', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchGQL = null;

    initialProps.path = '/people';
    initialProps.routePathname = '/people';
    const { getByText } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>People</Component>,
    );

    const spy = jest.spyOn(console, 'log');

    const element = getByText('People');

    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);

    // expect(element).toHaveClass('test-classname');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('Should not call global.refetchGQL if link.path and routePathname path is not the same', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchGQL = async () => await console.log('success');

    initialProps.path = '/style';
    initialProps.routePathname = '/people';
    const { getByText } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>Style</Component>,
    );
    const spy = jest.spyOn(console, 'log');

    const element = getByText('Style');

    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);

    // expect(element).toHaveClass('test-classname');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('Should reject after calling the refetchGql fn', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchGQL = async () => await console.log('error');

    initialProps.path = '/family';
    initialProps.routePathname = '/family';
    const { getByText } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>Family</Component>,
    );
    const spy = jest.spyOn(console, 'log');

    const element = getByText('Family');

    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);

    // expect(element).toHaveClass('test-classname');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Should reject after calling the refetchGql fn1', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchGQL = async () => await console.log('success');

    initialProps.path = '/family';
    initialProps.routePathname = '/family';
    const { getByText } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>Family</Component>,
    );
    const spy = jest.spyOn(console, 'log');

    const element = getByText('Family');

    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);

    // expect(element).toHaveClass('test-classname');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
