import React from 'react';
import classNames from 'classnames';
import {
  DATE_FORMAT_FULL_TIME,
  DATE_FORMAT_SHORT,
  checkIfSameDay,
  formatDate,
} from '../../../../../../../../shared/helpers/dateTimeElapsed';
import { tealiumTrackEvent } from '../../../../../../../../shared/helpers/tealium';
import {
  formatDividendYield,
  formatPercentage,
  formatPrice,
  getFormatterByValue,
} from '../../../../../components/Highcharts/helpers';
import { getTrendClass, renderIconsByFieldType } from './helpers';
import Link from '../../../../../../../../common/components/Link';
import Icon from '../../../../../components/Icon';
import Tooltip from '../../../../../components/Tooltip';
import ListCheckbox from '../../ListCheckbox';
import InstrumentField from '../../Portfolio/InstrumentField';
import { ColorTableCell } from '../../../../../components/Highcharts/components/ChartComparison/components/ColorTableCell';
import { alertsFormOverlay } from '../../../../../components/AlertsForm';
import { MARKET_TABLE_ORIGIN } from '../../../../../components/MarketTable/constants';
import {
  MULTIPLE_INSTRUMENTS_GENERIC_DATA,
  TRENDING_COINS_GENERIC_DATA,
} from '../../../../../components/Widgets/components/MultipleInstrumentsGenericData/constants';
import {
  CHANCE_ICON,
  MONITOR_ICON,
  SENSITIVITY_ICON,
  TOTALS_ROW_IDENTIFIER,
} from '../constants';
import styles from './tableStyles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  styles.SensitiveIconWrapper,
  styles.MonitorIcon,
  styles.MonitorIconWrapper,
  styles.Low,
  styles.Neutral,
  styles.High,
  styles.ChanceIcon,
];

const DEFAULT_STYLES = classNames(styles.TableRow, styles.Right);

/* @ts-ignore TODO: TS7006 ->  Parameter 'val' implicitly has an 'any' type. */
const getIconByValue = (val) => {
  const value = Number(val);
  if (value === 0) {
    return 'IconArrowRightCircle';
  }
  if (value < 0) {
    return 'IconArrowDownRightCircle';
  }
  if (value > 0) {
    return 'IconArrowUpRightCircle';
  }
};

// For formatting currency data field with "Bonds" extension
const formatQuotation = (value: any, quotation: number) => {
  if (!value) {
    return '';
  }
  // 4 equals "Prozentpreis" => CHF (%)
  if (quotation === 4) {
    return `${value} (%)`;
  }
  return `${value}`;
};

// For formatting category 'DateOrTime' (avoid so much duplicated code?) (see headerMapping.md)
const formatDateOrTime = (value: any, alwaysDisplayDate = false) => {
  if (!alwaysDisplayDate && checkIfSameDay(new Date(value), new Date())) {
    return formatDate(value, DATE_FORMAT_FULL_TIME);
  }
  return formatDate(value, DATE_FORMAT_SHORT);
};

type PortfolioTealiumTrackPayload = {
  event_name: string;
  event_category: string;
  event_action: string;
  portfolio_key?: string;
  watchlist_key?: string;
  instrument_isin?: string;
  instrument_valor?: string;
  from?: string;
  integration_action?: string;
  integration_name?: string;
  integration_sponsor?: string;
  integration_label?: string;
  event_trigger?: string;
  integration_element?: string;
};

export type MapFieldsResult = Record<
  keyof Instrument | string,
  (string | typeof InstrumentField)[]
>;

const MAX_FORMAT_CACHE_SIZE = 500;
let cacheFormatResults: Record<string, any> = {};
let cacheFormatSize = 0;

const getFormatValueFromCache = (key: string, fn: Function) => {
  if (!cacheFormatResults[key]) {
    if (cacheFormatSize >= MAX_FORMAT_CACHE_SIZE) {
      cacheFormatResults = {};
      cacheFormatSize = 0;
    }
    cacheFormatResults[key] = fn();
    cacheFormatSize++;
  }
  return cacheFormatResults[key];
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'format' implicitly has an 'any' type. */
export const formatDateWithCache = (value, format) => {
  return getFormatValueFromCache(`formatDate-${value}-${format}`, () =>
    formatDate(value, format),
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
export const formatDateOrTimeWithCache = (value, alwaysDisplayDate = false) => {
  return getFormatValueFromCache(
    `formatDateOrTime-${value}-${alwaysDisplayDate}`,
    () => formatDateOrTime(value, alwaysDisplayDate),
  );
};

export const formatPriceWithCache = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  value,
  type = null,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'NumberFormat'. */
  intlFormatter: Intl.NumberFormat = null,
) => {
  return getFormatValueFromCache(
    `formatPrice-${value}-${type}-${intlFormatter}`,
    () => formatPrice(value, type, intlFormatter),
  );
};

export const formatPercentageWithCache = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  value,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  positivePrefix: string = null,
) => {
  if (positivePrefix) {
    return getFormatValueFromCache(`formatPercentage-${value}`, () =>
      formatPercentage(value, positivePrefix),
    );
  }
  return getFormatValueFromCache(`formatPercentage-${value}`, () =>
    formatPercentage(value),
  );
};

export const mapFields = (
  instrument: Instrument,
  fields: (keyof Instrument)[],
  fieldTypes?: Record<keyof Instrument, string>,
  formatterProps?: Record<keyof Instrument, Function> | Function,
): MapFieldsResult => {
  if (!instrument?.instrumentKey || fields?.length === 0) return {};

  const result = {};

  for (const [index, field] of fields.entries()) {
    const fallback = headerMapping.hasOwnProperty(field)
      ? null
      : instrument[field] || `[${field}]`;
    const fieldType = fieldTypes?.[field]
      ? { fieldType: fieldTypes?.[field] }
      : {};
    const formatter = formatterProps
      ? /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'number' can't be used to index type 'Function | Record */
        { formatter: formatterProps[index] || formatterProps }
      : {};
    const props = Object.assign(
      {
        instrument,
        value: instrument[field],
      },
      fieldType,
      formatter,
    );
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'keyof Instrument' can't be used to index type '{}'. */
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'keyof Instrument' can't be used to index type '{ reado */
    result[field] = headerMapping[field]?.formatter?.(props) || fallback;
  }
  return result;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'field' implicitly has an 'any' type. */
export const mapTooltip = (field) =>
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly name */
  !field ? null : <Tooltip content={headerMapping[field]?.tooltip || ''} />;

export const headerMapping = {
  // INFO: DO NOT EDIT THE "name" field!!!!!! It will be removed in the future
  name: {
    name: 'Name',
    description: 'Name',
    style: styles.TableRow,
    sortable: true,
    group: 'Stammdaten',
    valueOverride: 'mName', // INFO: don't add new logic here. The "name" field is a legacy field and should be replaced by "mName" field. Do not delete it either. valueOverride takes the formatter function from mName
  },
  mName: {
    name: 'Name',
    description: 'Name',
    style: styles.TableRow,
    sortable: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument, data = null, origin = '' }) => {
      let label = value;

      // if mName is empty we use the name field this can happen on other assets or on an broken instrument
      if (instrument?.otherAsset || !value) {
        label =
          instrument?.name ||
          `Inaktives Instrument: (@${instrument?.instrumentKey})`;
      }
      if (
        instrument?.identifier === TOTALS_ROW_IDENTIFIER ||
        (instrument.otherAsset && !instrument?.fullquoteUri)
      ) {
        return (
          <div
            className={classNames({
              [styles.NameCell]:
                origin !== MARKET_TABLE_ORIGIN &&
                origin !== MULTIPLE_INSTRUMENTS_GENERIC_DATA,
            })}
          >
            <span title={label}>{label}</span>
          </div>
        );
      }
      let tealiumTrackPayload: PortfolioTealiumTrackPayload = {
        event_name: 'portfolio_click_instrument',
        event_category: 'portfolio',
        event_action: 'portfolio_click_instrument',
        /* @ts-ignore TODO: TS2339 ->  Property 'portfolioKey' does not exist on type 'never'. */
        portfolio_key: data?.portfolioKey,
      };
      /* @ts-ignore TODO: TS2339 ->  Property '__typename' does not exist on type 'never'. */
      if (data?.__typename === 'Watchlist') {
        tealiumTrackPayload = {
          event_name: 'watchlist_click_instrument',
          event_category: 'watchlist',
          event_action: 'watchlist_click_instrument',
          /* @ts-ignore TODO: TS2339 ->  Property 'watchlistKey' does not exist on type 'never'. */
          watchlist_key: data?.watchlistKey,
        };
      }

      if (origin === TRENDING_COINS_GENERIC_DATA) {
        tealiumTrackPayload = {
          event_name: 'trending_coin_click_instrument',
          event_action: 'trending_coin_click_instrument',
          event_category: 'trending_coin',
          integration_action: 'Click',
          integration_name: 'krypto_trending_coins',
          integration_sponsor: 'BIT',
          integration_label: instrument?.mName || '',
          event_trigger: 'custom',
          integration_element: 'instrument_name',
        };
      }

      if (origin) {
        tealiumTrackPayload.from = origin;
      }
      return (
        <div
          className={classNames({
            [styles.NameCell]:
              origin !== MARKET_TABLE_ORIGIN &&
              origin !== MULTIPLE_INSTRUMENTS_GENERIC_DATA,
          })}
        >
          <Link
            className={classNames({
              [styles.Link]: !instrument.otherAsset && instrument?.fullquoteUri,
            })}
            path={
              (!instrument.otherAsset &&
                instrument?.fullquoteUri &&
                `/${instrument?.fullquoteUri}`) ||
              ''
            }
            onClick={
              instrument?.fullquoteUri
                ? () => {
                    tealiumTrackEvent({
                      type: 'link',
                      payload: {
                        ...tealiumTrackPayload,
                        instrument_isin: instrument?.isin,
                        instrument_valor: instrument?.mValor,
                        instrument_other_asset: instrument?.otherAsset || false,
                        instrument_type: instrument?.instrumentType,
                        instrument_key: instrument?.instrumentKey,
                        instrument_issuer: instrument?.leadMan,
                      },
                    });
                  }
                : undefined
            }
            label={label}
            title={label}
          />
        </div>
      );
    },
  },
  mShortName: {
    name: 'Name (Kurz)',
    description: 'Name (Kurz)',
    style: styles.TableRow,
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
    formatter: ({ value, instrument, data, origin = '' }) => {
      let label = value;
      // if mName is empty we use the name field this can happen on other assets or on an broken instrument
      if (instrument?.otherAsset || !value) {
        label = instrument?.name || instrument?.mName;
      }
      if (
        instrument?.identifier === TOTALS_ROW_IDENTIFIER ||
        (instrument.otherAsset && !instrument?.fullquoteUri)
      ) {
        return (
          <div className={styles.NameCell}>
            <span title={label}>{label}</span>
          </div>
        );
      }
      let tealiumTrackPayload: PortfolioTealiumTrackPayload = {
        event_name: 'portfolio_click_instrument',
        event_category: 'portfolio',
        event_action: 'portfolio_click_instrument',
        portfolio_key: data?.portfolioKey,
      };
      if (data?.__typename === 'Watchlist') {
        tealiumTrackPayload = {
          event_name: 'watchlist_click_instrument',
          event_category: 'watchlist',
          event_action: 'watchlist_click_instrument',
          watchlist_key: data?.watchlistKey,
        };
      }

      if (origin) {
        tealiumTrackPayload.from = origin;
      }
      return (
        <div className={styles.NameCell}>
          <Link
            className={classNames({
              [styles.Link]: !instrument.otherAsset && instrument?.fullquoteUri,
            })}
            path={
              (!instrument.otherAsset &&
                instrument?.fullquoteUri &&
                `/${instrument?.fullquoteUri}`) ||
              ''
            }
            onClick={
              instrument?.fullquoteUri
                ? () => {
                    tealiumTrackEvent({
                      type: 'link',
                      payload: {
                        ...tealiumTrackPayload,
                        instrument_isin: instrument?.isin,
                        instrument_valor: instrument?.mValor,
                        instrument_other_asset: instrument?.otherAsset || false,
                        instrument_type: instrument?.instrumentType,
                        instrument_key: instrument?.instrumentKey,
                      },
                    });
                  }
                : undefined
            }
            label={label}
            title={label}
          />
        </div>
      );
    },
  },
  mCur: {
    name: 'Whg.',
    description: 'Währung',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatQuotation(value, instrument?.pricingQuotationId);
    },
  },
  quantity: {
    name: 'Anzahl',
    description: 'Anzahl',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'Volume');
    },
  },
  currency: {
    name: 'Whg.',
    description: 'Währung',
    style: styles.TableRow,
    sortable: true,
    group: 'Portfolio',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatQuotation(value, instrument?.pricingQuotationId);
    },
  },
  currentPrice: {
    name: 'Aktuell',
    description: 'Aktuell',
    style: DEFAULT_STYLES,
    sortable: true,
    group: ['Portfolio', 'Watchlist'],
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return '';
        }
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="currentPrice"
        />
      );
    },
  },
  paidPrice: {
    name: 'Preis',
    description: 'Kaufpreis in Portfolio-Währung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'Value');
    },
  },
  actualPrice: {
    name: 'Wert',
    description: 'Aktueller Wert in Portfolio-Währung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: ['Portfolio', 'Watchlist'],
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatPriceWithCache(value, instrument?.scGrouped || 'Value');
    },
  },
  accountPercent: {
    name: '+/- %',
    description: 'Veränderung in %',
    style: DEFAULT_STYLES,
    sortable: true,
    group: ['Portfolio'],
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return (
        <span
          className={getTrendClass(value, styles.Positive, styles.Negative)}
        >
          {value && `${formatPercentageWithCache(value)}%`}
        </span>
      );
    },
  },
  perfPercentage: {
    name: '+/- %',
    description: '+/- in %',
    style: DEFAULT_STYLES,
    sortable: true,
    group: ['Portfolio', 'Watchlist'],
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {`${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfPercentage"
        />
      );
    },
  },
  accountPlusMinus: {
    name: '+/-',
    description: 'Veränderung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: ['Portfolio'],
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return (
        <span
          className={getTrendClass(value, styles.Positive, styles.Negative)}
        >
          {/* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */}
          {`${formatPriceWithCache(value, 'Value')}`}
        </span>
      );
    },
  },
  'alert-checkbox-delete': {
    name: '',
    description: '',
    style: classNames(styles.TableRow, styles.Checkbox),
    sortable: false,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ instrument }) => {
      return <ListCheckbox list="alerts" id={instrument.id} />;
    },
  },
  account: {
    name: 'Gewinn/Verlust CHF',
    description: 'Gewinn/Verlust CHF',
    style: DEFAULT_STYLES,
    sortable: false,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      const price = formatPriceWithCache(value, 'Value');

      if (!price) {
        return null;
      }
      return (
        <span
          className={getTrendClass(value, styles.Positive, styles.Negative)}
        >
          {!price.startsWith('-') ? `+${price}` : price}
        </span>
      );
    },
  },
  paidAverageWithFeesOrigCurrency: {
    name: 'Einstand Stück OW',
    description: 'Einstands-Preis pro Stück inkl. Gebühren in Original-Währung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatPriceWithCache(value, instrument.scGrouped);
    },
  },
  paidAverage: {
    name: 'Einstand Stück',
    description: 'Einstands-Preis pro Stück',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatPriceWithCache(value, instrument.scGrouped);
    },
  },
  alertsUpperLimit: {
    name: 'Obere Limite',
    description: 'Obere Limite',
    style: DEFAULT_STYLES,
    sortable: false,
    group: 'Alerts',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
    formatter: ({ instrument, navigate, location }) => {
      if (
        instrument.identifier === TOTALS_ROW_IDENTIFIER ||
        instrument?.otherAsset
      ) {
        return;
      }

      if (instrument?.alertsData?.upper?.value) {
        return formatPriceWithCache(instrument?.alertsData?.upper?.value);
      }

      return (
        <Link
          className={styles.Link}
          onClick={() =>
            alertsFormOverlay({
              alertKey: '',
              fullquoteUri: instrument?.fullquoteUri,
              navigate,
              location,
            })
          }
        >
          hinzufügen
        </Link>
      );
    },
  },
  alertsLowerLimit: {
    name: 'Untere Limite',
    description: 'Untere Limite',
    style: DEFAULT_STYLES,
    sortable: false,
    group: 'Alerts',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
    formatter: ({ instrument, navigate, location }) => {
      if (
        instrument.identifier === TOTALS_ROW_IDENTIFIER ||
        instrument?.otherAsset
      ) {
        return;
      }

      if (instrument?.alertsData?.lower?.value) {
        return formatPriceWithCache(instrument?.alertsData?.lower?.value);
      }

      return (
        <Link
          className={styles.Link}
          onClick={() =>
            alertsFormOverlay({
              alertKey: '',
              fullquoteUri: instrument?.fullquoteUri,
              navigate,
              location,
            })
          }
        >
          hinzufügen
        </Link>
      );
    },
  },
  paidOrigCurrency: {
    name: 'Kaufpreis OW',
    description: 'Kaufpreis in Original-Währung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'Value');
    },
  },
  actualPriceOrigCurrency: {
    name: 'Wert OW',
    description: 'Aktueller Wert in Original-Währung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'Value');
    },
  },
  accountPlusMinusOrigCurrency: {
    name: 'Veränderung OW',
    description: 'Veränderung in OW',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return (
        <span
          className={getTrendClass(value, styles.Positive, styles.Negative)}
        >
          {/* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */}
          {value && `${formatPriceWithCache(value, 'Value')}`}
        </span>
      );
    },
  },
  accountPercentOrigCurrency: {
    name: 'Veränderung OW %',
    description: 'Veränderung in % in OW',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return (
        <span
          className={getTrendClass(value, styles.Positive, styles.Negative)}
        >
          {value && `${formatPercentageWithCache(value)}%`}
        </span>
      );
    },
  },
  market: {
    name: 'Börse',
    description: 'Börsenplatz-Kürzel',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  marketDescription: {
    name: 'Börse',
    description: 'Börsenplatz',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  isin: {
    name: 'ISIN',
    description: 'ISIN',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  scGrouped: {
    name: 'Kategorie',
    description: 'Kategorie',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  mSymb: {
    name: 'Symbol',
    description: 'Symbol',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  mValor: {
    name: 'Valor',
    description: 'Valor',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  monitorFontIcon: {
    name: 'Monitor',
    description: 'Monitor',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Aktienmonitor',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return (
          instrument?.monitorFontIcon &&
          renderIconsByFieldType(
            MONITOR_ICON,
            value,
            getIconByValue(value) || <>&ndash;</>,
          )
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) =>
            val &&
            renderIconsByFieldType(
              MONITOR_ICON,
              val,
              getIconByValue(val) || <>&ndash;</>,
            )
          }
          field="monitorFontIcon"
        />
      );
    },
  },
  chanceFontIcon: {
    name: 'Chance',
    description: 'Chance',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Aktienmonitor',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return (
          (value &&
            renderIconsByFieldType(
              CHANCE_ICON,
              value,
              getIconByValue(value),
            )) ||
          null
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) =>
            (val &&
              renderIconsByFieldType(CHANCE_ICON, val, getIconByValue(val))) ||
            null
          }
          field="chanceFontIcon"
        />
      );
    },
  },
  sensitivityFontIcon: {
    name: 'Sensi tivität', // on classic we have Risiko
    description: 'Sensitivität',
    style: styles.TableRow,
    sortable: true,
    group: 'Aktienmonitor',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return (
          (value &&
            renderIconsByFieldType(
              SENSITIVITY_ICON,
              value,
              getIconByValue(value),
            )) ||
          null
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) =>
            (val &&
              renderIconsByFieldType(
                SENSITIVITY_ICON,
                val,
                getIconByValue(val),
              )) ||
            null
          }
          field="sensitivityFontIcon"
        />
      );
    },
  },
  relativePerformance: {
    name: 'Rel. Performance',
    description: '+/-% 4 Wochen gegenüber Index',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Aktienmonitor',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              <span
                className={getTrendClass(
                  `${val}`,
                  styles.Positive,
                  styles.Negative,
                )}
              >
                {val && `${formatPercentageWithCache(val)}%`}
              </span>
            );
          }}
          field="relativePerformance"
        />
      );
    },
  },
  kgv: {
    name: 'KGV',
    description: 'Langfristiges KGV (PE)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Aktienmonitor',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Value');
      }
      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
          formatFn={(val) => formatPriceWithCache(val, 'Value')}
          field="kgv"
        />
      );
    },
  },
  lastDividend: {
    name: 'Letzte Dividende',
    description: 'Letzte Dividende',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Value');
      }
      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
          formatFn={(val) => formatPriceWithCache(val, 'Value')}
          field="lastDividend"
        />
      );
    },
  },
  lastDividendDatetime: {
    name: 'Dividende Datum',
    description: 'Dividende Datum',
    style: styles.TableRow,
    sortable: true,
    group: 'Fundamentaldaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return formatDateWithCache(value, DATE_FORMAT_SHORT);
    },
  },
  // todo: cleanup typo (dividenYield throughout graphql and solid-service)
  dividenYield: {
    name: 'Divid. Rendite',
    description: 'Dividenden Rendite',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Aktienmonitor',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return '0.00%';
        }
        return `${formatDividendYield(value)}%`;
      }
      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (val === 0) {
              return '0.00%';
            }
            return `${formatDividendYield(val)}%`;
          }}
          field="dividenYield"
        />
      );
    },
  },
  yldeq: {
    name: 'Hist. Div.-Rendite',
    description: 'Hist. Dividenden-Rendite',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return `${formatDividendYield(value)}%`;
    },
  },
  perfPercentage1w: {
    name: '1W +/-%',
    description: '+/-% 1 Woche',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {`${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfPercentage1w"
        />
      );
    },
  },
  perfPercentage4w: {
    name: '4W +/-%',
    description: '+/-% 4 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {`${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfPercentage4w"
        />
      );
    },
  },
  perfPercentage12w: {
    name: '12W +/-%',
    description: '+/-% 12 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {`${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfPercentage12w"
        />
      );
    },
  },
  perfPercentage26w: {
    name: '26W +/-%',
    description: '+/-% 26 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {`${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfPercentage26w"
        />
      );
    },
  },
  perfPercentage52w: {
    name: '52W +/-%',
    description: '+/-% 52 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {`${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfPercentage52w"
        />
      );
    },
  },
  perfPercentageYTD: {
    name: 'YTD',
    description: '+/-% seit 1.1.',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {`${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfPercentageYTD"
        />
      );
    },
  },
  perf1wVPerPRV: {
    name: '1W +/- abs.',
    description: 'Absolute Veränderung (1 Woche)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      const intlFormatter = getFormatterByValue(
        instrument.cashClose1w,
        instrument.scGrouped,
      );

      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        const formattedPrice = formatPriceWithCache(
          value,
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
          'Value',
          intlFormatter,
        );
        return (
          <span
            className={getTrendClass(
              `${value}`,
              styles.Positive,
              styles.Negative,
            )}
          >
            {!formattedPrice.startsWith('-')
              ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
              : formattedPrice}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (!val) {
              return null;
            }
            const intlFormatter = getFormatterByValue(
              instrument.cashClose1w,
              instrument.scGrouped,
            );
            const formattedPrice = formatPriceWithCache(
              val,
              /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
              'Value',
              intlFormatter,
            );
            return (
              <span
                className={getTrendClass(
                  `${val}`,
                  styles.Positive,
                  styles.Negative,
                )}
              >
                {!formattedPrice.startsWith('-')
                  ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
                  : formattedPrice}
              </span>
            );
          }}
          field="perf1wVPerPRV"
        />
      );
    },
  },
  perf4wVPerPRV: {
    name: '4W +/- abs.',
    description: 'Absolute Veränderung (4 Wochen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      const intlFormatter = getFormatterByValue(
        instrument.cashClose4w,
        instrument.scGrouped,
      );

      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        const formattedPrice = formatPriceWithCache(
          value,
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
          'Value',
          intlFormatter,
        );
        return (
          <span
            className={getTrendClass(
              `${value}`,
              styles.Positive,
              styles.Negative,
            )}
          >
            {!formattedPrice.startsWith('-')
              ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
              : formattedPrice}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (!val) {
              return null;
            }
            const intlFormatter = getFormatterByValue(
              instrument.cashClose4w,
              instrument.scGrouped,
            );
            const formattedPrice = formatPriceWithCache(
              val,
              /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
              'Value',
              intlFormatter,
            );
            return (
              <span
                className={getTrendClass(
                  `${val}`,
                  styles.Positive,
                  styles.Negative,
                )}
              >
                {!formattedPrice.startsWith('-')
                  ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
                  : formattedPrice}
              </span>
            );
          }}
          field="perf4wVPerPRV"
        />
      );
    },
  },
  perf12wVPerPRV: {
    name: '12W +/- abs.',
    description: 'Absolute Veränderung (12 Wochen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      const intlFormatter = getFormatterByValue(
        instrument.cashClose12w,
        instrument.scGrouped,
      );

      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        const formattedPrice = formatPriceWithCache(
          value,
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
          'Value',
          intlFormatter,
        );
        return (
          <span
            className={getTrendClass(
              `${value}`,
              styles.Positive,
              styles.Negative,
            )}
          >
            {!formattedPrice.startsWith('-')
              ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
              : formattedPrice}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (!val) {
              return null;
            }
            const intlFormatter = getFormatterByValue(
              instrument.cashClose12w,
              instrument.scGrouped,
            );
            const formattedPrice = formatPriceWithCache(
              val,
              /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
              'Value',
              intlFormatter,
            );
            return (
              <span
                className={getTrendClass(
                  `${val}`,
                  styles.Positive,
                  styles.Negative,
                )}
              >
                {!formattedPrice.startsWith('-')
                  ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
                  : formattedPrice}
              </span>
            );
          }}
          field="perf12wVPerPRV"
        />
      );
    },
  },
  perf52wVPerPRV: {
    name: '52W +/- abs.',
    description: 'Absolute Veränderung (52 Wochen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      const intlFormatter = getFormatterByValue(
        instrument.cashClose52w,
        instrument.scGrouped,
      );

      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        const formattedPrice = formatPriceWithCache(
          value,
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
          'Value',
          intlFormatter,
        );
        return (
          <span
            className={getTrendClass(
              `${value}`,
              styles.Positive,
              styles.Negative,
            )}
          >
            {!formattedPrice.startsWith('-')
              ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
              : formattedPrice}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (!val) {
              return null;
            }
            const intlFormatter = getFormatterByValue(
              instrument.cashClose52w,
              instrument.scGrouped,
            );
            const formattedPrice = formatPriceWithCache(
              val,
              /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
              'Value',
              intlFormatter,
            );
            return (
              <span
                className={getTrendClass(
                  `${val}`,
                  styles.Positive,
                  styles.Negative,
                )}
              >
                {!formattedPrice.startsWith('-')
                  ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
                  : formattedPrice}
              </span>
            );
          }}
          field="perf52wVPerPRV"
        />
      );
    },
  },
  perfYTDVPerPRV: {
    name: 'YTD +/- abs.',
    description: 'Absolute Veränderung (YTD)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      const intlFormatter = getFormatterByValue(
        instrument.cashCloseYTD,
        instrument.scGrouped,
      );

      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        const formattedPrice = formatPriceWithCache(
          value,
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
          'Value',
          intlFormatter,
        );
        return (
          <span
            className={getTrendClass(
              `${value}`,
              styles.Positive,
              styles.Negative,
            )}
          >
            {!formattedPrice.startsWith('-')
              ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
              : formattedPrice}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (!val) {
              return null;
            }
            const intlFormatter = getFormatterByValue(
              instrument.cashCloseYTD,
              instrument.scGrouped,
            );
            const formattedPrice = formatPriceWithCache(
              val,
              /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
              'Value',
              intlFormatter,
            );
            return (
              <span
                className={getTrendClass(
                  `${val}`,
                  styles.Positive,
                  styles.Negative,
                )}
              >
                {!formattedPrice.startsWith('-')
                  ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
                  : formattedPrice}
              </span>
            );
          }}
          field="perfYTDVPerPRV"
        />
      );
    },
  },
  perf1wVPerPRVPr: {
    name: '1W +/-%',
    description: 'Veränderung in % (1 Woche)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {val && `${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perf1wVPerPRVPr"
        />
      );
    },
  },
  perf4wVPerPRVPr: {
    name: '4W +/-%',
    description: 'Veränderung in % (4 Wochen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {val && `${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perf4wVPerPRVPr"
        />
      );
    },
  },
  perf12wVPerPRVPr: {
    name: '12W +/-%',
    description: 'Veränderung in % (12 Wochen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {val && `${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perf12wVPerPRVPr"
        />
      );
    },
  },
  perf52wVPerPRVPr: {
    name: '52W +/-%',
    description: 'Veränderung in % (52 Wochen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {val && `${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perf52wVPerPRVPr"
        />
      );
    },
  },
  perfYTDVPerPRVPr: {
    name: 'YTD +/-%',
    description: 'Veränderung in %  YTD',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {val && `${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfYTDVPerPRVPr"
        />
      );
    },
  },
  perfPercentage3Y: {
    name: '3J%',
    description: '% 3 Jahre',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {`${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="perfPercentage3Y"
        />
      );
    },
  },
  hi52w: {
    name: '52W Hoch',
    description: '52 Wochen Hoch (per Vortag)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="hi52w"
        />
      );
    },
  },
  lo52w: {
    name: '52W Tief',
    description: '52 Wochen Tief (per Vortag)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="lo52w"
        />
      );
    },
  },
  cash52wLow: {
    name: '52W Tief',
    description: '52 Wochen Tief (per Vortag)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="lo52w"
        />
      );
    },
  },
  cash52wHigh: {
    name: '52W Kurs Hoch',
    description: '52 Wochen Hoch (per Vortag)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="lo52w"
        />
      );
    },
  },
  buyingDate: {
    name: 'Kaufdatum',
    description: 'Kaufdatum',
    style: styles.TableRow,
    sortable: true,
    group: 'Portfolio erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return <span>{formatDateWithCache(value, DATE_FORMAT_SHORT)}</span>;
    },
  },
  date: {
    name: 'Datum',
    description: 'Datum',
    style: styles.TableRow,
    sortable: false,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      if (
        instrument.identifier === TOTALS_ROW_IDENTIFIER &&
        instrument.name === 'Total'
      ) {
        return 'Total';
      }

      if (!value) {
        return null;
      }
      return <span>{formatDateWithCache(value, DATE_FORMAT_SHORT)}</span>;
    },
  },
  comment: {
    name: 'Kommentar',
    description: 'Kommentar',
    style: styles.CommentsWrapper,
    sortable: false,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      if (
        instrument.identifier === TOTALS_ROW_IDENTIFIER &&
        instrument.name === 'Total'
      ) {
        return ' ';
      }
      if (!value) {
        return null;
      }
      return <span>{value}</span>;
    },
  },
  fees: {
    name: 'Gebühr',
    description: 'Gebühr',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"UserInput"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'UserInput');
    },
  },
  partInPercent: {
    name: 'Pf-Anteil %',
    description: 'Portfolio-Anteil in %',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Portfolio erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      if (
        (instrument.identifier === TOTALS_ROW_IDENTIFIER &&
          instrument.name === 'Total') ||
        (instrument.identifier === TOTALS_ROW_IDENTIFIER &&
          Number(value) * 100 >= 10000)
      ) {
        // calculating percentage values in JS is always a bit tricky, so we just return 100% for the total row. I could not find a solution that would not result in rounding errors.
        return '100.00%';
      } else if (instrument.identifier === TOTALS_ROW_IDENTIFIER) {
        return `${formatPercentageWithCache(value)}%`;
      }
      return `${formatPercentageWithCache(value)}%`;
    },
  },
  lval: {
    name: 'Aktuell',
    description: 'Bezahlter Kurs oder Bewertung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    // formatter: FormatterLval,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="lval"
        />
      );
    },
  },
  // LVAL_NORM
  currentValue: {
    name: 'Aktuell',
    // TODO: tbd when we defined the description
    description: 'Bezahlter Kurs oder Bewertung',
    style: DEFAULT_STYLES,
    sortable: true,
    // group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="currentValue"
        />
      );
    },
  },
  lvalDatetime: {
    name: 'Aktuell Zeit',
    description: 'Zeit bezahlter Kurs oder Bewertung',
    style: styles.TableRow,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return formatDateOrTimeWithCache(value);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(v) => {
            let val = v;
            if (!val) {
              return null;
            }

            if (!isNaN(Number(val))) {
              val = Number(val) * 1000;
            }

            return formatDateOrTimeWithCache(val);
          }}
          field="lvalDatetime"
        />
      );
    },
  },
  dayBeforeDate: {
    name: 'Vortag Zeit',
    description: 'Zeit der Vortag oder Bewertung Vortag',
    style: styles.TableRow,
    sortable: true,
    group: 'Intraday',
    tooltip:
      'Tag an dem das Instrument zuletzt gehandelt wurde im Vergleich zum aktuellen Tag',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return formatDateOrTimeWithCache(value);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(v) => {
            let val = v;

            if (!isNaN(Number(val))) {
              val = Number(val) * 1000;
            }

            return formatDateOrTimeWithCache(val);
          }}
          field="dayBeforeDate"
        />
      );
    },
  },
  dayBefore: {
    name: 'Vortag',
    description: 'Vortag oder Bewertung Vortag',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="dayBefore"
        />
      );
    },
  },
  iNetVperprV: {
    name: '+/-',
    description: 'Veränderung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      const intlFormatter = getFormatterByValue(
        instrument.lval,
        instrument.scGrouped,
      );

      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        const formattedPrice = formatPriceWithCache(
          value,
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
          null,
          intlFormatter,
        );
        return (
          <span
            className={getTrendClass(
              `${value}`,
              styles.Positive,
              styles.Negative,
            )}
          >
            {!formattedPrice.startsWith('-')
              ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
              : formattedPrice}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (!val) {
              return null;
            }
            const intlFormatter = getFormatterByValue(
              instrument.lval,
              instrument.scGrouped,
            );
            const formattedPrice = formatPriceWithCache(
              val,
              /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
              null,
              intlFormatter,
            );
            return (
              <span
                className={getTrendClass(
                  `${val}`,
                  styles.Positive,
                  styles.Negative,
                )}
              >
                {!formattedPrice.startsWith('-')
                  ? `${formattedPrice === '0' ? '' : '+'}${formattedPrice}`
                  : formattedPrice}
              </span>
            );
          }}
          field="iNetVperprV"
        />
      );
    },
  },
  iNetVperprVPr: {
    name: '+/-%',
    description: 'Veränderung in %',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return (
          <span
            className={getTrendClass(value, styles.Positive, styles.Negative)}
          >
            {value && `${formatPercentageWithCache(value)}%`}
          </span>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return (
              val && (
                <span
                  className={getTrendClass(
                    `${val}`,
                    styles.Positive,
                    styles.Negative,
                  )}
                >
                  {val && `${formatPercentageWithCache(val)}%`}
                </span>
              )
            );
          }}
          field="iNetVperprVPr"
        />
      );
    },
  },
  bid: {
    name: 'Geld',
    description: 'Geld',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    tooltip:
      'Der Preis, zu dem ein Käufer bereit ist, ein bestimmtes Wertpapier oder Finanzprodukt zu kaufen.',
    formatter: (
      /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
      { value, instrument, fieldType = 'bid' },
      disableAutoUpdate = false,
    ) => {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'val' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'fieldType' implicitly has an 'any' type. */
      const isEmpty = (val, fieldType): boolean =>
        (!val || val === '0') && ['bid', 'bidValue1st'].includes(fieldType);

      if (disableAutoUpdate) {
        if (!value && !instrument.bidVolume) {
          return null;
        }

        if (isEmpty(value, fieldType)) {
          return 'Market';
        }
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (isEmpty(val, fieldType)) {
              return 'Market';
            }
            return formatPriceWithCache(val, instrument.scGrouped);
          }}
          field={fieldType}
        />
      );
    },
  },
  ask: {
    name: 'Brief',
    description: 'Brief',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    tooltip:
      'Der Preis, zu dem ein Verkäufer bereit ist, ein bestimmtes Wertpapier oder Finanzprodukt zu verkaufen.',
    formatter: (
      /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
      { value, instrument, fieldType = 'ask' },
      disableAutoUpdate = false,
    ) => {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'val' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'fieldType' implicitly has an 'any' type. */
      const isEmpty = (val, fieldType): boolean =>
        (!val || val === '0') && ['ask', 'askValue1st'].includes(fieldType);

      if (disableAutoUpdate) {
        if (!value && !instrument.askVolume) {
          return null;
        }

        if (isEmpty(value, fieldType)) {
          return 'Market';
        }
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            if (isEmpty(val, fieldType)) {
              return 'Market';
            }
            return formatPriceWithCache(val, instrument.scGrouped);
          }}
          field={fieldType}
        />
      );
    },
  },
  high: {
    name: 'Hoch',
    description: 'Tageshoch',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) =>
            (val && formatPriceWithCache(val, instrument.scGrouped)) ||
            (value && formatPriceWithCache(value, instrument.scGrouped)) ||
            null
          }
          field="high"
        />
      );
    },
  },
  highDate: {
    name: 'Zeit Tageshoch',
    description: 'Zeit Tageshoch',
    style: styles.TableRow,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        // check if date is today
        const today = new Date();
        const date = new Date(value);

        if (today.getDate() === date.getDate()) {
          return formatDateWithCache(value, DATE_FORMAT_FULL_TIME);
        }
        return formatDateWithCache(value, DATE_FORMAT_SHORT);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (!val) {
              return null;
            }
            // check if date is today
            const today = new Date();
            const date = new Date(val);

            if (today.getDate() === date.getDate()) {
              return formatDateWithCache(val, DATE_FORMAT_FULL_TIME);
            }
            return formatDateWithCache(val, DATE_FORMAT_SHORT);
          }}
          field="highDate"
        />
      );
    },
  },
  low: {
    name: 'Tief',
    description: 'Tagestief',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="low"
        />
      );
    },
  },
  lowDate: {
    name: 'Zeit Tagestief',
    description: 'Zeit Tagestief',
    style: styles.TableRow,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        // check if date is today
        const today = new Date();
        const date = new Date(value);

        if (today.getDate() === date.getDate()) {
          return formatDateWithCache(value, DATE_FORMAT_FULL_TIME);
        }
        return formatDateWithCache(value, DATE_FORMAT_SHORT);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (!val) {
              return null;
            }
            // check if date is today
            const today = new Date();
            const date = new Date(val);

            if (today.getDate() === date.getDate()) {
              return formatDateWithCache(val, DATE_FORMAT_FULL_TIME);
            }
            return formatDateWithCache(val, DATE_FORMAT_SHORT);
          }}
          field="lowDate"
        />
      );
    },
  },
  bidVolume: {
    name: 'Geld Volumen',
    description: 'Geld Volumen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday erweitert',
    formatter: (
      /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
      { value, instrument, fieldType = 'bidVolume' },
      disableAutoUpdate = false,
    ) => {
      if (disableAutoUpdate) {
        if (isNaN(value)) {
          return null;
        }
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (isNaN(Number(val))) {
              return value;
            }
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'Volume');
          }}
          field={fieldType}
        />
      );
    },
  },
  bidDatetime: {
    name: 'Geld Zeit',
    description: 'Geld Zeit',
    style: styles.TableRow,
    sortable: true,
    group: 'Intraday erweitert',
    formatter: (
      /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
      { value, instrument, fieldType = 'bidDatetime' },
      disableAutoUpdate = false,
    ) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return formatDateOrTimeWithCache(value);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(v) => {
            let val = v;

            if (!isNaN(Number(val))) {
              val = Number(val) * 1000;
            }

            return formatDateOrTimeWithCache(val);
          }}
          field={fieldType}
        />
      );
    },
  },
  askVolume: {
    name: 'Brief Volumen',
    description: 'Brief Volumen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday erweitert',
    formatter: (
      /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
      { value, instrument, fieldType = 'askVolume' },
      disableAutoUpdate = false,
    ) => {
      if (disableAutoUpdate) {
        if (isNaN(value)) {
          return null;
        }
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (isNaN(Number(val))) {
              return value;
            }
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'Volume');
          }}
          field={fieldType}
        />
      );
    },
  },

  askDatetime: {
    name: 'Brief Zeit',
    description: 'Brief Zeit',
    style: styles.TableRow,
    sortable: true,
    group: 'Intraday erweitert',
    formatter: (
      /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
      { value, instrument, fieldType = 'askDatetime' },
      disableAutoUpdate = false,
    ) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return formatDateOrTimeWithCache(value);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(v) => {
            let val = v;

            if (!isNaN(Number(val))) {
              val = Number(val) * 1000;
            }

            return formatDateOrTimeWithCache(val);
          }}
          field={fieldType}
        />
      );
    },
  },
  open: {
    name: 'Eröffnung',
    description: 'Eröffnung',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="open"
        />
      );
    },
  },
  openDatetime: {
    name: 'Eröffnung Zeit',
    description: 'Eröffnung Zeit',
    style: styles.TableRow,
    sortable: true,
    group: 'Intraday erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!value) {
          return null;
        }
        return formatDateOrTimeWithCache(value);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (!val) {
              return null;
            }

            if (!isNaN(Number(val))) {
              val = Number(val) * 1000;
            }

            return formatDateOrTimeWithCache(val);
          }}
          field="openDatetime"
        />
      );
    },
  },
  lvalVolume: {
    name: 'Volumen',
    description: 'Volumen Letzter Kurs',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        if (!Number(value) || value === 'NaN') {
          return '';
        }
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
          formatFn={(val) => formatPriceWithCache(val, 'Volume')}
          field="lvalVolume"
        />
      );
    },
  },
  maturity: {
    name: 'Fälligkeit',
    description: 'Fälligkeit (nur für Obligationen)',
    style: styles.TableRow,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }

      return formatDateWithCache(value, DATE_FORMAT_SHORT);
    },
  },
  callbyissuer: {
    name: 'Kündbar Emittent ja/nein?',
    description: 'Kündigungsrecht Emittent (nur für Obligationen)',
    style: styles.TableRow,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }

      if (value === 'Y') {
        return 'Ja';
      }

      if (value === 'N') {
        return 'Nein';
      }
    },
  },
  callbyholder: {
    name: 'Kündbar Emittent ja/nein?',
    description: 'Kündigungsrecht Gläubiger (nur für Obligationen)',
    style: styles.TableRow,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }

      if (value === 'Y') {
        return 'Ja';
      }

      if (value === 'N') {
        return 'Nein';
      }
    },
  },
  rlife: {
    name: 'Rest-Laufzeit',
    description: 'Rest-Laufzeit in Jahren (nur für Obligationen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'Value');
    },
  },
  interest: {
    name: 'Zinssatz',
    description: 'Zinssatz (p.a.) (nur für Obligationen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      // TODO: check if the formatting is correct here
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return value && `${formatPriceWithCache(value, 'Value')}%`;
    },
  },
  yield: {
    name: 'Verfallrendite (Yield)',
    description: 'Verfallrendite (Yield) (nur für Obligationen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return value && `${formatPriceWithCache(value, 'Value')}%`;
    },
  },
  cyield: {
    name: 'Direkte Rendite',
    description: 'Direkte Rendite (nur für Obligationen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return value && `${formatPriceWithCache(value, 'Value')}%`;
    },
  },
  mdur: {
    name: 'Modified Duration',
    description: 'Modified Duration (nur für Obligationen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'Value');
    },
  },
  pcalc: {
    name: 'Preis Berechnung',
    description: 'Preis Berechnung (nur für Obligationen)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatPriceWithCache(value, instrument.scGrouped);
    },
  },
  strike: {
    name: 'Strike',
    description: 'Strike (nur für Derivate)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatPriceWithCache(value, instrument.scGrouped);
    },
  },
  leadMan: {
    name: 'Gesellschaft',
    description: 'Gesellschaft',
    style: styles.TableRow,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  eusipaId: {
    name: 'SVSP-ID',
    description: 'Instrument-Klassifizierung/Kategorie (nur für Derivate)',
    style: styles.TableRow,
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      // most probably the only unformatted "number" -> category Text
      return value;
    },
  },
  perf1w: {
    name: '+/- 1W',
    description: 'Schlusskurs 1 Woche',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return headerMapping['iNetVperprV'].formatter(
        {
          instrument,
          value: value,
        },
        true,
      );
    },
  },
  perf4w: {
    name: '+/- 4W',
    description: 'Schlusskurs 4 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return headerMapping['iNetVperprV'].formatter(
        {
          instrument,
          value: value,
        },
        true,
      );
    },
  },
  perf12w: {
    name: '+/- 12W',
    description: 'Schlusskurs 12 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return headerMapping['iNetVperprV'].formatter(
        {
          instrument,
          value: value,
        },
        true,
      );
    },
  },
  perf26w: {
    name: '+/- 26W',
    description: 'Schlusskurs 26 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return headerMapping['iNetVperprV'].formatter(
        {
          instrument,
          value: value,
        },
        true,
      );
    },
  },
  perf52w: {
    name: '+/- 52W',
    description: 'Schlusskurs 52 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return headerMapping['iNetVperprV'].formatter(
        {
          instrument,
          value: value,
        },
        true,
      );
    },
  },
  cashClose1w: {
    name: '1W Kurs',
    description: 'Kurs vor 1 Woche',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="cashClose1w"
        />
      );
    },
  },
  cashClose4w: {
    name: '4W Kurs',
    description: 'Kurs vor 4 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="cashClose4w"
        />
      );
    },
  },
  cashClose12w: {
    name: '12W Kurs',
    description: 'Kurs vor 12 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="cashClose12w"
        />
      );
    },
  },
  cashClose52w: {
    name: '52W Kurs',
    description: 'Kurs vor 52 Wochen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="cashClose52w"
        />
      );
    },
  },
  cashCloseYTD: {
    name: 'YTD Kursdatum',
    description: 'Datum vom Kurs am 1.1.',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Intraday',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return formatPriceWithCache(value, instrument.scGrouped);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => formatPriceWithCache(val, instrument.scGrouped)}
          field="cashCloseYTD"
        />
      );
    },
  },
  cashClose1wDatetime: {
    name: '1W Kursdatum',
    description: 'Datum vom Kurs vor 1 Woche',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        // atm we sometimes seem to get bad data from SOLID like on BTC (999999915312-9910014-333), we just treat 1970 as no data
        if (!value || new Date(value).getFullYear() === 1970) {
          return null;
        }
        return formatDateOrTimeWithCache(value, true);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (new Date(val).getFullYear() === 1970) {
              return null;
            }
            if (!val) {
              return (value && formatDateOrTimeWithCache(value, true)) || null;
            }

            return formatDateOrTimeWithCache(val, true);
          }}
          field="cashClose1wDatetime"
        />
      );
    },
  },
  cashClose4wDatetime: {
    name: '4W Kursdatum',
    description: 'Datum vom Kurs vor 4 Wochen',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        // atm we sometimes seem to get bad data from SOLID like on BTC (999999915312-9910014-333), we just treat 1970 as no data
        if (!value || new Date(value).getFullYear() === 1970) {
          return null;
        }
        return formatDateOrTimeWithCache(value, true);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (new Date(val).getFullYear() === 1970) {
              return null;
            }
            if (!val) {
              return (value && formatDateOrTimeWithCache(value, true)) || null;
            }

            return formatDateOrTimeWithCache(val, true);
          }}
          field="cashClose4wDatetime"
        />
      );
    },
  },
  cashClose12wDatetime: {
    name: '12W Kursdatum',
    description: 'Datum vom Kurs vor 12 Wochen',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        // atm we sometimes seem to get bad data from SOLID like on BTC (999999915312-9910014-333), we just treat 1970 as no data
        if (!value || new Date(value).getFullYear() === 1970) {
          return null;
        }
        return formatDateOrTimeWithCache(value, true);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (new Date(val).getFullYear() === 1970) {
              return null;
            }
            if (!val) {
              return (value && formatDateOrTimeWithCache(value, true)) || null;
            }

            return formatDateOrTimeWithCache(val, true);
          }}
          field="cashClose12wDatetime"
        />
      );
    },
  },
  cashClose52wDatetime: {
    name: '52W Kursdatum',
    description: 'Datum vom Kurs vor 52 Wochen',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        // atm we sometimes seem to get bad data from SOLID like on BTC (999999915312-9910014-333), we just treat 1970 as no data
        if (!value || new Date(value).getFullYear() === 1970) {
          return null;
        }
        return formatDateOrTimeWithCache(value, true);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (new Date(val).getFullYear() === 1970) {
              return null;
            }
            if (!val) {
              return (value && formatDateOrTimeWithCache(value, true)) || null;
            }

            return formatDateOrTimeWithCache(val, true);
          }}
          field="cashClose52wDatetime"
        />
      );
    },
  },
  cashCloseYTDDatetime: {
    name: 'YTD Kursdatum',
    description: 'Datum vom Kurs am 1.1.',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        // atm we sometimes seem to get bad data from SOLID like on BTC (999999915312-9910014-333), we just treat 1970 as no data
        if (!value || new Date(value).getFullYear() === 1970) {
          return null;
        }
        return formatDateOrTimeWithCache(value, true);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (new Date(val).getFullYear() === 1970) {
              return null;
            }
            if (!val) {
              return (value && formatDateOrTimeWithCache(value, true)) || null;
            }

            return formatDateOrTimeWithCache(val, true);
          }}
          field="cashCloseYTDDatetime"
        />
      );
    },
  },
  cash52wHighDatetime: {
    name: '52W Datum Hoch',
    description: 'Datum 52 Wochen Hoch (per Vortag)',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        // atm we sometimes seem to get bad data from SOLID like on BTC (999999915312-9910014-333), we just treat 1970 as no data
        if (!value || new Date(value).getFullYear() === 1970) {
          return null;
        }
        return formatDateOrTimeWithCache(value, true);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (new Date(val).getFullYear() === 1970) {
              return null;
            }
            if (!val) {
              return (value && formatDateOrTimeWithCache(value, true)) || null;
            }

            return formatDateOrTimeWithCache(val, true);
          }}
          field="cash52wHighDatetime"
        />
      );
    },
  },
  cash52wLowDatetime: {
    name: '52W Datum Tief',
    description: 'Datum 52 Wochen Tief (per Vortag)',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        // atm we sometimes seem to get bad data from SOLID like on BTC (999999915312-9910014-333), we just treat 1970 as no data
        if (!value || new Date(value).getFullYear() === 1970) {
          return null;
        }
        return formatDateOrTimeWithCache(value, true);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (new Date(val).getFullYear() === 1970) {
              return null;
            }
            if (!val) {
              return (value && formatDateOrTimeWithCache(value, true)) || null;
            }

            return formatDateOrTimeWithCache(val, true);
          }}
          field="cash52wLowDatetime"
        />
      );
    },
  },
  lo52wDatetime: {
    name: 'Datum 52W Tief',
    description: 'Datum 52 Wochen Tief (per Vortag)',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        // atm we sometimes seem to get bad data from SOLID like on BTC (999999915312-9910014-333), we just treat 1970 as no data
        if (!value || new Date(value).getFullYear() === 1970) {
          return null;
        }
        return formatDateOrTimeWithCache(value, true);
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          defaultUpdateStatus="neutral"
          formatFn={(val) => {
            if (new Date(val).getFullYear() === 1970) {
              return null;
            }
            if (!val) {
              return (value && formatDateOrTimeWithCache(value, true)) || null;
            }

            return formatDateOrTimeWithCache(val, true);
          }}
          field="lo52wDatetime"
        />
      );
    },
  },
  yHi: {
    name: 'Jahreshoch',
    description: 'Hoch aktuelles Jahr (per Vortag)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatPriceWithCache(value, instrument.scGrouped);
    },
  },
  yHiDatetime: {
    name: 'Datum Jahreshoch',
    description: 'Datum Jahreshoch (per Vortag)',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }

      return formatDateOrTimeWithCache(value);
    },
  },
  yLo: {
    name: 'Jahrestief',
    description: 'Tief aktuelles Jahr (per Vortag)',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatPriceWithCache(value, instrument.scGrouped);
    },
  },
  yLoDatetime: {
    name: 'Datum Jahrestief',
    description: 'Datum Jahrestief (per Vortag)',
    style: styles.TableRow,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }

      return formatDateOrTimeWithCache(value);
    },
  },
  pyClose: {
    name: 'Schlusskurs 31.12.',
    description: 'Schlusskurs 31.12.',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Kursentwicklung erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return formatPriceWithCache(value, instrument.scGrouped);
    },
  },
  totvol: {
    name: 'Volumen Total',
    description: 'Heutiges Volumen (Stk) in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'Volume');
          }}
          field="totvol"
        />
      );
    },
  },
  tottur: {
    name: 'Umsatz Total',
    description: 'Heutiger Umsatz in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'default');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'default');
          }}
          field="tottur"
        />
      );
    },
  },
  avVol12w: {
    name: 'Ø Vol. 3 Monate',
    description: 'Durchschnittliches Volumen 3 Monate in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'Volume');
    },
  },
  vol: {
    name: 'Vol. Börse',
    description: 'Volumen (Stk) an der Börse',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    tooltip:
      'Die Gesamtanzahl der gehandelten Wertpapiere innerhalb eines einzigen Handelstages. Das Tagesvolumen ist ein wichtiger Indikator für die Aktivität und Liquidität eines bestimmten Wertpapiers oder eines gesamten Marktes.',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'Volume');
          }}
          field="vol"
        />
      );
    },
  },
  offvol: {
    name: 'Vol. Rest',
    description: 'Volumen (Stk) ausserhalb Börse in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'Volume');
          }}
          field="offvol"
        />
      );
    },
  },
  pOffvol: {
    name: 'Vol. Rest Vortag',
    description: 'Vortag Volumen (Stk) ausserhalb Börse in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'Volume');
          }}
          field="pOffvol"
        />
      );
    },
  },
  pVol: {
    name: 'Vol. Vortag Börse',
    description: 'Volumen (Stk) an der Börse',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'Volume');
          }}
          field="pVol"
        />
      );
    },
  },
  pTur: {
    name: 'Umsatz Vortag Total',
    description: 'Vortag Umsatz in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'default');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'default');
          }}
          field="pTur"
        />
      );
    },
  },
  pmAvVol: {
    name: 'Ø Vol. Vormonat',
    description: 'Durchschnittliches Volumen Vormonat in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'Volume');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'Volume');
          }}
          field="pmAvVol"
        />
      );
    },
  },
  tur: {
    name: 'Ums. Börse',
    description: 'Umsatz an der Börse',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    tooltip: 'Tagesvolumen multipliziert mit dem Preis.',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'disableAutoUpdate' implicitly has an 'any' type. */
    formatter: ({ value, instrument, disableAutoUpdate }) => {
      if (disableAutoUpdate) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(value, 'default');
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
            return formatPriceWithCache(val, 'default');
          }}
          field="tur"
        />
      );
    },
  },
  offtur: {
    name: 'Ums. Rest',
    description: 'Umsatz ausserhalb der Börse in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'default');
    },
  },
  pOfftur: {
    name: 'Ums. Rest Vortag',
    description: 'Vortag Umsatz ausserhalb der Börse in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'default') || '–';
    },
  },
  volDatetime: {
    name: 'Vol. Datum',
    description: 'Volumen Datum',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ instrument, value }) => {
      if (!value) {
        return null;
      }
      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return formatDateOrTimeWithCache(val);
          }}
          field="volDatetime"
        />
      );
    },
  },
  totvolDatetime: {
    name: 'Datum Volumen Total',
    description: 'DatumHeutiges Volumen (Stk) in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ instrument, value }) => {
      if (!value) {
        return null;
      }
      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return formatDateOrTimeWithCache(val);
          }}
          field="totvolDatetime"
        />
      );
    },
  },
  pOffvolDatetime: {
    name: 'Datum Vol. Rest Vortag',
    description: 'Datum Vortag Volumen (Stk) ausserhalb Börse in Millionen',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ instrument, value }) => {
      if (!value) {
        return null;
      }
      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return formatDateOrTimeWithCache(val);
          }}
          field="pOffvolDatetime"
        />
      );
    },
  },
  pVolDatetime: {
    name: 'Datum Vol. Vortag Börse',
    description: 'Datum Volumen (Stk) an der Börse',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Volumen',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ instrument, value }) => {
      if (!value) {
        return null;
      }
      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) => {
            return formatDateOrTimeWithCache(val);
          }}
          field="pVolDatetime"
        />
      );
    },
  },
  convexity: {
    name: 'Konv.',
    description: 'Konvexität',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      // TODO: check if the formatting is correct here
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return formatPrice(value, 'Value');
    },
  },
  dayCountConvention: {
    name: 'Zinsber.',
    description: 'Zinsberechnungsmethode',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  denomination: {
    name: 'Stk.',
    description: 'Stückelung/Nennwert',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return formatPrice(value);
    },
  },
  dividendPolicy: {
    name: 'Gewinnverw.',
    description: 'Gewinnverwendung (nur für Fonds)',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  companyFullName: {
    name: 'Emittent',
    description: 'Emittent',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  domicile: {
    name: 'Dom.',
    description: 'Domizil',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  duration: {
    name: 'Dauer',
    description: 'Dauer',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return formatPrice(value, 'Value');
    },
  },
  exchangeDomicile: {
    name: 'Dom. Bö.',
    description: 'Domizil Börse',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  instrumentType: {
    name: 'Instr. Typ',
    description: 'Instrumententyp',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  instrumentUnit: {
    name: 'Einheit',
    description: 'Einheit des Instruments',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  interestDate: {
    name: 'Zins Dat.',
    description: 'Zinsdatum',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return <span>{formatDate(value, DATE_FORMAT_SHORT)}</span>;
    },
  },
  issueAmt: {
    name: 'Em Vol. Mia.',
    description: 'Emissionsvolumen in Mia.',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return formatPrice(value / 1_000_000_000);
    },
  },
  issueDate: {
    name: 'Em. Dat.',
    description: 'Emissionsdatum',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return <span>{formatDate(value, DATE_FORMAT_SHORT)}</span>;
    },
  },
  issuePrice: {
    name: 'Em. Preis',
    description: 'Emissionspreis',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return <span>{formatPrice(value, 'Value')}</span>;
    },
  },
  issueVolume: {
    name: 'Em. Vol.',
    description: 'Emissionsvolumen',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
      return <span>{formatPrice(value, 'Volume')}</span>;
    },
  },
  lastTradingDate: {
    name: 'Letzter Handelstag',
    description: 'Letzter Handelstag',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      return <span>{formatDate(value, DATE_FORMAT_SHORT)}</span>;
    },
  },
  marketCap: {
    name: 'Mk. Cap.',
    description: 'Market Cap.',
    style: DEFAULT_STYLES,
    sortable: true,
    group: 'Fundamentaldaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"default"' is not assignable to parameter of type 'null | undefined'. */
      return <span>{formatPrice(value, 'default')}</span>;
    },
  },
  nominal: {
    name: 'Nom.',
    description: 'Nominalwert',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return <span>{formatPrice(value, 'Value')}</span>;
    },
  },
  nominalCurrency: {
    name: 'Nom. Whg.',
    description: 'Nominalwährung',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  paymentFrequency: {
    name: 'Zah. Häuf.',
    description: 'Zinshäufigkeit',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  paymentFrequencyUnit: {
    name: 'Dom.',
    description: 'Einheit Verzinsungsfrequenz',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  redemptionPayment: {
    name: 'Rückzahlung',
    description: 'Rückzahlung',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return formatPrice(value);
    },
  },
  sector: {
    name: 'Sec.',
    description: 'Sektor',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  seniority: {
    name: 'Sen.',
    description: 'Seniorität',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  tradedShares: {
    name: 'Gehandelte',
    description: 'Gehandelte Wertpapiere',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      if (!value) {
        return null;
      }
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
      return <span>{formatPrice(value, 'Volume')}</span>;
    },
  },
  unit: {
    name: 'Einheit',
    description: 'Einheit',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  wkn: {
    name: 'WKN',
    description: 'WKN',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  compFullName: {
    name: 'Emittent',
    description: 'Emittent',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Stammdaten',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return value;
    },
  },
  accInt: {
    name: 'Aufgel. Zinsen',
    description: 'Aufgelaufene Zinsen',
    style: classNames(styles.TableRow),
    sortable: true,
    group: 'Fundamentaldaten erweitert',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return `${formatPrice(value, 'Value')}%`;
    },
  },
  lastToggleItem: {
    name: '',
    style: classNames(styles.TableRow, styles.Last),
    sortable: false,
  },
  trendArrow: {
    name: 'Trend',
    description: 'Trend',
    style: classNames(styles.TableRow, styles.Center),
    sortable: true,
    group: 'Intraday',
    valueOverride: 'iNetVperprVPr',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return (
          <>
            {value && parseFloat(value) !== 0 && (
              <Icon
                addClass={getTrendClass(
                  `${value}`,
                  classNames(styles.Positive, styles.Up),
                  classNames(styles.Negative, styles.Down),
                )}
                type={'IconArrowRight'}
              />
            )}
          </>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) =>
            val &&
            parseFloat(`${val}`) !== 0 && (
              <Icon
                addClass={getTrendClass(
                  `${val}`,
                  classNames(styles.Positive, styles.Up),
                  classNames(styles.Negative, styles.Down),
                )}
                type={'IconArrowRight'}
              />
            )
          }
          field="trendArrow"
        />
      );
    },
  },
  trendArrowPerfPercentage: {
    name: 'Trend',
    description: 'Trend',
    style: classNames(styles.TableRow, styles.Center),
    sortable: true,
    group: null,
    valueOverride: 'perfPercentage',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }, disableAutoUpdate = false) => {
      if (disableAutoUpdate) {
        return (
          <>
            {value && parseFloat(value) !== 0 && (
              <Icon
                addClass={getTrendClass(
                  `${value}`,
                  classNames(styles.Positive, styles.Up),
                  classNames(styles.Negative, styles.Down),
                )}
                type={'IconArrowRight'}
              />
            )}
          </>
        );
      }

      return (
        <InstrumentField
          instrumentKey={instrument?.instrumentKey}
          initialValue={value}
          formatFn={(val) =>
            val &&
            parseFloat(`${val}`) !== 0 && (
              <Icon
                addClass={getTrendClass(
                  `${val}`,
                  classNames(styles.Positive, styles.Up),
                  classNames(styles.Negative, styles.Down),
                )}
                type={'IconArrowRight'}
              />
            )
          }
          field="trendArrowPerfPercentage"
        />
      );
    },
  },
  // used for transactions overview
  price: {
    name: 'Preis',
    description: '',
    style: DEFAULT_STYLES,
    sortable: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"UserInput"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'UserInput');
    },
  },
  // used for alerts overview
  value: {
    name: 'Alert Wert',
    description: 'Alert Wert ',
    style: DEFAULT_STYLES,
    sortable: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"UserInput"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'UserInput');
    },
  },
  // used for alerts overview
  type: {
    name: 'Type',
    description: 'Type',
    style: styles.TableRow,
    sortable: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      return (
        <>
          {(value === 'UPPER' && (
            <div
              className={classNames(styles.UpperAlert, {
                [styles.IsBroken]: instrument?.status === 'BROKEN',
              })}
            >
              <Icon type="IconArrowUp"></Icon> oberer
            </div>
          )) || (
            <div
              className={classNames(styles.LowerAlert, {
                [styles.IsBroken]: instrument?.status === 'BROKEN',
              })}
            >
              <Icon type="IconArrowDown"></Icon> unterer
            </div>
          )}
        </>
      );
    },
  },
  // used for alerts overview overview
  expiration: {
    name: 'Gültig Bis',
    description: 'Gültig Bis ',
    style: styles.TableRow,
    sortable: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return formatDateWithCache(new Date(value).getTime(), DATE_FORMAT_SHORT);
    },
  },
  // used for alerts overview overview
  brokenTime: {
    name: 'Ausgelöst',
    description: 'Ausgelöst',
    style: styles.TableRow,
    sortable: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    formatter: ({ value }) => {
      return (
        (value && formatDateOrTimeWithCache(new Date(value).getTime())) || null
      );
    },
  },
  // used for alerts overview overview
  receiveType: {
    name: 'Kanal',
    description: 'Kanal',
    style: styles.TableRow,
    sortable: true,
  },
  chartColors: {
    name: '',
    description: '',
    style: styles.TableRow,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'rowIndex' implicitly has an 'any' type. */
    formatter: ({ instrument, rowIndex }) => {
      return (
        <ColorTableCell
          rowIndex={rowIndex}
          listingId={instrument?.instrumentKey}
        />
      );
    },
  },
  // used for cashItems overview
  amount: {
    name: 'Betrag',
    description: 'Betrag ',
    style: DEFAULT_STYLES,
    sortable: false,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      if (
        instrument.identifier === TOTALS_ROW_IDENTIFIER &&
        instrument.name === 'Total'
      ) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
        return formatPriceWithCache(instrument.total, 'Value');
      }
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
      return formatPriceWithCache(value, 'Value');
    },
  },
  // used for cashItems overview
  instrumentTitle: {
    name: 'Title',
    description: 'Title',
    style: styles.TableRow,
    sortable: false,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
    formatter: ({ value, instrument }) => {
      let label = value;

      if (instrument?.amount > 0 && !label) {
        label = 'Einzahlung';
      } else if (instrument?.amount < 0 && !label) {
        label = 'Auszahlung';
      }

      if (
        instrument?.identifier === TOTALS_ROW_IDENTIFIER ||
        (instrument.otherAsset && !instrument?.fullquoteUri)
      ) {
        return (
          <div className={styles.NameCell}>
            <span title={label}>{label}</span>
          </div>
        );
      }
      return (
        <div className={styles.NameCell}>
          <Link
            className={classNames({
              [styles.Link]: !instrument.otherAsset && instrument?.fullquoteUri,
            })}
            path={
              (!instrument.otherAsset &&
                instrument?.fullquoteUri &&
                `/${instrument?.fullquoteUri}`) ||
              ''
            }
            label={label}
            title={label}
          />
        </div>
      );
    },
  },
} as const;
