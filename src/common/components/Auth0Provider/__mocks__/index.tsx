import React from 'react';

const MockedAuth0Provider = () => <div data-testid="mocked-auth0-provider" />;

export default MockedAuth0Provider;

// https://stackoverflow.com/a/41434763
export class LocalStorageMock {
  store: any = {};
  // @ts-ignore
  constructor() {
    this.clear();
  }

  clear() {
    this.store = {};
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
  getItem(key) {
    return this.store[key] || null;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  setItem(key, value) {
    this.store[key] = String(value);
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
  removeItem(key) {
    delete this.store[key];
  }
}
