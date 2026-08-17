import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import { BirthdayFieldProps } from '../typings';

const componentFactoryOptions = {
  styles: {
    Label: 'LabelClassName',
    LabelAbove: 'LabelAboveClassName',
    LabelInside: 'LabelInsideClassName',
    HasError: 'HasError',
  },
  commonStyles: {
    Wrapper: 'WrapperClassName',
    FieldWithHelperTextWrapper: 'FieldWithHelperTextWrapper',
    HasError: 'HasErrorClassName',
    Input: 'InputClassName',
    Labels: 'LabelsClassName',
    Required: 'RequiredClassName',
    Description: 'DescriptionClassName',
    ErrorMessage: 'ErrorMessageClassName',
    HelperText: 'HelperText',
  },
};

const initialProps: BirthdayFieldProps = {
  errorMessage: JSON.stringify(mockData.input.required_error),
  id: JSON.stringify(mockData.input.fieldName),
  label: JSON.stringify(mockData.input.title),
  required: !!JSON.stringify(mockData.input.required),
  register: () => null,
  fieldName: 'birthday_field',
  value: '',
  type: 'date',
  title: 'Geburtstag',
  validate: () => true,
  getId: () => JSON.stringify(mockData.input.fieldName),
  getValue: () => '',
};
let Component: any = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] BirthdayField factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render an input field, validate the date and show error message if falsy', () => {
    initialProps.errorMessage = 'Bitte ein gültiges Datum angeben';
    const { container } = render(<Component {...initialProps} />);

    const inputElement = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    const falsyDate = 'abcdefgh';

    inputElement.select();

    act(() => {
      fireEvent.blur(inputElement, { target: { value: falsyDate } });
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render an input field and autoformat the date (autofill cases)', () => {
    initialProps.errorMessage = 'Bitte ein gültiges Datum angeben';
    const { container } = render(<Component {...initialProps} />);

    const inputElement = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    inputElement.select();

    [
      '2018/12/31',
      '2018-12-31',
      '2018.12.31',
      '31/12/2018',
      '31-12-2018',
      '31.12.2018',
    ].forEach((birthday) => {
      act(() => {
        fireEvent.input(inputElement, { target: { value: birthday } });
      });
      expect(inputElement.value).toBe('31.12.2018');
    });
  });

  it('Should handle leap days correctly', () => {
    initialProps.errorMessage = 'Bitte ein gültiges Datum angeben';
    const { container } = render(<Component {...initialProps} />);

    const inputElement = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    inputElement.select();

    [
      '2018/02/30',
      '2018-02-29',
      '2018.02.31',
      '28.02.2018',
      '29.02.2018',
      '31.02.2018',
    ].forEach((birthday) => {
      act(() => {
        fireEvent.input(inputElement, { target: { value: birthday } });
      });
      expect(inputElement.value).toBe('28.02.2018');
    });
  });
});
