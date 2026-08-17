import storageAvailable from '../../../shared/helpers/storage';

const storageKey = 'widgetRenderErrorWasShown';

export const setWidgetRenderErrorWasShown = () => {
  const isSessionStorageAvailable: boolean = storageAvailable('sessionStorage');
  if (!isSessionStorageAvailable) {
    return;
  }
  sessionStorage?.setItem(storageKey, 'true');
};

export const getRenderErrorWasShown = (): boolean => {
  const isSessionStorageAvailable: boolean = storageAvailable('sessionStorage');
  if (!isSessionStorageAvailable) {
    return false;
  }
  const result = sessionStorage?.getItem(storageKey);
  return result === 'true';
};
