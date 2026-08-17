import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockdata.json';

describe('[Common] RelatedContent', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
  let Component;
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps;
  /* @ts-ignore TODO: TS7034 ->  Variable 'componentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
  let componentFactoryOptions;

  beforeEach(() => {
    initialProps = {
      getGridOptions: jest.fn(),
      gridOptionType: 'title',
      itemCount: 1,
      title: 'Test title',
      relatedContent: mockData,
      outerWrapperClass: 'outer-wrapper-class',
      page: 1,
      pageSize: 2,
      pagerType: '?',
      hasContainer: true,
      windowState: {},
    };
    componentFactoryOptions = {
      styles: {
        OuterWrapper: 'OuterWrapper',
        Wrapper: 'Wrapper',
        TitleWrapper: 'TitleWrapper',
        Title: 'Title',
        TeaserListSpacing: 'TeaserListSpacing',
        Container: 'Container',
      },
      teaserGrid: () => <div className="TeaserGrid" />,
      Pager: () => <div className="Pager" />,
    };
    Component = componentFactory(componentFactoryOptions);
  });

  it('Should render everything', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).not.toBeNull;
    expect(queryByTestId('teaser-list-wrapper')).not.toBeNull;
    expect(queryByTestId('pager-wrapper')).not.toBeNull;
  });

  it('Should not render anything', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.relatedContent = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).toBeNull;
  });

  it('Should not render title if title prop is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.title = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('title')).toBeNull;
  });

  it('Should not render title if gridOptionType prop is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.gridOptionType = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('title')).toBeNull;
  });

  test.each([
    /* @ts-ignore TODO: TS2698 ->  Spread types may only be created from object types. */
    { ...initialProps, pageSize: null },
    /* @ts-ignore TODO: TS2698 ->  Spread types may only be created from object types. */
    { ...initialProps, page: null },
    /* @ts-ignore TODO: TS2698 ->  Spread types may only be created from object types. */
    { ...initialProps, pagerType: null },
  ])('Should not render pager if necessary props are empty', (props) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    componentFactoryOptions.Pager = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(componentFactoryOptions);

    const { queryByTestId } = render(<Component {...props} />);

    expect(queryByTestId('pager-wrapper')).toBeNull;
  });

  it('Should not render pager if Pager is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('pager-wrapper')).toBeNull;
  });
});
