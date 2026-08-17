import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../../ImageParagraph';
import mockGraphQlData from './mockData.json';
import { IMAGE_GALLERY_DETAIL_SCREEN } from '../../../../../screens/ImageGalleryArticle/constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockGraphQlData)),
  };

  initialState = {
    window: windowInitialState,
  };
});

describe('[Component] Paragraphs - ImageParagraph', () => {
  it('Should render nothing', () => {
    initialProps = {};
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2739 ->  Type '{}' is missing the following properties from type 'ImageParagraphProps' */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render the default image paragraph wrapper', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('imageparagraph-default-image-paragraph-wrapper').innerHTML,
    ).not.toBe('');
    expect(
      queryByTestId('imageparagraph-gallery-detail-image-paragraph-wrapper'),
    ).toBeNull();
  });

  it('Should render the gallery detail image paragraph wrapper', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.origin = IMAGE_GALLERY_DETAIL_SCREEN;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(
      queryByTestId('imageparagraph-default-image-paragraph-wrapper'),
    ).toBeNull();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('imageparagraph-gallery-detail-image-paragraph-wrapper')
        .innerHTML,
    ).not.toBe('');
  });
});
