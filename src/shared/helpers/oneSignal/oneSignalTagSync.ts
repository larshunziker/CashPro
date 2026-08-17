import {
  CDE_PREFERENCE_DISABLED,
  CDE_PREFERENCE_ENABLED,
  CDE_PREFERENCE_TAG,
  SUB_CAT_TAG,
} from './constants';
import { incrementPageViewCounts } from './oneSignalChannelVisitTags';
import { getOneSignalPageContext } from './oneSignalPageContext';
import type { OneSignalV16Client } from './types';

const TAG_RETRY_DELAY_MS = 400;
const LOG_PREFIX = '[OneSignal:tagSync]';

const warn = (message: string, error?: unknown): void => {
  // eslint-disable-next-line no-console -- helpers must surface failures
  console.warn(`${LOG_PREFIX} ${message}`, error);
};

export type SetupOneSignalListenersOptions = {
  /** Flat map of user tags written on subscribe. */
  subscribeTags?: Record<string, string>;
  /** Enables `sub_cat`, visit counters, and `cde-preference` tag sync. */
  enablePageTagSync?: boolean;
  /** Called after subscription/permission changes (e.g. Piano `browserMetadata`). */
  onReportPushState?: () => void | Promise<void>;
};

/**
 * Calls `addTags` once and retries a single time on failure, with a short
 * delay. Returns silently on success or after the retry attempt — failures are
 * logged but never thrown so they cannot break the surrounding render loop.
 */
export const applyUserTagsWithRetry = async (
  oneSignal: OneSignalV16Client,
  tags: Record<string, string>,
): Promise<void> => {
  const keys = Object.keys(tags);
  if (keys.length === 0) {
    return;
  }
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await oneSignal.User.addTags(tags);
      return;
    } catch (error) {
      lastError = error;
      if (attempt === 0) {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, TAG_RETRY_DELAY_MS);
        });
      }
    }
  }

  warn('addTags failed after retry', lastError);
};

export const syncSubCatInOneSignal = async (
  oneSignal: OneSignalV16Client,
  subCatValue: string | null,
): Promise<void> => {
  if (!subCatValue) {
    return;
  }
  try {
    await oneSignal.User.addTags({ [SUB_CAT_TAG]: subCatValue });
  } catch (error) {
    warn(`${SUB_CAT_TAG} sync failed`, error);
  }
};

/**
 * Increments the visit counters for the current page, but only when the user
 * has explicitly enabled the `cde-preference` category in the slidedown. This
 * gating prevents tag pollution for users who are subscribed but have not
 * opted into personalised content.
 */
export const applyChannelVisitIncrementsIfGated = async (
  oneSignal: OneSignalV16Client,
  channelVisitTagKeys: string[],
): Promise<void> => {
  const existingUserTags = oneSignal.User.getTags() || {};
  if (existingUserTags[CDE_PREFERENCE_TAG] !== CDE_PREFERENCE_ENABLED) {
    return;
  }

  const visitTags = incrementPageViewCounts(oneSignal, channelVisitTagKeys);
  if (Object.keys(visitTags).length === 0) {
    return;
  }

  try {
    await oneSignal.User.addTags(visitTags);
  } catch (error) {
    warn('channel visit tags failed', error);
  }
};

const writeSubscribeTags = async (
  oneSignal: OneSignalV16Client,
  tags: Record<string, string>,
): Promise<void> => {
  try {
    await oneSignal.User.addTags(tags);
  } catch (error) {
    warn('subscribe tags write failed', error);
  }
};

export const setupOneSignalListeners = (
  oneSignal: OneSignalV16Client,
  options: SetupOneSignalListenersOptions = {},
): (() => Promise<void>) => {
  const {
    subscribeTags,
    enablePageTagSync = false,
    onReportPushState,
  } = options;

  const reportPushState = async (): Promise<void> => {
    if (onReportPushState) {
      await onReportPushState();
    }
  };

  oneSignal.User.PushSubscription.addEventListener('change', async (event) => {
    try {
      if (enablePageTagSync) {
        const { subCatValue, channelVisitTagKeys } = getOneSignalPageContext();
        const previouslyOptedIn = event.previous?.optedIn === true;
        const currentlyOptedIn = event.current?.optedIn === true;

        if (currentlyOptedIn && !previouslyOptedIn) {
          const visitTagsOnOptIn = incrementPageViewCounts(
            oneSignal,
            channelVisitTagKeys,
          );
          const tagsOnOptIn: Record<string, string> = {
            [CDE_PREFERENCE_TAG]: CDE_PREFERENCE_ENABLED,
            ...visitTagsOnOptIn,
          };
          if (subCatValue) {
            tagsOnOptIn[SUB_CAT_TAG] = subCatValue;
          }
          await applyUserTagsWithRetry(oneSignal, tagsOnOptIn);
        }

        if (!currentlyOptedIn && previouslyOptedIn) {
          await oneSignal.User.addTags({
            [CDE_PREFERENCE_TAG]: CDE_PREFERENCE_DISABLED,
          });
        }
        await syncSubCatInOneSignal(oneSignal, subCatValue);
      }

      if (subscribeTags) {
        const currentlyOptedIn = Boolean(event.current?.optedIn);
        const previouslyOptedIn = Boolean(event.previous?.optedIn);
        if (currentlyOptedIn && !previouslyOptedIn) {
          await writeSubscribeTags(oneSignal, subscribeTags);
        }
      }
    } catch (error) {
      warn('subscription change handler failed', error);
    }

    await reportPushState();
  });

  if (typeof oneSignal.Notifications?.addEventListener === 'function') {
    oneSignal.Notifications.addEventListener(
      'permissionChange',
      async (granted) => {
        try {
          if (granted && enablePageTagSync) {
            const { subCatValue } = getOneSignalPageContext();
            await syncSubCatInOneSignal(oneSignal, subCatValue);
          }
        } catch (error) {
          warn('permission change handler failed', error);
        }
        await reportPushState();
      },
    );
  }

  return reportPushState;
};
