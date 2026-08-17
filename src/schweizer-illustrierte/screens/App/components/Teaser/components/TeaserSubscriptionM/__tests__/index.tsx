import React from 'react';
import { render } from '@testing-library/react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../../TeaserSubscriptionM';
import mockGraphQlData from './mockGraphQlData.json';
import {
  MAIN_CHANNEL_PEOPLE,
  MAIN_CHANNEL_STYLE,
} from '../../../../../../App/constants';
import {
  TEASER_STYLE_SI,
  TEASER_STYLE_SY,
} from '../../TeaserSubscriptionL/constants';
import styles from '../styles.legacy.css';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockGraphQlData)),
  };

  initialState = {
    settings: settingsInitialState,
  };
});

describe('[Component] Teaser Subscription M', () => {
  it('Should render with nothing if no data is provided', () => {
    initialProps = {};
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2739 ->  Type '{}' is missing the following properties from type '{ image? */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBe('');
    expect(container.innerHTML).toContain(mockGraphQlData.link.path);
    expect(container.innerHTML).toContain(mockGraphQlData.link.label);
    expect(container.innerHTML).toContain(
      mockGraphQlData.teaserImage.image.file.alt,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('teaser-shortTitle').innerHTML).toBe(
      mockGraphQlData.shortTitle,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('teaser-title').innerHTML).toBe(mockGraphQlData.title);
  });

  test.each([
    [
      {
        style: TEASER_STYLE_SI,
        activeMainChannel: MAIN_CHANNEL_STYLE,
        cssClass: styles.WrapperStyleSI,
      },
    ],
    [
      {
        style: TEASER_STYLE_SY,
        activeMainChannel: MAIN_CHANNEL_PEOPLE,
        cssClass: styles.WrapperStyleSY,
      },
    ],
  ])('Should render correctly and find the expected css class', (config) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.style = config.style;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.settings.activeMainChannel = config.activeMainChannel;

    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toContain(config.cssClass);
  });
});
