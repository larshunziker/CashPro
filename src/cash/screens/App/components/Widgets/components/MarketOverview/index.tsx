import React, { memo, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { adjustBlickWidgetHight, scriptToAppend } from '../../helpers';
import MarketTable from '../MarketCombo/components/MarketTable';
import { ROUTE_BOERSE } from '../../../../constants';
import { listingKeysMarketExtended } from '../MarketCombo/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_QUOTES_MARKET_OVERVIEW } from './queries';
import { QueryResult } from './typings';

const MarketOverview = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    scriptToAppend(
      'https://www.blick.ch/assets/iframeHeightAdjustment.js',
      elementRef,
    );
    return adjustBlickWidgetHight();
  }, [elementRef]);

  const { data, loading, error } = useQuery<QueryResult>(
    GET_QUOTES_MARKET_OVERVIEW,
    {
      variables: {
        listingKeys: listingKeysMarketExtended.join(','),
      },
    },
  );
  const title = {
    label: 'Marktübersicht',
    url: `https://cash.ch/${ROUTE_BOERSE}`,
  };

  const instruments = data?.quoteList?.quoteList?.edges?.map(
    (i) => i.node,
  ) as Instrument[];

  return (
    <div ref={elementRef} id="__BLICK_IFRAME_ID__">
      <MarketTable
        title={title}
        instruments={instruments}
        fields={{ price: 'currentPrice', performance: 'perfPercentage' }}
        loading={loading}
        /* @ts-ignore TODO: TS2322 ->  Type 'ApolloError | undefined' is not assignable to type 'ApolloError'. */
        error={error}
        rows={9}
      />
    </div>
  );
};

export default memo(MarketOverview);
