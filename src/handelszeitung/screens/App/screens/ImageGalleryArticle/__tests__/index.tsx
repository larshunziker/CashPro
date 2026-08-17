import React from 'react';
import { cleanup } from '@testing-library/react';
import Component from '../index';
import { render } from '../../../../../shared/customRenderer';
import mockData from './mockData.json';

jest.mock('Article/components/ArticleHeader', () => {
  return () => {
    return null;
  };
});

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    imageGalleryArticle: JSON.parse(JSON.stringify(mockData)),
    location: {
      action: 'POP',
      hash: '',
      key: null,
      pathname: '/finanzlexikon/list',
      query: {},
      search: '',
    },
  };
});
afterEach(cleanup);

describe('[Screen] Image Gallery Article', () => {
  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('image-gallery-article-wrapper')).not.toBeNull();
    expect(
      queryByTestId('image-gallery-article-relatedcontent-wrapper'),
    ).not.toBeNull();
    expect(
      queryByTestId('image-gallery-article-paragraph-wrapper'),
    ).not.toBeNull();
    expect(
      queryByTestId('image-gallery-article-articlefooter-wrapper'),
    ).not.toBeNull();
  });

  it('Should render correctly if not all data given', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.imageGalleryArticle.relatedGalleries;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.imageGalleryArticle.keywords;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.imageGalleryArticle.body;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.imageGalleryArticle.preferredUri;

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('image-gallery-article-wrapper')).not.toBeNull();
    expect(
      queryByTestId('image-gallery-article-relatedcontent-wrapper'),
    ).toBeNull();
    expect(queryByTestId('image-gallery-article-paragraph-wrapper')).toBeNull();
    expect(
      queryByTestId('image-gallery-article-articlefooter-wrapper'),
    ).toBeNull();
  });
});
