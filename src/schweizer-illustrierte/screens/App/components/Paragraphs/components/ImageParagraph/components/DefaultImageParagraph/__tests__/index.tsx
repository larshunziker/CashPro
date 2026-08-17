import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../../../shared/reducers/window';
import { settingsInitialState } from '../../../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockGraphQlData from './mockGraphQlData.json';
import { MULTI_COLUMNS_PARAGRAPH } from '../../../../../../../../../../shared/constants/paragraphs';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    imageParagraph: JSON.parse(JSON.stringify(mockGraphQlData)),
    origin: 'articleDefault',
    settingsState: settingsInitialState,
  };
  initialState = {
    settings: settingsInitialState,
    window: windowInitialState,
  };
});
afterEach(cleanup);

describe('[Component] Paragraphs - DefaultImageParagraph', () => {
  it('Should render nothing, if no image is provided', () => {
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

  it('Should render an imageParagraph correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('default-imageparagraph-wrapper')).not.toBeNull();
  });

  it('Should render an imageParagraph only with an image and with the "paragraph default-image-paragraph Row" class', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.imageParagraph.caption = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.imageParagraph.image.credit = '';
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('default-imageparagraph-wrapper')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('default-imageparagraph-wrapper').className).toBe(
      'paragraph default-image-paragraph Row',
    );
  });

  it('Should render an imageParagraph with optional title', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('default-imageparagraph-wrapper')).not.toBeNull();
    expect(
      queryByTestId('default-imageparagraph-title-wrapper'),
    ).not.toBeNull();
    expect(queryByTestId('default-imageparagraph-title')).not.toBeNull();
    // @ts-ignore
    expect(queryByTestId('default-imageparagraph-title')).toHaveTextContent(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.imageParagraph.title,
    );
  });

  it('Should render an imageParagraph without optional title', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.imageParagraph.title = null;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('default-imageparagraph-wrapper')).not.toBeNull();
    expect(queryByTestId('default-imageparagraph-title-wrapper')).toBeNull();
    expect(queryByTestId('default-imageparagraph-title')).toBeNull();
  });

  it('Should not render the "Row" class, when origin is "MultiColumnParagraph"', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.origin = MULTI_COLUMNS_PARAGRAPH;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('default-imageparagraph-wrapper').className).toBe(
      'paragraph default-image-paragraph',
    );
  });

  // test.each([
  //   [{ format: null, expected: '3x2' }],
  //   [{ format: 'landscape', expected: '3x2' }],
  //   [{ format: 'portrait', expected: '2x3' }],
  //   [{ format: 'square', expected: '1x1' }],
  // ])('Should render the expected image format', (config) => {
  //   initialProps.imageParagraph.format = config.format;

  //   const { queryByTestId } = render(
  //     <ReduxProvider initialState={initialState}>
  //       <Component {...initialProps} />
  //     </ReduxProvider>,
  //   );

  //   expect(queryByTestId('default-imageparagraph-wrapper').innerHTML).toEqual(
  //     expect.stringContaining(config.expected),
  //   );
  // });
});
