// TODO:  add unit test

// include polyfill
// https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill
import 'helpers/intersection-observer';

import {
  SetStateAction,
  useDebugValue,
  useEffect,
  useRef,
  useState,
} from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { cssSelectorFromElement } from './useScrollToLinkElement';
import locationStateSelector from '../selectors/locationStateSelector';
import windowStateSelector from '../selectors/windowStateSelector';

export interface UseInViewConfig extends InViewConfig {
  isInitialInView?: boolean;
}

type UseInViewState = {
  isInView: boolean;
  entry?: IntersectionObserverEntry;
};

export type UseInViewResponse<T extends HTMLElement = HTMLElement> = {
  ref: T | null;
  setRef: React.Dispatch<SetStateAction<T | null>>;
  isInView: boolean;
  entry: IntersectionObserverEntry;
  reInitOnViewportLabelChange?: boolean;
  reInitOnLocationChange?: boolean;
};

const isIntersectionObserverSupported =
  'IntersectionObserver' in global && __CLIENT__;

const elementCssSelector = new Set();

const useInView = <T extends HTMLElement>(
  options: UseInViewConfig = {
    rootMargin: '',
    threshold: [0],
  },
  isObserveDelayed = false,
  isInitialInView = false,
  reInitOnViewportLabelChange = false, // INFO: this prop is not allowed when then observer config includes a root element, otherwise the observer will be re-initialized and thus overwrite the root element.
  reInitOnLocationChange = false,
): UseInViewResponse => {
  const viewportLabel: ViewportLabel = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => windowStateSelector(state).viewport.label,
    shallowEqual,
  );
  const screenReady: boolean = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
    shallowEqual,
  );
  const pathname: string = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions.pathname,
    shallowEqual,
  );
  const isInitialPage: boolean = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isInitialPage,
    shallowEqual,
  );
  const action = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions.action,
  );

  const isPop = action === 'POP' && !isInitialPage;

  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (pathname !== prevPathnameRef.current && !isPop) {
      elementCssSelector.clear();
      prevPathnameRef.current = pathname;
    }
  }, [pathname, isPop]);

  // TODO: implement a useReducer instead
  const [state, setState] = useState<UseInViewState>({
    isInView: (__TESTING__ && true) || isPop || isInitialInView,
    entry: undefined,
  });

  // hooks
  const [ref, setRef] = useState<T | null>(null);
  const callbackRef = useRef<
    (entries: Array<IntersectionObserverEntry>) => void
  >(null!);
  callbackRef.current = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      let isInView = entry.isIntersecting || false;
      if (isPop) {
        const selector = cssSelectorFromElement(entry.target);
        if (elementCssSelector.has(selector)) {
          isInView = true;
        }
        if (isInView) {
          elementCssSelector.add(selector);
        }
      }
      setState({ isInView, entry });

      if (isInView && options.triggerOnce && entry.target) {
        observer?.unobserve?.(entry.target);
        observer?.disconnect?.();
      }
    });
  };

  const [observer, setObserver] = useState(() => {
    if (!isIntersectionObserverSupported) {
      return null;
    }

    return new IntersectionObserver((entries) => callbackRef.current(entries), {
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    });
  });

  useEffect(() => {
    if (reInitOnViewportLabelChange) {
      if (ref && isIntersectionObserverSupported && observer) {
        observer.disconnect();
      }
      setObserver(() => {
        return new IntersectionObserver(
          (entries) => callbackRef.current(entries),
          {
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold || 0,
          },
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportLabel, reInitOnViewportLabelChange, options, ref]);

  useEffect(() => {
    if (reInitOnLocationChange && screenReady && !isInitialPage) {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      observer.unobserve(ref);

      setTimeout(() => {
        /* @ts-ignore TODO: TS2322 ->  Type 'HTMLElement | null' is not assignable to type 'HTMLElement'. */
        const rootEl: T =
          typeof options?.root === 'string'
            ? document.querySelector(options.root)
            : null;

        if (rootEl) {
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLDivElement | HTMLElement | HTMLHeadingElement | HTMLObjectElement | HTMLOutputElement | ... 64 mo */
          /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
          observer.observe(document.querySelector(options.root));
          setRef(rootEl);
        } else {
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          observer.observe(ref);
        }
      }, 100);
    }
  }, [
    screenReady,
    pathname,
    reInitOnLocationChange,
    options,
    isInitialPage,
    ref,
    observer,
  ]);

  useEffect(() => {
    if (ref && isIntersectionObserverSupported) {
      // The isObserveDelayed prop was added after we faced some issues with the timing of the intersection-observer.
      // The intersection-observer got initialized before the DOM was ready, which lead to the problem that isInView was always true for a short time on page-change.

      if (isObserveDelayed) {
        setTimeout(() => {
          const rootEl =
            typeof options?.root === 'string'
              ? document.querySelector(options.root)
              : null;
          if (rootEl) {
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLDivElement | HTMLElement | HTMLHeadingElement | HTMLObjectElement | HTMLOutputElement | ... 64 mo */
            /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
            observer.observe(document.querySelector(options.root));
          } else {
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            observer.observe(ref);
          }
        }, 1500);
      } else {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        observer.observe(ref);
      }
    }

    return () => {
      if (ref && isIntersectionObserverSupported) {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        observer.disconnect();
      }
    };
  }, [
    ref,
    options.threshold,
    options.root,
    options.rootMargin,
    options.triggerOnce,
    isObserveDelayed,
    observer,
  ]);

  useDebugValue(state.isInView);

  return {
    ref,
    setRef,
    isInView: state.isInView,
    /* @ts-ignore TODO: TS2322 ->  Type 'IntersectionObserverEntry | null' is not assignable to type 'IntersectionObserverEntry'. */
    entry: state.entry || null,
  };
};

export default useInView;
