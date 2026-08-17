import React from 'react';
import { Store } from 'redux';
import { cleanup, render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { configureStore } from '../../../../../../../../../shared/configureStore';
import {
  PIANO_CORPORATE_ACTIONS_WIDGET,
  PIANO_ORDERBOOK_WIDGET,
} from '../../../../../../../../../../shared/constants/piano';
import {
  SUBSCRIPTION_TYPE_ANLEGER,
  SUBSCRIPTION_TYPE_BANKING,
  SUBSCRIPTION_TYPE_BASIC,
  SUBSCRIPTION_TYPE_PROFI,
} from '../../../../../../../constants';

const BASE_URL =
  'https://cdn.fi-box.stage.service.cash.ch/services/esi-widgets';

const URLS = {
  none: '',
  orderbook: `${BASE_URL}/orderbook?p=aktien/[widgetParams]`,
  corporate_action: `${BASE_URL}/corporate-actions/[valorNr]`,
  other: `${BASE_URL}/fullquote-header?p=aktien/[widgetParas]`,
};

const cases = [
  [URLS.none, []],
  [URLS.none, [SUBSCRIPTION_TYPE_ANLEGER]],
  [URLS.none, [SUBSCRIPTION_TYPE_BANKING]],
  [URLS.none, [SUBSCRIPTION_TYPE_PROFI]],
  [
    URLS.none,
    [
      SUBSCRIPTION_TYPE_ANLEGER,
      SUBSCRIPTION_TYPE_BANKING,
      SUBSCRIPTION_TYPE_PROFI,
    ],
  ],
];

const store: Store = configureStore({});

afterEach(cleanup);

describe('[Component] WidgetParagraph/EsiComponent', () => {
  test.each(cases)(
    'Should not render if no link is provided',
    (url, subscriptions) => {
      const { container } = render(
        <Component
          link={{ path: url as string }}
          subscriptions={subscriptions as string[]}
        />,
      );
      expect(container.innerHTML).toBe('');
    },
  );

  it('Should render any extra piano widgets', () => {
    const { container } = render(
      <ReduxProvider store={store}>
        <Component link={{ path: URLS.other as string }} subscriptions={[]} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toContain(URLS.other);
    expect(container.innerHTML).not.toContain(PIANO_CORPORATE_ACTIONS_WIDGET);
    expect(container.innerHTML).not.toContain(PIANO_ORDERBOOK_WIDGET);
  });

  it('Should render orderbook piano widgets', () => {
    const result1 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.orderbook as string }}
          subscriptions={[]}
        />
      </ReduxProvider>,
    );
    const result2 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.corporate_action as string }}
          subscriptions={[]}
        />
      </ReduxProvider>,
    );
    expect(result1.container.innerHTML).toContain(URLS.orderbook);
    expect(result1.container.innerHTML).toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result1.container.innerHTML).not.toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
    expect(result2.container.innerHTML).not.toContain(URLS.corporate_action);
    expect(result2.container.innerHTML).not.toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result2.container.innerHTML).toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
  });

  it('Should render orderbook piano widgets (basic)', () => {
    const result1 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.orderbook as string }}
          subscriptions={[SUBSCRIPTION_TYPE_BASIC]}
        />
      </ReduxProvider>,
    );
    const result2 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.corporate_action as string }}
          subscriptions={[SUBSCRIPTION_TYPE_BASIC]}
        />
      </ReduxProvider>,
    );
    expect(result1.container.innerHTML).toContain(URLS.orderbook);
    expect(result1.container.innerHTML).toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result1.container.innerHTML).not.toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
    expect(result2.container.innerHTML).not.toContain(URLS.corporate_action);
    expect(result2.container.innerHTML).not.toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result2.container.innerHTML).toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
  });

  it('Should render orderbook piano widgets (anleger)', () => {
    const result1 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.orderbook as string }}
          subscriptions={[SUBSCRIPTION_TYPE_ANLEGER]}
        />
      </ReduxProvider>,
    );
    const result2 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.corporate_action as string }}
          subscriptions={[SUBSCRIPTION_TYPE_ANLEGER]}
        />
      </ReduxProvider>,
    );
    expect(result1.container.innerHTML).toContain(URLS.orderbook);
    expect(result1.container.innerHTML).toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result1.container.innerHTML).not.toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
    expect(result2.container.innerHTML).not.toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result2.container.innerHTML).not.toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
  });

  it('Should render orderbook piano widgets (banking)', () => {
    const result1 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.orderbook as string }}
          subscriptions={[SUBSCRIPTION_TYPE_BANKING]}
        />
      </ReduxProvider>,
    );
    const result2 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.corporate_action as string }}
          subscriptions={[SUBSCRIPTION_TYPE_BANKING]}
        />
      </ReduxProvider>,
    );
    expect(result1.container.innerHTML).toContain(URLS.orderbook);
    expect(result1.container.innerHTML).not.toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result1.container.innerHTML).not.toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
    expect(result2.container.innerHTML).not.toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result2.container.innerHTML).not.toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
  });

  it('Should render orderbook piano widgets (profi)', () => {
    const result1 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.orderbook as string }}
          subscriptions={[SUBSCRIPTION_TYPE_PROFI]}
        />
      </ReduxProvider>,
    );
    const result2 = render(
      <ReduxProvider store={store}>
        <Component
          link={{ path: URLS.corporate_action as string }}
          subscriptions={[SUBSCRIPTION_TYPE_PROFI]}
        />
      </ReduxProvider>,
    );
    expect(result1.container.innerHTML).toContain(URLS.orderbook);
    expect(result1.container.innerHTML).not.toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result1.container.innerHTML).not.toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
    expect(result2.container.innerHTML).not.toContain(PIANO_ORDERBOOK_WIDGET);
    expect(result2.container.innerHTML).not.toContain(
      PIANO_CORPORATE_ACTIONS_WIDGET,
    );
  });
});
