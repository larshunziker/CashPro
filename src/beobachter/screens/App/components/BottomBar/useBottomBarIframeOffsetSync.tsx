import { useEffect } from 'react';
import { syncBottomBarIframeOffset } from './aiaibotActions';
import { useAiaibot } from '../AIAIProvider/useAiaibot';

const AIAIBOT_VISIBILITY_POLL_INTERVAL_MS = 300;

type UseBottomBarIframeOffsetSyncParams = {
  getAiaibot: ReturnType<typeof useAiaibot>['getAiaibot'];
  isBottomBarActive: boolean;
  isHidden: boolean;
  bottomBarHeightPx: number;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (isOpen: boolean) => void;
};

export default function useBottomBarIframeOffsetSync({
  getAiaibot,
  isBottomBarActive,
  isHidden,
  bottomBarHeightPx,
  isChatbotOpen,
  setIsChatbotOpen,
}: UseBottomBarIframeOffsetSyncParams): void {
  useEffect(() => {
    const aiaibot = getAiaibot();
    if (!aiaibot) {
      return;
    }

    syncBottomBarIframeOffset(aiaibot, {
      bottomBarHeightPx,
      isHidden,
      isBottomBarActive,
      isChatbotOpen: isChatbotOpen && Boolean(aiaibot.state?.open),
    });
  }, [
    bottomBarHeightPx,
    getAiaibot,
    isBottomBarActive,
    isChatbotOpen,
    isHidden,
  ]);

  // Poll to sync the iframe offset when the chatbot transitions to open-but-not-yet-visible.
  // This mirrors the interval-based syncBottomBarIframeOffset call that previously lived
  // inside useAiaibotVisibilityPolling.
  useEffect(() => {
    if (!isBottomBarActive) {
      return;
    }

    const syncOffsetOnVisibilityChange = () => {
      const aiaibot = getAiaibot();
      if (aiaibot && aiaibot.state?.open && !aiaibot.state?.visible) {
        aiaibot.show();
      }
      if (aiaibot && !aiaibot.state?.open && aiaibot.state?.visible) {
        aiaibot.hide();
      }
      if (!aiaibot || !aiaibot.state?.open || !aiaibot.state?.visible) {
        setIsChatbotOpen(false);
        return;
      }
      setIsChatbotOpen(true);
      syncBottomBarIframeOffset(aiaibot, {
        bottomBarHeightPx,
        isHidden,
        isBottomBarActive,
        isChatbotOpen: true,
      });
    };

    syncOffsetOnVisibilityChange();
    const intervalId = window.setInterval(
      syncOffsetOnVisibilityChange,
      AIAIBOT_VISIBILITY_POLL_INTERVAL_MS,
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    bottomBarHeightPx,
    getAiaibot,
    isBottomBarActive,
    isHidden,
    setIsChatbotOpen,
  ]);
}
