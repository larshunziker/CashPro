import { useEffect } from 'react';
import raf from 'raf';
import { scrollToAnchorElement } from '../../../common/components/SmoothScroll/helpers';

const CHECKOUT_CLOSE_EVENT = 'RASCH-checkoutClose';
const CHECKOUT_CLOSE_SCROLL_OFFSET = 150;

/** Scrolls to the URL hash anchor after Piano checkout closes (survives login / re-render). */
export function usePianoEmbedCheckoutCloseScroll(): void {
  useEffect(() => {
    const checkoutCloseHandler = (): void => {
      const hashAnchorId = decodeURIComponent(global.location.hash.slice(1));
      if (!hashAnchorId || !document.getElementById(hashAnchorId)) {
        return;
      }

      raf(() => {
        scrollToAnchorElement(hashAnchorId, {
          offset: CHECKOUT_CLOSE_SCROLL_OFFSET,
          replace: false,
          behavior: 'smooth',
        });
      });
    };

    document.addEventListener(CHECKOUT_CLOSE_EVENT, checkoutCloseHandler);

    return () => {
      document.removeEventListener(CHECKOUT_CLOSE_EVENT, checkoutCloseHandler);
    };
  }, []);
}
