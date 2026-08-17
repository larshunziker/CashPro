import { useEffect, useState } from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import {
  MapFieldsResult,
  mapFields,
} from '../../screens/MyCash/components/Table/components/headerMapping';
import { isListingKey } from '../../screens/MyCash/components/Portfolio/helpers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../AutoUpdateProvider/queries'. '/Users/bhs/code/work/rasch-stack/src/cas */
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from '../AutoUpdateProvider/queries';

export const getListingKey = (widgetParagraph: WidgetParagraph) => {
  const searchParams = getSearchParams(widgetParagraph);

  // captures the listing key no matter where
  const keyByUrl =
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    getFullPath(widgetParagraph?.link?.path)?.match(
      /(\d{1,}-\d{1,}-\d{1,})/,
    )?.[0] || '';

  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"listingId"' can't be used to index type '{ config */
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"listingKey"' can't be used to index type '{ config */
  return searchParams['listingId'] || searchParams['listingKey'] || keyByUrl;
};

export const getSearchParams = (
  widgetParagraph: WidgetParagraph,
): Record<string, any> => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  const urlString = getFullPath(widgetParagraph?.link?.path);
  const isUrl = !!urlString && new RegExp('https?://.*').test(urlString);
  if (!isUrl || !widgetParagraph) return {};

  const config = urlString.match(/config={.*?}/)?.[0] || '';
  const url = getSanitizedURL(urlString);
  const baseUrl = `${global?.origin}${global?.location?.pathname}`;

  if (!url?.search) return {};
  const search = sanitizeSearchString(url.search);
  const quotesCount = search.split('"').length - 1;

  // we must ensure to always have an even number of quotes, as `handleLinkParams` only then works properly. Also, since URLSearchParams
  // doesn't support full URLs as a param like with `hrefBuy`or `hrefSell` we first extract these with `handleLinkParams`
  // => as e.g. in the case of `&hrefBuy="https://cash.ch/buy?isin=CH4"` with URLSearchParams that would give us `https://cash.ch/buy` as key
  if (quotesCount % 2 !== 0) return {};
  const { foundParams, remainingSearch } = handleLinkParams(search);

  const remainingUrl = getSanitizedURL(baseUrl + remainingSearch);
  const remainingSearchString = sanitizeSearchString(remainingUrl.search);
  const remainingParams = new URLSearchParams(remainingSearchString);

  const mappedParams = Object.fromEntries(remainingParams);
  const configParam = config
    ? { config: config.replace('config=', '') || '' }
    : {};

  return { ...mappedParams, ...foundParams, ...configParam };
};

const getFullPath = (path: string) =>
  path?.startsWith('/')
    ? `${global?.origin}${global?.location?.pathname}${path}`
    : path;

const getSanitizedURL = (urlString = '') => {
  // decodeURIComponent doesn't like brackets/quotes in urls ¯\_(ツ)_/¯
  // => since these are present in our config param, we remove them here and bring them back later
  const url = urlString ? urlString.replace(/&config={.*?}/, '') : '';

  try {
    return new URL(decodeURIComponent(url));
  } catch (e) {
    return urlString;
  }
};

const sanitizeSearchString = (searchString: any = '') =>
  searchString
    ?.toString()
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']')
    .replace(/%7B/g, '{')
    .replace(/%7D/g, '}')
    .replace(/%22/g, '"')
    .replace(/%20/g, ' ');

const handleLinkParams = (
  searchString = '',
): { remainingSearch: string; foundParams: Record<string, string> } => {
  let remainingSearch = searchString;
  const foundParams = {};

  const linkParams = remainingSearch.matchAll(/(\w+)="([^"]+)"/g);
  for (const match of linkParams) {
    /* @ts-ignore TODO: TS2488 ->  Type 'RegExpExecArray | null' must have a '[Symbol.iterator]()' method that returns an iterator. */
    const [, key, value] = /(\w+)="(.+)"/.exec(match[0]);
    if (key && key !== 'config') {
      remainingSearch = remainingSearch.replace(match[0], '');
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      foundParams[key] = value;
    }
  }

  return {
    foundParams,
    remainingSearch,
  };
};

type UseWidgetParagraphQueryResult = {
  fields: MapFieldsResult;
  instrument: Instrument;
  loading: boolean;
  error: ApolloError | undefined;
};

export const useWidgetParagraphQuery = (
  widgetParagraph: WidgetParagraph,
  fields?: (keyof Instrument)[],
  fieldTypes?: Record<keyof Instrument | string, string>,
): UseWidgetParagraphQueryResult => {
  const [instrument, setInstrument] = useState<Instrument | null>(null);
  const listingKey = getListingKey(widgetParagraph);

  const { data, loading, error } = useQuery(
    GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS,
    {
      variables: { listingKeys: listingKey },
      skip: !isListingKey(listingKey),
    },
  );

  useEffect(() => {
    if (data) {
      setInstrument(data?.quoteList?.quoteList?.edges?.[0]?.node as Instrument);
    }
  }, [data]);

  return {
    /* @ts-ignore TODO: TS2322 ->  Type 'MapFieldsResult | null' is not assignable to type 'MapFieldsResult'. */
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Instrument | null' is not assignable to parameter of type 'Instrument'. */
    fields: fields ? mapFields(instrument, fields, fieldTypes) : null,
    /* @ts-ignore TODO: TS2322 ->  Type 'Instrument | null' is not assignable to type 'Instrument'. */
    instrument,
    loading,
    error,
  };
};

export const scriptToAppend = (
  src: string,
  elementRef: React.MutableRefObject<any>,
) => {
  const script = document.createElement('script');
  script.src = src;
  if (elementRef.current) {
    elementRef.current.appendChild(script);
  } else {
    document.body.appendChild(script);
  }
  return script;
};

/**
 * Starts iframe height sync for Blick embeds. Call the returned function (or useEffect cleanup)
 * to clear the interval and resize listener — otherwise each remount stacks timers and listeners.
 */
export const adjustBlickWidgetHight = (): (() => void) => {
  const id = '__BLICK_IFRAME_ID__';
  if (global.self === global.top) {
    return () => {};
  }
  const tick = () => adjustHTMLHight(id);
  const intervalId = global.setInterval(tick, 500);
  const onResize = () => tick();
  global.addEventListener('resize', onResize);
  return () => {
    global.clearInterval(intervalId);
    global.removeEventListener('resize', onResize);
  };
};

export const adjustHTMLHight = (id: string) => {
  if (global.self === global.top) {
    // don't do this if not in iframe
    return;
  }
  const wrapper = document.getElementById(id);
  const height = wrapper?.clientHeight;
  const html = document.querySelector('html');
  if (height && html) {
    html.style.height = `${height}px`;
  }
};
