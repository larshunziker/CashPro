/** OneSignal Web SDK v16 — page (main thread) bundle. */
export const ONE_SIGNAL_PAGE_SDK_URL =
  'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';

/** OneSignal Web SDK v16 — service worker bundle (loaded via `importScripts` from the site worker shim). */
export const ONE_SIGNAL_SW_SDK_URL =
  'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js';

/**
 * OneSignal user-tag key that gates per-page channel visit increments.
 *
 * Lifecycle:
 * - Set to {@link CDE_PREFERENCE_ENABLED} on push opt-in.
 * - Set to {@link CDE_PREFERENCE_DISABLED} on push opt-out.
 * - Visit counters (`getChannelTagKeys` results) are incremented only while
 *   the value is {@link CDE_PREFERENCE_ENABLED}.
 *
 * The string value must match the corresponding category tag in the OneSignal
 * dashboard (see `src/cash/config/pushNotifications.ts`).
 */
export const CDE_PREFERENCE_TAG = 'cde-preference';
export const CDE_PREFERENCE_ENABLED = '1';
export const CDE_PREFERENCE_DISABLED = '0';

/** OneSignal user-tag key that captures the deepest channel for the current page. */
export const SUB_CAT_TAG = 'sub_cat';
