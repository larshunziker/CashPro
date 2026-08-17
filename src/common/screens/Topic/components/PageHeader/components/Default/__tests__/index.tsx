import React from 'react';
import { render } from '@testing-library/react';
import Component, { DefaultPropsInner } from '../index';

const styles = {
  WrapperDefault: '',
  WrapperKeyword: '',
  WrapperPerson: '',
  HeaderWrapperKeyword: '',
  HeaderWrapperDefault: '',
  HeaderWrapperPerson: '',
  HeaderDefault: '',
  HeaderKeyword: '',
  HeaderPerson: '',
  HeaderImageWrapper: '',
  HeaderImageKeyword: '',
  HeaderImagePerson: '',
  HeaderImageWrapperInner: '',
  SubscribeButtonWrapperDefault: '',
  SubscribeButtonWrapperPerson: '',
  SubscribeButtonWrapperKeyword: '',
  LeadKeyword: '',
  LeadDefault: '',
  LeadPerson: '',
};

// @ts-ignore
let initialProps: DefaultPropsInner = {};

beforeEach(() => {
  // @ts-ignore
  initialProps = {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    title: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    lead: null,
    styles: styles,
  };
});

describe('[Component] OverviewPageHeader - Default', () => {
  it('Should render nothing', () => {
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render component correctly', () => {
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );

    expect(container.innerHTML).not.toBe('');
    expect(queryByTestId('topic-page-header-default-wrapper')).not.toBeNull();
    expect(queryByTestId('topic-page-header-default-lead')).not.toBeNull();
  });
});
