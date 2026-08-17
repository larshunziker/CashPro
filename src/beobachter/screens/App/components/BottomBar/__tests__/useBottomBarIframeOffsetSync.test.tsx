import { renderHook } from '@testing-library/react';
import useBottomBarIframeOffsetSync from '../useBottomBarIframeOffsetSync';
import { getBottomBarIframeStyles } from '../aiaibotActions';

const BOTTOM_BAR_HEIGHT_PX = 64;

const mockAiaibotState = {
  open: false,
};

const mockAiaibot: any = {
  setIframeStyle: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  state: mockAiaibotState,
};

const getAiaibot = jest.fn(() => mockAiaibot);

describe('[Hook] useBottomBarIframeOffsetSync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAiaibotState.open = false;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('resets iframe offset when keyboard becomes visible while chatbot is open', () => {
    mockAiaibotState.open = true;

    const { rerender } = renderHook(
      ({ isHidden }) =>
        useBottomBarIframeOffsetSync({
          getAiaibot,
          isBottomBarActive: true,
          isHidden,
          bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
          isChatbotOpen: true,
          setIsChatbotOpen: () => {},
        }),
      { initialProps: { isHidden: false } },
    );

    mockAiaibot.setIframeStyle.mockClear();
    rerender({ isHidden: true });

    expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith({
      bottom: '0',
      height: '100dvh',
    });
  });

  it('restores iframe offset when keyboard closes while chatbot is open', () => {
    jest.useFakeTimers();
    mockAiaibotState.open = true;

    const { rerender } = renderHook(
      ({ isHidden }) =>
        useBottomBarIframeOffsetSync({
          getAiaibot,
          isBottomBarActive: true,
          isHidden,
          bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
          isChatbotOpen: true,
          setIsChatbotOpen: () => {},
        }),
      { initialProps: { isHidden: true } },
    );

    mockAiaibot.setIframeStyle.mockClear();
    rerender({ isHidden: false });

    expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith(
      getBottomBarIframeStyles(BOTTOM_BAR_HEIGHT_PX),
    );
  });

  it('does not change iframe offset when chatbot is closed', () => {
    const { rerender } = renderHook(
      ({ isHidden }) =>
        useBottomBarIframeOffsetSync({
          getAiaibot,
          isBottomBarActive: true,
          isHidden,
          bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
          isChatbotOpen: false,
          setIsChatbotOpen: () => {},
        }),
      { initialProps: { isHidden: false } },
    );

    rerender({ isHidden: true });

    expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();
  });
});
