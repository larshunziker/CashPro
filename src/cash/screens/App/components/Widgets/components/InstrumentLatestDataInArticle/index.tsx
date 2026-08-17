import React from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import useRaschRouterLocation from '../../../../../../../shared/hooks/useRaschRouterLocation';
import InstrumentLatestData from '../InstrumentLatestData';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import { PIANO_TRADING_TEASER_WIDGET } from '../../../../../../../shared/constants/piano';
import { SUBSCRIPTION_TYPE_BANKING } from '../../../../constants';
import {
  GET_FULLQUOTEURL_FROM_ARTICLE,
  GET_FULLQUOTE_PAGE_FOR_LATEST_DATA,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
} from './queries';
import styles from './styles.legacy.css';
import { QueryResultArticle, QueryResultFullquote } from './typings';

const InstrumentLatestDataInArticle = () => {
  const location = useRaschRouterLocation();
  const {
    data: articleData,
    loading: articleLoading,
    error: articleError,
  } = useQuery<QueryResultArticle>(GET_FULLQUOTEURL_FROM_ARTICLE, {
    variables: {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      path: location.pathname.startsWith('/')
        ? /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          location.pathname.slice(1)
        : location.pathname,
    },
    ssr: false,
  });

  const fullquoteUrl =
    articleData?.environment?.routeByPath?.object?.valors?.edges?.[0]?.node
      ?.fullquoteUrl;

  const {
    data: fullquoteData,
    loading: fullquoteLoading,
    error: fullquoteError,
  } = useQuery<QueryResultFullquote>(GET_FULLQUOTE_PAGE_FOR_LATEST_DATA, {
    variables: {
      path: fullquoteUrl,
      publication: 'CASH',
    },
    skip: articleLoading || !!articleError || !fullquoteUrl,
    ssr: false,
  });

  const subscriptions = useSelector<ReduxState, string[]>(
    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
    ({ auth }) => auth.subscriptions,
  );

  const hasSubscriptions = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.hasSubscriptions || false,
  );

  const isCrawler = useSelector<ReduxState, boolean>(
    ({ route }) => route.isCrawler || false,
  );

  const hasValidSubscriptions =
    isCrawler ||
    (!hasSubscriptions
      ? false
      : [SUBSCRIPTION_TYPE_BANKING].some((abo) => subscriptions.includes(abo)));

  if (fullquoteLoading || fullquoteError || !fullquoteData) {
    return <div className={styles.Skeleton}></div>;
  }

  const title = fullquoteData?.getFullquotePage?.mName || '';

  const url = new URL('https://www.cash.ch/');
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  url.searchParams.set('listingId', fullquoteData.getFullquotePage.listingId);
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  url.searchParams.set('tradeType', fullquoteData.getFullquotePage.tradeType);
  url.searchParams.set(
    'hrefBuy',
    `"${fullquoteData.getFullquotePage.hrefBuy}"`,
  );

  return (
    <>
      <InstrumentLatestData
        widgetParagraph={{
          link: {
            path: url.href,
          },
        }}
        title={
          <Link path={`/${fullquoteUrl}`} className={styles.Title}>
            {title}
            <Icon addClass={styles.LinkIndicator} type="IconChevronRight" />
          </Link>
        }
      />
      {!hasValidSubscriptions && (
        <div className={PIANO_TRADING_TEASER_WIDGET} />
      )}
    </>
  );
};

export default InstrumentLatestDataInArticle;
