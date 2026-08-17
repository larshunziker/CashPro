import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPianoBrowserMetadata } from '../../../shared/actions/piano';
import {
  getChannelTagKeys,
  getPushNotificationSubCatValue,
} from '../../../shared/helpers/oneSignal/getPushNotificationSubCatValue';
import { resolveChannelHierarchyForOneSignal } from '../../../shared/helpers/oneSignal/mapChannelHierarchy';
import { setOneSignalPageContext } from '../../../shared/helpers/oneSignal/oneSignalPageContext';
import {
  applyChannelVisitIncrementsIfGated,
  setupOneSignalListeners,
} from '../../../shared/helpers/oneSignal/oneSignalTagSync';
import { registerSlidedownCategoryRetry } from '../../../shared/helpers/oneSignal/slidedownCategoryRetry';
import useRaschRouterLocation from '../../../shared/hooks/useRaschRouterLocation';
import pianoStateSelector from '../../../shared/selectors/pianoStateSelector';
import { ONE_SIGNAL_PAGE_SDK_URL } from '../../../shared/helpers/oneSignal/constants';
import type { OneSignalV16Client } from '../../../shared/helpers/oneSignal/types';
import type {
  OneSignalProviderProps,
  PushNotificationsConfig,
  PushState,
} from './typings';
import './styles.legacy.css';

const LOG_PREFIX = '[OneSignalProvider]';

const warn = (message: string, error?: unknown): void => {
  // eslint-disable-next-line no-console -- provider must surface init/runtime failures
  console.warn(`${LOG_PREFIX} ${message}`, error);
};

const ONE_SIGNAL_APP_ID: string = (() => {
  if (__ONESIGNAL_APP_ID__) {
    return String(__ONESIGNAL_APP_ID__);
  }
  if (__DEVELOPMENT__ && __DEV_ONESIGNAL_APP_ID__) {
    return String(__DEV_ONESIGNAL_APP_ID__);
  }
  return '';
})();

const shouldInitOneSignal: boolean = Boolean(
  ONE_SIGNAL_APP_ID && __CLIENT__ && __WEB_PUSH_ENABLED__,
);

const isOneSignalInitQueued = (): boolean =>
  Boolean(globalThis.__oneSignalInitQueued);

const markOneSignalInitQueued = (): void => {
  globalThis.__oneSignalInitQueued = true;
};

const ensureOneSignalDeferred = (): void => {
  globalThis.OneSignalDeferred = globalThis.OneSignalDeferred || [];
};

const ensureWebPushNotifications = (): NonNullable<
  typeof globalThis.webPushNotifications
> => {
  globalThis.webPushNotifications = globalThis.webPushNotifications || {};
  return globalThis.webPushNotifications;
};

const loadOneSignalPageSdk = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[src="${ONE_SIGNAL_PAGE_SDK_URL}"]`,
    );
    if (existing) {
      resolve();
      return;
    }

    const scriptElement = document.createElement('script');
    scriptElement.src = ONE_SIGNAL_PAGE_SDK_URL;
    scriptElement.defer = true;
    scriptElement.onload = () => resolve();
    scriptElement.onerror = () =>
      reject(new Error('OneSignal SDK failed to load'));
    document.head.appendChild(scriptElement);
  });

/**
 * Maps OneSignal's boolean permission + the browser's tri-state Notification
 * API into a single `'default' | 'granted' | 'denied'` value. We prefer the
 * native `Notification.permission` because v16's `permission: false` cannot
 * distinguish "denied" from "not yet asked".
 */
const resolveNotificationsPermission = (
  oneSignal: OneSignalV16Client,
): PushState['notificationsPermission'] => {
  const onesignalGranted = oneSignal.Notifications?.permission === true;
  const browserPermission =
    typeof Notification !== 'undefined' ? Notification.permission : 'default';

  if (onesignalGranted || browserPermission === 'granted') {
    return 'granted';
  }
  if (browserPermission === 'denied') {
    return 'denied';
  }
  return 'default';
};

const readPushState = (oneSignal: OneSignalV16Client): PushState => ({
  isPushNotificationsSupported:
    typeof oneSignal.Notifications?.isPushSupported === 'function'
      ? oneSignal.Notifications.isPushSupported()
      : false,
  isPushNotificationsEnabled: Boolean(oneSignal.User.PushSubscription.optedIn),
  notificationsPermission: resolveNotificationsPermission(oneSignal),
});

const promptPush = async (
  oneSignal: OneSignalV16Client,
  isSlidedownPromptEnabled: boolean,
): Promise<void> => {
  if (isSlidedownPromptEnabled && oneSignal.Slidedown?.promptPush) {
    await oneSignal.Slidedown.promptPush({ force: true });
    return;
  }

  if (oneSignal.Notifications?.requestPermission) {
    await oneSignal.Notifications.requestPermission();
  }
};

const updatePageTagContext = (
  pathname: string,
  channelsHierarchy: string[] | undefined,
): string[] => {
  const channelHierarchy = resolveChannelHierarchyForOneSignal({
    channelHierarchy: channelsHierarchy,
  });
  const subCatValue = getPushNotificationSubCatValue({
    pathname,
    channelHierarchy,
  });
  const channelVisitTagKeys = getChannelTagKeys({
    pathname,
    channelHierarchy,
  });
  setOneSignalPageContext({ subCatValue, channelVisitTagKeys });
  return channelVisitTagKeys;
};

const buildSlidedownPrompt = (
  config: PushNotificationsConfig,
): Record<string, unknown> => {
  const { categories, slidePromptOptions, autoPromptSlidedown, prompt } =
    config;

  const basePrompt: Record<string, unknown> = {
    autoPrompt: Boolean(autoPromptSlidedown),
    text: {
      actionMessage: prompt.actionMessage,
      acceptButton: prompt.acceptButton,
      cancelButton: prompt.cancelButton,
    },
    delay: {
      pageViews: slidePromptOptions.pageViews,
      timeDelay: slidePromptOptions.timeDelay,
    },
  };

  if (categories && categories.length > 0) {
    return { ...basePrompt, type: 'category', categories };
  }

  return { ...basePrompt, type: 'push' };
};

const buildNotifyButtonOptions = (
  config: PushNotificationsConfig,
): Record<string, unknown> => {
  if (!config.notifyBellEnabled || !config.bell) {
    return { enable: false };
  }

  const { bell } = config;

  return {
    enable: true,
    prenotify: true,
    displayPredicate: () =>
      typeof Notification !== 'undefined' &&
      Notification.permission === 'granted',
    text: {
      'tip.state.unsubscribed': bell.tipStateUnsubscribed,
      'tip.state.subscribed': bell.tipStateSubscribed,
      'dialog.main.title': bell.dialogMainTitle,
      'dialog.main.button.subscribe': bell.dialogMainButtonSubscribe,
      'dialog.main.button.unsubscribe': bell.dialogMainButtonUnsubscribe,
    },
  };
};

const exposeRequestPromptOnGlobal = (oneSignal: OneSignalV16Client): void => {
  const webPush = ensureWebPushNotifications();
  webPush.requestPrompt = (isSlidedownPromptEnabled: boolean): void => {
    promptPush(oneSignal, isSlidedownPromptEnabled).catch((error) => {
      warn('prompt failed', error);
    });
  };
};

const queueOneSignalInit = (
  config: PushNotificationsConfig,
  channelVisitTagKeys: string[],
  onPushStateChange: (state: PushState) => void,
  slidedownRetryDisposeRef: { current: (() => void) | null },
): void => {
  if (isOneSignalInitQueued()) {
    return;
  }

  if (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'denied'
  ) {
    return;
  }

  if (!ONE_SIGNAL_APP_ID) {
    warn('Missing OneSignal app id');
    return;
  }

  markOneSignalInitQueued();
  globalThis.OneSignalDeferred.push(async (OneSignal) => {
    try {
      await OneSignal.init({
        appId: ONE_SIGNAL_APP_ID,
        ...(__DEVELOPMENT__ ? { allowLocalhostAsSecureOrigin: true } : {}),
        welcomeNotification: {
          title: config.welcomeNotification.title,
          message: config.welcomeNotification.message,
        },
        notifyButton: buildNotifyButtonOptions(config),
        promptOptions: {
          slidedown: {
            prompts: [buildSlidedownPrompt(config)],
          },
        },
        autoResubscribe: true,
      });

      // Exposed so PianoProvider (and similar consumers) can request the
      // prompt without depending on the OneSignal SDK directly.
      exposeRequestPromptOnGlobal(OneSignal);

      const reportPushState = setupOneSignalListeners(OneSignal, {
        subscribeTags: config.subscribeTags,
        enablePageTagSync: Boolean(config.enablePageTagSync),
        onReportPushState: () => onPushStateChange(readPushState(OneSignal)),
      });

      if (config.enablePageTagSync) {
        await applyChannelVisitIncrementsIfGated(
          OneSignal,
          channelVisitTagKeys,
        );
      }

      // Verifies that the categories the user picked in the slidedown ended
      // up persisted as user tags; rewrites them once if the SDK lost them.
      if (config.categories && config.categories.length > 0) {
        slidedownRetryDisposeRef.current =
          registerSlidedownCategoryRetry(OneSignal);
      }

      await reportPushState();
    } catch (error) {
      warn('OneSignal init failed', error);
    }
  });
};

const OneSignalProvider = ({ config }: OneSignalProviderProps): null => {
  const { pathname: routePathname } = useRaschRouterLocation();
  const dispatch = useDispatch();
  const pianoPageMetadata = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => pianoStateSelector(state).pageMetadata,
  );
  const browserMode = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => pianoStateSelector(state).browserMetadata?.browserMode,
  );
  const pathname = routePathname || pianoPageMetadata.pathname || '/';
  const lastVisitSyncKeyRef = useRef<string>('');
  const slidedownRetryDisposeRef = useRef<(() => void) | null>(null);
  // Kept in a ref so the OneSignalDeferred callback (which captures it once
  // when init runs) always reads the latest value without re-queuing init.
  const browserModeRef = useRef<string>(browserMode || 'normal');

  useEffect(() => {
    browserModeRef.current = browserMode || 'normal';
  }, [browserMode]);

  useEffect(() => {
    if (!shouldInitOneSignal || !config) {
      return;
    }

    ensureOneSignalDeferred();

    let initialVisitTagKeys: string[] = [];
    if (config.enablePageTagSync) {
      initialVisitTagKeys = updatePageTagContext(
        pathname,
        pianoPageMetadata.channelsHierarchy,
      );
      lastVisitSyncKeyRef.current = `${pathname}|${initialVisitTagKeys.join(',')}`;
    }

    queueOneSignalInit(
      config,
      initialVisitTagKeys,
      (pushState) => {
        dispatch(
          setPianoBrowserMetadata({
            browserMode: browserModeRef.current || 'normal',
            ...pushState,
          }),
        );
      },
      slidedownRetryDisposeRef,
    );

    loadOneSignalPageSdk().catch((error) => {
      warn('SDK load failed', error);
    });

    return () => {
      slidedownRetryDisposeRef.current?.();
      slidedownRetryDisposeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap once on mount
  }, []);

  useEffect(() => {
    if (
      !shouldInitOneSignal ||
      !config?.enablePageTagSync ||
      !isOneSignalInitQueued()
    ) {
      return;
    }

    const channelVisitTagKeys = updatePageTagContext(
      pathname,
      pianoPageMetadata.channelsHierarchy,
    );
    const syncKey = `${pathname}|${channelVisitTagKeys.join(',')}`;

    if (syncKey === lastVisitSyncKeyRef.current) {
      return;
    }
    lastVisitSyncKeyRef.current = syncKey;

    globalThis.OneSignalDeferred.push(async (OneSignal) => {
      try {
        await applyChannelVisitIncrementsIfGated(
          OneSignal,
          channelVisitTagKeys,
        );
      } catch (error) {
        warn('channel visit tag sync failed', error);
      }
    });
  }, [
    pathname,
    pianoPageMetadata.channelsHierarchy,
    config?.enablePageTagSync,
  ]);

  return null;
};

export default OneSignalProvider;
