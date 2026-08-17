import { useCallback, useEffect, useRef, useState } from 'react';
import { useAiaibot } from '../../../../../../AIAIProvider/useAiaibot';

export function useAiaibotChatbot(triggerId: string) {
  const messageToSendRef = useRef('');
  const [isFirstMessageSent, setIsFirstMessageSent] = useState(true);
  const { getAiaibot } = useAiaibot();

  const registerMessageHandler = useCallback(() => {
    const aiaibot = getAiaibot();
    if (!aiaibot) return;

    aiaibot.onMessage((payload) => {
      if (payload.type !== 'user-input') return;

      const messageToSend = messageToSendRef.current;
      if (messageToSend === '') return;

      aiaibot.sendUserInput(payload.id, messageToSend);
      messageToSendRef.current = '';
    });
  }, [getAiaibot]);

  useEffect(() => {
    const aiaibot = getAiaibot();
    if (!aiaibot) return;

    aiaibot.onReady(() => {
      registerMessageHandler();
    });
  }, [getAiaibot, registerMessageHandler]);

  const triggerChatbot = useCallback(
    async (value: string) => {
      const aiaibot = getAiaibot();
      if (!aiaibot) return;

      const trimmed = (value ?? '').trim();
      if (!trimmed) return;

      if (!isFirstMessageSent) {
        await aiaibot.teardown();
        await aiaibot.bootstrap();
      }

      messageToSendRef.current = trimmed;
      await aiaibot.trigger(triggerId, 0, true);
      setIsFirstMessageSent(false);
      aiaibot.toggleFullscreen();
      registerMessageHandler();
    },
    [getAiaibot, triggerId, isFirstMessageSent, registerMessageHandler],
  );

  return { triggerChatbot, isFirstMessageSent };
}
