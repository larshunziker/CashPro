import React, { memo, useState } from 'react';
import { NavigateFunction, useMatch } from 'react-router';
import classNames from 'classnames';
import useRaschRouterLocation from '../../../../../../../../../shared/hooks/useRaschRouterLocation';
import { useStableNavigate } from '../../../../../../../../../shared/hooks/useStableNavigateContext';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../../components/Icon';
import AdZone from '../../../../../../components/Widgets/components/AdZone';
import InstrumentDropdown from '../../../InstrumentDropdown';
import { headerMapping } from '../headerMapping';
import { ROUTE_TRADING_IDEAS } from '../../../../../../constants';
import { TOTALS_ROW_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import { AlertListData } from '../../../Alerts/typings';
import { ExtendedInstrument, TableRowProps } from './typings';

export const formatValue = (
  headerKey: string,
  settings: Record<string, any>,
  instrument: ExtendedInstrument,
  data: Portfolio & Watchlist & AlertListData,
  navigate: NavigateFunction,
  rowType: string,
  fallbackValue: any,
  location: Partial<RaschRouterLocation>,
  rowIndex: number,
): string | JSX.Element => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  const hasValue = (value) => value && value !== 'undefined' && value !== 'NaN';

  let formatter = settings?.formatter as (
    options: Record<any, any>,
    disableAutoUpdate?: boolean,
  ) => React.ReactNode;

  let value =
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ExtendedInstrumen */
    instrument?.[headerKey] ||
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'PortfolioCalculat */
    data?.calculatedFields?.[headerKey] ||
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Portfolio & Watch */
    data?.[headerKey];

  if (settings.valueOverride) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'ExtendedInstrument'. */
    value = instrument?.[settings.valueOverride];
    if (!formatter) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly name */
      formatter = headerMapping[settings.valueOverride].formatter;
    }
  }
  const disableAutoUpdate = ['transactions-sell', 'transactions-buy'].includes(
    rowType,
  );

  if (formatter) {
    const formattedValue = formatter(
      {
        value,
        instrument,
        navigate,
        location,
        data,
        rowIndex,
      },
      disableAutoUpdate,
    );
    // @ts-ignore TODO: TS2322 ->  Type 'ReactNode' is not assignable to type 'string | JSX.Element'.
    return hasValue(formattedValue) ? formattedValue : fallbackValue;
  }
  return hasValue(value) ? value : fallbackValue;
};

const TableRow = ({
  instrument,
  disableDropdown = false,
  data,
  index,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string[]'. */
  tableFieldHeaders = null,
  type,
  fallbackValue = <>&ndash;</>,
}: TableRowProps) => {
  const navigate = useStableNavigate();
  let renderedItemsCount = 1;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const location = useRaschRouterLocation();

  const isMusterPortfolio = !!useMatch(`/${ROUTE_TRADING_IDEAS}`);
  const isAlertOverview = type === 'alert-overview';
  const isToggleable =
    instrument?.toggleable !== undefined ? instrument?.toggleable : true;

  return (
    <>
      <tr
        className={classNames({
          [styles.Blink]: isOpen,
        })}
      >
        {tableFieldHeaders?.map((headerItem: any, rowIndex) => {
          let headerKey = headerItem;
          let headerObject = null;
          if (typeof headerKey === 'object') {
            headerObject = Object.keys(headerKey);
            headerKey = headerObject[0];
          }
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly name */
          const settings = headerMapping[headerKey];
          if (!settings) {
            return null;
          }
          renderedItemsCount++;
          return (
            <td
              key={`table-row-${headerKey}`}
              className={classNames(settings.style, {
                [styles.Totals]:
                  instrument?.identifier === TOTALS_ROW_IDENTIFIER,
                [styles.Sticky]: rowIndex === 0,
                [styles.IsBroken]:
                  isAlertOverview && instrument?.status === 'BROKEN',
              })}
            >
              {formatValue(
                headerKey,
                settings,
                instrument,
                data,
                navigate,
                type,
                fallbackValue,
                location,
                index,
              )}
              {(headerItem?.[headerKey]?.additionalFields?.length > 0 && (
                <div className={styles.AdditionalItemsWrapper}>
                  {/* @ts-ignore TODO: TS7006 ->  Parameter 'field' implicitly has an 'any' type. */}
                  {headerItem?.[headerKey]?.additionalFields?.map((field) => {
                    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly name */
                    const settings = headerMapping[field];
                    if (!settings) {
                      return null;
                    }
                    return (
                      <span
                        key={`table-row-${headerKey}-${field}`}
                        className={styles.AdditionalItems}
                      >
                        {formatValue(
                          field,
                          settings,
                          instrument,
                          data,
                          navigate,
                          type,
                          fallbackValue,
                          location,
                          index,
                        )}
                      </span>
                    );
                  })}
                </div>
              )) ||
                null}
            </td>
          );
        })}
        {(!disableDropdown && isToggleable && (
          <td className={classNames(headerMapping['lastToggleItem'].style)}>
            <Link
              onClick={() => toggleDropdown()}
              className={classNames(styles.Toggle, {
                [styles.IsActive]: isOpen,
                // @TODO: maybe find a more generic case here.
                // this fix will only work on the muster portfolio table
                // for transactions-sell/buy to fix the header column layout there.
                [styles.Hidden]:
                  isMusterPortfolio &&
                  (type === 'transactions-sell' || type === 'transactions-buy'),
              })}
            >
              <Icon
                addClass={styles.ToggleIcon}
                type={isOpen ? 'IconChevronUp' : 'IconChevronDown'}
              ></Icon>
            </Link>
          </td>
        )) || (
          // empty cell for the last column, if there are no toggle actions
          <td
            className={classNames(headerMapping['lastToggleItem'].style, {
              [styles.Totals]: instrument?.identifier === TOTALS_ROW_IDENTIFIER,
            })}
          ></td>
        )}
      </tr>
      {isOpen && (
        <tr className={classNames(styles.Actions, styles.IsVisible)}>
          <td colSpan={renderedItemsCount} className={styles.ActionsInner}>
            <InstrumentDropdown
              data={data}
              instrument={instrument}
              type={type}
            />
          </td>
        </tr>
      )}
      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
      {(instrument?.adSlots?.length > 0 && (
        <tr>
          <td colSpan={renderedItemsCount} className={styles.AdsWrapper}>
            <AdZone adSlots={instrument.adSlots} />
          </td>
        </tr>
      )) ||
        null}
    </>
  );
};

export default memo(TableRow);
