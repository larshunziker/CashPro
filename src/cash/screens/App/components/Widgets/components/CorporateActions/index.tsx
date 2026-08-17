import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { isListingKey } from '../../../../screens/MyCash/components/Portfolio/helpers';
import { cleanEvents } from './helpers';
import { setInstrumentKeysAnonymous } from '../../../../../../shared/actions/autoUpdate';

import Icon from '../../../Icon';
import Tooltip from '../../../Tooltip';
import Event from './components/Event';
import Tabs from './components/Tabs';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import RestrictedContent from '../../../RestrictedContent';
import { PIANO_CORPORATE_ACTIONS_WIDGET } from '../../../../../../../shared/constants/piano';
import {
  SUBSCRIPTION_TYPE_ANLEGER,
  SUBSCRIPTION_TYPE_BANKING,
  SUBSCRIPTION_TYPE_PROFI,
} from '../../../../constants';
import { ANCHOR_ID, EVENTS, INITIAL_ITEMS_SHOWN } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../AutoUpdateProvider/queries'. '/Users/bhs/code/work/rasch-stack/s */
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from '../../../AutoUpdateProvider/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_CORPORATE_ACTIONS } from './queries';
import styles from './styles.legacy.css';
import { ButtonProps } from './components/Tabs/typings';
import {
  CorporateActionsProps,
  QueryResult,
  QueryResultInstrumentData,
} from './typings';

const CorporateActions = ({ widgetParagraph }: CorporateActionsProps) => {
  const { isSSR } = useSSRContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState('ALLE');
  const eventCD = Object.keys(EVENTS);
  const today = new Date();
  const toDate = today.toISOString().split('T')[0];
  today.setFullYear(today.getFullYear() - 4);
  const dispatch = useDispatch();
  const fromDate = today.toISOString().split('T')[0];
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  const listingKey = url?.searchParams?.get('listingKey').trim();
  const mIsin = url?.searchParams?.get('mIsin');

  const {
    data: instrumentData,
    loading: instrumentDataLoading,
    error: instrumentDataError,
  } = useQuery<QueryResultInstrumentData>(
    GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS,
    {
      variables: { listingKeys: listingKey },
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      skip: !isListingKey(listingKey) || !mIsin,
    },
  );

  const instrument = instrumentData?.quoteList?.quoteList?.edges[0]?.node;

  const { data, error, loading } = useQuery<QueryResult>(
    GET_CORPORATE_ACTIONS,
    {
      variables: {
        operationalMic: instrument?.mic,
        localCode: instrument?.mSymb,
        isin: mIsin,
        eventCD,
        toDate,
        fromDate,
      },
      skip: !!(
        isSSR ||
        !instrumentData ||
        !instrument ||
        !instrument?.mic ||
        instrumentDataLoading ||
        !instrument?.mSymb ||
        instrumentDataError
      ),
      nextFetchPolicy: 'cache-only',
    },
  );

  useEffect(() => {
    dispatch(
      setInstrumentKeysAnonymous([
        {
          isMarketOpen: true,
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          listingKey: listingKey,
        },
      ]),
    );
  }, [dispatch, listingKey]);

  const events = structuredClone(
    data?.integration?.edi?.corporateAction?.jsondata,
  );

  const toggleOpen = () => {
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'fullquote_corporate_actions',
        event_category: 'fullquote_page',
        event_action: `corporate_actions_show_${isOpen ? 'less' : 'more'}`,
      },
    });
    setIsOpen(!isOpen);
  };

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
  const hasValidSubscriptions = useMemo(() => {
    if (isCrawler) {
      return true;
    }

    if (!hasSubscriptions) {
      return false;
    }

    return [
      SUBSCRIPTION_TYPE_ANLEGER,
      SUBSCRIPTION_TYPE_PROFI,
      SUBSCRIPTION_TYPE_BANKING,
    ].some((abo) => subscriptions.includes(abo));
  }, [subscriptions, isCrawler, hasSubscriptions]);

  const uniqueTabs = () => {
    const unique: ButtonProps | {} = {};
    const tabs = [
      { key: 'ALLE', label: 'ALLE' },
      ...Object.keys(EVENTS).map((key) => ({
        key: key,
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'EventConfig'. */
        label: EVENTS[key].label,
      })),
    ];
    tabs.forEach((tab) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      unique[tab.label] = tab;
    });
    return Object.values(unique) as ButtonProps[];
  };

  if (loading || error || !events) {
    return null;
  }

  const cleanedEvents = cleanEvents(
    events,
    EVENTS[activeEvent as keyof typeof EVENTS]?.eventCollection,
  );

  return (
    <div className={styles.Wrapper} id={ANCHOR_ID}>
      <p className={styles.Title}>
        CORPORATE ACTIONS
        <div className={styles.Icon}>
          <Tooltip
            content={`Corporate Actions sind Massnahmen von Unternehmen,
      die sich direkt auf die Aktien eines Anlegers auswirken.
      Dazu gehören eine Vielzahl von Aktivitäten wie Kapitalerhöhungen,
      Aktiensplits, Dividendenzahlungen oder Fusionen.
      Diese Massnahmen können den Wert und die Struktur Ihrer Anlagen verändern.
      Es ist wichtig, solche Änderungen zu kennen,
      da sie sich auf Ihre Anlagestrategie und Ihr Portfolio auswirken können.
      Verschaffen Sie sich mit einem Anleger- oder Profi-Abonnement einen
      informativen Überblick über die Corporate Actions der wichtigsten
      Schweizer und internationalen Aktien.`}
          />
        </div>
      </p>

      <Tabs
        activeTab={activeEvent}
        setActiveTab={setActiveEvent}
        buttons={uniqueTabs()}
      />
      <div className={styles.EventsWrapper}>
        {cleanedEvents
          .slice(0, isOpen ? 100 : INITIAL_ITEMS_SHOWN)
          .map((event) => (
            <Event
              key={event.eventid}
              event={event}
              hasSubscription={hasValidSubscriptions}
            />
          ))}
        {hasValidSubscriptions &&
          cleanedEvents.length > INITIAL_ITEMS_SHOWN && (
            <button
              className={classNames(styles.CollapseButton)}
              onClick={toggleOpen}
            >
              <span>{!isOpen ? 'Mehr anzeigen' : 'Weniger anzeigen'}</span>
              <Icon type={!isOpen ? 'IconChevronDown' : 'IconChevronUp'} />
            </button>
          )}
        {hasValidSubscriptions && cleanedEvents.length === 0 && (
          <RestrictedContent isActive={!hasValidSubscriptions}>
            <div className={styles.NoData}>Derzeit keine Daten verfügbar</div>
          </RestrictedContent>
        )}
        <div
          className={classNames(
            PIANO_CORPORATE_ACTIONS_WIDGET,
            styles.PianoWidget,
            {
              [styles.Hidden]: hasValidSubscriptions,
            },
          )}
        />
      </div>
    </div>
  );
};

export default CorporateActions;
