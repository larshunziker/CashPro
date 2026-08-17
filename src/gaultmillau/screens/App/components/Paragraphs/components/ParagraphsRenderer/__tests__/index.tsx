import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { initialState as windowInitialState } from '../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';
import {
  EMBED_PARAGRAPH,
  ENTITY_QUEUE_PARAGRAPH,
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
  INFOBOX_PARAGRAPH,
  INPUT_FORM_PARAGRAPH,
  LINK_BOX_PARAGRAPH,
  LISTICLE_ITEM_PARAGRAPH,
  MINISTAGE_PARAGRAPH,
  MULTI_COLUMNS_PARAGRAPH,
  TEASER_PARAGRAPH,
  TEASER_STAGE_PARAGRAPH,
  VIDEO_LOOP_PARAGRAPH,
  VIDEO_PARAGRAPH,
} from '../../../../../../../../shared/constants/paragraphs';

jest.mock('../../EmbedParagraph');
jest.mock('../../ImageParagraph');
jest.mock('../../ImageGalleryParagraph');
jest.mock('../../LinkBoxParagraph');
jest.mock('../../TeaserParagraph');
jest.mock('../../MinistageParagraph');
jest.mock('../../MultiColumnParagraph');
jest.mock('../../VideoParagraph');
jest.mock('../../VideoLoopParagraph');
jest.mock('../../ListicleItemParagraph');
jest.mock('../../EntityQueueParagraph');
jest.mock('../../InfoBoxParagraph');
jest.mock('../../TeaserStageParagraph');
jest.mock('../../WebformParagraph');
jest.mock('../../BlockquoteParagraph');
jest.mock('../../TextParagraph');
jest.mock('SmoothScroll');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
  initialState = { window: windowInitialState };
});
afterEach(cleanup);

describe('[Component] ParagraphsRenderer', () => {
  it('Should render nothing', () => {
    initialProps = {};
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2741 ->  Property 'pageBody' is missing in type '{}' but required in type 'ParagraphProps'. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render an infobox paragraph instead of a textparagraph', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-info-box-paragraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render a textparagraph and no infobox paragraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody[0].styleValue = null;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-info-box-paragraph-wrapper'),
    ).toBeNull();
    expect(
      queryByTestId('paragraphsrenderer-text-paragraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render a textparagraph and no infobox paragraph if styleValue is not correct', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody[0].styleValue = 'not_info_box';

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-info-box-paragraph-wrapper'),
    ).toBeNull();
    expect(
      queryByTestId('paragraphsrenderer-text-paragraph-wrapper'),
    ).not.toBeNull();
  });

  test.each`
    __typename                 | testId
    ${EMBED_PARAGRAPH}         | ${'mocked-embed-paragraph'}
    ${IMAGE_PARAGRAPH}         | ${'mocked-image-paragraph'}
    ${IMAGE_GALLERY_PARAGRAPH} | ${'mocked-image-gallery-paragraph'}
    ${LINK_BOX_PARAGRAPH}      | ${'mocked-link-box-paragraph'}
    ${TEASER_PARAGRAPH}        | ${'mocked-teaser-paragraph'}
    ${MINISTAGE_PARAGRAPH}     | ${'mocked-ministage-paragraph'}
    ${MULTI_COLUMNS_PARAGRAPH} | ${'mocked-multi-column-paragraph'}
    ${VIDEO_PARAGRAPH}         | ${'mocked-video-paragraph'}
    ${VIDEO_LOOP_PARAGRAPH}    | ${'mocked-video-loop-paragraph'}
    ${ENTITY_QUEUE_PARAGRAPH}  | ${'mocked-entity-queue-paragraph'}
    ${INFOBOX_PARAGRAPH}       | ${'mocked-info-box-paragraph'}
    ${TEASER_STAGE_PARAGRAPH}  | ${'mocked-teaser-stage-paragraph'}
    ${LISTICLE_ITEM_PARAGRAPH} | ${'mocked-listicle-item-paragraph'}
  `('Should render $__typename correctly', ({ __typename, testId }) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody[0].__typename = __typename;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId(testId)).not.toBeNull();
  });

  it('Should render WebformParagraph correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody[0].webform = '<webform>';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody[0].__typename = INPUT_FORM_PARAGRAPH;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('mocked-webform-paragraph')).not.toBeNull();
  });
});
