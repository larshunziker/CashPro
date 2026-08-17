/**
 * @file   InputField factory test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2018-11-29 15:45:49
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

jest.mock('react-textarea-autosize', () => {
  return () => {
    return <div />;
  };
});

const componentFactoryOptions = {
  styles: {
    Label: 'LabelClassName',
    LabelAbove: 'LabelAboveClassName',
    LabelInside: 'LabelInsideClassName',
    ActiveCheckbox: 'ActiveCheckboxClassName',
    TextareaLabel: 'TextareaLabelClassName',
    Row: 'RowClassName',
    Columns: 'ColumnsClassName',
    LabelsColumns: 'LabelsColumnsClassName',
    InputDateWrapper: 'InputDateWrapperClassName',
    InputDateTransparentText: 'InputDateTransparentTextClassName',
  },
  commonStyles: {
    Wrapper: 'WrapperClassName',
    FieldWithHelperTextWrapper: 'FieldWithHelperTextWrapper',
    HasError: 'HasErrorClassName',
    Textarea: 'TextareaClassName',
    OptionWrapper: 'OptionWrapperClassName',
    Option: 'OptionClassName',
    Input: 'InputClassName',
    Labels: 'LabelsClassName',
    Required: 'RequiredClassName',
    Description: 'DescriptionClassName',
    ErrorMessage: 'ErrorMessageClassName',
    HelperText: 'HelperText',
    HelperCheckboxText: 'HelperCheckboxText',
  },
};

// @ts-ignore
let initialProps: InputFieldProps = {};
let Component: any = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    ...initialProps,
    errorMessage: JSON.stringify(mockData.input.required_error),
    disabled: false,
    id: JSON.stringify(mockData.input.fieldName),
    label: JSON.stringify(mockData.input.title),
    required: JSON.stringify(mockData.input.required),
    register: () => null,
    type: JSON.stringify(mockData.input.type),
    hasError: false,
  };
});

describe('[Component] InputField factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  test.each([
    ['checkbox'],
    ['textfield'],
    ['textarea'],
    ['email'],
    ['number'],
    ['date'],
    ['hidden'],
  ])('Should render a %s input field', (type) => {
    initialProps.type = type;

    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  test.each([
    { zipCode: '-1', isOK: false },
    { zipCode: '0', isOK: false },
    { zipCode: '-9999', isOK: false },
    { zipCode: '00000', isOK: false },
    { zipCode: '99999', isOK: false },
    { zipCode: '10000', isOK: false },
    { zipCode: '1e3', isOK: false }, // exp
    { zipCode: '2.34e3', isOK: false }, // exp
    { zipCode: '1111101000', isOK: false }, // bin
    { zipCode: '3E8', isOK: false }, // hex

    { zipCode: '0001', isOK: true },
    { zipCode: '1111', isOK: true },
    { zipCode: '9998', isOK: true },
    { zipCode: '9999', isOK: true },
  ])(
    'Should render a zipcode input field and validate it',
    ({ zipCode, isOK }) => {
      initialProps.type = 'number';
      initialProps.id = 'zipcode';
      initialProps.errorMessage = 'Bitte eine gültige PLZ angeben';

      const { container, queryByTestId } = render(
        <Component {...initialProps} />,
      );

      const inputElement = container.querySelector(
        `input[name="${initialProps.id}"]`,
      ) as HTMLInputElement;

      inputElement.select();

      fireEvent.blur(inputElement, { target: { value: zipCode } });

      expect(inputElement.value).toBe(zipCode);

      const errorMessageElement = queryByTestId('inputfield-error-message');

      if (!isOK) {
        expect(errorMessageElement).not.toBeNull();
        // @ts-ignore
        expect(errorMessageElement).toHaveTextContent(
          initialProps.errorMessage,
        );
      } else {
        expect(errorMessageElement);
      }
    },
  );

  it('Should render a email input field and validate it', () => {
    initialProps.type = 'email';
    initialProps.errorMessage = 'Bitte eine gültige E-Mail Adresse angeben';
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );

    const inputElement = container.querySelector(
      'input[type="email"]',
    ) as HTMLInputElement;
    const falsyEmail = 'falsy email address';

    inputElement.select();

    fireEvent.blur(inputElement, { target: { value: falsyEmail } });

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('inputfield-error-message').innerHTML).toBe(
      initialProps.errorMessage,
    );
    expect(inputElement.value).toBe(falsyEmail);
  });

  it('Should render a date input field and validate it', () => {
    initialProps.type = 'date';
    initialProps.errorMessage = 'Bitte eine gültige E-Mail Adresse angeben';
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );

    const inputElement = container.querySelector(
      'input[type="date"]',
    ) as HTMLInputElement;
    const falsyDate = '2018-12-12';

    inputElement.select();

    fireEvent.change(inputElement, { target: { value: falsyDate } });

    expect(queryByTestId('inputfield-error-message')).toBeNull();
    expect(inputElement.value).toBe(falsyDate);
  });

  it('Should validate form input with regex pattern from props, input should contain the word "hello"', () => {
    initialProps.type = 'textfield';
    initialProps.pattern = 'hallo';
    initialProps.errorMessage = 'Eingabe ungültig!';
    const { container } = render(<Component {...initialProps} />);

    const inputElement = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    const inputString = 'hello my name is test';

    inputElement.select();

    fireEvent.change(inputElement, { target: { value: inputString } });

    expect(inputElement.value).toBe(inputString);
  });

  it('Should display error message after onBlur is fired', () => {
    initialProps.type = 'textfield';
    initialProps.errorMessage = 'Eingabe ungültig!';
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );

    const inputElement = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    inputElement.focus();
    inputElement.select();
    inputElement.blur();

    fireEvent.focusOut(inputElement, { target: { value: 'falsy email' } });

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('inputfield-error-message').innerHTML).toBe(
      initialProps.errorMessage,
    );
  });
});
