import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, { INLINE_TEASER_PARAGRAPH } from '../index';
import messages from '../../../../../../../i18n/translations/messages.json';
import mockData from './mockData.json';
import { RECIPE_CONTENT_TYPE } from '../../../../../../../../shared/constants/content';
import { MULTI_COLUMNS_PARAGRAPH } from '../../../../../../../../shared/constants/paragraphs';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
let initialState = {};

jest.mock('../../../../Teaser');
jest.mock('../../../../Teaser/components/ProductTeaser');
jest.mock('../../../../Paragraphs');
jest.mock('../../../../TabsTwoCols');

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
  initialState = { window: windowInitialState, route: routeInitialState };
});

describe('[Component] TeaserParagraph', () => {
  it('Should render nothing if there is no teaser', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TeaserParagraph'. */}
        <Component teaserParagraph={null} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('teaser-paragraph-recipe-detail-view')).toBeNull();
  });

  it('Should render product teaser', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />{' '}
      </ReduxProvider>,
    );
    expect(queryByTestId('teaser-paragraph-recipe-detail-view')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render product teaser with origin MultiColumnParagraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.origin = MULTI_COLUMNS_PARAGRAPH;
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('teaser-paragraph-recipe-detail-view')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render normal Inline Teaser', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserParagraph.teasers.edges[0].node.__typename =
      INLINE_TEASER_PARAGRAPH;
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('teaser-paragraph-recipe-detail-view')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render Inline Recipe Teaser', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserParagraph.teasers.edges[0].node.__typename =
      RECIPE_CONTENT_TYPE;
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('teaser-paragraph-recipe-detail-view')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render recipe detailview', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserParagraph.teasers.edges[0].node.__typename =
      RECIPE_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserParagraph.detailView = true;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <IntlProvider
          defaultLocale="de-CH"
          locale={'de'}
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"de"' can't be used to index type '{ fr */
          messages={messages['de'] || {}}
          key={'de'}
        >
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </IntlProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('teaser-paragraph-recipe-detail-view')).not.toBeNull();
  });
});
