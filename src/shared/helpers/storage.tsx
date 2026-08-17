/**
 * @file    check browser support related to storage
 */

export const storageAvailable = (type: string): boolean => {
  if (!__CLIENT__) {
    return false;
  }

  let storage: Storage;
  try {
    /* @ts-ignore TODO: TS7015 ->  Element implicitly has an 'any' type because index expression is not of type 'number'. */
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      /* @ts-ignore TODO: TS2454 ->  Variable 'storage' is used before being assigned. */
      storage &&
      storage.length !== 0
    );
  }
};

export default storageAvailable;
