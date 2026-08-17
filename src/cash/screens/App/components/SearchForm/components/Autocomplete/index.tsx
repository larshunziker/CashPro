/* istanbul ignore file */

import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import { useQuery } from '@apollo/client';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './../../../../../../../shared/decorators/withDebouncedProps'. '/Users/bhs */
import withDebouncedProps from './../../../../../../../shared/decorators/withDebouncedProps';
import { setNavigationVisible } from '../../../../../../shared/actions/navigation';
import useInView from '../../../../../../../shared/hooks/useInView';
import AutoSuggestSearchResults from '../../../AutoSuggestSearch/components/AutoSuggestSearchResults';
import {
  WEB_APP_EVENT_NAMESPACE,
  getEventName,
} from '../../../../../../../common/components/HybridAppProvider';
import { searchAllApolloConfig } from '../../../../screens/Search/apolloConfig';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import {
  BOND,
  CRYPTO_CURRENCY,
  DERIVATE,
  DIVERSE,
  EQUITY,
  FUND,
  INDEX,
  NEWS,
  NEW_EMISSION,
  SEARCH_RESULT_CONFIG,
  WIKIFOLIO,
} from '../../../AutoSuggestSearch/constants';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Autocomplete = (props) => {
  const intervalIdRef = useRef(null);
  const navigate = useStableNavigate();
  const { setRef, isInView, entry } = useInView({
    rootMargin: '1px',
  });
  const dispatch = useDispatch();

  const inputFieldRef = useRef(null);
  const queryString =
    typeof props.queryString !== 'undefined' ? props.queryString : '';

  const { query, additionalQuery, ...options } = searchAllApolloConfig.options({
    location,
    params: {
      searchQuery: queryString,
    },
  });
  const customOptions = {
    ...options,
    skip: !queryString || queryString.length < props.minQueryLength,
  };
  const { data, loading } = useQuery(query, customOptions);
  const { data: cmsData, loading: cmsDataLoading } = useQuery(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'DocumentNode | TypedDocumentNode<any, OperationVariables> | undefined' is not assignable to parameter */
    additionalQuery,
    customOptions,
  );
  useEffect(() => {
    /* @ts-ignore TODO: TS2322 ->  Type 'HTMLElement' is not assignable to type 'null'. */
    inputFieldRef.current = document?.querySelectorAll(
      'input[name="search"].search-bar',
    )?.[0] as HTMLElement;
  }, []);
  const isLoading = loading || cmsDataLoading;
  const globalSearch = cmsData?.environment?.globalSearch;
  const { textSearch, wikifolio, newEmission } = data || {};
  const searchResults = [
    {
      type: EQUITY,
      title: `Aktien (${textSearch?.equity?.count})`,
      titleLink: `/suche/aktien/${queryString}`,
      items: textSearch?.equity?.items,
    },
    {
      type: NEWS,
      title: `News (${globalSearch?.count})`,
      titleLink: `/suche/news/${queryString}`,
      /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
      items: globalSearch?.edges.map(({ node }) => {
        return {
          ...node,
          name: node.title,
          mName: node.title,
        };
      }),
    },
    {
      type: INDEX,
      title: `Index (${textSearch?.index?.count})`,
      titleLink: `/suche/indizes/${queryString}`,
      items: textSearch?.index?.items,
    },
    {
      type: CRYPTO_CURRENCY,
      title: `ETFs (${textSearch?.cryptoCurrency?.count})`,
      titleLink: `/suche/kryptowaehrungen/${queryString}`,
      items: textSearch?.cryptoCurrency?.items,
    },
    {
      type: FUND,
      title: `Fund (${textSearch?.fund?.count})`,
      titleLink: `/suche/fonds/${queryString}`,
      items: textSearch?.fund?.items,
    },
    {
      type: BOND,
      title: `Bond (${textSearch?.bond?.count})`,
      titleLink: `/suche/bond/${queryString}`,
      items: textSearch?.bond?.items,
    },
    {
      type: DERIVATE,
      title: `Derivate (${textSearch?.derivative?.count})`,
      titleLink: `/suche/derivate/${queryString}`,
      items: textSearch?.derivative?.items,
    },
    {
      type: DIVERSE,
      title: `Diverse (${textSearch?.diverse?.count})`,
      titleLink: `/suche/diverse/${queryString}`,
      items: textSearch?.diverse?.items,
    },
    {
      type: WIKIFOLIO,
      title: `Wikifolio (${wikifolio?.count})`,
      titleLink: `/suche/wikifolio/${queryString}`,
      items: wikifolio?.items,
    },
    {
      type: NEW_EMISSION,
      title: `Neue Emissionen (${newEmission?.count})`,
      titleLink: `/suche/neuemissionen/${queryString}`,
      items: newEmission?.items,
    },
  ];
  const searchResultsCopy = JSON.parse(JSON.stringify(searchResults));

  const emptyResult = searchResultsCopy.every(
    /* @ts-ignore TODO: TS7031 ->  Binding element 'items' implicitly has an 'any' type. */
    ({ items }) => !items || items.length === 0,
  );

  const handleKeyPress = useMemo((): any => {
    if (intervalIdRef.current) {
      clearTimeout(intervalIdRef.current);
    }

    if (isInView && queryString.length > 1 && !isLoading && !emptyResult) {
      /* @ts-ignore TODO: TS2322 ->  Type 'Timeout' is not assignable to type 'null'. */
      intervalIdRef.current = setTimeout(() => {
        /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
        clearTimeout(intervalIdRef.current);
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        inputFieldRef.current.blur();
      }, 800);
    }
  }, [isInView, queryString, isLoading, emptyResult]);

  useEffect(() => {
    if (inputFieldRef.current) {
      /* @ts-ignore TODO: TS2339 ->  Property 'addEventListener' does not exist on type 'never'. */
      inputFieldRef.current.addEventListener('input', handleKeyPress);
    }

    // on touch start, blur the input field on entry element
    if (entry && entry.target && inputFieldRef.current) {
      entry.target.addEventListener('touchstart', () => {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        inputFieldRef.current.blur();
      });
    }

    return () => {
      if (inputFieldRef.current) {
        /* @ts-ignore TODO: TS2339 ->  Property 'removeEventListener' does not exist on type 'never'. */
        inputFieldRef.current.removeEventListener('input', handleKeyPress);
      }

      if (entry && entry.target && inputFieldRef.current) {
        entry.target.removeEventListener('touchstart', () => {
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          inputFieldRef.current.blur();
        });
      }
    };
  }, [isInView, queryString, handleKeyPress, entry]);

  useEffect(() => {
    if (isInView) {
      // make sure to let the user scroll over AutoSuggestSearchResults and not the document.body
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
      if (intervalIdRef.current && !isLoading && !emptyResult) {
        clearTimeout(intervalIdRef.current);
      }
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [entry, isInView, isLoading, emptyResult]);

  // @ts-ignore
  const onClickResult = (event, listingId, title, item) => {
    const link = item?.preferredUri || item?.link;
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'NavigationMenuType'. */
    dispatch(setNavigationVisible(null));

    // TODO: verify why redux state is not closing the header on click
    const eventName = getEventName(
      'handle-search-click',
      WEB_APP_EVENT_NAMESPACE,
    );
    const customEvent = new CustomEvent(eventName);
    window.dispatchEvent(customEvent);
    if (link) {
      props.menuCloseHandler();
      navigate(item?.preferredUri || item?.link);
    }
  };

  const NEWS_INDEX = SEARCH_RESULT_CONFIG.indexOf(NEWS);
  if (NEWS_INDEX > -1) {
    SEARCH_RESULT_CONFIG.splice(NEWS_INDEX, 1);
  }
  SEARCH_RESULT_CONFIG.splice(1, 0, NEWS);

  return (
    <div className={styles.Wrapper}>
      {isLoading && (
        <div
          key={`loading-wrapper-${queryString}`}
          className={styles.LoadingIndicator}
        >
          <div className={styles.LoadingIndicatorItem}>
            <div className={styles.LoadingBar} />
          </div>
          <div className={styles.LoadingIndicatorItem}>
            <div className={styles.LoadingBar} />
          </div>
        </div>
      )}
      {!isLoading && !emptyResult && (
        /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
        <div ref={setRef}>
          {searchResultsCopy.map(
            /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
            /* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
            /* @ts-ignore TODO: TS7031 ->  Binding element 'items' implicitly has an 'any' type. */
            /* @ts-ignore TODO: TS7031 ->  Binding element 'titleLink' implicitly has an 'any' type. */
            ({ type, title, items, titleLink }) =>
              items &&
              items.length > 0 &&
              SEARCH_RESULT_CONFIG.includes(type) && (
                <AutoSuggestSearchResults
                  key={title}
                  title={title}
                  titleLink={titleLink || null}
                  items={items}
                  handleSearchResults={onClickResult}
                  handleTitleSearchResults={onClickResult}
                />
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default compose<any, any>(withDebouncedProps())(Autocomplete);
