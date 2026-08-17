import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { authInitialState } from '../../../../../../shared/reducers/auth';
import { initialState as pianoInitialState } from '../../../../../../shared/reducers/piano';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import ComponentInner from '../index';
import articleDefaultMock from './mockData.json';
import { ARTICLE_TYPE_GUIDE } from '../../../../../../shared/constants/content';

jest.mock('../../../components/UtilityBar');
jest.mock('../../../components/UtilityBar/components/UtilityOverlay');
jest.mock('../components/TableOfContents', () => {
  return () => {
    return null;
  };
});

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(articleDefaultMock));
  initialState = {
    auth: authInitialState,
    piano: pianoInitialState,
  };
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Component = (props) => (
  <HelmetProvider>
    <ComponentInner {...props} />
  </HelmetProvider>
);

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

describe('[Component] ArticlePage', () => {
  it('Should not render nothing', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          <Component location={null} article={{}} />
        </MockedProvider>
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly when user hasSubscriptions', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.hasSubscriptions = true;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-wrapper')).not.toBeNull();
    expect(queryByTestId('articlepage-paragraphs')).not.toBeNull();
  });

  it('Should correctly render guide article type, with navigation and button to top', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.hasSubscriptions = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.piano.isAccessGranted = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.subtypeValue = ARTICLE_TYPE_GUIDE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.body[0].header = 'article header';
    const { queryByTestId, queryAllByTestId, queryByLabelText, container } =
      render(
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>,
      );
    expect(queryByTestId('articlepage-guide-wrapper')).toBeTruthy();
    expect(queryByLabelText('Nach oben')).toBeTruthy();
    expect(queryAllByTestId('table-of-contents-wrapper').length).toBe(2);

    expect(container).toMatchSnapshot();
  });

  it('Should render piano template if user has no subscription', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.hasSubscriptions = false;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.subtypeValue = ARTICLE_TYPE_GUIDE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.body[0].header = 'article header';
    const { queryByTestId, queryAllByTestId, queryByLabelText, container } =
      render(
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>,
      );
    expect(queryByTestId('articlepage-guide-wrapper')).toBeTruthy();
    expect(queryByLabelText('Nach oben')).toBeTruthy();
    expect(queryAllByTestId('table-of-contents-wrapper').length).toBe(2);

    expect(container).toMatchSnapshot();
  });

  it('Should render piano template if user has no granted piano access', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.piano.isAccessGranted = false;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.subtypeValue = ARTICLE_TYPE_GUIDE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.body[0].header = 'article header';
    const { queryByTestId, queryAllByTestId, queryByLabelText, container } =
      render(
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>,
      );
    expect(queryByTestId('articlepage-guide-wrapper')).toBeTruthy();
    expect(queryByLabelText('Nach oben')).toBeTruthy();
    expect(queryAllByTestId('table-of-contents-wrapper').length).toBe(2);

    expect(container).toMatchSnapshot();
  });

  it('Should not render navigation and button to top, when article is not guide type', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.hasSubscriptions = true;
    const { queryByTestId, queryByLabelText } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-guide-wrapper')).toBeNull();
    expect(queryByLabelText('Nach oben')).toBeNull();
    expect(queryByTestId('table-of-contents-wrapper')).toBeNull();
  });

  it('Should render authors teasers below article content', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.hasSubscriptions = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.piano.isAccessGranted = true;
    const { queryByTestId, container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-authors-teasers')).toBeTruthy();

    expect(container).toMatchSnapshot();
  });

  it('Should not render authors teasers below article content (no authors)', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.hasSubscriptions = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.piano.isAccessGranted = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.authors = null;

    const { queryByTestId, container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-authors-teasers')).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('Should not render authors teasers below article content (no authors with profile page)', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.hasSubscriptions = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.piano.isAccessGranted = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.authors.edges.forEach(
      /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
      ({ node }) => (node.hasProfilePage = false),
    );

    const { queryByTestId, container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-authors-teasers')).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('Should not render authors teasers below article content (paywall is shown)', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.hasSubscriptions = false;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.piano.isAccessGranted = false;

    const { queryByTestId, container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-authors-teasers')).toBeNull();

    expect(container).toMatchSnapshot();
  });
});
