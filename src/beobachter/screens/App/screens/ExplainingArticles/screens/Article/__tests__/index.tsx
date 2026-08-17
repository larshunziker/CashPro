import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { cleanup, render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import MockedProvider from '../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';

jest.mock('../../../../../components/AlphabeticNavigation');
jest.mock('../../../../../components/AppNexus');
jest.mock('../../../../../components/AuthorDateBlock');
jest.mock('../../../../../components/Paragraphs/components/ParagraphsRenderer');
jest.mock('../../../../Article/components/RelatedArticlesSection');
jest.mock('../../../../../components/UtilityBar');
jest.mock('../../../../../components/UtilityBar/components/UtilityOverlay');

let initialProps = {};

beforeEach(() => {
  initialProps = {
    article: mockData.article,
  };
});
afterEach(cleanup);

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const mockedComponent = (props) => (
  <MockedProvider>
    <ReduxProvider>
      <HelmetProvider>
        <Component {...props} />
      </HelmetProvider>
    </ReduxProvider>
  </MockedProvider>
);

describe('[Screen] Onmeda Article', () => {
  it('Should render nothing when no data is given ', () => {
    // @ts-ignore
    initialProps.article = null;
    const { queryByTestId } = render(mockedComponent(initialProps));

    expect(queryByTestId('onmeda-article')).toBeNull();
  });
  it('Should render correctly', () => {
    const { queryByTestId, queryAllByTestId } = render(
      mockedComponent(initialProps),
    );

    expect(queryByTestId('onmeda-not-found')).toBeNull();
    expect(queryByTestId('onmeda-article')).not.toBeNull();
    expect(queryByTestId('onmeda-article-subtitle')).not.toBeNull();
    expect(queryByTestId('onmeda-article-related-articles')).not.toBeNull();
    expect(
      queryAllByTestId('onmeda-article-section-body').length,
    ).not.toBeNull();
  });

  it('Should render legal dictionary correctly', () => {
    // @ts-ignore
    initialProps.article.category = 'rechtslexikon';
    const { queryByTestId } = render(mockedComponent(initialProps));

    expect(queryByTestId('onmeda-article')).not.toBeNull();
    expect(queryByTestId('onmeda-article-content-chain')).toBeNull();
  });

  it('Should render article without sections correctly', () => {
    // @ts-ignore
    initialProps.article.sections = [];
    const { queryByTestId, queryAllByTestId } = render(
      mockedComponent(initialProps),
    );

    expect(queryByTestId('onmeda-article')).not.toBeNull();
    expect(queryAllByTestId('onmeda-article-section').length).toBe(0);
  });

  it('Should render article without related articles correctly', () => {
    // @ts-ignore
    initialProps.article.relatedArticles = [];
    const { queryByTestId } = render(mockedComponent(initialProps));

    expect(queryByTestId('onmeda-article-related-articles')).not.toBeNull();
  });

  it('Should render a section without a title correctly', () => {
    // @ts-ignore
    initialProps.article.sections = [
      {
        title: '',
        __typename: 'SectionParagraph',
        body: [
          {
            anchorId: null,
            header: 'Definition',
            Text: 'Hello world',
            __typename: 'TextParagraph',
          },
        ],
      },
    ];
    const { queryByTestId, queryAllByTestId } = render(
      mockedComponent(initialProps),
    );

    // expect(queryByTestId('onmeda-article-section')).not.toBeNull();
    expect(queryByTestId('onmeda-article-section-title-wrapper')).toBeNull();
    expect(queryAllByTestId('onmeda-article-section-body')).not.toBeNull();
  });

  it('Should render no related articles section', () => {
    // @ts-ignore
    delete initialProps.article.channel;
    // @ts-ignore
    delete initialProps.article.relatedArticles;

    const { queryByTestId } = render(mockedComponent(initialProps));
    expect(queryByTestId('onmeda-article-related-articles')).toBeNull();
  });
});
