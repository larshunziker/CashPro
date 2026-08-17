import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { orderbookFieldMapping } from './helpers';
import { setInstrumentKeysAnonymous } from '../../../../../../shared/actions/autoUpdate';
import RestrictedContent from '../../../RestrictedContent';
import { headerMapping } from '../../../../screens/MyCash/components/Table/components/headerMapping';
import { isListingKey } from '../../../../screens/MyCash/components/Portfolio/helpers';
import { useAutoUpdateFields } from '../../../../../../shared/hooks/useAutoUpdateFields';
import { PIANO_ORDERBOOK_WIDGET } from '../../../../../../../shared/constants/piano';
import {
  SUBSCRIPTION_TYPE_BANKING,
  SUBSCRIPTION_TYPE_PROFI,
} from '../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../AutoUpdateProvider/queries'. '/Users/bhs/code/work/rasch-stack/s */
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from '../../../AutoUpdateProvider/queries';
import styles from './styles.legacy.css';
import { OrderbookProps, QueryResult } from './typings';

const fallbackValues = {
  bidDatetime: '12:34:56',
  bidVolume: '1234',
  bid: '12.34',
  ask: '12.34',
  askVolume: '1234',
  askDatetime: '12:34:56',
};

const TableRowSkeleton = ({ count = 1 }) => (
  <>
    {new Array(count).fill(0).map((_, index) => (
      <tr key={index} className={styles.Skeleton}>
        <td>
          <span />
        </td>

        <td>
          <span />
        </td>
        <td className={styles.Bid}>
          <span />
        </td>
        <td className={styles.Ask}>
          <span />
        </td>

        <td>
          <span />
        </td>
        <td>
          <span />
        </td>
      </tr>
    ))}
  </>
);

const Orderbook = ({ widgetParagraph }: OrderbookProps) => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | URL'. */
  const url = new URL(widgetParagraph?.link?.path);
  const [askBidPercentages, setAskBidPercentages] = useState<
    Record<string, number>[]
  >([]);
  const listingKey =
    url.searchParams.has('listingKey') && url.searchParams.get('listingKey');
  const market =
    url.searchParams.has('mMarket') && url.searchParams.get('mMarket');
  const dispatch = useDispatch();

  const subscriptions = useSelector<ReduxState, string[]>(
    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
    ({ auth }) => auth.subscriptions,
  );

  const isCrawler = useSelector<ReduxState, boolean>(
    ({ route }) => route.isCrawler || false,
  );

  const hasValidSubscriptions =
    isCrawler ||
    [SUBSCRIPTION_TYPE_PROFI, SUBSCRIPTION_TYPE_BANKING].some((abo) =>
      subscriptions?.includes(abo),
    );

  const { data, loading, error } = useQuery<QueryResult>(
    GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS,
    {
      variables: { listingKeys: listingKey },
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | false | null' is not assignable to parameter of type 'string'. */
      skip: !isListingKey(listingKey),
    },
  );

  const edges = data?.quoteList?.quoteList?.edges || null;
  const instrument = edges?.[0]?.node as Instrument;
  const isSWXMarket = market === 'SWX';
  const tableRowCount = (isSWXMarket && 10) || 1;
  const showPianoWidget = !hasValidSubscriptions && isSWXMarket;
  const autoUpdateFields = useAutoUpdateFields(instrument, [
    'askVolume',
    'askVolume1st',
    'askVolume2nd',
    'askVolume3rd',
    'askVolume4th',
    'askVolume5th',
    'askVolume6th',
    'askVolume7th',
    'askVolume8th',
    'askVolume9th',
    'askVolume10th',
    'bidVolume',
    'bidVolume1st',
    'bidVolume2nd',
    'bidVolume3rd',
    'bidVolume4th',
    'bidVolume5th',
    'bidVolume6th',
    'bidVolume7th',
    'bidVolume8th',
    'bidVolume9th',
    'bidVolume10th',
  ]);

  const listingKeysForAutoupdate = useMemo(
    () =>
      edges
        ?.filter((edge: any) => !!edge.node)
        ?.map(({ node }: any) => ({
          listingKey: node?.instrumentKey,
          isMarketOpen: true,
        }))
        .filter((key) => key !== null) ?? null,
    [edges],
  );

  const getFieldNames = useCallback(
    (identifier: number) => {
      return hasValidSubscriptions && isSWXMarket
        ? /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ default */
          orderbookFieldMapping[identifier]
        : orderbookFieldMapping['default'];
    },
    [hasValidSubscriptions, isSWXMarket],
  );

  useEffect(() => {
    if (!hasValidSubscriptions && askBidPercentages.length === 0) {
      const newAskBidPercentages = [];
      for (let i = 1; i <= tableRowCount; i++) {
        newAskBidPercentages.push({
          idx: i - 1,
          askPercentage: (100 / tableRowCount) * i,
          bidPercentage: (100 / tableRowCount) * i,
        });
      }
      setAskBidPercentages(newAskBidPercentages);
      return;
    }
    if (hasValidSubscriptions && autoUpdateFields?.askVolume > 0) {
      let totalAsk = 0;
      let totalBid = 0;

      for (let i = 0; i < tableRowCount; i++) {
        const fieldName = getFieldNames(i + 1);
        totalAsk += parseInt(autoUpdateFields?.[fieldName?.askVolume]) || 0;
        totalBid += parseInt(autoUpdateFields?.[fieldName?.bidVolume]) || 0;
      }

      let runningAsk = 0;
      let runningBid = 0;
      const newPercentages: Record<string, number>[] = [];

      for (let i = 0; i < tableRowCount; i++) {
        const fieldName = getFieldNames(i + 1);
        runningAsk += parseInt(autoUpdateFields?.[fieldName?.askVolume]) || 0;
        runningBid += parseInt(autoUpdateFields?.[fieldName?.bidVolume]) || 0;

        const askPercentage = totalAsk > 0 ? (runningAsk / totalAsk) * 100 : 0;
        const bidPercentage = totalBid > 0 ? (runningBid / totalBid) * 100 : 0;

        newPercentages.push({ idx: i, askPercentage, bidPercentage });
      }

      setAskBidPercentages(newPercentages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValidSubscriptions, tableRowCount, autoUpdateFields, getFieldNames]);

  useEffect(() => {
    if (listingKeysForAutoupdate && askBidPercentages.length === 0) {
      dispatch(setInstrumentKeysAnonymous(listingKeysForAutoupdate));
    }
  }, [dispatch, listingKeysForAutoupdate, askBidPercentages.length]);

  return (
    <div className={styles.Wrapper}>
      <p className={styles.Title}>Orderbuch</p>
      <div className={styles.TableWrapper}>
        <table className={styles.Table}>
          <thead>
            <tr className={styles.Heading}>
              <th className={styles.BidDatetime}>Zeit</th>
              <th className={styles.BidVolume}>Vol.</th>
              <th className={styles.Bid}>Bid</th>
              <th className={styles.Ask}>Ask</th>
              <th className={styles.AskVolume}>Vol.</th>
              <th className={styles.AskDatetime}>Zeit</th>
            </tr>
          </thead>
          <tbody key={`orderbook-table-${listingKey}-${hasValidSubscriptions}`}>
            <>
              {(loading || error) && <TableRowSkeleton count={tableRowCount} />}
              {!loading &&
                data &&
                // iterate over an array of 10 items to display always 10 items if possible (fallback values for restricted case)
                [...new Array(tableRowCount)].map((_, index) => {
                  const identifier = index + 1;
                  const isRestricted = !hasValidSubscriptions && identifier > 1;
                  const fieldNames = getFieldNames(index + 1);
                  const { askPercentage, bidPercentage } =
                    askBidPercentages?.find((item) => item.idx === index) || {};

                  return (
                    <tr
                      key={`orderbook-table-row-${instrument?.instrumentKey}-${identifier}-${isRestricted}`}
                    >
                      <td className={styles.BidDatetime}>
                        {(isRestricted && (
                          <RestrictedContent isActive={isRestricted}>
                            <>{fallbackValues.bidDatetime}</>
                          </RestrictedContent>
                        )) ||
                          headerMapping['bidDatetime'].formatter({
                            /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Instrument'. */
                            value: instrument?.[fieldNames?.bidDatetime],
                            instrument: instrument,
                            fieldType: fieldNames?.bidDatetime,
                          })}
                      </td>
                      <td className={styles.BidVolume}>
                        <RestrictedContent isActive={isRestricted}>
                          {(isRestricted && <>{fallbackValues.bidVolume}</>) ||
                            headerMapping['bidVolume'].formatter({
                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Instrument'. */
                              value: instrument?.[fieldNames?.bidVolume],
                              instrument: instrument,
                              fieldType: fieldNames?.bidVolume,
                            })}
                        </RestrictedContent>
                      </td>
                      <td className={styles.Bid}>
                        <RestrictedContent isActive={isRestricted}>
                          {(isRestricted && <>{fallbackValues.bid}</>) ||
                            headerMapping['bid'].formatter({
                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Instrument'. */
                              value: instrument?.[fieldNames?.bid],
                              instrument: instrument,
                              fieldType: fieldNames?.bid,
                            })}
                        </RestrictedContent>
                      </td>
                      <td className={styles.Ask}>
                        <RestrictedContent isActive={isRestricted}>
                          {(isRestricted && <>{fallbackValues.ask}</>) ||
                            headerMapping['ask'].formatter({
                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Instrument'. */
                              value: instrument?.[fieldNames?.ask],
                              instrument: instrument,
                              fieldType: fieldNames?.ask,
                            })}
                        </RestrictedContent>
                      </td>
                      <td className={styles.AskVolume}>
                        <RestrictedContent isActive={isRestricted}>
                          {(isRestricted && <>{fallbackValues.askVolume}</>) ||
                            headerMapping['askVolume'].formatter({
                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Instrument'. */
                              value: instrument?.[fieldNames?.askVolume],
                              instrument: instrument,
                              fieldType: fieldNames?.askVolume,
                            })}
                        </RestrictedContent>
                      </td>
                      <td className={styles.AskDatetime}>
                        {(isRestricted && (
                          <RestrictedContent isActive={isRestricted}>
                            <>{fallbackValues.askDatetime}</>
                          </RestrictedContent>
                        )) ||
                          headerMapping['askDatetime'].formatter({
                            /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Instrument'. */
                            value: instrument?.[fieldNames?.askDatetime],
                            instrument: instrument,
                            fieldType: fieldNames?.askDatetime,
                          })}
                      </td>
                      {isSWXMarket && bidPercentage > 0 && (
                        <td
                          className={styles.BidProgressBar}
                          style={{
                            left: `calc(50% - ${bidPercentage / 2}%`,
                            width: `${bidPercentage / 2}%`,
                          }}
                        />
                      )}
                      {isSWXMarket && askPercentage > 0 && (
                        <td
                          className={styles.AskProgressBar}
                          style={{
                            width: `${askPercentage / 2}%`,
                          }}
                        />
                      )}
                    </tr>
                  );
                })}
            </>
          </tbody>
        </table>
      </div>
      <div
        className={classNames(PIANO_ORDERBOOK_WIDGET, styles.PianoWidget, {
          [styles.Hidden]: !showPianoWidget,
        })}
      ></div>
    </div>
  );
};

export default Orderbook;
