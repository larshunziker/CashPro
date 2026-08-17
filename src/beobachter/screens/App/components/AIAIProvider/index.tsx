import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../../../shared/selectors/pianoStateSelector';
import {
  registerPianoOfferOnUserInput,
  resetAbotOfferShownPianoVariable,
  showAbotPianoModal,
  useAbotTrigger,
} from './useAbotTrigger';
import { useAiaibot } from './useAiaibot';
import * as chatbotActions from '../../../../shared/actions/chatbot';
import { log } from '../../../../../shared/helpers/utils.tsx';

export type { AbotTemplateParams as TemplateParams } from './useAbotTrigger';

const AIAIProvider = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAbotAccessGranted, setIsAbotAccessGranted] = useState(false);
  const [isAiaibotReady, setAiaibotReady] = useState(false);
  const [isAiaibotTriggered, setIsAiaibotTriggered] = useState(false);
  const isChatbotAllowed = useSelector(
    (state: Record<string, any>) => authStateSelector(state).isChatbotAllowed,
  );

  const isAuthenticated = useSelector(
    (state: Record<string, any>) => authStateSelector(state).isAuthenticated,
  );

  const isChatbotHidden = useSelector(
    (state: Record<string, any>) => pianoStateSelector(state).isChatbotHidden,
  );

  const initialAuthRequest = useSelector(
    (state: Record<string, any>) => authStateSelector(state).initialAuthRequest,
  );

  const isAbotAccessAllowed = useSelector(
    (state: Record<string, any>) => authStateSelector(state).isAbotAllowed,
  );

  const isHybridApp = useSelector(
    (state: ReduxState) => locationStateSelector(state)?.isHybridApp || false,
  );

  const hasAbotAccess = isAbotAccessAllowed || isAbotAccessGranted;

  const { getAiaibot } = useAiaibot();

  const dispatchChatbotEvent = useCallback(() => {
    log('AIAIProvider', 'dispatchChatbotEvent', 'green');

    const aiaibot = getAiaibot();
    if (isChatbotHidden) {
      aiaibot?.hide();
    }

    if (hasAbotAccess) {
      aiaibot?.setVariables?.({ abotAllowed: hasAbotAccess });
    }

    if (isChatbotAllowed) {
      const triggerMemberEvent = new CustomEvent(
        'chatbot-event-subscribed',
        {},
      );
      document.dispatchEvent(triggerMemberEvent);
    } else if (isAuthenticated) {
      const triggerRegisteredEvent = new CustomEvent(
        'chatbot-event-registered',
        {},
      );
      document.dispatchEvent(triggerRegisteredEvent);
    } else {
      const triggerUnregisteredEvent = new CustomEvent(
        'chatbot-event-logged-out',
        {},
      );
      document.dispatchEvent(triggerUnregisteredEvent);
    }
  }, [
    getAiaibot,
    isChatbotHidden,
    isChatbotAllowed,
    isAuthenticated,
    hasAbotAccess,
  ]);

  useAbotTrigger({
    getAiaibot,
    dispatchChatbotEvent,
    hasAbotAccess,
    setIsAbotAccessGranted,
  });

  const onShowPianoModal = useCallback(() => {
    showAbotPianoModal();
  }, []);

  const onAiaiBotInstanceReady = useCallback(() => {
    const aiaibot = getAiaibot();
    if (!aiaibot) {
      return;
    }
    log('AIAIProvider', 'onAiaiBotInstanceReady', 'green');

    aiaibot.onReady(() => {
      setAiaibotReady(true);
      log('AIAIProvider', 'onReady', 'green');
    });
    aiaibot?.onTriggered(() => {
      setIsAiaibotTriggered(true);
      log('AIAIProvider', 'onTriggered', 'green');
    });
    registerPianoOfferOnUserInput(aiaibot, isHybridApp);
  }, [getAiaibot, isHybridApp]);

  useEffect(() => {
    if (initialAuthRequest && isAiaibotReady) {
      dispatchChatbotEvent();
    }
  }, [initialAuthRequest, isAiaibotReady, dispatchChatbotEvent]);

  useEffect(() => {
    if (isAiaibotTriggered) {
      const aiaibot = getAiaibot();
      if (!aiaibot) {
        return;
      }
      dispatch(chatbotActions.setAiaibotInitialized());
      if (location.search.includes('aiaibotopen')) {
        aiaibot.open();
      }
    }
  }, [dispatch, getAiaibot, isAiaibotTriggered, location.search]);

  // Setup aiaibot-instance-ready event listener
  useEffect(() => {
    window.addEventListener('aiaibot-instance-ready', onAiaiBotInstanceReady);
    const aiaibot = getAiaibot();
    if (aiaibot) {
      onAiaiBotInstanceReady();
    }
    return () => {
      window.removeEventListener(
        'aiaibot-instance-ready',
        onAiaiBotInstanceReady,
      );
    };
  }, [getAiaibot, onAiaiBotInstanceReady]);

  // Setup show-piano-modal event listener
  useEffect(() => {
    document.addEventListener('show-piano-modal', onShowPianoModal);
    return () => {
      document.removeEventListener('show-piano-modal', onShowPianoModal);
    };
  }, [onShowPianoModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetAbotOfferShownPianoVariable();
      setAiaibotReady(false);
      setIsAiaibotTriggered(false);
      dispatch(chatbotActions.setAiaibotInitialized(false));
    };
  }, [location.pathname, location.search, dispatch]);

  return null;
};
export default AIAIProvider;
