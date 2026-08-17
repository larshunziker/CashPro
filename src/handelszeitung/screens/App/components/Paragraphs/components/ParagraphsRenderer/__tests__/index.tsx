import React from 'react';
import { cleanup, render } from '@testing-library/react';
import {
  enrichArticleBodyWithADs,
  enrichOverviewBodyWithADs,
} from '../../../../../../../../shared/helpers/ads';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';
import {
  ARTICLE_TYPE_NEWS,
  LANDING_PAGE_TYPE_HOME,
} from '../../../../../../../../shared/constants/content';
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

  it('Should render an infobox paragraph instead of a textparagraph', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-info-box-paragraph-wrapper'),
    ).not.toBeNull();
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

  it('Should render a listicleItemParagraph', () => {
    const props = {
      pageBody: [initialProps.pageBody[1]],
    };

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...props} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('paragraphsrenderer-listicleitem-paragraph-wrapper'),
    ).not.toBeNull();
  });

  it('Should render the correct ad on last position (WB_3, MPA_3)', () => {
    // @ts-ignore
    initialState.route.vertical = 'vertical/money';
    initialProps.pageBody = enrichArticleBodyWithADs({
      pageBody: initialProps.pageBody,
    });

    const { queryAllByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} origin={ARTICLE_TYPE_NEWS} />
      </ReduxProvider>,
    );

    expect(
      queryAllByTestId('paragraphsrenderer-text-paragraph-wrapper').length,
    ).toEqual(8);
    expect(queryAllByTestId('paragraphsrenderer-ad-wrapper').length).toEqual(
      12,
    );
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[0].dataset.slot,
    ).toEqual('IAV1');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[1].dataset.slot,
    ).toEqual('IAV1');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[2].dataset.slot,
    ).toEqual('MHPA2');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[3].dataset.slot,
    ).toEqual('WB2-MR');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[4].dataset.slot,
    ).toEqual('MHPA2');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[5].dataset.slot,
    ).toEqual('WB2-MR');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[6].dataset.slot,
    ).toEqual('MHPA2');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[7].dataset.slot,
    ).toEqual('WB2-MR');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[8].dataset.slot,
    ).toEqual('MHPA2');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[9].dataset.slot,
    ).toEqual('WB2-MR');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[10].dataset.slot,
    ).toEqual('MPA3');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[11].dataset.slot,
    ).toEqual('WB3-MR');
  });

  it('Should render no IAV slot on vertical/home', () => {
    // @ts-ignore
    initialState.route.vertical = 'vertical/home';
    initialProps.pageBody = enrichOverviewBodyWithADs({
      pageBody: initialProps.pageBody,
    });
    const { queryAllByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} origin={LANDING_PAGE_TYPE_HOME} />
      </ReduxProvider>,
    );

    expect(
      queryAllByTestId('paragraphsrenderer-text-paragraph-wrapper').length,
    ).toEqual(8);
    expect(queryAllByTestId('paragraphsrenderer-ad-wrapper').length).toEqual(4);
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[0].dataset.slot,
    ).not.toContain('IAV');
    expect(
      queryAllByTestId('paragraphsrenderer-ad-wrapper')[1].dataset.slot,
    ).not.toContain('IAV');
  });
});
