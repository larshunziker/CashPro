import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { HERO_GALLERY, HERO_VIDEO } from '../../ArticleHero';
import mockData from './mockData.json';

jest.mock('../components/ImageGalleryHero');
jest.mock('../components/ArticleImage');
jest.mock('../components/ArticleVideo');

let initialProps = {};
const initialState = {};

beforeEach(() => {
  initialProps = {
    ...initialProps,
    ...JSON.parse(JSON.stringify(mockData)),
    component: 'ratgeber_aktuell',
  };
});

describe('[Component] ArticleImage', () => {
  it('Should render the ArticleImage component', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('article-image-articleimage-wrapper').innerHTML,
    ).not.toBe('');
  });

  it('Should only render the AuthorDateBlock component', () => {
    // @ts-ignore
    delete initialProps.article.heroImageBody;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('article-image-authordateblock-wrapper').innerHTML,
    ).not.toBe('');
  });

  it('Should render the ArticleVideo component', () => {
    // @ts-ignore

    initialProps.article.heroImageBody[0].__typename = HERO_VIDEO;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          {/* @ts-ignore */}
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('article-image-articlevideo-wrapper').innerHTML,
    ).not.toBe('');
  });
  it('Should render the ImageGalleryHero component', () => {
    // @ts-ignore
    initialProps.article.heroImageBody[0].__typename = HERO_GALLERY;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(
      queryByTestId('article-image-imagegalleryhero-wrapper'),
    ).not.toBeNull();
  });
});
