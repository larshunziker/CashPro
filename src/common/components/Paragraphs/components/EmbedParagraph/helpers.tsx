import storageAvailable from '../../../../../shared/helpers/storage';
import {
  convertCookieToObject,
  getCookieByName,
} from '../../../../../shared/helpers/utils';
import { ConsentCookie, ConsentGroups } from './typings';

export const getConsentCookie = () => {
  if (getCookieByName('OptanonConsent') !== '') {
    const consentCookie: ConsentCookie = convertCookieToObject(
      getCookieByName('OptanonConsent'),
      '&',
    );
    return consentCookie;
  }
  return null;
};

export const checkConsentInCookie = () => {
  /* @ts-ignore TODO: TS2322 ->  Type 'ConsentCookie | null' is not assignable to type 'ConsentCookie'. */
  const cookie: ConsentCookie = getConsentCookie();

  if (!cookie || !cookie?.groups) {
    return false;
  }

  const consentGroups: ConsentGroups = cookie?.groups
    .split(',')
    .reduce((prev, current) => {
      const [name, ...value] = current.split(':');
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      prev[name] = value.join(':');
      return prev;
    }, {});

  if (
    consentGroups?.C0002 === '1' &&
    consentGroups?.C0003 === '1' &&
    consentGroups?.C0004 === '1'
  ) {
    return true;
  } else if (
    __APP_NAME__ === 'tele' &&
    consentGroups?.C0002 === '1' &&
    consentGroups?.C0004 === '1'
  ) {
    return true;
  }
  return false;
};

export const setConsentOnLocalStorage = (consent: boolean) =>
  storageAvailable('localStorage') &&
  global.localStorage.setItem('cmp-has-consent', String(consent));

export const getConsentFromLocalStorage = () => {
  const value =
    storageAvailable('localStorage') &&
    global.localStorage.getItem('cmp-has-consent');
  return !!value && value === 'true';
};
