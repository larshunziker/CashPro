import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { enrichArticleBodyWithADs } from '../../../../../../../../shared/helpers/ads';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';
import { ARTICLE_TYPE_RATGEBER } from '../../../../../../../../shared/constants/content';

jest.mock('../../../../AppNexus');
jest.mock('../../../../Recommendations/components/ArticleRecommendations');
jest.mock('../../AdvantagesParagraph');
jest.mock('../../BlockquoteParagraph');
jest.mock('../../EmbedParagraph');
jest.mock('../../EntityQueueParagraph');
jest.mock('../../HeroMediaParagraph');
jest.mock('../../ImageGalleryParagraph');
jest.mock('../../ImageParagraph');
jest.mock('../../LinkBoxParagraph');
jest.mock('../../ListicleItemParagraph');
jest.mock('../../MinistageParagraph');
jest.mock('../../NativeAdvertisingCarouselParagraph');
jest.mock('../../ParallaxImageParagraph');
jest.mock('../../SectionParagraph');
jest.mock('../../TeaserStageParagraph');
jest.mock('../../TextParagraph');
jest.mock('../../VideoParagraph');
jest.mock('../../WebformParagraph');
jest.mock('../../TeaserParagraph');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

// @ts-ignore
global.tp = {
  push: () => null,
  offer: {
    show: () => null,
  },
};

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
  initialState = { window: windowInitialState, route: routeInitialState };
});
afterEach(cleanup);

describe('[Component] ParagraphsRenderer', () => {
  it('Should render nothing', () => {
    initialProps = {};
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2739 ->  Type '{}' is missing the following properties from type '{ style? */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render paragraphs', () => {
    const { queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const paragraphsCount = queryAllByTestId(
      'paragraphsrenderer-container',
    )[0].querySelectorAll('[data-testid="paragraph-item"]').length;

    expect(paragraphsCount).toBe(21);
  });

  it('Should render an image paragraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[5]];

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-image-paragraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render an infobox paragraph instead of a textparagraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[0]];

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
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[1]];

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
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[0]];
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

  it('Should render a listicleItemParagraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[12]];

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-listicleitem-paragraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render an piano template paragraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[13]];

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-piano-paragraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render the correct ad on last position (WB_3, MPA_3)', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = enrichArticleBodyWithADs({
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      pageBody: initialProps.pageBody,
    });

    const { queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} origin={ARTICLE_TYPE_RATGEBER} />
      </ReduxProvider>,
    );
    expect(
      queryAllByTestId('paragraphsrenderer-text-paragraph-wrapper').length,
    ).toEqual(11);

    expect(queryAllByTestId('paragraphsrenderer-ad-wrapper').length).toEqual(
      10,
    );

    // last ad-slot on mobile
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[
        queryAllByTestId('paragraphsrenderer-ad-wrapper').length - 2
      ].dataset.slot,
    ).toEqual('MPA3');

    // last ad-slot on tablet/desktop
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[
        queryAllByTestId('paragraphsrenderer-ad-wrapper').length - 1
      ].dataset.slot,
    ).toEqual('WB3-MR');
  });
});
