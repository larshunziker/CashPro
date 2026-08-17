import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { formatPrice } from '../../../Highcharts/helpers';
import { useWidgetParagraphQuery } from '../../helpers';
import autoUpdateStateSelector from '../../../../../../../shared/selectors/autoUpdateStateSelector';
import { setInstrumentKeysAnonymous } from '../../../../../../shared/actions/autoUpdate';
import Tooltip from '../../../Tooltip';
import styles from './styles.legacy.css';
import { VolumeTurnoverProps } from './typings';

const VolumeTurnover = ({ widgetParagraph }: VolumeTurnoverProps) => {
  const { fields, instrument, loading, error } = useWidgetParagraphQuery(
    widgetParagraph,
    [
      'vol',
      'volDatetime',
      'tur',
      'totvol',
      'totvolDatetime',
      'tottur',
      'pVol',
      'pVolDatetime',
      'pTur',
      'pOffvol',
      'pOffvolDatetime',
      'pOfftur',
      'mCur',
    ],
  );

  const updatedInstrument = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    (state) => autoUpdateStateSelector(state).data?.[instrument?.instrumentKey],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setInstrumentKeysAnonymous([
        {
          isMarketOpen: true,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          listingKey: instrument?.instrumentKey,
        },
      ]),
    );
  }, [dispatch, instrument?.instrumentKey]);

  if (error || loading || !instrument) {
    return <div className={styles.Skeleton}></div>;
  }

  const getOffMarketValue = (market: string, total: string) => {
    let marketString = '0';
    let totalString = '0';
    if (updatedInstrument) {
      marketString = updatedInstrument[market];
      totalString = updatedInstrument[total];
    }
    if (instrument) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Instrument'. */
      marketString = instrument[market];
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Instrument'. */
      totalString = instrument[total];
    }
    return (
      formatPrice(
        parseFloat(totalString) - parseFloat(marketString),
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
        'default',
      ) || '–'
    );
  };

  return (
    <div className={styles.Wrapper}>
      <p className={styles.Title}>Volumen & Umsatz</p>
      <div>
        <div className={styles.TitleRow}>
          <span></span>
          <span>Volumen (Stk)</span>
          <span>
            Umsatz (<>{fields.mCur}</>)
          </span>
        </div>
        <div>
          <div className={styles.Row}>
            <span>Börslich</span>
            <div>
              <>{fields.vol}</>
              <div className={styles.Info}>
                <>{fields.volDatetime}</>
              </div>
            </div>
            <div>
              <>{fields.tur}</>
            </div>
          </div>
          <div className={styles.Row}>
            <span>Ausserbörslich</span>
            <div>
              {getOffMarketValue('vol', 'totvol')}
              <div className={styles.Info}>
                {(getOffMarketValue('vol', 'totvol') !== '–' && (
                  <>{fields.totvolDatetime}</>
                )) ||
                  null}
              </div>
            </div>
            <div>
              <span>{getOffMarketValue('tur', 'tottur')}</span>
            </div>
          </div>
          <div className={classNames(styles.Row, styles.Bold)}>
            <span>Total</span>
            <div>
              <>{fields.totvol}</>
            </div>
            <div>
              <>{fields.tottur}</>
            </div>
          </div>
          <div className={styles.Divider}></div>
          <div className={styles.Row}>
            <span className={styles.TextWithInfoIcon}>
              Vortag
              <span className={styles.Inline}>
                Börslich
                <Tooltip content="Tag an dem das Instrument zuletzt gehandelt wurde im Vergleich zum aktuellen Tag" />
              </span>
            </span>
            <div>
              <>{fields.pVol}</>
              <div className={styles.Info}>
                <>{fields.pVolDatetime}</>
              </div>
            </div>
            <div>
              <>{fields.pTur}</>
            </div>
          </div>
          <div className={styles.Row}>
            <span className={styles.TextWithInfoIcon}>
              Vortag
              <span className={styles.Inline}>
                Ausserbörslich
                <Tooltip content="Tag an dem das Instrument zuletzt gehandelt wurde im Vergleich zum aktuellen Tag" />
              </span>
            </span>
            <div>
              <>{fields.pOffvol}</>
              <div className={styles.Info}>
                <>{(instrument?.pOffvol && fields.pOffvolDatetime) || '–'}</>
              </div>
            </div>
            <div>
              <>{fields.pOfftur}</>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeTurnover;
