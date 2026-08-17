import React from 'react';
import { render } from '@testing-library/react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockGraphQlData from './mockGraphQlData.json';
import {
  MAIN_CHANNEL_PEOPLE,
  MAIN_CHANNEL_STYLE,
} from '../../../../../../App/constants';
import { TEASER_STYLE_SI, TEASER_STYLE_SY } from '../constants';
import styles from '../styles.legacy.css';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    ...initialProps,
    ...JSON.parse(JSON.stringify(mockGraphQlData)),
  };

  initialState = {
    settings: settingsInitialState,
  };
});

describe('[Component] teaser subscription l', () => {
  it('Should render nothing if no data is passed', () => {
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

  it('Should render subscription M on mobile viweport', () => {
    const { getByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(
      getByTestId('subscription-l-mobile-viewport-wrapper'),
    ).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container, getAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBe('');
    const shortTitles = getAllByTestId('teaser-shortTitle');
    shortTitles.forEach((shortTitle) => {
      expect(shortTitle.innerHTML).toEqual(mockGraphQlData.shortTitle);
    });

    const teaserTitles = getAllByTestId('teaser-title');
    teaserTitles.forEach((teaserTitle) => {
      expect(teaserTitle.innerHTML).toEqual(mockGraphQlData.title);
    });

    const teaserLeads = getAllByTestId('teaser-lead');
    teaserLeads.forEach((teaserLead) => {
      expect(teaserLead.innerHTML).not.toBeNull();
    });

    expect(container.innerHTML).not.toContain(styles.WrapperStyleSI);
    expect(container.innerHTML).not.toContain(styles.WrapperStyleSY);
  });

  test.each([
    [{ lead: 'test: test', expected: '<strong>test</strong>: test' }],
    [
      {
        lead: 'test: test: test:',
        expected: '<strong>test</strong>: test: test:',
      },
    ],
    [{ lead: 'test test', expected: 'test test' }],
    [
      {
        lead: 'test test\ntest: test\ntest test: test',
        expected:
          'test test\n<strong>test</strong>: test\n<strong>test test</strong>: test',
      },
    ],
  ])('Should render the expected formatted lead', (config) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.lead = config.lead;

    const { getAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    const teaserLeads = getAllByTestId('teaser-lead');
    teaserLeads.forEach((teaserLead) => {
      expect(teaserLead.innerHTML).toEqual(config.expected);
    });
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
