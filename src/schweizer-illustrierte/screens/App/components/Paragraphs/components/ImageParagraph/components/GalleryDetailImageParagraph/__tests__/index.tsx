import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../../../shared/reducers/window';
import { settingsInitialState } from '../../../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../../GalleryDetailImageParagraph';
import mockGraphQlData from './mockGraphQlData.json';
import { IMAGE_GALLERY_DETAIL_SCREEN } from '../../../../../../../screens/ImageGalleryArticle/constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    imageParagraph: JSON.parse(JSON.stringify(mockGraphQlData)),
    origin: IMAGE_GALLERY_DETAIL_SCREEN,
  };

  initialState = {
    settings: settingsInitialState,
    window: windowInitialState,
  };
});

describe('[Component] Paragraphs - GalleryDetailImageParagraph', () => {
  it('Should render nothing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.imageParagraph = {};
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly if imageParagraph props are not empty', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(
      queryByTestId('gallerydetail-imageparagraph-wrapper'),
    ).not.toBeNull();
    expect(
      queryByTestId('gallerydetail-imageparagraph-caption-wrapper'),
    ).not.toBeNull();
  });

  // test.each([
  //   [{ format: null, expected: '3x2' }],
  //   [{ format: 'landscape', expected: '3x2' }],
  //   [{ format: 'portrait', expected: '2x3' }],
  //   [{ format: 'square', expected: '1x1' }],
  // ])('Should render the expected image format', (config) => {
  //   initialProps.imageParagraph.format = config.format;

  //   const { queryByTestId } = render(
  //     <ReduxProvider>
  //       <Component {...initialProps} />
  //     </ReduxProvider>,
  //   );

  //   expect(
  //     queryByTestId('gallerydetail-imageparagraph-wrapper').innerHTML,
  //   ).toEqual(expect.stringContaining(config.expected));
  // });
});
