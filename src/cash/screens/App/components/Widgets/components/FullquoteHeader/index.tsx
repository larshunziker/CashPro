import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import autoUpdateStateSelector from '../../../../../../../shared/selectors/autoUpdateStateSelector';
import { setInstrumentKeysAnonymous } from '../../../../../../shared/actions/autoUpdate';
import useRaschRouterLocation from '../../../../../../../shared/hooks/useRaschRouterLocation';
import InstrumentActions from '../InstrumentActions';
import CopyToClipboard from './components/CopyToClipboard';
import { headerMapping } from '../../../../screens/MyCash/components/Table/components/headerMapping';
import { isListingKey } from '../../../../screens/MyCash/components/Portfolio/helpers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../AutoUpdateProvider/queries'. '/Users/bhs/code/work/rasch-stack/s */
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from '../../../AutoUpdateProvider/queries';
import styles from './styles.legacy.css';
import { FullquoteHeaderProps, QueryResult } from './typings';

const FullquoteHeader = ({ widgetParagraph }: FullquoteHeaderProps) => {
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  const listingKey = url?.searchParams?.get('listingKey').trim();
  const mIsin = url?.searchParams?.get('mIsin');
  const mName = url?.searchParams?.get('mName');
  const subtitle = url?.searchParams?.get('subtitle');
  const dispatch = useDispatch();
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const instrument =
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    useSelector((state) => autoUpdateStateSelector(state))?.data?.[listingKey];
  const location = useRaschRouterLocation();
  const isNewEmission = location?.pathname?.includes('/neuemissionen');

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

  const { data, loading, error } = useQuery<QueryResult>(
    GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS,
    {
      variables: { listingKeys: listingKey },
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      skip: !isListingKey(listingKey) || !mIsin,
    },
  );

  const node = instrument || data?.quoteList?.quoteList?.edges[0].node;

  if (error || loading || !node) {
    return <div className={styles.Skeleton}></div>;
  }
  const name = node.scGrouped === 'DER' ? mName : node.mName;
  const cur =
    node.scGrouped !== 'IND' && node.pricingQuotationId !== 4 ? node.mCur : '';

  return (
    <div className={styles.Wrapper}>
      <div>
        <div className={styles.TitleWrapper}>
          <h1 className={styles.Title}>{name}</h1>
          {subtitle && <p className={styles.Subtitle}>{subtitle}</p>}
        </div>
        {!isNewEmission && (
          <div className={styles.PriceWrapper}>
            <p className={styles.Price}>
              {headerMapping['lval'].formatter({
                value: node.lval,
                instrument: node,
              })}
              {node.pricingQuotationId === 4 ? <span>%</span> : null}
              <span className={styles.Currency}>{cur}</span>
            </p>

            <div className={styles.DeltaWrapper}>
              <p className={styles.DeltaPercentage}>
                {headerMapping['iNetVperprVPr'].formatter({
                  value: node.iNetVperprVPr,
                  instrument: node,
                })}
              </p>
              <p className={styles.Delta}>
                {headerMapping['iNetVperprV'].formatter({
                  value: node.iNetVperprV,
                  instrument: node,
                })}{' '}
                <span
                  className={
                    node.iNetVperprV?.includes('-')
                      ? styles.Negative
                      : styles.Positive
                  }
                ></span>
              </p>
            </div>
          </div>
        )}
        <div className={styles.InfoWrapper}>
          {(node.mSymb && (
            <p className={styles.Info}>
              Symbol <CopyToClipboard value={node.mSymb} />
            </p>
          )) ||
            null}
          <p className={styles.Info}>
            Valor <CopyToClipboard value={listingKey?.split('-')[0] || ''} />
          </p>
          {(mIsin && (
            <p className={styles.Info}>
              ISIN <CopyToClipboard value={mIsin} />
            </p>
          )) ||
            null}
        </div>
      </div>
      {!isNewEmission && (
        <div className={styles.ButtonWrapper}>
          <InstrumentActions widgetParagraph={widgetParagraph} />
        </div>
      )}
    </div>
  );
};

export default FullquoteHeader;
