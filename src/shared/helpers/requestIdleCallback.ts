/**
 * @file   requestIdleCallback polyfil
 * @author Steven Wolf <steven.wolf@ringieraxelspringer.ch>
 * @date   2019-11-28
 */

export const requestIdleCallback =
  (__CLIENT__ && window.requestIdleCallback) ||
  function (
    handler: (arg: RequestIdleCallbackDeadline) => void,
    { timeout }: { timeout: number },
  ) {
    const startTime = Date.now();

    return setTimeout(() => {
      handler({
        didTimeout: false,
        timeRemaining: () => {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        },
      });
    }, timeout);
  };

export const cancelIdleCallback =
  (__CLIENT__ && window.cancelIdleCallback) ||
  function (id: number) {
    clearTimeout(id);
  };
