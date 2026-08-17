import { registerSlidedownCategoryRetry } from '../slidedownCategoryRetry';
import type { OneSignalV16Client } from '../types';

const buildSlidedown = (
  selections: Array<{ value: string; checked: boolean }>,
): HTMLDivElement => {
  const container = document.createElement('div');
  container.id = 'onesignal-slidedown-container';

  selections.forEach(({ value, checked }) => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'onesignal-category-label-input';
    input.value = value;
    input.checked = checked;
    container.appendChild(input);
  });

  const allowButton = document.createElement('button');
  allowButton.id = 'onesignal-slidedown-allow-button';
  container.appendChild(allowButton);

  document.body.appendChild(container);
  return container;
};

const createClient = (
  tags: Record<string, string> = {},
): {
  client: OneSignalV16Client;
  addTags: jest.Mock;
  getTags: jest.Mock;
} => {
  const addTags = jest.fn().mockResolvedValue(undefined);
  const getTags = jest.fn().mockReturnValue(tags);

  const client = {
    init: jest.fn(),
    User: {
      PushSubscription: {
        optedIn: false,
        addEventListener: jest.fn(),
      },
      addTags,
      getTags,
    },
  } as unknown as OneSignalV16Client;

  return { client, addTags, getTags };
};

const VERIFY_DELAY_MS = 3000;

describe('[shared] registerSlidedownCategoryRetry', () => {
  let verifyDelayCallbacks: Map<ReturnType<typeof setTimeout>, () => void>;
  let nextTimeoutId: number;

  beforeEach(() => {
    verifyDelayCallbacks = new Map();
    nextTimeoutId = 1;
    const realSetTimeout = globalThis.setTimeout;
    const realClearTimeout = globalThis.clearTimeout;
    jest
      .spyOn(globalThis, 'setTimeout')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- test code
      .mockImplementation(((
        callback: () => void,
        delay?: number,
        ...rest: any[]
      ) => {
        if (delay === VERIFY_DELAY_MS) {
          const timeoutId = nextTimeoutId++ as unknown as ReturnType<
            typeof setTimeout
          >;
          verifyDelayCallbacks.set(timeoutId, callback);
          return timeoutId;
        }
        return realSetTimeout(callback, delay, ...rest);
      }) as typeof setTimeout);
    jest.spyOn(globalThis, 'clearTimeout').mockImplementation((timeoutId) => {
      verifyDelayCallbacks.delete(timeoutId as ReturnType<typeof setTimeout>);
      realClearTimeout(timeoutId);
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  const flushTimers = async (): Promise<void> => {
    const callbacks = [...verifyDelayCallbacks.values()];
    verifyDelayCallbacks.clear();
    for (const callback of callbacks) {
      callback();
      await Promise.resolve();
    }
  };

  it('does nothing when no checkboxes are checked', async () => {
    buildSlidedown([
      { value: 'cde-preference', checked: false },
      { value: 'news-preference', checked: false },
    ]);

    const { client, addTags } = createClient();
    registerSlidedownCategoryRetry(client);

    document.getElementById('onesignal-slidedown-allow-button')?.click();
    await flushTimers();

    expect(verifyDelayCallbacks.size).toBe(0);
    expect(addTags).not.toHaveBeenCalled();
  });

  it('does not restore when all checked categories are already tagged with "1"', async () => {
    buildSlidedown([
      { value: 'cde-preference', checked: true },
      { value: 'news-preference', checked: true },
    ]);

    const { client, addTags } = createClient({
      'cde-preference': '1',
      'news-preference': '1',
    });
    registerSlidedownCategoryRetry(client);

    document.getElementById('onesignal-slidedown-allow-button')?.click();
    await flushTimers();

    expect(addTags).not.toHaveBeenCalled();
  });

  it('restores only the missing checked categories', async () => {
    buildSlidedown([
      { value: 'cde-preference', checked: true },
      { value: 'top-news-preference', checked: true },
      { value: 'kolumne-preference', checked: false },
    ]);

    const { client, addTags } = createClient({
      'cde-preference': '1',
    });
    registerSlidedownCategoryRetry(client);

    document.getElementById('onesignal-slidedown-allow-button')?.click();
    await flushTimers();

    expect(addTags).toHaveBeenCalledTimes(1);
    expect(addTags).toHaveBeenCalledWith({ 'top-news-preference': '1' });
  });

  it('restores all checked categories when getTags returns nothing', async () => {
    buildSlidedown([
      { value: 'cde-preference', checked: true },
      { value: 'invest-preference', checked: true },
    ]);

    const { client, addTags } = createClient();
    registerSlidedownCategoryRetry(client);

    document.getElementById('onesignal-slidedown-allow-button')?.click();
    await flushTimers();

    expect(addTags).toHaveBeenCalledWith({
      'cde-preference': '1',
      'invest-preference': '1',
    });
  });

  it('also fires when the click target is inside the allow button', async () => {
    buildSlidedown([{ value: 'cde-preference', checked: true }]);

    const { client, addTags } = createClient();
    registerSlidedownCategoryRetry(client);

    const allowButton = document.getElementById(
      'onesignal-slidedown-allow-button',
    );
    const innerSpan = document.createElement('span');
    allowButton?.appendChild(innerSpan);
    innerSpan.click();
    await flushTimers();

    expect(addTags).toHaveBeenCalledWith({ 'cde-preference': '1' });
  });

  it('cleanup function removes the document-level click listener', async () => {
    buildSlidedown([{ value: 'cde-preference', checked: true }]);

    const { client, addTags } = createClient();
    const dispose = registerSlidedownCategoryRetry(client);
    dispose();

    document.getElementById('onesignal-slidedown-allow-button')?.click();
    await flushTimers();

    expect(verifyDelayCallbacks.size).toBe(0);
    expect(addTags).not.toHaveBeenCalled();
  });

  it('cleanup cancels a pending verify timeout after allow is clicked', async () => {
    buildSlidedown([{ value: 'cde-preference', checked: true }]);

    const { client, addTags } = createClient();
    const dispose = registerSlidedownCategoryRetry(client);

    document.getElementById('onesignal-slidedown-allow-button')?.click();

    dispose();
    await flushTimers();

    expect(addTags).not.toHaveBeenCalled();
  });
});
