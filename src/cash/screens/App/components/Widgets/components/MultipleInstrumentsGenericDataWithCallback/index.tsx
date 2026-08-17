import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { getSearchParams } from '../../helpers';
import {
  getKeysFromCallback,
  getQuery,
  getQueryVariables,
  getSpecialListingKeys,
  SpecialKeys,
} from './helpers';
import MultipleInstrumentsGenericData from '../MultipleInstrumentsGenericData';
import { MultipleInstrumentsGenericDataWithCallbackProps } from './typings';

const MultipleInstrumentsGenericDataWithCallback = ({
  widgetParagraph,
}: MultipleInstrumentsGenericDataWithCallbackProps) => {
  const searchParams = getSearchParams(widgetParagraph);
  const specialListingKey: any = getSpecialListingKeys().find(
    (key: SpecialKeys) => key.key === searchParams['listingKeys'],
  );
  const [listingKeys, setListingKeys] = useState<string>(
    specialListingKey?.listingKeys || searchParams['listingKeys'] || '',
  );
  const [isListingKeysAdded, setListingKeysAdded] = useState(!!listingKeys);
  const [constituents] = useState(
    specialListingKey?.constituents ||
      searchParams['constituents'] ||
      searchParams['callback'] !== 'crypto_callback',
  );
  const query = getQuery(searchParams);
  const [loadData, { called, data, loading }] = useLazyQuery(query);

  useEffect(() => {
    if (Object.keys(searchParams).length > 0 && !called) {
      const queryVariables = getQueryVariables(
        searchParams,
        constituents,
        specialListingKey,
      );

      (async () => {
        for (const variables of queryVariables) {
          /* @ts-ignore */
          await loadData({ variables });
        }
      })();
    }
  }, [loadData, searchParams, called, constituents, specialListingKey]);

  useEffect(() => {
    if (isListingKeysAdded) {
      return;
    }

    if (data) {
      const instrumentKeys = getKeysFromCallback(data, searchParams);
      setListingKeys(instrumentKeys ? instrumentKeys.join(',') : '');
      setListingKeysAdded(true);
    }
  }, [data, searchParams, listingKeys, widgetParagraph, isListingKeysAdded]);

  return (
    <MultipleInstrumentsGenericData
      widgetParagraph={widgetParagraph}
      callbackData={{
        loading,
        listingKeys,
        constituents,
      }}
    />
  );
};

export default MultipleInstrumentsGenericDataWithCallback;
