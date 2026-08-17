import { isListingKeyList } from '../../../../screens/MyCash/components/Portfolio/helpers';
import {
  DROPDOWN_CURRENCIES,
  DROPDOWN_QUOTES,
  DROPDOWN_RAW_MATERIAL,
} from '../QuoteList/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/s */
import { GET_QUOTES_TABLE_DATA } from '../QuoteList/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/s */
import { GET_CRYPTO_MARKETCAPS } from '../MultipleInstrumentsGenericData/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/s */
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from '../../../AutoUpdateProvider/queries';

export type SpecialKeys = {
  listingKeys: string;
  constituents: boolean;
  key: string;
};

export const getSpecialListingKeys = (): SpecialKeys[] => {
  const specialKeys: SpecialKeys[] = [];

  [DROPDOWN_QUOTES, DROPDOWN_CURRENCIES, DROPDOWN_RAW_MATERIAL].forEach(
    (key) => {
      Object.values(key).forEach((values) => {
        values.forEach((value) => {
          specialKeys.push({
            key: value.key,
            listingKeys: value.listingKeys,
            constituents: !!value.constituents,
          });
        });
      });
    },
  );
  return specialKeys;
};

export const getQueryVariables = (
  searchParams: any,
  constituents: any,
  specialListingKey: any,
) => {
  const callback: string = searchParams['callback'] || 'constituents';
  const limit = parseInt(searchParams['limit']) || 8;
  const listingKeys: string | undefined = searchParams['listingKeys'];
  const sortedBy = searchParams['sortedBy'];
  const direction = searchParams['direction'];
  const isSP500 = listingKeys === 'sp500';
  const queryVariables = [];

  if (callback === 'constituents') {
    if (isSP500) {
      queryVariables.push({
        constituents,
        listingKeys: specialListingKey?.listingKeys || listingKeys,
        limit: 200,
        offset: 0,
      });
      queryVariables.push({
        constituents,
        listingKeys: specialListingKey?.listingKeys || listingKeys,
        limit: 200,
        offset: 200,
      });
      queryVariables.push({
        constituents,
        listingKeys: specialListingKey?.listingKeys || listingKeys,
        limit: 200,
        offset: 400,
      });
    } else {
      queryVariables.push({
        constituents,
        listingKeys: specialListingKey?.listingKeys || listingKeys,
        limit,
        sortedBy,
        direction,
      });
    }
  }
  if (callback === 'crypto_callback') {
    queryVariables.push({ limit });
  }

  return queryVariables;
};

export const getQuery = (searchParams: any) => {
  const callback = searchParams['callback'] || 'constituents';
  const listingKeys: string | undefined = searchParams['listingKeys'];
  const isSP500 = listingKeys === 'sp500';

  switch (callback) {
    case 'constituents':
      if (isSP500) {
        return GET_QUOTES_TABLE_DATA;
      }
      return GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS;
    case 'crypto_callback':
      return GET_CRYPTO_MARKETCAPS;
    default:
      return GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS;
  }
};

export const getKeysFromCallback = (data: any, searchParams: any): string[] => {
  const callback = searchParams['callback'] || 'constituents';
  const listingKeys: string = searchParams['listingKeys'];
  const removeIndices = searchParams['removeIndices'] || 'true';

  const instrumentKeys: string[] = [];

  switch (callback) {
    case 'constituents': {
      if (!isListingKeyList(listingKeys)) {
        return [];
      }

      return data?.quoteList?.quoteList?.edges
        ?.map((edge: any) => edge.node)
        .filter((instrument: any) => {
          if (removeIndices === 'false') {
            return true;
          }
          return instrument?.scGrouped !== 'IND';
        })
        .flat()
        .map((instrument: any) => instrument?.instrumentKey);
    }
    case 'crypto_callback': {
      return data?.integration?.crypto?.marketCaps.map(
        (instrument: any) => instrument?.listingKey,
      );
    }
  }

  return instrumentKeys;
};
