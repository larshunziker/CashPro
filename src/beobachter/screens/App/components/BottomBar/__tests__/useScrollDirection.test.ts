import { renderHook, act } from '@testing-library/react';
import useScrollDirection from '../useScrollDirection';

describe('[Hook] useScrollDirection', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;
  let rafCallbacks: Array<FrameRequestCallback>;
  let cancelledRafIds: number[];
  let rafId: number;

  beforeEach(() => {
    rafCallbacks = [];
    cancelledRafIds = [];
    rafId = 0;

    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        rafCallbacks.push(cb);
        return ++rafId;
      });
    jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation((id: number) => cancelledRafIds.push(id));

    // Start at scrollY = 0
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 0,
    });

    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns null initially (no scroll yet)', () => {
    const { result } = renderHook(() => useScrollDirection());
    expect(result.current).toBeNull();
  });

  it('returns "down" when scrolling downward past the threshold', () => {
    const { result } = renderHook(() => useScrollDirection());

    // Simulate scrolling down 20px
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 20,
    });
    act(() => {
      const scrollHandler = addEventListenerSpy.mock.calls.find(
        ([event]) => event === 'scroll',
      )?.[1] as EventListener;
      scrollHandler(new Event('scroll'));
      // Flush rAF
      rafCallbacks.forEach((cb) => cb(0));
    });

    expect(result.current).toBe('down');
  });

  it('returns "up" when scrolling upward past the threshold', () => {
    // Start at scrollY = 100
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 100,
    });
    const { result } = renderHook(() => useScrollDirection());

    // Scroll up to 80
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 80,
    });
    act(() => {
      const scrollHandler = addEventListenerSpy.mock.calls.find(
        ([event]) => event === 'scroll',
      )?.[1] as EventListener;
      scrollHandler(new Event('scroll'));
      rafCallbacks.forEach((cb) => cb(0));
    });

    expect(result.current).toBe('up');
  });

  it('does not update direction when scroll delta is below threshold', () => {
    const { result } = renderHook(() => useScrollDirection());

    // Scroll down only 3px (below SCROLL_THRESHOLD_PX = 5)
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 3,
    });
    act(() => {
      const scrollHandler = addEventListenerSpy.mock.calls.find(
        ([event]) => event === 'scroll',
      )?.[1] as EventListener;
      scrollHandler(new Event('scroll'));
      rafCallbacks.forEach((cb) => cb(0));
    });

    expect(result.current).toBeNull();
  });

  it('removes scroll event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrollDirection());
    unmount();
    const expectedHandler = expect.any(Function);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expectedHandler,
    );
  });
});
