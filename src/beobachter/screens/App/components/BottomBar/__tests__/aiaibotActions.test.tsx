import {
  cancelPendingBottomBarIframeOffset,
  getBottomBarIframeStyles,
  openChatbot,
  resetBottomBarIframeOffset,
  setBottomBarIframeOffset,
  syncBottomBarIframeOffset,
} from '../aiaibotActions';

const BOTTOM_BAR_HEIGHT_PX = 64;

const mockAiaibot: any = {
  show: jest.fn(),
  open: jest.fn(),
  setIframeStyle: jest.fn(),
  state: { open: false },
};

describe('[Module] aiaibotActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cancelPendingBottomBarIframeOffset();
  });

  afterEach(() => {
    cancelPendingBottomBarIframeOffset();
    jest.useRealTimers();
  });

  describe('syncBottomBarIframeOffset', () => {
    it('resets iframe offset when keyboard is visible and chatbot is open', () => {
      syncBottomBarIframeOffset(mockAiaibot, {
        bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
        isHidden: true,
        isBottomBarActive: true,
        isChatbotOpen: true,
      });

      expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith({
        bottom: '0',
        height: '100dvh',
      });
    });

    it('schedules bottom-bar offset when keyboard is hidden and chatbot is open', () => {
      jest.useFakeTimers();

      syncBottomBarIframeOffset(mockAiaibot, {
        bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
        isHidden: false,
        isBottomBarActive: true,
        isChatbotOpen: true,
      });

      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith(
        getBottomBarIframeStyles(BOTTOM_BAR_HEIGHT_PX),
      );
    });

    it('does nothing when bottom bar is inactive', () => {
      syncBottomBarIframeOffset(mockAiaibot, {
        bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
        isHidden: false,
        isBottomBarActive: false,
        isChatbotOpen: true,
      });

      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();
    });

    it('does nothing when chatbot is closed', () => {
      syncBottomBarIframeOffset(mockAiaibot, {
        bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
        isHidden: false,
        isBottomBarActive: true,
        isChatbotOpen: false,
      });

      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();
    });
  });

  describe('cancelPendingBottomBarIframeOffset', () => {
    it('prevents a pending offset from being applied after reset', () => {
      jest.useFakeTimers();

      setBottomBarIframeOffset(mockAiaibot, BOTTOM_BAR_HEIGHT_PX);
      resetBottomBarIframeOffset(mockAiaibot);

      mockAiaibot.setIframeStyle.mockClear();
      jest.advanceTimersByTime(100);

      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();
    });

    it('prevents a pending offset from being applied when keyboard opens', () => {
      jest.useFakeTimers();

      setBottomBarIframeOffset(mockAiaibot, BOTTOM_BAR_HEIGHT_PX);

      syncBottomBarIframeOffset(mockAiaibot, {
        bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
        isHidden: true,
        isBottomBarActive: true,
        isChatbotOpen: true,
      });

      mockAiaibot.setIframeStyle.mockClear();
      jest.advanceTimersByTime(100);

      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();
    });
  });

  describe('openChatbot', () => {
    it('opens chatbot and resets iframe offset when keyboard is already visible', () => {
      openChatbot(mockAiaibot, {
        bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
        isHidden: true,
        isBottomBarActive: true,
      });

      expect(mockAiaibot.show).toHaveBeenCalled();
      expect(mockAiaibot.open).toHaveBeenCalled();
      expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith({
        bottom: '0',
        height: '100dvh',
      });
    });
  });
});
