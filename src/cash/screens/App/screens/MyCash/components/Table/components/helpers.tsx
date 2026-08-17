import React from 'react';
import classNames from 'classnames';
import Icon from '../../../../../components/Icon';
import {
  CHANCE_ICON,
  MONITOR_ICON,
  OTHER_ASSETS_TITLE,
  PAPER_VALUES_GROUPING_MAPPING,
  SENSITIVITY_ICON,
  TOTALS_ROW_IDENTIFIER,
} from '../constants';
import styles from './tableStyles.legacy.css';
import { ExtendedInstrument } from './TableRow/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  styles.Right,
  styles.Last,
  styles.Link,
  styles.CommentsWrapper,
  styles.Center,
  styles.NameCell,
  styles.Up,
  styles.Down,
  styles.UpperAlert,
  styles.LowerAlert,
  styles.IsBroken,
  styles.Checkbox,
];

/* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'iconType' implicitly has an 'any' type. */
export const renderIconsByFieldType = (type, value, iconType) => {
  const parsedValue = parseInt(value);
  switch (type) {
    case MONITOR_ICON:
      return (
        <span className={styles.MonitorIconWrapper}>
          {Array.from(Array(Math.abs(parsedValue === 0 ? 1 : parsedValue))).map(
            (_icon, index) => {
              return (
                <Icon
                  key={`${type}-${value}-icon-${index}`}
                  addClass={classNames(
                    styles.MonitorIcon,
                    {
                      [styles.Positive]: parseInt(value) >= 1,
                    },
                    {
                      [styles.Negative]: parseInt(value) < 0,
                    },
                  )}
                  type={iconType}
                />
              );
            },
          )}
        </span>
      );
    case CHANCE_ICON:
      return (
        <>
          {Array.from(Array(parseInt(value))).map((item, index) => (
            <Icon
              key={`${type}-${value}-icon-${index}`}
              addClass={styles.ChanceIcon}
              type="IconFavouriteFill"
            />
          ))}
          {Array.from(Array(4 - parseInt(value))).map((item, index) => (
            <Icon
              addClass={styles.ChanceIcon}
              key={index}
              type="IconFavourite"
            />
          ))}
        </>
      );
    case SENSITIVITY_ICON:
      return (
        <div className={styles.SensitiveIconWrapper}>
          {Array.from(Array(3)).map((item, index) => {
            if (index - 1 === parseInt(value)) {
              return (
                <div
                  key={`${type}-${value}-icon-${index}`}
                  className={classNames({
                    [styles.Low]: parseInt(value) === 1,
                    [styles.High]: parseInt(value) < 0,
                    [styles.Neutral]: parseInt(value) === 0,
                  })}
                >
                  <Icon type="IconCircleSolid" />
                </div>
              );
            }
            return (
              <Icon key={`${type}-${value}-icon-${index}`} type="IconCircle" />
            );
          })}
        </div>
      );
    default:
      return null;
  }
};

export const calculatePercentagePerformance = (
  actualPriceTotal: number,
  paidPriceTotal: number,
): string => {
  const diff = actualPriceTotal / paidPriceTotal;
  let res = (diff - 1) * 100;
  //in case of short sell
  if (paidPriceTotal < 0) {
    res = actualPriceTotal > paidPriceTotal ? Math.abs(res) : -res;
  }
  return res.toFixed(2);
};

type GetTotalsData = {
  instruments: ExtendedInstrument[];
  title: string;
};
export const getTotals = ({ title, instruments }: GetTotalsData) => {
  const result = {
    identifier: TOTALS_ROW_IDENTIFIER, // identifier is used to set correct css style in headerMapping
    name: title,
    mName: title,
  };
  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  const isCalculatable = (value) => value && !isNaN(value);

  const totals =
    instruments?.length > 1
      ? instruments.reduce((acc, item) => {
          /*
            for calculating/reducing mulitple items here, we want to make sure that
            we can always accumulate with an actual number, otherwise if 1 acc item
            becomes NaN, the following items can't be summed up
            => however, in case the total === '0', we want to return '' for certain fields
          */

          const paidPriceTotal =
            parseFloat(acc.paidPrice || '0') +
            parseFloat(item.paidPrice || '0');
          const actualPriceTotal =
            parseFloat(acc.actualPrice || '0') +
            parseFloat(item.actualPrice || '0');
          const feesTotal =
            parseFloat(acc.fees || '0') + parseFloat(item.fees || '0');

          let accountPercent = '';

          if (
            isCalculatable(actualPriceTotal) &&
            isCalculatable(paidPriceTotal)
          ) {
            accountPercent = calculatePercentagePerformance(
              actualPriceTotal,
              paidPriceTotal,
            );
          }

          const partInPercent =
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
            parseFloat(acc.partInPercent) + parseFloat(item.partInPercent);

          return {
            ...result,
            fullquoteUri: '',
            fees: `${feesTotal || ''}`, // if total === 0 => ''
            paidPrice: `${paidPriceTotal || ''}`,
            actualPrice: `${actualPriceTotal}`,
            accountPercent: accountPercent,
            partInPercent: !isNaN(partInPercent)
              ? partInPercent.toFixed(2)
              : '',
            accountPlusMinus: `${
              Number(actualPriceTotal) - Number(paidPriceTotal)
            }`,
          };
        })
      : {
          ...result,
          fees: `${instruments?.[0]?.fees || ''}`,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          paidPrice: `${parseFloat(instruments?.[0]?.paidPrice) || ''}`,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          actualPrice: `${parseFloat(instruments?.[0]?.actualPrice) || 0}`,
          accountPercent:
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
            (parseFloat(instruments?.[0]?.accountPercent) && // check to prevent NaN.toFixed(2) => 'NaN'
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
              parseFloat(instruments?.[0]?.accountPercent)?.toFixed?.(2)) ||
            '',
          partInPercent:
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
            (parseFloat(instruments?.[0]?.partInPercent) &&
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
              parseFloat(instruments?.[0]?.partInPercent)?.toFixed?.(2)) ||
            '',
          accountPlusMinus:
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
            parseFloat(instruments?.[0]?.accountPlusMinus) || '',
        };

  return totals as ExtendedInstrument;
};

const GROUP_MAPPINGS = {
  market: 'market',
  currency: 'currency', // mCur does not exists for other assets in portfolios, but watchlist have a different name in the headerMapping, so we have this default mapping, but we can override it in the function call
  'paper-values': 'type',
};

export const groupByType = (
  instruments: ExtendedInstrument[],
  groupType: string,
  groupMappings = GROUP_MAPPINGS,
) => {
  const groupList = instruments.map((instrument) => {
    if (instrument.otherAsset && groupType === 'market') {
      return OTHER_ASSETS_TITLE;
    }

    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'ExtendedInstrument'. */
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ market */
    return instrument[groupMappings[groupType]];
  });
  const cleanedgroupList = [...new Set(groupList)];

  return cleanedgroupList;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'list' implicitly has an 'any' type. */
export const sortPaperValuesGroupList = (list) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
  const sortedList = list.sort((a, b) => {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ EQU */
    const typeA = PAPER_VALUES_GROUPING_MAPPING[a.instruments[0].type];
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ EQU */
    const typeB = PAPER_VALUES_GROUPING_MAPPING[b.instruments[0].type];
    if (!typeB || typeA < typeB) {
      return -1;
    }
    if (!typeA || typeA > typeB) {
      return 1;
    }
    return 0;
  });
  return sortedList;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'list' implicitly has an 'any' type. */
export const sortMarketGroupList = (list) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
  const sortedList = list.sort((a, b) => {
    const marketDescriptionA = a.instruments[0].marketDescription;
    const marketDescriptionB = b.instruments[0].marketDescription;
    if (!marketDescriptionB || marketDescriptionA < marketDescriptionB) {
      return -1;
    }
    if (!marketDescriptionA || marketDescriptionA > marketDescriptionB) {
      return 1;
    }
    return 0;
  });
  return sortedList;
};

export const getGroupedInstruments = (
  instruments: ExtendedInstrument[],
  groupType: string,
  group: 'currency' | 'market' | 'paper-values' | 'Other Assets',
  groupMappings = GROUP_MAPPINGS,
) => {
  const filteredInstruments = instruments.filter((instrument) => {
    return (
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'ExtendedInstrument'. */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ market */
      instrument[groupMappings[groupType]] === group ||
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'ExtendedInstrument'. */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ market */
      (instrument[groupMappings[groupType]] === null &&
        group === OTHER_ASSETS_TITLE &&
        instrument.otherAsset)
    );
  });

  return filteredInstruments;
};

export const getTrendClass = (
  value: string,
  positive: string,
  negative: string,
): string => {
  if (Math.sign(parseFloat(value)) === 0) {
    return '';
  }
  return Math.sign(parseFloat(value)) > 0 ? positive : negative;
};
