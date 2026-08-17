import { useEffect, useState } from 'react';

const DEFAULT_OPTIONS = {
  attributes: true,
  childList: true,
  subtree: true,
};

export const useMutationObserver = (
  targetEl: Node,
  cb: MutationCallback,
  config = DEFAULT_OPTIONS,
) => {
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const obs = new MutationObserver(cb);
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'MutationObserver' is not assignable to parameter of type 'SetStateAction<null>'. */
    setObserver(obs);
  }, [cb, setObserver]);

  useEffect(() => {
    if (!observer || !targetEl) return;

    /* @ts-ignore TODO: TS2339 ->  Property 'observe' does not exist on type 'never'. */
    observer.observe(targetEl, config);
    return () => {
      if (observer) {
        /* @ts-ignore TODO: TS2339 ->  Property 'disconnect' does not exist on type 'never'. */
        observer.disconnect();
      }
    };
  }, [observer, targetEl, config]);
};
