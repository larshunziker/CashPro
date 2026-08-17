import { cleanup, render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import mockData from './mockdata.json';

const componentFactoryOptions = {
  prefix: 'Quelle:',
  styles: {
    Wrapper: 'ClassNameWrapper',
    CreditWrapper: 'ClassNameCreditWrapper',
    Credit: 'ClassNameCredit',
  },
};
const initialProps = JSON.parse(JSON.stringify(mockData));
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

afterEach(cleanup);

describe('[Common] ImageCaption', () => {
  test('Should return component from factory', () => {
    Component = componentFactory(componentFactoryOptions);
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps} />,
    );
    expect(queryByTestId('image-caption-credit')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render without credit', () => {
    initialProps.credit = null;
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps} />,
    );
    expect(queryByTestId('image-caption-credit')).toBeNull();
    expect(container).toMatchSnapshot();
  });
});
