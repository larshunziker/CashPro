import React from 'react';
import { render } from '@testing-library/react';
import Component, { PersonPropsInner } from '../index';

jest.mock('../../../../../../../components/Picture', () => {
  return () => <div id="mocked-picture" />;
});

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
let initialProps: PersonPropsInner = {};

beforeEach(() => {
  // @ts-ignore
  initialProps = {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    title: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    lead: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Image'. */
    headerImage: null,
    styles: styles,
  };
});

describe('[Component] OverviewPageHeader - Person', () => {
  it('Should render nothing', () => {
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render component correctly', () => {
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';
    initialProps.headerImage = {
      file: {
        alt: 'test',
        relativeOriginPath: 'foo.jpg',
      },
    };
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );
    expect(container.innerHTML).not.toBe('');
    expect(queryByTestId('topic-page-header-person-wrapper')).not.toBeNull();
    expect(queryByTestId('topic-page-header-person-lead')).not.toBeNull();
  });

  it('Should not render component because of no title is given', () => {
    initialProps.lead = 'Some example lead text.';
    initialProps.headerImage = {
      file: {
        alt: 'test',
        relativeOriginPath: 'foo.jpg',
      },
    };
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );
    expect(container.innerHTML).toBe('');
    expect(queryByTestId('topic-page-header-person-wrapper')).toBeNull();
    expect(queryByTestId('topic-page-header-person-lead')).toBeNull();
  });

  it('Should not render component because of no image is given', () => {
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';

    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );
    expect(container.innerHTML).toBe('');
    expect(queryByTestId('topic-page-header-person-wrapper')).toBeNull();
    expect(queryByTestId('topic-page-header-person-lead')).toBeNull();
  });
});
