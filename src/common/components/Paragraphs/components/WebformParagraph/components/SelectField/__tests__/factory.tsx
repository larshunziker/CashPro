/**
 * @file   SelectField factory test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2018-11-30 15:50:16
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

const componentFactoryOptions = {
  Icon: () => <div data-testid="selectfield-factory-icon" />,
  IconTypes: {
    arrowUpIconType: 'arrowUpIcon',
    arrowDownIconType: 'arrowDownIcon',
  },
  styles: {
    Wrapper: 'WrapperClassName',
    SelectField: 'SelectFieldClassName',
    SelectFieldMobile: 'SelectFieldMobileClassName',
    SelectFieldIcon: 'SelectFieldIconClassName',
    OptionItemsWrapper: 'OptionItemsWrapperClassName',
    OptionItem: 'OptionItemClassName',
  },
  commonStyles: {
    Wrapper: 'Wrapper',
    FieldWithHelperTextWrapper: 'FieldWithHelperTextWrapper',
    HasError: 'HasErrorClassName',
    ErrorMessage: 'ErrorMessageClassName',
    HelperText: 'HelperText',
  },
};

let initialProps: any = {};
let Component: any = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    ...initialProps,
    errorMessage: JSON.stringify(mockData.input.required_error),
    id: mockData.input.fieldName,
    options: JSON.parse(JSON.stringify(mockData.input.options)),
    label: mockData.input.title,
    required: JSON.stringify(mockData.input.required),
    register: () => null,
    viewportLabel: 'viewport/xl',
  };
});

describe('[Component] MultiField factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  test.each(['viewport/xs', 'viewport/xl'])(
    'Should render selectfield correctly on %s',
    (viewport) => {
      initialProps.viewportLabel = viewport;
      const { container } = render(<Component {...initialProps} />);

      expect(container).toMatchSnapshot();
    },
  );

  it('Should render selectfield with an error message on viewport/xs', () => {
    initialProps.viewportLabel = 'viewport/xs';
    const { container } = render(<Component {...initialProps} />);

    const inputElement = container.querySelector('select');

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLSelectElement | null' is not assignable to parameter of type 'Window | Document | Node | Element' */
    fireEvent.change(inputElement, { target: { value: 'falsy value' } });
    expect(container).toMatchSnapshot();
  });

  it('Should render selectfield and open the custom dropdown on viewport/xl', () => {
    initialProps.viewportLabel = 'viewport/xl';
    const { container } = render(<Component {...initialProps} />);

    const inputElement = container.querySelector('a');

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLAnchorElement | null' is not assignable to parameter of type 'Window | Document | Node | Element' */
    fireEvent.click(inputElement);
    expect(container).toMatchSnapshot();
  });
});
