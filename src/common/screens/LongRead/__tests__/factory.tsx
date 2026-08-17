import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import type { LongReadFactoryOptions } from '../typings';

let factoryOptions: LongReadFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

const windowState: WindowState = {
  height: 886,
  viewport: {
    label: 'viewport/xl',
    from: 960,
    to: 1599,
  },
  width: 1038,
  imageBreakpoint: {
    label: '1680',
    from: 960,
    to: 1599,
  },
};

beforeEach(() => {
  factoryOptions = {
    styles: {
      InnerTop: 'InnerTopClass',
      OuterWrapper: 'OuterWrapperClass',
      ParagraphWrapper: 'ParagraphWrapperClass',
      SectionGreyLongread: 'SectionGreyLongreadClass',
      TextParagraphHeader: 'TextParagraphHeaderClass',
      Wrapper: 'WrapperClass',
      Section: 'SectionClass',
    },
    ArticleFooter: () => <div className="ArticleFooter" />,
    ensureTeaserInterface: () => null,
    gridLayout: 'Test',
    getHelmetMetaLink: () => null,
    Helmet: () => null,
    LongReadHeader: () => <div className="LongReadHeader" />,
    StatusPage: () => <div className="StatusPage" />,
    Pager: () => <div className="Pager" />,
    topPagerType: 'test',
    bottomPagerType: 'pagerType',
    Paragraphs: () => <div className="Paragraph" />,
    RelatedContent: () => <div className="RelatedContent" />,
    articleColStyle: 'articleColStyle',
    pagerColStyle: 'pagerColStyle',
  };

  Component = componentFactory(factoryOptions);

  initialProps = {
    windowState: windowState,
    node: JSON.parse(JSON.stringify(mockData.node)),
    page: 1,
  };
});

describe('[Common] LongRead factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render not found screen if page does not exist', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.page = 30;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('longread-notfound-wrapper')).not.toBeNull();
    expect(queryByTestId('longread-wrapper')).toBeNull();
  });

  it('Should render long read with one section correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('longread-wrapper')).not.toBeNull();
    expect(queryByTestId('longread-paragraphs-wrapper')).not.toBeNull();
    expect(queryByTestId('longread-channelarticles-wrapper')).not.toBeNull();

    expect(queryByTestId('longread-notfound-wrapper')).toBeNull();
    expect(queryByTestId('longread-pager-wrapper')).toBeNull();
    expect(queryByTestId('longread-pager-2-wrapper')).toBeNull();
  });

  it('Should render long read with multiple sections correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.body[2] = initialProps.node.body[1];
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.body[3] = initialProps.node.body[1];
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.page = 2;

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('longread-wrapper')).not.toBeNull();
    expect(queryByTestId('longread-pager-wrapper')).not.toBeNull();
    expect(queryByTestId('longread-pager-2-wrapper')).not.toBeNull();
    expect(queryByTestId('longread-paragraphs-wrapper')).not.toBeNull();
    expect(queryByTestId('longread-footer-wrapper')).not.toBeNull();
    expect(queryByTestId('longread-channelarticles-wrapper')).toBeNull();
  });

  it('Should not render footer if there are no keywords', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.node.keywords;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('longread-footer-wrapper')).toBeNull();
  });

  it('Should not render relatedArticles section when there are no channel articles', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.node.channel.articles;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('longread-channelarticles-wrapper')).toBeNull();
  });
});
