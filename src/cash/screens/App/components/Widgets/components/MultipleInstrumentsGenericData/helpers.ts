import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GET_CRYPTO_MARKETCAPS,
  GET_CRYPTO_LOGOS,
  GET_CRYPTO_LOGOS_AND_MARKETCAPS,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/s */
} from '../MultipleInstrumentsGenericData/queries';

export const getConfig = (searchParams: any) => {
  const config = searchParams['config'];
  const parsedConfig = JSON.parse(config || '{}');

  return {
    config: parsedConfig,
    fields: Object.values(parsedConfig) as (keyof Instrument)[],
  };
};

export const getQueryName = (searchParams: any) => {
  const withLogos = searchParams['withLogos'];
  const hasConfigMarketCaps = getConfig(searchParams)?.fields?.some(
    (c: string) => c === 'marketCap',
  );

  const hasConfigLogos = !!withLogos && Boolean(withLogos);

  if (hasConfigLogos && !hasConfigMarketCaps) {
    return 'GET_CRYPTO_LOGOS';
  }

  if (!hasConfigLogos && hasConfigMarketCaps) {
    return 'GET_CRYPTO_MARKETCAPS';
  }

  if (hasConfigLogos && hasConfigMarketCaps) {
    return 'GET_CRYPTO_LOGOS_AND_MARKETCAPS';
  }

  return 'GET_CRYPTO_LOGOS';
};

export const getQuery = (searchParams: any) => {
  switch (getQueryName(searchParams)) {
    case 'GET_CRYPTO_LOGOS':
      return GET_CRYPTO_LOGOS;
    case 'GET_CRYPTO_MARKETCAPS':
      return GET_CRYPTO_MARKETCAPS;
    case 'GET_CRYPTO_LOGOS_AND_MARKETCAPS':
      return GET_CRYPTO_LOGOS_AND_MARKETCAPS;
    default:
      return GET_CRYPTO_LOGOS;
  }
};

export const getQueryVariables = (searchParams: any, instruments: any) => {
  const logosVars = {
    symbols:
      instruments?.length > 0
        ? instruments?.map((instrument: any) => instrument.mSymb).join(',')
        : '',
  };

  switch (getQueryName(searchParams)) {
    case 'GET_CRYPTO_LOGOS':
    case 'GET_CRYPTO_LOGOS_AND_MARKETCAPS':
      return logosVars;
    case 'GET_CRYPTO_MARKETCAPS':
    default:
      return {};
  }
};

export const useWithCryptoData = (instruments: any, searchParams: any) => {
  const query = getQuery(searchParams);
  const [hasFetched, setFetched] = useState(false);
  const [loadData, { data, loading }] = useLazyQuery(query);

  useEffect(() => {
    if (
      !hasFetched &&
      instruments?.length > 0 &&
      searchParams['callback'] === 'crypto_callback'
    ) {
      const variables = getQueryVariables(searchParams, instruments);
      setFetched(true);
      loadData({ variables });
    }
  }, [loadData, hasFetched, instruments, searchParams]);

  return {
    loading,
    logos: data?.integration?.crypto?.logos,
    marketCaps: data?.integration?.crypto?.marketCaps,
  };
};
