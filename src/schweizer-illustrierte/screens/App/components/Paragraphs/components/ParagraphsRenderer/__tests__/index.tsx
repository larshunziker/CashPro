import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

jest.mock('../../../../AppNexus');
jest.mock('../../AdvantagesParagraph');
jest.mock('../../BlockquoteParagraph');
jest.mock('../../EmbedParagraph');
jest.mock('../../EntityQueueParagraph');
jest.mock('../../HeroMediaParagraph');
jest.mock('../../ImageGalleryParagraph');
jest.mock('../../ImageParagraph');
jest.mock('../../InfoBoxParagraph');
jest.mock('../../ListicleItemParagraph');
jest.mock('../../MinistageParagraph');
jest.mock('../../MultiColumnParagraph');
jest.mock('../../TeaserParagraph');
jest.mock('../../TeaserStageParagraph');
jest.mock('../../TeaserParagraph');
jest.mock('../../VideoParagraph');
jest.mock('../../WebformParagraph');
jest.mock('../../TextParagraph');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

/* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
global.tp = {
  push: () => null,
  offer: {
    show: () => null,
  },
};

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
});
afterEach(cleanup);

describe('[Component] Paragraphs - ParagraphsRenderer', () => {
  it('Should render nothing', () => {
    initialProps = {};
    const { container } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render all paragraphs', () => {
    const { queryAllByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    const paragraphsCount = queryAllByTestId(
      'paragraphsrenderer-container',
    )[0].querySelectorAll('[data-testid="paragraph-item"]').length;

    expect(paragraphsCount).toBe(14);
  });

  it('Should render at least one textparagraph and one imageparagraph', () => {
    const { queryAllByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryAllByTestId('paragraphsrenderer-textparagraph-wrapper').length,
    ).toBeGreaterThan(0);
    expect(
      queryAllByTestId('paragraphsrenderer-imageparagraph-wrapper').length,
    ).toBeGreaterThan(0);
  });

  it('Should render at least one blockquote-paragraph and one textparagraphparagraph', () => {
    const { queryAllByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryAllByTestId('paragraphsrenderer-blockquote-paragraph-wrapper')
        .length,
    ).toBeGreaterThan(0);
    expect(
      queryAllByTestId('paragraphsrenderer-textparagraph-wrapper').length,
    ).toBeGreaterThan(0);
  });

  it('Should render a paragraphsrenderer-infobox-paragraph-wrapper', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-infobox-paragraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render a paragraphsrenderer-embed-paragraph-wrapper', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-embed-paragraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render a paragraphsrenderer-teaserparagraph-wrapper', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-teaserparagraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render a paragraphsrenderer-ministageparagraph-wrapper', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-ministageparagraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render an infobox paragraph instead of a textparagraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[0]];

    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-infoboxparagraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render a textparagraph and no infobox paragraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[0]];
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody[0].styleValue = null;

    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-infoboxparagraph-wrapper'),
    ).toBeNull();
    expect(
      queryByTestId('paragraphsrenderer-textparagraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render a textparagraph and no infobox paragraph if styleValue is not correct', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[0]];
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody[0].styleValue = 'not_info_box';

    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-infoboxparagraph-wrapper'),
    ).toBeNull();
    expect(
      queryByTestId('paragraphsrenderer-textparagraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render an piano template paragraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = [initialProps.pageBody[13]];

    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-pianoparagraph-wrapper'),
    ).not.toBeNull();
  });
});
