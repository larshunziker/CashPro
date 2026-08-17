import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

describe('[Common] TermsOverview', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
  let Component;
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps;
  /* @ts-ignore TODO: TS7034 ->  Variable 'componentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
  let componentFactoryOptions;

  beforeEach(() => {
    componentFactoryOptions = {
      AlphabeticNavigation: () => <div className="AlphabeticNavigation" />,
      Breadcrumbs: null,
      styles: {
        BreadcrumbsSection: 'BreadcrumbsSection',
        Container: 'Container',
        Divider: 'Divider',
        DividerInnerWrapper: 'DividerInnerWrapper',
        DividerWrapper: 'DividerWrapper',
        Title: 'Title',
        TitleInnerWrapper: 'TitleInnerWrapper',
        TitleWrapper: 'TitleWrapper',
        Wrapper: 'Wrapper',
      },
    };
    initialProps = {
      activeLetter: 'A',
      breadcrumbItems: null,
      enableOverlay: true,
      lettersUrl: '/some-url',
      showDivider: false,
      title: 'Some title',
    };
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ AlphabeticNavigation */
    Component = componentFactory(componentFactoryOptions);
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).not.toBeNull;
  });

  it('Should not render if title or activeletter are empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.title = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.activeLetter = '';

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).toBeNull;
  });

  it('Should render breadcrumbs', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    componentFactoryOptions.Breadcrumbs = <div className="Breadcrumbs" />;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.breadcrumbItems = {
      edges: [
        {
          node: {
            label: 'Label',
            link: '/link',
          },
        },
      ],
    };
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(componentFactoryOptions);

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('breadcrumbs-wrapper')).not.toBeNull;
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('breadcrumbs-wrapper').innerHTML).toEqual(
      '<div class="Breadcrumbs"></div>',
    );
  });

  it('Should render alphabetic navigation', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('alphabetic-navigation-wrapper')).not.toBeNull;
  });

  it('Should render title with active letter', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('title-wrapper').innerHTML).toEqual('Some title: A');
  });

  it('Should render divider', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.showDivider = true;

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('divider')).not.toBeNull;
  });
});
