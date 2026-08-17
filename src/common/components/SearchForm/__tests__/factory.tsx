import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';

const componentFactoryOptions = {
  Icon: () => <div data-testid="searchform-factory-icon" />,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  withRouter: (Component) => (props) => <Component {...props} router={null} />,
  Autocomplete: () => <div data-testid="searchform-factory-autocomplete" />,
  IconTypes: {
    closeIconType: 'closeIcon',
    submitIconType: 'submitIcon',
  },
  styles: {
    Wrapper: 'WrapperClassName',
    InputWrapper: 'InputWrapperClassName',
    Input: 'InputClassName',
    SubmitButton: 'SubmitButtonClassName',
    SubmitButtonActive: 'SubmitButtonActiveClassName',
    SubmitIcon: 'SubmitIconClassName',
    ResetIcon: 'ResetIconClassName',
  },
};

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
let Component: any = null;

beforeEach(() => {
  // @ts-ignore
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    menuCloseHandler: () => null,
    initialQuery: '',
    router: {
      push: () => null,
    },
  };
});

describe('[Component] SearchForm', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.focusOnMount = true;
    const { container, queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(container).not.toBe('');
    expect(queryByTestId('searchform-factory-submit-button')).not.toBeNull();
  });

  it('Should use shouldComponentUpdate lifecycle and update initialQuery', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.initialQuery = 'initial search query';
    const { container, rerender } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    const inputElement = container.querySelector('input');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    expect(inputElement.value).toEqual(initialProps.initialQuery);

    const updatedQuery = 'updated search query';

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.initialQuery = updatedQuery;
    rerender(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(inputElement.value).toEqual(updatedQuery);
  });

  it('Should render correctly and update/reset the input query', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.focusOnMount = true;
    const { container, queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );

    const inputElement = container.querySelector('input');
    const inputText = 'test query';

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLInputElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.change(inputElement, { target: { value: inputText } });

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(inputElement.value).toEqual(inputText);

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(queryByTestId('searchform-factory-reset-button'));

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(inputElement.value).toEqual('');
  });

  it('Should render correctly, set the input query and submit the form', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.focusOnMount = true;
    const { container, queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );

    const inputElement = container.querySelector('input');
    const inputText = 'test query';
    const spy = jest.spyOn(console, 'log');

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLInputElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.change(inputElement, { target: { value: inputText } });

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(inputElement.value).toEqual(inputText);

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(queryByTestId('searchform-factory-submit-button'));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
