import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { ALPHABET_LAYOUT_MAIN, ALPHABET_LAYOUT_MOBILE } from '../constants';

describe('[Common] Alphabet', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
  let Component;
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps;

  const componentFactoryOptions = {
    /* @ts-ignore TODO: TS7031 ->  Binding element 'className' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
    Link: ({ className, label }) => (
      <div className={className} data-testid="link">
        {label}
      </div>
    ),
    styles: {
      ActiveLink: 'ActiveLink',
      Link: 'Link',
      MobileWrapper: 'MobileWrapper',
      Wrapper: 'Wrapper',
    },
  };

  beforeEach(() => {
    Component = componentFactory(componentFactoryOptions);
    initialProps = {
      activeLetter: 'A',
      url: '/some-url',
      layout: ALPHABET_LAYOUT_MAIN,
    };
  });

  it('Should add MobileWrapper class if mobile layout is passed', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.layout = ALPHABET_LAYOUT_MOBILE;

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('wrapper').classList.contains('MobileWrapper'),
    ).toBeTruthy();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('wrapper').classList.contains('Wrapper'),
    ).not.toBeTruthy();
  });

  it('Should add Wrapper class if main layout is passed', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.layout = ALPHABET_LAYOUT_MAIN;

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('wrapper').classList.contains('Wrapper')).toBeTruthy();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('wrapper').classList.contains('MobileWrapper'),
    ).not.toBeTruthy();
  });

  it('Should render 26 links', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryAllByTestId } = render(<Component {...initialProps} />);

    expect(queryAllByTestId('link').length).toEqual(26);
  });

  it('Should have link with correct label', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryAllByTestId } = render(<Component {...initialProps} />);

    expect(queryAllByTestId('link')[0].innerHTML).toEqual('A');
  });

  it('Should have links with correct class', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryAllByTestId } = render(<Component {...initialProps} />);

    expect(
      queryAllByTestId('link')[0].classList.contains('ActiveLink'),
    ).toBeTruthy();
    expect(queryAllByTestId('link')[1].classList.contains('Link')).toBeTruthy();
  });
});
