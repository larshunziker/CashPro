/**
 * @file   MultiField factory test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2018-11-29 15:45:49
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

const componentFactoryOptions = {
  styles: {
    Wrapper: 'WrapperClassName',
    FieldWithHelperTextWrapper: 'FieldWithHelperTextWrapper',
    OptionWrapper: 'OptionWrapperClassName',
    Row: 'RowClassName',
    OptionsColumns: 'OptionsColumnsClassName',
    ActiveCheckbox: 'ActiveCheckboxClassName',
    LabelsColumns: 'LabelsColumnsClassName',
  },
  commonStyles: {
    Input: 'InputClassName',
    Option: 'OptionClassName',
    Labels: 'LabelsClassName',
    Required: 'RequiredClassName',
    Description: 'DescriptionClassName',
    HasError: 'HasErrorClassName',
    ErrorMessage: 'ErrorMessageClassName',
    HelperText: 'HelperText',
  },
};

let initialProps: Record<string, any> = {};
let Component: any = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    ...initialProps,
    errorMessage: JSON.stringify(mockData.input.requiredError),
    id: JSON.stringify(mockData.input.fieldName),
    options: JSON.parse(JSON.stringify(mockData.input.options)),
    required: JSON.stringify(mockData.input.required),
    register: () => null,
    type: JSON.stringify(mockData.input.type),
  };
});

describe('[Component] MultiField factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  test.each([
    {
      type: 'radios',
      title: 'Anrede',
      options: [
        {
          value: 'Frau',
          label: 'Frau',
          description: '',
        },
        {
          value: 'Herr',
          label: 'Herr',
          description: '',
        },
      ],
      register: () => null,
      required: true,
      requiredError: 'Bitte auswählen (there are only 2 genders)',
      fieldName: 'radio_buttons',
    },
    {
      type: 'checkboxes',
      title: 'Wählen Sie Ihren Newsletter:',
      options: [
        {
          value: 'Schweizer Illustrierte',
          label: 'Schweizer Illustrierte',
          description: '',
        },
        {
          value: 'Style',
          label: 'Style',
          description: '',
        },
      ],
      register: () => null,
      required: true,
      requiredError: 'Treffen Sie mind. eine Auswahl',
      fieldName: 'wahlen_sie_ihren_newsletter_',
    },
  ])('Should render correctly without the error message', (props) => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render checkboxes with an error message', () => {
    initialProps = {
      type: 'checkboxes',
      title: 'Wählen Sie Ihren Newsletter:',
      options: [
        {
          value: 'Schweizer Illustrierte',
          label: 'Schweizer Illustrierte',
          description: '',
        },
        {
          value: 'Style',
          label: 'Style',
          description: '',
        },
      ],
      register: () => null,
      required: true,
      requiredError: 'Treffen Sie mind. eine Auswahl',
      fieldName: 'wahlen_sie_ihren_newsletter_',
    };
    const { container } = render(<Component {...initialProps} />);

    const inputElement = container.querySelector('input');

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLInputElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(inputElement); // activate checkbox
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLInputElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(inputElement); // deactivate checkbox to trigger the error msg
    expect(container).toMatchSnapshot();
  });
});
