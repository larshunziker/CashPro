/**
 * @file   debounced event
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2018-02-04
 *
 */
import raf from 'raf';

/**
 * Debounce event with double requestAnimationFrame
 * @param {Function} cb
 */
export const debouncedEvent = (cb) => {
  let block = false;

  return (event) => {
    if (!block) {
      block = true;
      requestTick(() => {
        cb(event);
        block = false;
      });
    }
  };
};

/**
 * Double requestAnimationFrame to make sure a new cpu cycle is awaited
 * @param {Function} cb
 */
const requestTick = (cb) => raf(() => raf(cb));
