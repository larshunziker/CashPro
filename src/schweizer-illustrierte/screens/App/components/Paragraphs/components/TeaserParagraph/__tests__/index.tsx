import React from 'react';
import { render } from '@testing-library/react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';
import {
  ARTICLE_CONTENT_TYPE,
  PRODUCT_CONTENT_TYPE,
  TEASER_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };

  initialState = {
    settings: settingsInitialState,
  };
});

describe('[Component] TeaserParagraph', () => {
  it('Should render nothing', () => {
    initialProps = {};

    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2739 ->  Type '{}' is missing the following properties from type 'TeaserParagraphProps' */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should render the teaser paragraph', () => {
    const { container, queryByTestId, queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('teaserparagraph-container').innerHTML).not.toBe('');
    expect(queryAllByTestId('teaserparagraph-item')).toHaveLength(3);
  });

  it('Should only render product teasers', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserParagraph.teasers.edges[0].node.__typename =
      PRODUCT_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserParagraph.teasers.edges[1].node.__typename =
      ARTICLE_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserParagraph.teasers.edges[2].node.__typename =
      TEASER_CONTENT_TYPE;

    const { container, queryByTestId, queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('teaserparagraph-container').innerHTML).not.toBe('');
    expect(queryAllByTestId('teaserparagraph-item')).toHaveLength(2);
  });
});
