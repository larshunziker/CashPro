import {
  CDE_PREFERENCE_TAG,
  CDE_PREFERENCE_ENABLED,
  CDE_PREFERENCE_DISABLED,
  SUB_CAT_TAG,
} from '../constants';
import { setOneSignalPageContext } from '../oneSignalPageContext';
import {
  applyChannelVisitIncrementsIfGated,
  applyUserTagsWithRetry,
  setupOneSignalListeners,
  syncSubCatInOneSignal,
} from '../oneSignalTagSync';
import type { OneSignalV16Client } from '../types';

type SubscriptionListener = (event: {
  previous?: { optedIn?: boolean };
  current?: { optedIn?: boolean };
}) => void | Promise<void>;
type NotificationListener = (granted: boolean) => void | Promise<void>;

const buildFakeOneSignal = (
  tags: Record<string, unknown> = {},
): {
  client: OneSignalV16Client;
  pushSubscriptionListeners: SubscriptionListener[];
  notificationListeners: NotificationListener[];
  addTags: jest.Mock;
  getTags: jest.Mock;
} => {
  const pushSubscriptionListeners: SubscriptionListener[] = [];
  const notificationListeners: NotificationListener[] = [];
  const addTags = jest.fn().mockResolvedValue(undefined);
  const getTags = jest.fn(() => tags);

  const client = {
    init: jest.fn(),
    User: {
      addTags,
      getTags,
      removeTags: jest.fn().mockResolvedValue(undefined),
      PushSubscription: {
        optedIn: false,
        addEventListener: jest.fn((_event: string, listener) => {
          pushSubscriptionListeners.push(listener);
        }),
      },
    },
    Notifications: {
      addEventListener: jest.fn((_event: string, listener) => {
        notificationListeners.push(listener);
      }),
    },
  } as unknown as OneSignalV16Client;

  return {
    client,
    pushSubscriptionListeners,
    notificationListeners,
    addTags,
    getTags,
  };
};

describe('applyUserTagsWithRetry', () => {
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    // Replace `setTimeout` so the 400ms retry delay does not block the test.
    setTimeoutSpy = jest.spyOn(globalThis, 'setTimeout').mockImplementation(((
      callback: () => void,
    ) => {
      callback();
      return 0;
    }) as unknown as typeof globalThis.setTimeout);
  });
  afterEach(() => {
    setTimeoutSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('returns early when there are no tags to write', async () => {
    const fake = buildFakeOneSignal();
    await applyUserTagsWithRetry(fake.client, {});
    expect(fake.addTags).not.toHaveBeenCalled();
  });

  it('writes the tags once on success', async () => {
    const fake = buildFakeOneSignal();
    await applyUserTagsWithRetry(fake.client, { foo: '1' });
    expect(fake.addTags).toHaveBeenCalledTimes(1);
    expect(fake.addTags).toHaveBeenCalledWith({ foo: '1' });
  });

  it('retries once on failure and warns', async () => {
    const fake = buildFakeOneSignal();
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    fake.addTags
      .mockRejectedValueOnce(new Error('boom-1'))
      .mockRejectedValueOnce(new Error('boom-2'));

    await applyUserTagsWithRetry(fake.client, { foo: '1' });

    expect(fake.addTags).toHaveBeenCalledTimes(2);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('addTags failed after retry'),
      expect.any(Error),
    );
  });
});

describe('syncSubCatInOneSignal', () => {
  it('writes the sub_cat tag when value is provided', async () => {
    const fake = buildFakeOneSignal();
    await syncSubCatInOneSignal(fake.client, 'finanzen');
    expect(fake.addTags).toHaveBeenCalledWith({ [SUB_CAT_TAG]: 'finanzen' });
  });

  it('is a no-op for null/empty values', async () => {
    const fake = buildFakeOneSignal();
    await syncSubCatInOneSignal(fake.client, null);
    await syncSubCatInOneSignal(fake.client, '');
    expect(fake.addTags).not.toHaveBeenCalled();
  });

  it('swallows errors and warns', async () => {
    const fake = buildFakeOneSignal();
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    fake.addTags.mockRejectedValueOnce(new Error('nope'));

    await syncSubCatInOneSignal(fake.client, 'finanzen');
    expect(warn).toHaveBeenCalled();
  });
});

describe('applyChannelVisitIncrementsIfGated', () => {
  it('writes incremented tags when cde-preference is enabled', async () => {
    const fake = buildFakeOneSignal({
      [CDE_PREFERENCE_TAG]: CDE_PREFERENCE_ENABLED,
      aktien: '4',
    });
    await applyChannelVisitIncrementsIfGated(fake.client, [
      'aktien',
      'finanzen',
    ]);
    expect(fake.addTags).toHaveBeenCalledWith({
      aktien: '5',
      finanzen: '1',
    });
  });

  it('skips writes when cde-preference is not "1"', async () => {
    const fake = buildFakeOneSignal({
      [CDE_PREFERENCE_TAG]: CDE_PREFERENCE_DISABLED,
    });
    await applyChannelVisitIncrementsIfGated(fake.client, ['aktien']);
    expect(fake.addTags).not.toHaveBeenCalled();
  });

  it('skips writes when there are no channel visit keys', async () => {
    const fake = buildFakeOneSignal({
      [CDE_PREFERENCE_TAG]: CDE_PREFERENCE_ENABLED,
    });
    await applyChannelVisitIncrementsIfGated(fake.client, []);
    expect(fake.addTags).not.toHaveBeenCalled();
  });
});

describe('setupOneSignalListeners', () => {
  beforeEach(() => {
    setOneSignalPageContext({
      subCatValue: 'finanzen',
      channelVisitTagKeys: ['aktien'],
    });
  });
  afterEach(() => {
    setOneSignalPageContext({ subCatValue: null, channelVisitTagKeys: [] });
    jest.restoreAllMocks();
  });

  it('on opt-in: writes cde-preference=1, increments tags, and syncs sub_cat', async () => {
    const fake = buildFakeOneSignal();
    setupOneSignalListeners(fake.client, { enablePageTagSync: true });

    expect(fake.pushSubscriptionListeners).toHaveLength(1);
    await fake.pushSubscriptionListeners[0]({
      previous: { optedIn: false },
      current: { optedIn: true },
    });

    expect(fake.addTags).toHaveBeenCalledWith({
      [CDE_PREFERENCE_TAG]: CDE_PREFERENCE_ENABLED,
      aktien: '1',
      [SUB_CAT_TAG]: 'finanzen',
    });
    expect(fake.addTags).toHaveBeenCalledWith({ [SUB_CAT_TAG]: 'finanzen' });
  });

  it('on opt-out: writes cde-preference=0', async () => {
    const fake = buildFakeOneSignal();
    setupOneSignalListeners(fake.client, { enablePageTagSync: true });

    await fake.pushSubscriptionListeners[0]({
      previous: { optedIn: true },
      current: { optedIn: false },
    });

    expect(fake.addTags).toHaveBeenCalledWith({
      [CDE_PREFERENCE_TAG]: CDE_PREFERENCE_DISABLED,
    });
  });

  it('on permissionChange granted: syncs sub_cat', async () => {
    const fake = buildFakeOneSignal();
    setupOneSignalListeners(fake.client, { enablePageTagSync: true });

    expect(fake.notificationListeners).toHaveLength(1);
    await fake.notificationListeners[0](true);
    expect(fake.addTags).toHaveBeenCalledWith({ [SUB_CAT_TAG]: 'finanzen' });
  });

  it('on permissionChange not granted: no-op', async () => {
    const fake = buildFakeOneSignal();
    setupOneSignalListeners(fake.client, { enablePageTagSync: true });
    await fake.notificationListeners[0](false);
    expect(fake.addTags).not.toHaveBeenCalled();
  });

  it('does not throw when subscription change handler errors internally', async () => {
    const fake = buildFakeOneSignal();
    fake.addTags.mockRejectedValueOnce(new Error('boom'));
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    setupOneSignalListeners(fake.client, { enablePageTagSync: true });
    await expect(
      fake.pushSubscriptionListeners[0]({
        previous: { optedIn: true },
        current: { optedIn: false },
      }),
    ).resolves.toBeUndefined();
    expect(warn).toHaveBeenCalled();
  });
});
