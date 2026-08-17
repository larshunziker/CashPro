import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import InputField from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    id: 'name',
    placeholder: 'Test placeholder',
    required: false,
    animated: false,
    hasError: false,
    validate: jest.fn(),
    setValues: jest.fn(),
    values: { name: '' },
    errorMessage: null,
  };
});

describe('[Component] InputField', () => {
  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<InputField {...initialProps} />);

    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toBeTruthy();
  });

  it('Should display error message', () => {
    const errorMessage = 'ERROR';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.hasError = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.errorMessage = errorMessage;

    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <InputField {...initialProps} />,
    );

    expect(container).toMatchSnapshot();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('input-field-error-message').innerHTML).toEqual(
      errorMessage,
    );
  });

  it('Should render placeholder instead of error message', () => {
    const errorPlaceholder = 'ERROR PLACEHOLDER';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.hasError = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.placeholder = errorPlaceholder;

    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <InputField {...initialProps} />,
    );

    expect(container).toMatchSnapshot();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('input-field-error-message').innerHTML).toEqual(
      errorPlaceholder,
    );
  });

  test.each([
    ['checkbox'],
    ['radio'],
    ['textfield'],
    ['textarea'],
    ['email'],
    ['number'],
    ['date'],
    ['hidden'],
  ])('Should render a %s input field', (type) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.type = type;

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<InputField {...initialProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render animated label', () => {
    const animatedLabel = 'ANIMATED LABEL';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.animated = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.placeholder = animatedLabel;

    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <InputField {...initialProps} />,
    );

    expect(container).toMatchSnapshot();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('input-field-animated-label').innerHTML).toEqual(
      animatedLabel,
    );
  });

  it('Should render animated label with * required indicator', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.animated = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.required = true;

    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <InputField {...initialProps} />,
    );

    expect(container).toMatchSnapshot();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('input-field-animated-label').innerHTML.indexOf('*'),
    ).toBeGreaterThan(-1);
  });

  it('Should call validate on focusOut and setValues on change - textfield', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.type = 'textfield';

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<InputField {...initialProps} />);
    const inputEl = container.querySelector('input') as HTMLInputElement;
    act(() => inputEl.focus());
    fireEvent.focusOut(inputEl, { target: { value: 'test' } });
    fireEvent.change(inputEl, { target: { value: 'changed' } });

    expect(container).toMatchSnapshot();
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    expect(initialProps.validate).toHaveBeenCalledTimes(1);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    expect(initialProps.setValues).toHaveBeenCalledTimes(1);
  });

  it('Should call validate on focusOut and setValues on change - textarea', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.type = 'textarea';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.placeholder;

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<InputField {...initialProps} />);
    const textAreaEl = container.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;
    act(() => textAreaEl.focus());
    fireEvent.focusOut(textAreaEl, { target: { value: 'test' } });
    fireEvent.change(textAreaEl, { target: { value: 'change' } });

    expect(container).toMatchSnapshot();
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    expect(initialProps.validate).toHaveBeenCalledTimes(1);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    expect(initialProps.setValues).toHaveBeenCalledTimes(1);
  });
});
