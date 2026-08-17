import { ComponentType, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultOptions, scrollToAnchorElement } from '../SmoothScroll/helpers';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { setDeviceId } from '../../../shared/actions/auth';
import { setNavigationVisible } from '../../../shared/actions/navigation';
import { setExternalSubscription } from '../../../shared/actions/piano';
import { Auth0 } from '../Auth0Provider';
import { useStableNavigate } from '../../../shared/hooks/useStableNavigateContext';
import { TYPE_NAVIGATION_MENU_USER } from './constants';
const addedListeners = {};
const HYBRID_APP_EVENT_PREFIX = 'RASCH-HYBRID-APP';
export const WEB_APP_EVENT_NAMESPACE = 'WEB';
const NATIVE_APP_EVENT_NAMESPACE = 'NATIVE';

export const getEventName = (name: string, namespace: string): string =>
  `${HYBRID_APP_EVENT_PREFIX}-${namespace}-${name}`;

export const dispatchHybridAppEvent = (name: string, detail: any): void => {
  if (typeof CustomEvent === 'undefined') {
    return;
  }
  const event = new CustomEvent(
    getEventName(name, NATIVE_APP_EVENT_NAMESPACE),
    {
      detail,
    },
  );

  global.dispatchEvent(event);
};

export const addWebAppEventListener = (
  name: string,
  handler: (event: CustomEvent) => void,
): void => {
  const extendendName = getEventName(name, WEB_APP_EVENT_NAMESPACE);
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
  if (addedListeners[extendendName]) return;
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
  addedListeners[extendendName] = handler;

  window.addEventListener(extendendName, handler);
};

export const removeWebAppEventListener = (
  name: string,
  handler: (event: CustomEvent) => void,
): void => {
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
  delete addedListeners[getEventName(name, WEB_APP_EVENT_NAMESPACE)];
  window.removeEventListener(
    getEventName(name, WEB_APP_EVENT_NAMESPACE),
    handler,
  );
};

type HybridAppEventConfig = {
  name: string;
  handler: (event: CustomEvent) => void;
};

type HybridAppNavigateFunction = (href: string) => void;

type HybridAppProviderFactoryOptions = {
  useNavigate?: () => HybridAppNavigateFunction;
};

export const createHybridAppProvider = ({
  useNavigate = useStableNavigate,
}: HybridAppProviderFactoryOptions = {}): ComponentType => {
  return () => {
    const navigate = useNavigate();
    const isHybridApp = useSelector(
      (state: ReduxState) => locationStateSelector(state)?.isHybridApp || false,
    );
    const dispatch = useDispatch();

    const nativeEvents = useMemo<Array<HybridAppEventConfig>>(
      () => [
        {
          name: getEventName('navigate', WEB_APP_EVENT_NAMESPACE),
          handler: (event) => {
            if (event?.detail?.href) {
              if (event?.detail?.href?.startsWith('/authorize')) {
                window.location.href = event?.detail?.href;
              } else {
                navigate(event.detail.href);
              }
            }
          },
        },
        {
          name: getEventName('menu-user-open', WEB_APP_EVENT_NAMESPACE),
          handler: () => {
            dispatch(setNavigationVisible(TYPE_NAVIGATION_MENU_USER));
          },
        },
        {
          name: getEventName('menu-user-close', WEB_APP_EVENT_NAMESPACE),
          handler: () => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
            dispatch(setNavigationVisible(null));
          },
        },
        {
          name: getEventName('handle-comments-click', WEB_APP_EVENT_NAMESPACE),
          handler: () => {
            scrollToAnchorElement('comments', {
              ...defaultOptions,
              replace: true,
            });
          },
        },
        {
          name: getEventName(
            'register-onesignal-player-id',
            WEB_APP_EVENT_NAMESPACE,
          ),
          handler: (event) => {
            dispatch(setDeviceId(event?.detail?.playerId));
          },
        },
        {
          name: getEventName('register-iap', WEB_APP_EVENT_NAMESPACE),
          handler: () => {
            const externalSubscription = [{ gid: 'in-app' }];
            dispatch(setExternalSubscription(externalSubscription));
            Auth0.setExternalSubscription(externalSubscription);
          },
        },
        {
          name: getEventName('one-trust-allow', WEB_APP_EVENT_NAMESPACE),
          handler: (event) => {
            if (event?.detail?.enable) {
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              global?.OneTrust?.AllowAll();
            }
          },
        },
        {
          name: getEventName('one-trust-disallow', WEB_APP_EVENT_NAMESPACE),
          handler: (event) => {
            if (event?.detail?.enable) {
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              global?.OneTrust?.RejectAll();
            }
          },
        },
        {
          name: getEventName('one-trust-info-display', WEB_APP_EVENT_NAMESPACE),
          handler: () => {
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            global?.OneTrust?.ToggleInfoDisplay();
          },
        },
      ],
      [dispatch, navigate],
    );

    useEffect(() => {
      if (isHybridApp) {
        nativeEvents.forEach((event) => {
          window.addEventListener(event.name, event.handler);
        });
      }

      return () => {
        nativeEvents.forEach((event) => {
          window.removeEventListener(event.name, event.handler);
        });
      };
    }, [isHybridApp, nativeEvents]);

    return null;
  };
};

const HybridAppProvider = createHybridAppProvider();

export default HybridAppProvider;
