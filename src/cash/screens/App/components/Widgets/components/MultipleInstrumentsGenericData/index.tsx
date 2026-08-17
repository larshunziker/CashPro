import React, { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { getSearchParams } from '../../helpers';
import { setInstrumentKeysAnonymous } from '../../../../../../shared/actions/autoUpdate';
import Link from '../../../../../../../common/components/Link';
import ButtonWithLoading from '../../../ButtonWithLoading';
import DataField from './components/DataField';
import { headerMapping } from '../../../../screens/MyCash/components/Table/components/headerMapping';
import { useWithCryptoData } from './helpers';
import { sortTableItems } from '../../../../screens/MyCash/components/Table/helpers';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import useInView from '../../../../../../../shared/hooks/useInView';
import {
  BITPANDA_INTEGRATION_URL,
  MULTIPLE_INSTRUMENTS_GENERIC_DATA,
  TRENDING_COINS_GENERIC_DATA,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../AutoUpdateProvider/queries'. '/Users/bhs/code/work/rasch-stack/s */
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from '../../../AutoUpdateProvider/queries';
import styles from './styles.legacy.css';
import { MultipleInstrumentsGenericDataProps } from './typings';

const MultipleInstrumentsGenericData = ({
  widgetParagraph,
  callbackData,
}: MultipleInstrumentsGenericDataProps) => {
  const dispatch = useDispatch();
  const searchParams = getSearchParams(widgetParagraph);
  const widgetTitle = searchParams['widgetTitle'] || '';
  const config = searchParams['config'];
  const partnerLogo = searchParams['partnerLogo'];
  const listingKeys = callbackData?.listingKeys || searchParams['listingKeys'];
  const isTrendingCoins = widgetTitle === 'Trending Coins';
  const sortedBy: string = searchParams['sortedBy'];
  const direction: 'asc' | 'desc' = searchParams['direction'];
  const removeIndices = searchParams['removeIndices'] || 'true';
  const parsedConfig = JSON.parse(config || '{}');
  const { setRef, isInView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const wasTriggered = useRef(false);

  const configFields = Object.values(parsedConfig) as (keyof Instrument)[];
  const {
    data: dataListingKeys,
    loading,
    error,
  } = useQuery<any>(GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS, {
    variables: {
      listingKeys,
      constituents: callbackData?.constituents || searchParams['constituents'],
    },
    skip: !listingKeys,
  });
  const nodes = dataListingKeys?.quoteList?.quoteList?.edges?.map(
    (edge: any) => edge.node,
  );
  const { logos, marketCaps } = useWithCryptoData(nodes, searchParams);
  const instruments = nodes?.map((node: any) => ({
    ...node,
    ...logos?.find((logo: any) => logo.symbol === node?.mSymb),
    ...marketCaps?.find(
      (item: any) =>
        item.listingKey === node?.instrumentKey ||
        item?.instrumentKey === node?.instrumentKey,
    ),
  }));
  const limit =
    parseInt(searchParams['limit']) ||
    Math.max(nodes?.length, instruments?.length) ||
    8;

  const sortedInstruments = sortTableItems(instruments, sortedBy, direction)
    ?.filter((instrument) => {
      if (removeIndices === 'false') {
        return true;
      }
      return instrument.scGrouped !== 'IND';
    })
    .filter((instrument) => !!instrument.mName) // removes inactive assets
    .slice(0, limit);

  const hasInstruments = !!instruments;

  useEffect(() => {
    if (hasInstruments && listingKeys) {
      dispatch(
        setInstrumentKeysAnonymous(
          listingKeys.split(',').map((key: string) => ({
            listingKey: key,
            isMarketOpen: true,
          })),
        ),
      );
    }
  }, [dispatch, listingKeys, hasInstruments]);

  const isLoading = loading || !!error || callbackData?.loading || false;

  if (isInView && isTrendingCoins && wasTriggered?.current === false) {
    wasTriggered.current = true;
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'integration_impression',
        integration_action: 'Impression',
        integration_name: 'krypto_trending_coins',
        integration_sponsor: 'BIT',
        event_trigger: 'custom',
        integration_element: 'Widget',
      },
    });
  }

  return (
    /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
    <div className={styles.Wrapper} ref={setRef}>
      <p className={styles.Title}>{widgetTitle}</p>
      <div className={styles.TableWrapper}>
        <table>
          <thead>
            <tr>
              {Object.keys(parsedConfig)?.map((field: any, colIdx: number) => {
                return (
                  <th
                    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'keyof Instrument' can't be used to index type '{ reado */
                    className={headerMapping[field]?.style}
                    key={colIdx}
                  >
                    {field}
                  </th>
                );
              })}
              {isTrendingCoins && <th>&nbsp;</th>}
            </tr>
          </thead>
          <tbody>
            {((isLoading || sortedInstruments === undefined) &&
              Array.from({ length: limit }).map((_: any, rowIdx: number) => (
                <tr key={rowIdx}>
                  {configFields?.map((_, colIdx) => {
                    return (
                      <td key={colIdx} className={styles.Skeleton}>
                        <span></span>
                      </td>
                    );
                  })}
                  {isTrendingCoins && <td>&nbsp;</td>}
                </tr>
              ))) ||
              null}
            {sortedInstruments?.map((instrument: any, rowIdx: number) => {
              return (
                <tr key={rowIdx}>
                  {configFields.map((field, colIdx) => {
                    const logo = colIdx === 0 ? instrument.logo : null;

                    return (
                      <td
                        key={colIdx}
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'keyof Instrument' can't be used to index type '{ reado */
                        className={headerMapping[field].style}
                      >
                        <DataField
                          logo={logo}
                          isLoading={isLoading}
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'keyof Instrument' can't be used to index type '{ reado */
                          field={headerMapping[field].formatter({
                            instrument,
                            value: instrument[field],
                            origin: isTrendingCoins
                              ? TRENDING_COINS_GENERIC_DATA
                              : MULTIPLE_INSTRUMENTS_GENERIC_DATA,
                          })}
                        />
                      </td>
                    );
                  })}
                  {isTrendingCoins && (
                    <td>
                      <ButtonWithLoading
                        loading={isLoading}
                        role="link"
                        size="small"
                        addClass={styles.PartnerButton}
                        onClick={(event) => {
                          event.preventDefault();
                          tealiumTrackEvent({
                            type: 'link',
                            payload: {
                              event_name: 'integration_click',
                              integration_action: 'Click',
                              integration_name: 'krypto_trending_coins',
                              integration_sponsor: 'BIT',
                              integration_label: instrument?.mName || '',
                              event_trigger: 'custom',
                              integration_element: 'trading_button',
                            },
                          });
                          window.open(BITPANDA_INTEGRATION_URL, '_blank');
                        }}
                      >
                        Trade
                      </ButtonWithLoading>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isTrendingCoins && (
        <div className={styles.Footer}>
          <p>presented by</p>
          <Link
            path={BITPANDA_INTEGRATION_URL}
            onClick={(event) => {
              event.preventDefault();
              tealiumTrackEvent({
                type: 'link',
                payload: {
                  event_name: 'integration_click',
                  integration_action: 'Click',
                  integration_name: 'krypto_trending_coins',
                  integration_sponsor: 'BIT',
                  event_trigger: 'custom',
                  integration_element: 'sponsor_logo',
                },
              });
              window.open(BITPANDA_INTEGRATION_URL, '_blank');
            }}
          >
            <img src={partnerLogo} alt="logo" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default memo<MultipleInstrumentsGenericDataProps>(
  MultipleInstrumentsGenericData,
);
