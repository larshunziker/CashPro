import { useRef } from 'react';
import raf from 'raf';
import { replaceAll } from '../helpers/replaceAll';
import useRaschRouterLocation from './useRaschRouterLocation';

type LinkStackElement = {
  selector: string;
  url: string;
};

const initializeStack = (): LinkStackElement[] => {
  const stack = getLinkStack();
  if (!stack) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.__LINK_ELEMENT_STACK__ = [];
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    return global.__LINK_ELEMENT_STACK__;
  }
  return stack;
};

const getLinkStack = (): LinkStackElement[] | null => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (Array.isArray(global.__LINK_ELEMENT_STACK__)) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    return global.__LINK_ELEMENT_STACK__;
  }
  return null;
};

const topOfLinkElementStack = (): LinkStackElement | null => {
  const stack = getLinkStack();
  const length = stack?.length;
  if (!length || length === 0) {
    return null;
  }
  return stack[length - 1];
};

const popFromLinkElementStack = (): LinkStackElement | null => {
  const stack = initializeStack();
  const linkStackElement = stack.pop();
  return linkStackElement || null;
};

export const cssSelectorFromElement = (el: any): string => {
  /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'string'. */
  if (!(el instanceof Element)) return;
  const path = [];
  while (el?.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += '#' + el.id;
      path.unshift(selector);
      break;
    } else {
      let sib = el,
        nth = 1;
      while ((sib = sib.previousElementSibling)) {
        if (sib.nodeName.toLowerCase() === selector) nth++;
      }
      if (nth !== 1) selector += ':nth-of-type(' + nth + ')';
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  return replaceAll(path.join(' > '), '=', '\\=');
};

const MAX_LINK_STACK_SIZE = 50;

export const pushToLinkStack = (element: HTMLElement) => {
  const url = window.location.href;
  const stack = initializeStack();
  const topElement = topOfLinkElementStack();
  const newElement = { selector: cssSelectorFromElement(element), url };
  if (topElement && topElement.url !== url) {
    stack.push(newElement);
    return;
  }
  stack.push(newElement);
  if (stack.length > MAX_LINK_STACK_SIZE) {
    stack.splice(0, stack.length - MAX_LINK_STACK_SIZE);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'targetElement' implicitly has an 'any' type. */
const scrollIntoView = (targetElement) => {
  const initialScrollTop = window.scrollY;
  const targetOffset = targetElement.getBoundingClientRect().top;
  const targetScrollTop = initialScrollTop + targetOffset - 120;
  window.scrollTo({ top: targetScrollTop, behavior: 'auto' });
};

const handleScroll = (
  observerRef: React.MutableRefObject<IntersectionObserver>,
  targetElement: HTMLElement,
  searchForElementIntervalRef: React.MutableRefObject<NodeJS.Timeout>,
) => {
  raf(() => {
    if (targetElement && observerRef.current) {
      observerRef.current.observe(targetElement);

      setTimeout(() => {
        // disconnect after 3 seconds
        // to prevent memory leaks
        if (observerRef.current) {
          observerRef.current?.disconnect();
        }
        if (searchForElementIntervalRef.current) {
          clearInterval(searchForElementIntervalRef.current);
        }
      }, 3000);
    }
  });
};

export const useSrollToLinkElement = () => {
  const { action } = useRaschRouterLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const searchForElementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  if (!observerRef.current && !__TESTING__ && __CLIENT__) {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          raf(() => {
            scrollIntoView(entry.target);
          });
          if (entry.intersectionRatio === 1) {
            // make sure the element is not only visible for some milliseconds
            setTimeout(() => {
              if (entry.isIntersecting) {
                observerRef.current?.disconnect();
              }
            }, 1000);
          }
        });
      },

      { root: null, rootMargin: '0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
  }
  const srollToLinkElement = () => {
    const url = global?.location?.href;
    const topElement = topOfLinkElementStack();

    if (topElement?.url !== url) {
      return;
    }
    const link = popFromLinkElementStack();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    let targetElement = document.querySelector(link.selector) as HTMLElement;

    if (!link || action !== 'POP') return;
    // we should search for the element up to 3 seconds then do observering
    searchForElementIntervalRef.current = setInterval(() => {
      /* @ts-ignore TODO: TS2322 ->  Type 'HTMLElement | null' is not assignable to type 'HTMLElement'. */
      targetElement = document.querySelector(link.selector);
      if (!targetElement) return;
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'MutableRefObject<IntersectionObserver | null>' is not assignable to parameter of type 'MutableRefObje */
      handleScroll(observerRef, targetElement, searchForElementIntervalRef);
      /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
      clearInterval(searchForElementIntervalRef.current);
    }, 100);

    // Safety: clear the interval after 5s if the element never appears
    setTimeout(() => {
      if (searchForElementIntervalRef.current) {
        clearInterval(searchForElementIntervalRef.current);
        searchForElementIntervalRef.current = null;
      }
    }, 5000);
  };

  return {
    pushToLinkStack,
    srollToLinkElement,
  };
};
