import type { OneSignalV16Client } from './types';

const ALLOW_BUTTON_ID = 'onesignal-slidedown-allow-button';
const CATEGORY_INPUT_SELECTOR = '.onesignal-category-label-input';
const CATEGORY_TAG_ENABLED = '1';
const VERIFY_DELAY_MS = 3000;
const LOG_PREFIX = '[OneSignal:slidedownRetry]';

const warn = (message: string, error?: unknown): void => {
  // eslint-disable-next-line no-console -- helpers must surface failures
  console.warn(`${LOG_PREFIX} ${message}`, error);
};

const readCheckedCategoryValues = (): string[] => {
  if (typeof document === 'undefined') {
    return [];
  }
  const inputs = document.querySelectorAll<HTMLInputElement>(
    CATEGORY_INPUT_SELECTOR,
  );
  return Array.from(inputs)
    .filter((input) => input.checked && Boolean(input.value))
    .map((input) => input.value);
};

const restoreCategoryTagsIfMissing = async (
  oneSignal: OneSignalV16Client,
  expectedCheckedKeys: string[],
): Promise<void> => {
  if (expectedCheckedKeys.length === 0) {
    return;
  }

  const currentTags = oneSignal.User.getTags() || {};
  const missingKeys = expectedCheckedKeys.filter(
    (key) => currentTags[key] !== CATEGORY_TAG_ENABLED,
  );

  if (missingKeys.length === 0) {
    return;
  }

  const tagsToRestore: Record<string, string> = {};
  missingKeys.forEach((key) => {
    tagsToRestore[key] = CATEGORY_TAG_ENABLED;
  });

  try {
    await oneSignal.User.addTags(tagsToRestore);
  } catch (error) {
    warn('failed to restore category tags', error);
  }
};

/**
 * Listens for clicks on the OneSignal slidedown "Allow" button and verifies,
 * after {@link VERIFY_DELAY_MS}, that the categories the user checked ended
 * up persisted as user tags. Any tag that is missing or not equal to `'1'`
 * is rewritten once.
 *
 * Works around a v16 race where the slidedown can resolve before tags
 * propagate to the OneSignal user, leaving the subscription with no category
 * preferences even though the user clicked subscribe.
 */
export const registerSlidedownCategoryRetry = (
  oneSignal: OneSignalV16Client,
): (() => void) => {
  if (typeof document === 'undefined') {
    return () => undefined;
  }

  const pendingVerifyTimeouts: ReturnType<typeof setTimeout>[] = [];

  const handleClick = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const allowButton = target.closest(`#${ALLOW_BUTTON_ID}`);
    if (!allowButton) {
      return;
    }

    const checkedCategoryKeys = readCheckedCategoryValues();
    if (checkedCategoryKeys.length === 0) {
      return;
    }

    const timeoutId = globalThis.setTimeout(() => {
      const index = pendingVerifyTimeouts.indexOf(timeoutId);
      if (index >= 0) {
        pendingVerifyTimeouts.splice(index, 1);
      }
      restoreCategoryTagsIfMissing(oneSignal, checkedCategoryKeys).catch(
        (error) => {
          warn('verification failed', error);
        },
      );
    }, VERIFY_DELAY_MS);
    pendingVerifyTimeouts.push(timeoutId);
  };

  document.addEventListener('click', handleClick, true);

  return () => {
    document.removeEventListener('click', handleClick, true);
    pendingVerifyTimeouts.forEach((timeoutId) => {
      globalThis.clearTimeout(timeoutId);
    });
    pendingVerifyTimeouts.length = 0;
  };
};
