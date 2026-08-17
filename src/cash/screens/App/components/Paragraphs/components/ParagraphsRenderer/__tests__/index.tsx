import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { enrichArticleBodyWithADs } from '../../../../../../../../shared/helpers/ads';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';
import { ARTICLE_TYPE_NEWS } from '../../../../../../../../shared/constants/content';
import {
  AD_PLACEMENT_SLOTS_ARTICLE,
  ARTICLE_CHARACTER_COUNTS,
} from '../../../../AppNexus/constants';

jest.mock('../../../../AppNexus');
jest.mock('../../AdvantagesParagraph');
jest.mock('../../BlockquoteParagraph');
jest.mock('../../ContentParagraph');
jest.mock('../../EmbedParagraph');
jest.mock('../../EntityQueueParagraph');
jest.mock('../../HeroMediaParagraph');
jest.mock('../../InfoBoxParagraph');
jest.mock('../../ImageParagraph');
jest.mock('../../LinkBoxParagraph');
jest.mock('../../ListicleItemParagraph');
jest.mock('../../MinistageParagraph');
jest.mock('../../MultiColumnParagraph');
jest.mock('../../PianoTemplateParagraph');
jest.mock('../../SectionParagraph');
jest.mock('../../TeaserParagraph');
jest.mock('../../TeaserStageParagraph');
jest.mock('../../TextParagraph');
jest.mock('../../VideoParagraph');
jest.mock('../../WebformParagraph');
jest.mock('../../TeaserParagraph');
jest.mock('../../WidgetParagraph');
jest.mock(
  '../../../../../screens/MyCash/components/Musterportfolio/MusterportfolioTable',
);
jest.mock(
  '../../../../../screens/MyCash/components/Watchlist/components/AddInstrumentToWatchlist',
);
jest.mock(
  '../../../../../screens/MyCash/components/Musterportfolio/PortfolioSummary',
);

let initialProps = { pageBody: [] };
let initialState = {};

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
  initialState = { window: windowInitialState, route: routeInitialState };
});
afterEach(cleanup);

describe('[Component] ParagraphsRenderer', () => {
  it('Should render nothing', () => {
    initialProps = { pageBody: [] };
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render a textparagraph and no infobox paragraph', () => {
    initialProps.pageBody = [initialProps.pageBody[0]];
    /* @ts-ignore TODO: TS2339 ->  Property 'styleValue' does not exist on type 'never'. */
    initialProps.pageBody[0].styleValue = null;

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
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
    initialProps.pageBody = [initialProps.pageBody[0]];
    /* @ts-ignore TODO: TS2339 ->  Property 'styleValue' does not exist on type 'never'. */
    initialProps.pageBody[0].styleValue = 'not_info_box';

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
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

  it('Should NOT render the override ad on last position (WB_3, MPA_3)', () => {
    // @ts-ignore
    initialState.route.vertical = 'vertical/home';
    initialProps.pageBody = enrichArticleBodyWithADs({
      pageBody: initialProps.pageBody,
      /* @ts-ignore TODO: TS2322 ->  Type '{ mobile */
      adPlacementSlots: AD_PLACEMENT_SLOTS_ARTICLE,
      characterCount: ARTICLE_CHARACTER_COUNTS,
    });

    const { queryAllByTestId, container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} origin={ARTICLE_TYPE_NEWS} />
      </ReduxProvider>,
    );
    expect(
      queryAllByTestId('paragraphsrenderer-text-paragraph-wrapper').length,
    ).toEqual(11);

    expect(
      queryAllByTestId('paragraphsrenderer-info-box-paragraph-wrapper').length,
    ).toEqual(1);

    expect(queryAllByTestId('paragraphsrenderer-ad-wrapper').length).toEqual(
      12,
    );
    expect(container).toMatchSnapshot();
  });
});
