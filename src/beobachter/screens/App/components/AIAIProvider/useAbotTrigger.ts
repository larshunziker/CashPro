import { useCallback, useEffect, useRef } from 'react';
import { RASCH_CUSTOM_EVENT_PREFIX } from '../../../../../common/components/PianoProvider';
import { dispatchHybridAppEvent } from '../../../../../common/components/HybridAppProvider';
import { useAiaibot } from './useAiaibot';
import { PIANO_EVENT_CHECKOUT_START } from '../../../../../shared/constants/piano';
import { AIAICHAT_TRIGGER_ID_ABOT } from '../../constants';

type UseAbotTriggerParams = {
  getAiaibot: GetAiaibot;
  dispatchChatbotEvent: () => void;
  hasAbotAccess: boolean;
  setIsAbotAccessGranted: (value: boolean) => void;
};
type GetAiaibot = ReturnType<typeof useAiaibot>['getAiaibot'];

export interface AbotTemplateParams {
  responseVariables?: {
    arbeitszeugnis_chatbot_access?: boolean;
  };
}

export const OPEN_CHATBOT_EVENT = `${RASCH_CUSTOM_EVENT_PREFIX}openChatbot`;

const CHECKOUT_START_EVENT = `RASCH-${PIANO_EVENT_CHECKOUT_START}`;
const CHECKOUT_CLOSE_EVENT = 'RASCH-checkoutClose';
const ABOT_PENDING_PROCESS_STORAGE_KEY =
  'arbeitszeugnis_chatbot_pending_process';

function setAbotPendingProcessFlag(value: boolean) {
  try {
    globalThis.sessionStorage?.setItem(
      ABOT_PENDING_PROCESS_STORAGE_KEY,
      value ? 'true' : 'false',
    );
  } catch {}
}

function isAbotPendingProcessFlagEnabled() {
  try {
    return (
      globalThis.sessionStorage?.getItem(ABOT_PENDING_PROCESS_STORAGE_KEY) ===
      'true'
    );
  } catch {
    return false;
  }
}

export function showAbotPianoModal() {
  globalThis.tp.push([
    'setCustomVariable',
    'arbeitszeugnis_chatbot_offer_shown',
    'true',
  ]);
  globalThis.tp.experience.execute();
}

export function resetAbotOfferShownPianoVariable() {
  if (typeof globalThis.tp?.push !== 'function') {
    return;
  }
  globalThis.tp.push([
    'setCustomVariable',
    'arbeitszeugnis_chatbot_offer_shown',
    null,
  ]);
}

export function registerPianoOfferOnUserInput(
  aiaibot: NonNullable<ReturnType<GetAiaibot>>,
  isHybridApp: boolean,
): void {
  aiaibot.onUserInput((input) => {
    if (input.type !== 'button-group') {
      return;
    }
    if (input.value.value !== 'f671eacd-9ac8-4d9b-a1ef-5ba2e2ddca2a') {
      return;
    }
    setAbotPendingProcessFlag(true);
    aiaibot.close();
    if (isHybridApp) {
      dispatchHybridAppEvent('openstore', {});
      return;
    }
    document.dispatchEvent(new CustomEvent('show-piano-modal', {}));
  });
}

export function useAbotTrigger({
  getAiaibot,
  dispatchChatbotEvent,
  hasAbotAccess,
  setIsAbotAccessGranted,
}: UseAbotTriggerParams) {
  const openedByEventListenerRef = useRef(false);
  const closeHandlerRegisteredRef = useRef(false);
  const isCheckoutInProgressRef = useRef(false);

  const handleOpenChatbot = useCallback(
    (options?: {
      isInsideMinistage?: boolean;
      abotAllowed?: boolean;
      skipFullscreen?: boolean;
    }) => {
      const aiaibot = getAiaibot();
      if (typeof aiaibot?.open !== 'function') {
        return;
      }

      aiaibot.close();
      aiaibot.setVariables?.({
        abotAllowed: options?.abotAllowed ?? hasAbotAccess,
      });

      const triggerAndFinish = () => {
        aiaibot.trigger(AIAICHAT_TRIGGER_ID_ABOT, 0, true);
        openedByEventListenerRef.current = true;
        if (options?.isInsideMinistage) {
          if (
            !closeHandlerRegisteredRef.current &&
            typeof aiaibot?.onEvent === 'function'
          ) {
            aiaibot.onEvent('aiaibot-close', () => {
              if (openedByEventListenerRef.current) {
                openedByEventListenerRef.current = false;
                dispatchChatbotEvent();
              }
            });
            closeHandlerRegisteredRef.current = true;
          }
        }
      };

      triggerAndFinish();

      if (!options?.skipFullscreen) {
        aiaibot?.toggleFullscreen?.();
      }
    },
    [getAiaibot, hasAbotAccess, dispatchChatbotEvent],
  );

  const checkoutCompleteHandler = useCallback(
    (conversion: CustomEvent<AbotTemplateParams>) => {
      if (conversion.detail?.responseVariables?.arbeitszeugnis_chatbot_access) {
        setIsAbotAccessGranted(true);
        if (isCheckoutInProgressRef.current) {
          handleOpenChatbot({ abotAllowed: true });
          isCheckoutInProgressRef.current = false;
        }
      }
    },
    [handleOpenChatbot, setIsAbotAccessGranted],
  );

  useEffect(() => {
    const checkoutStartHandler = () => {
      isCheckoutInProgressRef.current = true;
    };

    const checkoutCloseHandler = () => {
      const isCheckoutInProgress = isCheckoutInProgressRef.current;
      isCheckoutInProgressRef.current = false;
      if (isCheckoutInProgress && isAbotPendingProcessFlagEnabled()) {
        setAbotPendingProcessFlag(false);
        handleOpenChatbot();
      }
    };
    document.addEventListener(CHECKOUT_START_EVENT, checkoutStartHandler);
    document.addEventListener(CHECKOUT_CLOSE_EVENT, checkoutCloseHandler);
    document.addEventListener(
      `${RASCH_CUSTOM_EVENT_PREFIX}setResponseVariable`,
      checkoutCompleteHandler,
    );
    return () => {
      document.removeEventListener(CHECKOUT_START_EVENT, checkoutStartHandler);
      document.removeEventListener(CHECKOUT_CLOSE_EVENT, checkoutCloseHandler);
      document.removeEventListener(
        `${RASCH_CUSTOM_EVENT_PREFIX}setResponseVariable`,
        checkoutCompleteHandler,
      );
    };
  }, [checkoutCompleteHandler, handleOpenChatbot]);

  useEffect(() => {
    const onOpenChatbot = (event: Event) => {
      const fullscreenParam = (
        event as CustomEvent<{ params?: { fullscreen?: boolean | string } }>
      ).detail?.params?.fullscreen;
      const skipFullscreen =
        fullscreenParam === false || fullscreenParam === 'false';

      handleOpenChatbot({ isInsideMinistage: true, skipFullscreen });
    };

    document.addEventListener(OPEN_CHATBOT_EVENT, onOpenChatbot);
    return () =>
      document.removeEventListener(OPEN_CHATBOT_EVENT, onOpenChatbot);
  }, [handleOpenChatbot]);
}
