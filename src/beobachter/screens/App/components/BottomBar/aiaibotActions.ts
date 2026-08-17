export type AiaibotInstance = NonNullable<Window['aiaibot']>;

const BOTTOM_BAR_IFRAME_OFFSET_DELAY_MS = 100;

let pendingOffsetTimeoutId: number | undefined;

export type BottomBarIframeSyncParams = {
  bottomBarHeightPx: number;
  isHidden: boolean;
  isBottomBarActive?: boolean;
  isChatbotOpen: boolean;
};

export type BottomBarIframeOpenSyncParams = Omit<
  BottomBarIframeSyncParams,
  'isChatbotOpen'
>;

export function getBottomBarIframeStyles(
  heightPx: number,
): Record<string, string> {
  return {
    bottom: `${heightPx}px`,
    height: `calc(100dvh - ${heightPx}px)`,
  };
}

export function cancelPendingBottomBarIframeOffset(): void {
  if (pendingOffsetTimeoutId !== undefined) {
    window.clearTimeout(pendingOffsetTimeoutId);
    pendingOffsetTimeoutId = undefined;
  }
}

export function setBottomBarIframeOffset(
  aiaibot: AiaibotInstance,
  heightPx: number,
): void {
  cancelPendingBottomBarIframeOffset();
  pendingOffsetTimeoutId = window.setTimeout(() => {
    pendingOffsetTimeoutId = undefined;
    const styles = getBottomBarIframeStyles(heightPx);
    if (aiaibot.frame?.style.bottom !== styles.bottom) {
      aiaibot.setIframeStyle(styles);
    }
  }, BOTTOM_BAR_IFRAME_OFFSET_DELAY_MS);
}

export function resetBottomBarIframeOffset(aiaibot: AiaibotInstance): void {
  cancelPendingBottomBarIframeOffset();
  const styles = {
    bottom: '0',
    height: '100dvh',
  };
  if (aiaibot.frame?.style.height !== styles.height) {
    aiaibot.setIframeStyle(styles);
  }
}

export function syncBottomBarIframeOffset(
  aiaibot: AiaibotInstance,
  params: BottomBarIframeSyncParams,
): void {
  cancelPendingBottomBarIframeOffset();

  if (!params.isBottomBarActive || !params.isChatbotOpen) {
    return;
  }

  if (params.isHidden) {
    resetBottomBarIframeOffset(aiaibot);
    return;
  }

  setBottomBarIframeOffset(aiaibot, params.bottomBarHeightPx);
}

export function openChatbot(
  aiaibot: AiaibotInstance,
  syncParams: BottomBarIframeOpenSyncParams,
): void {
  aiaibot.show?.();
  aiaibot.open?.();
  syncBottomBarIframeOffset(aiaibot, {
    ...syncParams,
    isChatbotOpen: true,
  });
}

export function closeChatbot(aiaibot: AiaibotInstance): void {
  aiaibot.hide?.();
  aiaibot.close?.();
}
