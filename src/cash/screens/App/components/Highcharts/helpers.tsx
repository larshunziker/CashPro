import { SHORT_TIME_PERIOD_FORMAT_MAPPING } from './components/Tabs/constants';
import { TimeRange } from './typings';

export const ensureValorItems = (
  valors: Valor[],
): { type: string; label: string; fullquoteUrl?: string }[] => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'valorItems' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const valorItems = [];
  valors &&
    valors.forEach((valor) => {
      // make sure valorNumber, valorStockExchange.originalId and valorCurrency.originalId are set
      if (
        valor.valorNumber &&
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        valor.valorStockExchange.originalId &&
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        valor.valorCurrency.originalId
      ) {
        // set urls by valors
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        const listingId = `${valor.valorNumber}-${valor.valorStockExchange.originalId}-${valor.valorCurrency.originalId}`;
        valorItems.push({
          type: listingId,
          label: valor.shortName || valor.valorName,
          fullquoteUrl: valor.fullquoteUrl,
        });
      }
    });

  /* @ts-ignore TODO: TS7005 ->  Variable 'valorItems' implicitly has an 'any[]' type. */
  return valorItems;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'query' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'variables' implicitly has an 'any' type. */
export const fetchData = async (query, variables) => {
  if (!query || !variables || !variables?.id) {
    return;
  }
  let response = null;
  try {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    response = global.apolloClient.query({
      query,
      variables,
      fetchPolicy: 'network-only',
      ssr: false,
    });
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error(
      '[RaschStack] Could not fetch charts:',
      JSON.stringify(error),
    );
  }
  return response;
};

const dateToday = (offset = 0): string => {
  const today = new Date();
  today.setDate(today.getDate() - offset);
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Frequencies are documented here: https://jira.ringieraxelspringer.ch/browse/CASH-502
// There is a maximum of 2000 data points per response, use the additional "max" url parameter to get more data points.
export const getRange = (
  from = 0,
  to = -1,
  frequency = '30s',
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'number'. */
  max: number = null,
) => {
  return {
    from: dateToday(from),
    to: dateToday(to),
    frequency,
    max: max ? `${max}` : null,
  };
};

// Frequencies are documented here: https://jira.ringieraxelspringer.ch/browse/CASH-502
// There is a maximum of 2000 data points per response, use the additional "max" url parameter to get more data points.
export const getRangeByActiveTab = {
  intraday: {
    frequency: '30s',
  },
  oneWeek: getRange(7, 0, '15m'),
  oneMonth: getRange(30, 0, '1d'),
  threeMonths: getRange(90, 0, '1d'),
  sixMonths: getRange(180, 0, '1d'),
  oneYear: getRange(365, 0, '1d'),
  ytd: {
    from: `${new Date().getFullYear()}-01-01`,
    to: `${dateToday(0)}`,
    frequency: '1d',
    max: null,
  },
  threeYears: getRange(3 * 365, 0, '2d'),
  fiveYears: getRange(5 * 365, 0, '2d'),
  analyse: getRange(10 * 365, -1, '1d', 30000),
  allIntraday: {
    frequency: 'tick',
  },
};

const convertHMToMS = (time: string): number => {
  const [hours, minutes] = time.split(':');
  return (+hours * 60 + +minutes) * 60 * 1000;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
export const IntraDayFillUp = (data) => {
  if (!data?.prices || data?.prices?.length === 0) {
    return;
  }

  const lastDateInCurrentSet = new Date(
    data.prices[data.prices.length - 1].date,
  );

  const closingDate = new Date(
    new Date(lastDateInCurrentSet).setHours(0, 0, 0, 0) +
      convertHMToMS(data.bcClose),
  );

  const timeDifferenceUntilMarketClosing =
    closingDate.getTime() - lastDateInCurrentSet.getTime();

  const newData = JSON.parse(
    JSON.stringify({
      ...data,
      prices: [...data.prices],
    }),
  );

  let prefTime = +new Date(data.prices[data.prices.length - 1].date);
  const increaseStep = 30000; // 30 sec
  for (
    let index = 0;
    index < timeDifferenceUntilMarketClosing;
    index += increaseStep
  ) {
    prefTime += increaseStep;

    newData.prices.push({
      high: null,
      low: null,
      open: null,
      close: null,
      date: new Date(prefTime),
      volume: null,
    });
  }

  return newData;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
export const formatDividendYield = (value): string => {
  return formatPercentage(value, null);
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
export const formatPercentage = (
  value: any,
  positivePrefix: string | null = '+',
): string => {
  const formattedValue = value;
  const numberFormatter = Intl.NumberFormat('de-CH', {
    maximumFractionDigits: 2,
    minimumFractionDigits: String(formattedValue).includes('.') ? 2 : 0,
  });
  if (positivePrefix && Math.sign(parseFloat(formattedValue)) > 0) {
    return `${positivePrefix}${numberFormatter.format(formattedValue)}`;
  }
  return numberFormatter.format(formattedValue);
};

export const getFormatterByValue = (
  value: any,
  type: string | null = null,
): Intl.NumberFormat => {
  switch (type) {
    // First: Take care of the newly introduced "helpers" via formatPrice ...
    // User input should not be formatted. If a user write 1.0000123 he should see that.
    /* @ts-ignore TODO: TS2678 ->  Type '"FullNumber"' is not comparable to type 'null'. */
    case 'FullNumber':
      return new Intl.NumberFormat('de-CH', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    /* @ts-ignore TODO: TS2678 ->  Type '"UserInput"' is not comparable to type 'null'. */
    case 'UserInput':
      return new Intl.NumberFormat('de-CH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 20,
      });
    /* @ts-ignore TODO: TS2678 ->  Type '"Volume"' is not comparable to type 'null'. */
    case 'Volume':
      return new Intl.NumberFormat('de-CH', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 9,
      });
    /* @ts-ignore TODO: TS2678 ->  Type '"Value"' is not comparable to type 'null'. */
    case 'Value':
      return new Intl.NumberFormat('de-CH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    default:
      const plainValue = `${value}`.split('.').shift();
      const plainDecimalValue = `${value}`.split('.').pop();
      const regexp = /[^0]/;
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      const firstNonZeroIndex = plainDecimalValue.search(regexp);

      // this is how equities are displayed defined by six https://www.six-group.com/dam/download/the-swiss-stock-exchange/trading/trading-provisions/regulation/trading-guides/price-step-equity.pdf
      if (type === 'EQU') {
        if (Number(plainValue) < 20 && Number(plainValue) >= 1) {
          return Intl.NumberFormat('de-CH', {
            maximumFractionDigits: (Number(plainValue) < 5 && 4) || 3,
            minimumFractionDigits: (Number(plainValue) < 5 && 4) || 3,
          });
        }
        if (type === 'EQU' && value > 99999) {
          return Intl.NumberFormat('de-CH', {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          });
        }
      }

      // needs always 4 digits on currencies
      if (
        (firstNonZeroIndex < 2 && Number(plainValue) <= 1 && type === 'CCR') ||
        type === 'CUR' ||
        type === 'INT'
      ) {
        const numberFormatter = Intl.NumberFormat('de-CH', {
          maximumFractionDigits:
            firstNonZeroIndex < 3 ? 4 : firstNonZeroIndex + 2,
          minimumFractionDigits: 4,
        });
        return numberFormatter;
      }

      if (value > 99999 && (type === 'default' || type === null)) {
        const numberFormatter = Intl.NumberFormat('de-CH', {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        });
        return numberFormatter;
      }

      if (Number(plainValue) >= 1) {
        const numberFormatter = Intl.NumberFormat('de-CH', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
        return numberFormatter;
      }

      // is between 0.1 and 0.99
      if (Math.abs(value) >= 0.1 && Math.abs(value) <= 0.99999999) {
        const numberFormatter = Intl.NumberFormat('de-CH', {
          maximumFractionDigits: 4,
          minimumFractionDigits: 4,
        });
        return numberFormatter;
      }

      if (Math.abs(value) <= 0.09999999 && firstNonZeroIndex < 5) {
        const numberFormatter = Intl.NumberFormat('de-CH', {
          maximumFractionDigits: 6,
          minimumFractionDigits: 6,
        });
        return numberFormatter;
      }

      const numberFormatter = Intl.NumberFormat('de-CH', {
        maximumFractionDigits: firstNonZeroIndex + 2,
        minimumFractionDigits: firstNonZeroIndex + 2,
      });
      return numberFormatter;
  }
};

export const formatPrice = (
  value: any,
  type: string | null = null,
  intlFormatter?: Intl.NumberFormat,
) => {
  if (!value) {
    return '';
  }

  if (
    type === 'Value' &&
    (Number.isNaN(value) || Number(value) === 0 || typeof value === 'undefined')
  ) {
    return '';
  }
  if (Number.isNaN(value) || (Number(value) === 0 && type === 'default')) {
    return value;
  }

  const formatter = intlFormatter || getFormatterByValue(value, type);
  const result = formatter.format(value).replace(/’/g, "'");
  return result === '-0' ? '0' : result;
};

export const mapTimePeriodToShortUrlFormat = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'timePeriod' implicitly has an 'any' type. */
  timePeriod,
): TimeRange | string => {
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ '1d' */
  return SHORT_TIME_PERIOD_FORMAT_MAPPING[timePeriod]
    ? /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ '1d' */
      SHORT_TIME_PERIOD_FORMAT_MAPPING[timePeriod]
    : timePeriod;
};
