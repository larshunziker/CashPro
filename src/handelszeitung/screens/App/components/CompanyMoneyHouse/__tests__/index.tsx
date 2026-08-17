import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

const initialProps = {
  branch: 'some branch',
  uri: 'https://someurl.com',
  foundationDate: '2020-12-31T00:00:00',
  headquarter: 'HQ',
  legalForm: 'AG',
  companyDescription: 'some description',
  moneyHouseLink: 'https://someotherurl.comm',
  addClass: 'css-class',
};

describe('[Component] CompanyMoneyHouse', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('wrapper')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('wrapper').classList.contains('css-class'));
    expect(queryByTestId('branch')).not.toBeNull();
    expect(queryByTestId('foundation-date')).not.toBeNull();
    expect(queryByTestId('headquarter')).not.toBeNull();
    expect(queryByTestId('legalForm')).not.toBeNull();
    expect(queryByTestId('companyDescription')).not.toBeNull();
    expect(queryByTestId('moneyHouseLink')).not.toBeNull();
  });

  it('Does not render parts without data', () => {
    initialProps.addClass = '';
    initialProps.foundationDate = '';
    initialProps.headquarter = '';
    initialProps.legalForm = '';
    initialProps.companyDescription = '';
    initialProps.moneyHouseLink = '';
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('wrapper')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('wrapper').classList.contains('Wrapper'));
    expect(queryByTestId('foundation-date')).toBeNull();
    expect(queryByTestId('headquarter')).toBeNull();
    expect(queryByTestId('legalForm')).toBeNull();
    expect(queryByTestId('companyDescription')).toBeNull();
    expect(queryByTestId('moneyHouseLink')).toBeNull();
  });
  it('Does not render branch without data', () => {
    initialProps.branch = '';
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('branch')).toBeNull();
  });
});
