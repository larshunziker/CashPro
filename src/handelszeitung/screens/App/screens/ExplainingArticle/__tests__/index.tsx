import React from 'react';
import { cleanup, waitFor } from '@testing-library/react';
import Component from '../index';
import { render } from '../../../../../shared/customRenderer';
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';

jest.mock('UtilityBar', () => {
  return () => {
    return null;
  };
});
jest.mock('UtilityBar/components/UtilityOverlay', () => {
  return () => {
    return null;
  };
});

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    article: mockData.article,
  };
});
afterEach(cleanup);

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const mockedComponent = (props) => (
  <MockedProvider>
    <Component {...props} />
  </MockedProvider>
);

describe('[Screen] Explaining Article', () => {
  it('Should render nothing when no data is given ', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(mockedComponent(initialProps));
    await waitFor(() => expect(container.innerHTML).toBe(''));
  });

  it('Should render nothing when empty object is given', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article = {};
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(mockedComponent(initialProps));
    await waitFor(() => expect(container.innerHTML).toBe(''));
  });

  it('Should render correctly when all data is given', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(initialProps));
    await waitFor(() => {
      expect(queryByTestId('explaining-article-breadcrumbs')).not.toBeNull();
      expect(queryByTestId('explaining-article-wrapper')).not.toBeNull();
      expect(queryByTestId('explaining-article-header-wrapper')).not.toBeNull();
      expect(
        queryByTestId('explaining-article-related-content'),
      ).not.toBeNull();
      expect(
        queryByTestId('explaining-article-term-occurrences'),
      ).not.toBeNull();
    });
  });

  it('Should render correctly even if no article title is given', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.title = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(initialProps));
    await waitFor(() => {
      expect(queryByTestId('explaining-article-breadcrumbs')).not.toBeNull();
      expect(queryByTestId('explaining-article-wrapper')).not.toBeNull();
      expect(queryByTestId('explaining-article-header-wrapper')).not.toBeNull();
      expect(
        queryByTestId('explaining-article-related-content'),
      ).not.toBeNull();
      expect(queryByTestId('explaining-article-term-occurrences')).toBeNull();
    });
  });

  it('Should render no related content when no content is given', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article = { ...mockData.article };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.relatedArticles.edges = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(initialProps));
    await waitFor(() =>
      expect(queryByTestId('explaining-article-related-content')).toBeNull(),
    );
  });

  it('Should render no related content when no related articles given', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article = { ...mockData.article };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.relatedArticles = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(initialProps));
    await waitFor(() =>
      expect(queryByTestId('explaining-article-related-content')).toBeNull(),
    );
  });

  it('Should render no sections when content is null', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.sections = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(initialProps));
    await waitFor(() =>
      expect(queryByTestId('explaining-article-section')).toBeNull(),
    );
  });

  it('Should render no sections when no content is given', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.sections = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.category = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.metaDescription = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(initialProps));
    await waitFor(() =>
      expect(queryByTestId('explaining-article-section')).toBeNull(),
    );
  });
});
