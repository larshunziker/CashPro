import raf from 'raf';
import {
  BOND,
  CRYPTO_CURRENCY,
  DERIVATE,
  DIVERSE,
  EQUITY,
  FUND,
  INDEX,
} from './constants';

/* @ts-ignore TODO: TS7006 ->  Parameter 'textSearch' implicitly has an 'any' type. */
export const getSearchResults = (textSearch) => [
  {
    type: EQUITY,
    title: 'Aktien',
    items: textSearch?.equity?.items,
  },
  {
    type: INDEX,
    title: 'Index',
    items: textSearch?.index?.items,
  },
  {
    type: CRYPTO_CURRENCY,
    title: 'ETFs',
    items: textSearch?.cryptoCurrency?.items,
  },
  {
    type: FUND,
    title: 'Fund',
    items: textSearch?.fund?.items,
  },
  {
    type: BOND,
    title: 'Bond',
    items: textSearch?.bond?.items,
  },
  {
    type: DERIVATE,
    title: 'Derivate',
    items: textSearch?.derivative?.items,
  },
  {
    type: DIVERSE,
    title: 'Diverse',
    items: textSearch?.diverse?.items,
  },
];

/* @ts-ignore TODO: TS7031 ->  Binding element 'target' implicitly has an 'any' type. */
export const enableAutoFocus = ({ target }) => {
  const autosuggestInput = target.parentElement.parentElement.querySelector(
    '.autosuggest-input',
  ) as HTMLInputElement;

  raf(() => {
    autosuggestInput?.focus();
  });
};
