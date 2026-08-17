import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { routeInitialState } from '../../../../../../beobachter/shared/reducers/route';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from '../../../__tests__/mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'factoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
let factoryOptions;
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
const initialState = {
  window: windowState,
  route: {
    ...routeInitialState,
    clientUrl: 'https://develop.publication.ch',
  },
};

const ReduxWrapper = ({ children }: any) => {
  return <ReduxProvider initialState={initialState}>{children}</ReduxProvider>;
};

beforeEach(() => {
  factoryOptions = {
    renderTitleBadge: () => null,
    renderAuthorsAndDateElement: () => (
      <div className="AuthorsAndDateElement" />
    ),
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ renderTitleBadge */
    renderLeadAndSharePanel: () => <div className="LeadAndSharePanel" />,
    grid: {},
    styles: {
      ArticleImage: 'ArticleImageClass',
      ArticleImageCredit: 'ArticleImageCreditClass',
      ArticleLead: 'ArticleLeadClass',
      Caption: 'CaptionClass',
      CaptionWrapper: 'CaptionWrapperClass',
      Figure: 'FigureClass',
      OverlappingTextWrapper: 'OverlappingTextWrapperClass',
      OverlappingText: 'OverlappingTextClass',
      SharePanel: 'SharePanel',
      TeaserWrapper: 'TeaserWrapperClass',
      Title: 'TitleClass',
      Wrapper: 'WrapperClass',
    },
  };

  Component = componentFactory(factoryOptions);

  initialProps = {
    windowState: windowState,
    node: mockData.node,
  };
});

describe('[Common] LongReadHeader factory', () => {
  it('Should return component from factory', () => {
    expect(
      <ReduxWrapper>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </ReduxWrapper>,
    ).not.toBeNull();
  });

  it('Should render nothing when no node is given', () => {
    const { container } = render(
      <ReduxWrapper>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component />
        </HelmetProvider>
      </ReduxWrapper>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <ReduxWrapper>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxWrapper>,
    );

    expect(queryByTestId('longreadheader-authordate-wrapper')).not.toBeNull();
    expect(queryByTestId('longreadheader-imagecredit-wrapper')).not.toBeNull();
    expect(queryByTestId('longreadheader-imagecaption-wrapper')).not.toBeNull();
  });

  it('Should not render image credit and image caption', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.heroImageBody = [{ image: { credit: '', caption: '' } }];

    const { queryByTestId } = render(
      <ReduxWrapper>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxWrapper>,
    );

    expect(queryByTestId('longreadheader-imagecredit-wrapper')).toBeNull();
    expect(queryByTestId('longreadheader-imagecaption-wrapper')).toBeNull();
  });

  it('Should not render author section', () => {
    initialProps = {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      ...initialProps,
      node: (mockData.node.teaserImage.image.file.relativeOriginPath = ''),
    };
    /* @ts-ignore TODO: TS7005 ->  Variable 'factoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(factoryOptions);

    const { queryByTestId } = render(
      <ReduxWrapper>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxWrapper>,
    );

    expect(queryByTestId('longreadheader-authordate-wrapper')).toBeNull();
  });
});
