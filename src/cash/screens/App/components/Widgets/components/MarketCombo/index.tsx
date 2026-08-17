import React, { memo, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { adjustBlickWidgetHight, scriptToAppend } from '../../helpers';
import MarketTable from './components/MarketTable';
import { ROUTE_BOERSE } from '../../../../constants';
import {
  listingKeysDevisen,
  listingKeysMarket,
  listingKeysTop,
} from './constants';
import {
  GET_QUOTES_MARKET_WIDGET,
  GET_QUOTES_WIDGET_WITH_CONSTITUENTS,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
} from './queries';
import styles from './styles.legacy.css';
import { QueryResult } from './typings';

const MarketCombo = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    scriptToAppend(
      'https://www.blick.ch/assets/iframeHeightAdjustment.js',
      elementRef,
    );
    adjustBlickWidgetHight();
  }, [elementRef]);

  const { data, loading, error } = useQuery<QueryResult>(
    GET_QUOTES_MARKET_WIDGET,
    {
      variables: {
        listingKeys: [...listingKeysMarket, ...listingKeysDevisen].join(','),
      },
    },
  );

  const {
    data: dataConstituents,
    loading: loadingConstituents,
    error: errorConstituents,
  } = useQuery<QueryResult>(GET_QUOTES_WIDGET_WITH_CONSTITUENTS, {
    variables: {
      listingKeys: listingKeysTop.join(','),
      constituents: true,
    },
  });

  const instruments = data?.quoteList?.quoteList?.edges?.map((i) => i.node);
  const instrumentsMarket = instruments?.filter((i) =>
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    listingKeysMarket.includes(i?.instrumentKey),
  );
  const instrumentsDevisen = instruments?.filter((i) =>
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    listingKeysDevisen.includes(i?.instrumentKey),
  );
  const instrumentsTop = dataConstituents?.quoteList?.quoteList?.edges
    .map((i) => i.node)
    .filter((i) => i?.scGrouped !== 'IND')
    .sort((a, b) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      const v1 = parseFloat(b.iNetVperprVPr) || 0;
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      const v2 = parseFloat(a.iNetVperprVPr) || 0;
      return v1 - v2;
    })
    .slice(0, 5);

  const instrumentsTopHasPerformanceData = instrumentsTop?.some(
    (i) => i?.iNetVperprVPr,
  );

  return (
    <div className={styles.Wrapper} ref={elementRef} id="__BLICK_IFRAME_ID__">
      <MarketTable
        title={{
          label: 'Marktübersicht',
          url: `https://cash.ch/${ROUTE_BOERSE}`,
        }}
        /* @ts-ignore TODO: TS2322 ->  Type 'Instrument[] | undefined' is not assignable to type 'Instrument[]'. */
        instruments={instrumentsMarket}
        fields={{ price: 'currentPrice', performance: 'perfPercentage' }}
        loading={loading}
        /* @ts-ignore TODO: TS2322 ->  Type 'ApolloError | undefined' is not assignable to type 'ApolloError'. */
        error={error}
        rows={5}
      />
      <MarketTable
        title={{
          label: 'Devisen',
          url: `https://cash.ch/devisen-zinsen`,
        }}
        /* @ts-ignore TODO: TS2322 ->  Type 'Instrument[] | undefined' is not assignable to type 'Instrument[]'. */
        instruments={instrumentsDevisen}
        fields={{ price: 'lval', performance: 'iNetVperprVPr' }}
        loading={loading}
        /* @ts-ignore TODO: TS2322 ->  Type 'ApolloError | undefined' is not assignable to type 'ApolloError'. */
        error={error}
        rows={5}
      />

      <MarketTable
        title={{
          label: 'Top Aktien - SMI',
          url: `https://cash.ch/indizes/smi-998089/swx/chf`,
        }}
        /* @ts-ignore TODO: TS2322 ->  Type 'Instrument[] | undefined' is not assignable to type 'Instrument[]'. */
        instruments={instrumentsTop}
        fields={{ price: 'lval', performance: 'iNetVperprVPr' }}
        loading={loadingConstituents}
        /* @ts-ignore TODO: TS2322 ->  Type 'ApolloError | undefined' is not assignable to type 'ApolloError'. */
        error={errorConstituents}
        /* @ts-ignore TODO: TS2322 ->  Type 'false | "Derzeit keine Top-Instrumente verfügbar.<br />Die Märkte eröffnen in Kürze."' is not assignable to type  */
        message={
          !instrumentsTopHasPerformanceData &&
          'Derzeit keine Top-Instrumente verfügbar.<br />Die Märkte eröffnen in Kürze.'
        }
        rows={5}
      />
    </div>
  );
};

export default memo(MarketCombo);
