import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { useQuery } from '@apollo/client';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { isListingKey } from '../../../../screens/MyCash/components/Portfolio/helpers';
import { setInstrumentKeysAnonymous } from '../../../../../../shared/actions/autoUpdate';
import useInView, {
  UseInViewResponse,
} from '../../../../../../../shared/hooks/useInView';
import TopFlopTable from './components/TopFlopTable';
import {
  DEFAULT_SPONSOR_IMAGE,
  DEFAULT_SPONSOR_IMAGE_URL,
  SMI_LISTING_KEY,
  SP500_LISTING_KEY,
  SP500_LISTING_KEY_CUSTOM,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../QuoteList/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { GET_QUOTES_TABLE_DATA } from '../QuoteList/queries';
import styles from './styles.legacy.css';
import { QueryResult, TopFlopProps } from './typings';

const TopFlop = ({ widgetParagraph }: TopFlopProps) => {
  const location = useLocation();
  const { setRef: setRefTop, isInView: isInViewTop }: UseInViewResponse =
    useInView({
      triggerOnce: true,
      threshold: 0.5,
    });
  const { setRef: setRefFlop, isInView: isInViewFlop }: UseInViewResponse =
    useInView({
      triggerOnce: true,
      threshold: 0.5,
    });

  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  // this key is needed if the widget is used somewhere else than the quotes page
  // in this case the listingkey of the index has to be provided in the cms
  /* @ts-ignore TODO: TS7034 ->  Variable 'listingKey' implicitly has type 'any' in some locations where its type cannot be determined. */
  let listingKey = null;
  listingKey = url?.searchParams?.get('listingKey')?.trim();
  const listingKeyFromPath = listingKey ? true : false;
  const nodes = useMemo(
    () =>
      widgetParagraph?.quoteList?.quoteList?.edges.map((edge) => edge.node) ||
      [],
    [widgetParagraph?.quoteList?.quoteList?.edges],
  );
  listingKey = listingKey || nodes[0]?.instrumentKey;

  const dispatch = useDispatch();

  if (listingKey === SP500_LISTING_KEY) {
    // S&P 500 has to be fetched by query because we cannot use the
    // paginated data (only the first 200 instruments are fetched)
    listingKey = SP500_LISTING_KEY_CUSTOM;
  }

  const fetchedDataRef = useRef();

  const { data, loading, error } = useQuery<QueryResult>(
    GET_QUOTES_TABLE_DATA,
    {
      variables: {
        listingKeys: listingKey,
        constituents: listingKey !== SP500_LISTING_KEY_CUSTOM,
      },
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      skip: !isListingKey(listingKey) || fetchedDataRef.current,
      ssr: false,
      onCompleted: (data) => {
        // @ts-ignore
        fetchedDataRef.current = data?.quoteList?.quoteList?.edges.map(
          (edge) => edge.node,
        );
      },
      fetchPolicy: 'no-cache',
    },
  );

  const loadedNodes = fetchedDataRef.current || nodes;

  useEffect(() => {
    if (loadedNodes?.length > 0) {
      dispatch(
        setInstrumentKeysAnonymous(
          /* @ts-ignore TODO: TS2345 ->  Argument of type '{ isMarketOpen */
          loadedNodes.map((instrument) => {
            return {
              isMarketOpen: true,
              listingKey: instrument?.instrumentKey,
            };
          }),
        ),
      );
    }
  }, [dispatch, listingKey, loadedNodes]);

  if (location.search.includes('debug')) {
    //eslint-disable-next-line
    console.log('TopFlop', {
      listingKey,
      loading,
      error: JSON.stringify(error),
      loadedNodes,
      nodes,
      listingKeyFromPath,
      path,
      url,
      quotelistNodes: data?.quoteList?.quoteList?.edges.map(
        (edge) => edge.node,
      ),
    });
  }

  if (!listingKey || loadedNodes.length === 0 || loading || error) {
    // data attributes are used for debugging purposes
    return (
      <div
        className={styles.Skeleton}
        data-listingKey={listingKey}
        data-loading={loading}
        data-er={JSON.stringify(error)}
        data-loadednodes-length={loadedNodes.length}
      ></div>
    );
  }

  const tracking = (integration_element: 'top' | 'flop') => {
    // only track on sponsored widget
    /* @ts-ignore TODO: TS7005 ->  Variable 'listingKey' implicitly has an 'any' type. */
    if (listingKey !== SMI_LISTING_KEY) {
      return;
    }
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'integration_impression',
        integration_action: 'Impression',
        integration_name: 'top_flop',
        integration_sponsor: 'BNPP',
        event_trigger: 'custom',
        integration_element: integration_element,
      },
    });
  };

  if (isInViewTop) {
    tracking('top');
  }

  if (isInViewFlop) {
    tracking('flop');
  }

  return (
    <div className={styles.Wrapper}>
      {/* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
      <div ref={setRefTop}>
        <p className={styles.Title}>Top</p>
        <TopFlopTable
          instruments={loadedNodes}
          order="asc"
          limit={10}
          addPutsCallsLinks={listingKey === SMI_LISTING_KEY ? true : false}
        />
      </div>
      {/* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
      <div ref={setRefFlop}>
        <p className={styles.Title}>Flop</p>
        <TopFlopTable
          instruments={loadedNodes}
          order="desc"
          limit={10}
          /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
          sponsorImage={
            listingKey === SMI_LISTING_KEY ? DEFAULT_SPONSOR_IMAGE : null
          }
          /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
          sponsorImageUrl={
            listingKey === SMI_LISTING_KEY ? DEFAULT_SPONSOR_IMAGE_URL : null
          }
          addPutsCallsLinks={listingKey === SMI_LISTING_KEY ? true : false}
        />
      </div>
    </div>
  );
};

const arePropsEqual = (prevProps: TopFlopProps, nextProps: TopFlopProps) => {
  if (prevProps.widgetParagraph.id === nextProps.widgetParagraph.id) {
    return true; // props are equal
  }
  return false; // props are not equal -> update the component
};

const MemoizedTopFlop = memo((props: TopFlopProps) => {
  return <TopFlop {...props} />;
}, arePropsEqual);

export default MemoizedTopFlop;
