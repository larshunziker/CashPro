/**
 * OneSignal Web SDK v16 — minimal TypeScript surface for this codebase.
 *
 * Only APIs we call are declared. Import from this module in app code;
 * `src/shared/@types/global.d.ts` reuses these types for `OneSignalDeferred`
 * and `globalThis.webPushNotifications`.
 */

export type OneSignalNotificationsApi = {
  isPushSupported?: () => boolean;
  /** Documented as boolean in v16; mocks may still use string literals in tests. */
  permission?: boolean | 'default' | 'granted' | 'denied';
  requestPermission?: () => Promise<void>;
  addEventListener?: (
    event: string,
    listener: (granted: boolean) => void | Promise<void>,
  ) => void;
};

export type OneSignalSlidedownApi = {
  promptPush?: (options?: { force?: boolean }) => Promise<void>;
};

export type OneSignalSubscriptionChangeEvent = {
  previous?: { optedIn?: boolean };
  current?: { optedIn?: boolean };
};

export type OneSignalPushSubscriptionApi = {
  optedIn?: boolean;
  addEventListener: (
    event: string,
    listener: (event: OneSignalSubscriptionChangeEvent) => void | Promise<void>,
  ) => void;
};

export type OneSignalUserApi = {
  PushSubscription: OneSignalPushSubscriptionApi;
  addTags(tags: Record<string, string>): Promise<void>;
  removeTags?(keys: string[]): Promise<void>;
  getTags(): Record<string, unknown> | null | undefined;
};

/** Minimal client shape for reading tags (visit counters, global helper typing). */
export type OneSignalClientForVisitTags = {
  User: Pick<OneSignalUserApi, 'getTags'>;
};

export type OneSignalV16Client = {
  init(options: Record<string, unknown>): Promise<void>;
  Notifications?: OneSignalNotificationsApi;
  Slidedown?: OneSignalSlidedownApi;
  User: OneSignalUserApi;
};

export type WebPushNotificationsGlobal = {
  requestPrompt?: (isSlidedownPromptEnabled: boolean) => void;
};
