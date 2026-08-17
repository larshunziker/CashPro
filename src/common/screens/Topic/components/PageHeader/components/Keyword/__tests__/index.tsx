import React from 'react';
import { render } from '@testing-library/react';
import Component, { KeywordPropsInner } from '../index';

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
let initialProps: KeywordPropsInner = {};

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

describe('[Component] TopicPageHeader - Keyword', () => {
  it('Should render nothing', () => {
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
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
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should not render component because no title is given', () => {
    initialProps.lead = 'Some example lead text.';
    initialProps.headerImage = {
      file: {
        alt: 'test',
        relativeOriginPath: 'foo.jpg',
      },
    };
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should not render component because no image is given', () => {
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';

    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });
});
