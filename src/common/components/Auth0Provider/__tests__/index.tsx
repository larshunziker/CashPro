import { Auth0 } from '../index';
import { removeLocalStorageData } from '..';
import { LocalStorageMock } from '../__mocks__';
import {
  AUTH0_LOCAL_STORAGE_ACCESS_TOKEN,
  AUTH0_LOCAL_STORAGE_ID_TOKEN,
  AUTH0_LOCAL_STORAGE_NONCE,
  AUTH0_LOCAL_STORAGE_STATE,
  AUTH0_USER_ID,
} from '../constants';

beforeEach(() => {
  // @ts-ignore
  localStorage = new LocalStorageMock();
});

const initialProps = {
  setPianoUserMetadata: jest.fn(),
  setAuthData: jest.fn(),
};

describe('[Common] Auth0Provider', () => {
  it('', () => {
    localStorage.setItem(AUTH0_LOCAL_STORAGE_ACCESS_TOKEN, 'accessToken');
    localStorage.setItem(AUTH0_LOCAL_STORAGE_ID_TOKEN, 'storageId');
    localStorage.setItem(AUTH0_LOCAL_STORAGE_NONCE, 'nonce');
    localStorage.setItem(AUTH0_LOCAL_STORAGE_STATE, 'storage');
    localStorage.setItem(AUTH0_USER_ID, 'userid');

    removeLocalStorageData();
    expect(localStorage.getItem(AUTH0_LOCAL_STORAGE_ACCESS_TOKEN)).toBe(null);
    expect(localStorage.getItem(AUTH0_LOCAL_STORAGE_ID_TOKEN)).toBe(null);
    expect(localStorage.getItem(AUTH0_LOCAL_STORAGE_NONCE)).toBe(null);
    expect(localStorage.getItem(AUTH0_LOCAL_STORAGE_STATE)).toBe(null);
    expect(localStorage.getItem(AUTH0_USER_ID)).toBe(null);
  });

  test('defines _handleLogin()', () => {
    const auth0ProviderInstance = new Auth0(initialProps);
    expect(typeof auth0ProviderInstance._handleLogin).toBe('function');
  });

  test('defines _handleLogout()', () => {
    const auth0ProviderInstance = new Auth0(initialProps);
    expect(typeof auth0ProviderInstance._handleLogout).toBe('function');
  });

  test('defines _scheduleRenewal()', () => {
    const auth0ProviderInstance = new Auth0(initialProps);
    expect(typeof auth0ProviderInstance._scheduleRenewal).toBe('function');
  });

  test('defines _getMetadataValue()', () => {
    const auth0ProviderInstance = new Auth0(initialProps);
    expect(typeof auth0ProviderInstance._getMetadataValue).toBe('function');
  });

  test('defines _getExternalSubscription()', () => {
    const auth0ProviderInstance = new Auth0(initialProps);
    expect(typeof auth0ProviderInstance._getExternalSubscription).toBe(
      'function',
    );
  });
});
