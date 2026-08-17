import { render } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRaschRouterLocation from '../../../../shared/hooks/useRaschRouterLocation';
import * as slidedownCategoryRetry from '../../../../shared/helpers/oneSignal/slidedownCategoryRetry';
import OneSignalProvider from '../index';
import type { OneSignalV16Client } from '../../../../shared/helpers/oneSignal/types';
import type { PushNotificationsConfig } from '../typings';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../shared/hooks/useRaschRouterLocation');

const minimalConfig: PushNotificationsConfig = {
  slidePromptOptions: { pageViews: 0, timeDelay: 0 },
  welcomeNotification: { title: 'hi', message: 'msg' },
  prompt: {
    actionMessage: 'action',
    acceptButton: 'yes',
    cancelButton: 'no',
  },
  notifyBellEnabled: false,
  autoPromptSlidedown: false,
};

const cashLikeConfig: PushNotificationsConfig = {
  ...minimalConfig,
  categories: [
    { tag: 'cde-preference', label: 'Personalisiert' },
    { tag: 'top-news-preference', label: 'Top News' },
  ],
  notifyBellEnabled: true,
  autoPromptSlidedown: true,
  enablePageTagSync: true,
  bell: {
    tipStateUnsubscribed: 'sub',
    tipStateSubscribed: 'unsub',
    dialogMainTitle: 'title',
    dialogMainButtonSubscribe: 'sub',
    dialogMainButtonUnsubscribe: 'unsub',
  },
};

type FakeOneSignalOverrides = {
  permission?: boolean | 'default' | 'granted' | 'denied';
  optedIn?: boolean;
  tags?: Record<string, unknown>;
};

const createFakeOneSignal = (
  overrides: FakeOneSignalOverrides = {},
): {
  client: OneSignalV16Client;
  pushSubscriptionListeners: Array<
    (event: {
      previous?: { optedIn?: boolean };
      current?: { optedIn?: boolean };
    }) => void | Promise<void>
  >;
  notificationListeners: Array<(granted: boolean) => void | Promise<void>>;
  addTags: jest.Mock;
  removeTags: jest.Mock;
  init: jest.Mock;
} => {
  const pushSubscriptionListeners: Array<
    (event: {
      previous?: { optedIn?: boolean };
      current?: { optedIn?: boolean };
    }) => void | Promise<void>
  > = [];
  const notificationListeners: Array<
    (granted: boolean) => void | Promise<void>
  > = [];
  const addTags = jest.fn().mockResolvedValue(undefined);
  const removeTags = jest.fn().mockResolvedValue(undefined);
  const init = jest.fn().mockResolvedValue(undefined);

  const client = {
    init,
    Slidedown: { promptPush: jest.fn().mockResolvedValue(undefined) },
    Notifications: {
      isPushSupported: () => true,
      permission: overrides.permission ?? 'default',
      addEventListener: jest.fn((_event: string, listener) => {
        notificationListeners.push(listener);
      }),
      requestPermission: jest.fn().mockResolvedValue(undefined),
    },
    User: {
      PushSubscription: {
        optedIn: overrides.optedIn ?? false,
        addEventListener: jest.fn((_event: string, listener) => {
          pushSubscriptionListeners.push(listener);
        }),
      },
      addTags,
      removeTags,
      getTags: () => overrides.tags ?? {},
    },
  } as unknown as OneSignalV16Client;

  return {
    client,
    pushSubscriptionListeners,
    notificationListeners,
    addTags,
    removeTags,
    init,
  };
};

describe('[Common] OneSignalProvider', () => {
  beforeEach(() => {
    (useRaschRouterLocation as jest.Mock).mockReturnValue({ pathname: '/' });
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        piano: {
          pageMetadata: { pathname: '/', channelsHierarchy: [] },
          browserMetadata: { browserMode: 'normal' },
        },
      }),
    );
    globalThis.OneSignalDeferred = [];
    globalThis.webPushNotifications = undefined;
    globalThis.__oneSignalInitQueued = undefined;
    jest.spyOn(document.head, 'appendChild').mockImplementation((node) => node);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders nothing and skips init when no config is provided', () => {
    render(<OneSignalProvider />);
    expect(globalThis.OneSignalDeferred.length).toBe(0);
    expect(globalThis.webPushNotifications).toBeUndefined();
    expect(globalThis.__oneSignalInitQueued).toBeUndefined();
  });

  it('queues init for a publication with a basic config (no tag sync)', () => {
    render(<OneSignalProvider config={minimalConfig} />);
    expect(globalThis.OneSignalDeferred.length).toBeGreaterThan(0);
    expect(globalThis.webPushNotifications).toBeUndefined();
  });

  it('queues init when enablePageTagSync is true', () => {
    render(<OneSignalProvider config={cashLikeConfig} />);
    expect(globalThis.OneSignalDeferred.length).toBeGreaterThan(0);
    expect(globalThis.__oneSignalInitQueued).toBe(true);
  });

  it('exposes window.webPushNotifications.requestPrompt after init runs', async () => {
    render(<OneSignalProvider config={minimalConfig} />);

    const fake = createFakeOneSignal();
    const queued = globalThis.OneSignalDeferred[0];
    await queued(fake.client);

    expect(globalThis.webPushNotifications?.requestPrompt).toBeInstanceOf(
      Function,
    );

    globalThis.webPushNotifications?.requestPrompt?.(true);
    await Promise.resolve();
    expect(
      (fake.client as unknown as { Slidedown: { promptPush: jest.Mock } })
        .Slidedown.promptPush,
    ).toHaveBeenCalledWith({ force: true });
  });

  it('writes subscribeTags on opt-in', async () => {
    const configWithTags: PushNotificationsConfig = {
      ...minimalConfig,
      subscribeTags: { news: 'true' },
    };

    render(<OneSignalProvider config={configWithTags} />);

    const fake = createFakeOneSignal();
    const queued = globalThis.OneSignalDeferred[0];
    await queued(fake.client);

    const listener = fake.pushSubscriptionListeners.at(-1);
    expect(listener).toBeDefined();

    await listener?.({
      previous: { optedIn: false },
      current: { optedIn: true },
    });
    expect(fake.addTags).toHaveBeenCalledWith({ news: 'true' });
  });

  it('does not call init twice when the provider re-mounts', async () => {
    const { unmount } = render(<OneSignalProvider config={minimalConfig} />);
    expect(globalThis.OneSignalDeferred.length).toBe(1);
    unmount();

    render(<OneSignalProvider config={minimalConfig} />);
    expect(globalThis.OneSignalDeferred.length).toBe(1);
  });

  it('cash happy path: opens prompt, registers tag listeners, and increments visits when cde-preference is enabled', async () => {
    (useRaschRouterLocation as jest.Mock).mockReturnValue({
      pathname: '/aktien/finanzen',
    });
    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        piano: {
          pageMetadata: {
            pathname: '/aktien/finanzen',
            channelsHierarchy: ['Aktien', 'Finanzen'],
          },
          browserMetadata: { browserMode: 'normal' },
        },
      }),
    );

    render(<OneSignalProvider config={cashLikeConfig} />);

    const fake = createFakeOneSignal({
      tags: { 'cde-preference': '1', aktien: '4' },
    });
    const queued = globalThis.OneSignalDeferred[0];
    await queued(fake.client);

    expect(fake.init).toHaveBeenCalledTimes(1);
    expect(
      fake.client.User.PushSubscription.addEventListener,
    ).toHaveBeenCalled();
    expect(
      (
        fake.client.Notifications as unknown as {
          addEventListener: jest.Mock;
        }
      ).addEventListener,
    ).toHaveBeenCalled();

    expect(fake.addTags).toHaveBeenCalledWith({
      aktien: '5',
      finanzen: '1',
    });
  });

  it('disposes slidedown category retry listener on unmount', async () => {
    const dispose = jest.fn();
    jest
      .spyOn(slidedownCategoryRetry, 'registerSlidedownCategoryRetry')
      .mockReturnValue(dispose);

    const { unmount } = render(<OneSignalProvider config={cashLikeConfig} />);

    const fake = createFakeOneSignal();
    const queued = globalThis.OneSignalDeferred[0];
    await queued(fake.client);

    expect(
      slidedownCategoryRetry.registerSlidedownCategoryRetry,
    ).toHaveBeenCalled();

    unmount();

    expect(dispose).toHaveBeenCalledTimes(1);
  });

  it('does not increment visit counters when cde-preference is not "1"', async () => {
    (useRaschRouterLocation as jest.Mock).mockReturnValue({
      pathname: '/aktien/finanzen',
    });
    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        piano: {
          pageMetadata: {
            pathname: '/aktien/finanzen',
            channelsHierarchy: ['Aktien', 'Finanzen'],
          },
          browserMetadata: { browserMode: 'normal' },
        },
      }),
    );

    render(<OneSignalProvider config={cashLikeConfig} />);

    const fake = createFakeOneSignal({ tags: {} });
    const queued = globalThis.OneSignalDeferred[0];
    await queued(fake.client);

    expect(fake.addTags).not.toHaveBeenCalled();
  });
});
