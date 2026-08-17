import { useEffect, useState } from 'react';

const KEYBOARD_HEIGHT_THRESHOLD_PX = 120;

function isEditableElement(element: Element | null): boolean {
  if (!element) {
    return false;
  }

  if (element instanceof HTMLTextAreaElement) {
    return true;
  }

  if (element instanceof HTMLInputElement) {
    const nonTextInputTypes = new Set([
      'button',
      'checkbox',
      'file',
      'hidden',
      'image',
      'radio',
      'range',
      'reset',
      'submit',
    ]);
    return !nonTextInputTypes.has(element.type);
  }

  return element instanceof HTMLElement && element.isContentEditable;
}

function useVirtualKeyboardVisible(): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const evaluateVisibility = () => {
      const viewport = window.visualViewport;
      if (!viewport) {
        setIsVisible(false);
        return;
      }

      const activeElement = document.activeElement;
      const hasEditableFocus = isEditableElement(activeElement);
      const viewportShrink = window.innerHeight - viewport.height;
      const keyboardLikelyOpen = viewportShrink > KEYBOARD_HEIGHT_THRESHOLD_PX;

      setIsVisible(hasEditableFocus && keyboardLikelyOpen);
    };

    evaluateVisibility();

    const viewport = window.visualViewport;
    viewport?.addEventListener('resize', evaluateVisibility);
    window.addEventListener('resize', evaluateVisibility);
    document.addEventListener('focusin', evaluateVisibility);
    document.addEventListener('focusout', evaluateVisibility);

    return () => {
      viewport?.removeEventListener('resize', evaluateVisibility);
      window.removeEventListener('resize', evaluateVisibility);
      document.removeEventListener('focusin', evaluateVisibility);
      document.removeEventListener('focusout', evaluateVisibility);
    };
  }, []);

  return isVisible;
}

export default useVirtualKeyboardVisible;
