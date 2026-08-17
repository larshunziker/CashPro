import { act, renderHook } from '@testing-library/react';
import useVirtualKeyboardVisible from '../useVirtualKeyboardVisible';

type Listener = () => void;

type VisualViewportMock = {
  height: number;
  addEventListener: (event: string, listener: Listener) => void;
  removeEventListener: (event: string, listener: Listener) => void;
};

function setupVisualViewport(height: number): {
  viewport: VisualViewportMock;
  emit: (event: string) => void;
} {
  const listeners = new Map<string, Set<Listener>>();

  const viewport: VisualViewportMock = {
    height,
    addEventListener: (event, listener) => {
      const existing = listeners.get(event) ?? new Set<Listener>();
      existing.add(listener);
      listeners.set(event, existing);
    },
    removeEventListener: (event, listener) => {
      listeners.get(event)?.delete(listener);
    },
  };

  Object.defineProperty(window, 'visualViewport', {
    configurable: true,
    value: viewport,
  });

  return {
    viewport,
    emit: (event) => {
      listeners.get(event)?.forEach((listener) => listener());
    },
  };
}

describe('[Hook] useVirtualKeyboardVisible', () => {
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    // @ts-ignore
    delete (window as typeof window & { visualViewport?: VisualViewportMock })
      .visualViewport;
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('returns false when visualViewport is not available', () => {
    const { result } = renderHook(() => useVirtualKeyboardVisible());
    expect(result.current).toBe(false);
  });

  it('returns true when viewport shrinks and an editable element is focused', () => {
    const { viewport, emit } = setupVisualViewport(500);
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
      writable: true,
    });

    const input = document.createElement('input');
    document.body.appendChild(input);

    const { result } = renderHook(() => useVirtualKeyboardVisible());

    act(() => {
      input.focus();
      emit('resize');
    });

    expect(viewport.height).toBe(500);
    expect(result.current).toBe(true);
  });

  it('returns false when viewport shrinks without editable focus', () => {
    const { emit } = setupVisualViewport(500);
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
      writable: true,
    });

    const button = document.createElement('button');
    document.body.appendChild(button);

    const { result } = renderHook(() => useVirtualKeyboardVisible());

    act(() => {
      button.focus();
      emit('resize');
    });

    expect(Boolean(result.current)).toBe(false);
  });
});
