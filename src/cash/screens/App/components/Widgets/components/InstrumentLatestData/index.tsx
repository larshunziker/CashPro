import React, { memo, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import classnames from 'classnames';
import { getSearchParams, useWidgetParagraphQuery } from '../../helpers';
import autoUpdateStateSelector from '../../../../../../../shared/selectors/autoUpdateStateSelector';
import PriceData from './components/PriceData';
import TraderInfo from './components/TraderInfo';
import { SUBSCRIPTION_TYPE_BANKING } from '../../../../constants';
import styles from './styles.legacy.css';
import { InstrumentLatestDataProps } from './typings';

const InstrumentLatestData = ({
  widgetParagraph,
  title,
}: InstrumentLatestDataProps) => {
  const isInArticle = !!title;
  const searchParams = getSearchParams(widgetParagraph);
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"caller"' can't be used to index type '{ config */
  const isAlertForm = searchParams['caller'] === 'setAlert';
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"tradeType"' can't be used to index type '{ config */
  const tradeType = searchParams['tradeType'];
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"hrefBuy"' can't be used to index type '{ config */
  const hrefBuy = searchParams['hrefBuy'];

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

  const traderInfoKeys = [
    'ask',
    'askDatetime',
    'askVolume',
    'bid',
    'bidVolume',
    'bidDatetime',
    'vol',
    'tur',
    'isin',
  ] as (keyof Instrument)[];

  const { fields, instrument, loading, error } = useWidgetParagraphQuery(
    widgetParagraph,
    [
      'mCur',
      'mName',
      'lval',
      'lvalDatetime',
      'open',
      'openDatetime',
      'dayBefore',
      'dayBeforeDate',
      'iNetVperprV',
      'iNetVperprVPr',
      'scGrouped',
      ...(isAlertForm ? [] : traderInfoKeys),
    ],
    !isAlertForm && hasValidSubscriptions
      ? {
          bid: 'bidValue1st',
          bidDatetime: 'bidDatetime1st',
          bidVolume: 'bidVolume1st',
          ask: 'askValue1st',
          askDatetime: 'askDatetime1st',
          askVolume: 'askVolume1st',
        }
      : {},
  );

  const autoUpdateFields = useSelector(
    (state) => ({
      bid1st:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        autoUpdateStateSelector(state).data?.[instrument?.instrumentKey]?.[
          'bidValue1st'
        ],
      ask1st:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        autoUpdateStateSelector(state).data?.[instrument?.instrumentKey]?.[
          'askValue1st'
        ],
      askVolume:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        autoUpdateStateSelector(state).data?.[instrument?.instrumentKey]?.[
          'askVolume'
        ],
      askVolume1st:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        autoUpdateStateSelector(state).data?.[instrument?.instrumentKey]?.[
          'askVolume1st'
        ],
      bidVolume:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        autoUpdateStateSelector(state).data?.[instrument?.instrumentKey]?.[
          'bidVolume'
        ],
      bidVolume1st:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        autoUpdateStateSelector(state).data?.[instrument?.instrumentKey]?.[
          'bidVolume1st'
        ],
      bidDatetime1st:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        autoUpdateStateSelector(state).data?.[instrument?.instrumentKey]?.[
          'bidDatetime1st'
        ],
      askDatetime1st:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        autoUpdateStateSelector(state).data?.[instrument?.instrumentKey]?.[
          'askDatetime1st'
        ],
    }),
    shallowEqual,
  );

  // fallback to instrument needed to ensure also derivates have a value ¯\_(ツ)_/¯
  const autoUpdateVolumes = hasValidSubscriptions
    ? {
        ask: autoUpdateFields?.ask1stVolume,
        bid: autoUpdateFields?.bid1stVolume,
      }
    : { ask: autoUpdateFields?.askVolume, bid: autoUpdateFields?.bidVolume };

  const askVolume = autoUpdateVolumes.ask || instrument?.askVolume;
  const bidVolume = autoUpdateVolumes.bid || instrument?.bidVolume;

  const barPercentages = useMemo(() => {
    if (!askVolume || !bidVolume) return { ask: null, bid: null };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'field' implicitly has an 'any' type. */
    const calculatePercentage = (field) => {
      const totalVolume = parseInt(askVolume) + parseInt(bidVolume);

      return Number.isFinite(parseFloat(field))
        ? Math.round((100 / totalVolume) * parseInt(field))
        : 0;
    };

    return {
      ask: calculatePercentage(askVolume),
      bid: calculatePercentage(bidVolume),
    };
  }, [askVolume, bidVolume]);

  const curr = !instrument
    ? ''
    : (instrument?.pricingQuotationId === 4 ? '%' : '') +
      (instrument?.scGrouped !== 'IND' && instrument?.pricingQuotationId !== 4
        ? instrument?.mCur
        : '');

  const isLoading = loading || !instrument;

  return (
    <div
      className={classnames(styles.Wrapper, {
        [styles.IsAlertForm]: isAlertForm,
      })}
    >
      {isInArticle && title}
      <PriceData
        loading={isLoading}
        /* @ts-ignore TODO: TS2322 ->  Type 'ApolloError | undefined' is not assignable to type 'ApolloError'. */
        error={error}
        fields={fields}
        isAlertForm={isAlertForm}
        curr={curr}
        instrument={instrument}
      />
      {!isAlertForm && instrument?.scGrouped !== 'IND' && (
        <TraderInfo
          instrument={instrument}
          loading={isLoading}
          /* @ts-ignore TODO: TS2322 ->  Type 'ApolloError | undefined' is not assignable to type 'ApolloError'. */
          error={error}
          fields={fields}
          /* @ts-ignore TODO: TS2322 ->  Type '{ ask */
          barPercentages={barPercentages}
          tradeType={tradeType}
          hrefBuy={hrefBuy}
        />
      )}
    </div>
  );
};

export default memo<InstrumentLatestDataProps>(InstrumentLatestData);
