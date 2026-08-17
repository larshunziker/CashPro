import {
  BOND,
  CRYPTO_CURRENCY,
  DERIVATE,
  EQUITY,
  FUND,
} from '../../../../components/AutoSuggestSearch/constants';
import {
  DEFAULT_TABLE,
  LIMIT_TABLE,
  MONITOR_TABLE,
  ORIGINAL_CURRENCY_TABLE,
  PERFORMANCE_TABLE,
  SPECIAL_INFO_TABLE,
} from '../Table/constants';

export const ITEMS_PER_PAGE = 3;

export const nonTradableTypes = ['IND', 'CUR', 'INT'];

export const MONITOR_ICON = 'monitorIcon';
export const CHANCE_ICON = 'chanceIcon';
export const SENSITIVITY_ICON = 'sensitivityIcon';

export const SEARCH_RESULT_CONFIG = [
  EQUITY,
  CRYPTO_CURRENCY,
  FUND,
  BOND,
  DERIVATE,
];

export const SOLDOUT_TEXT =
  'Dieses Portfolio enthält ausverkaufte Titel. Um diese anzeigen zu lassen, ändern Sie die Ansicht unter dem Menü-Punkt “Mehr”.';

export const TABLE_HEADERS = {
  [LIMIT_TABLE]: [
    'name',
    'trendArrow',
    'quantity',
    'currency',
    'lval',
    'paidAverageWithFeesOrigCurrency',
    'accountPercent',
    'alertsUpperLimit',
    'alertsLowerLimit',
  ],
  [ORIGINAL_CURRENCY_TABLE]: [
    'name',
    'trendArrow',
    'quantity',
    'currency',
    'lval',
    'paidOrigCurrency',
    'actualPriceOrigCurrency',
    'accountPlusMinusOrigCurrency',
    'accountPercentOrigCurrency',
    'market',
  ],
  [PERFORMANCE_TABLE]: [
    'name',
    'trendArrow',
    'paidAverage',
    'currency',
    'lval',
    'iNetVperprVPr',
    'perfPercentage1w',
    'perfPercentage4w',
    'perfPercentage52w',
    'perfPercentageYTD',
  ],
  [SPECIAL_INFO_TABLE]: [
    'name',
    'trendArrow',
    'quantity',
    'currency',
    'buyingDate',
    'lval',
    'paidAverageWithFeesOrigCurrency',
    'fees',
    'actualPrice',
    'accountPercent',
    'partInPercent',
  ],
  [MONITOR_TABLE]: [
    'name',
    'trendArrow',
    'currency',
    'lval',
    'monitorFontIcon',
    'chanceFontIcon',
    'sensitivityFontIcon',
    'relativePerformance',
    'kgv',
    'lastDividend',
    'dividenYield',
  ],
  [DEFAULT_TABLE]: [
    'name',
    'trendArrow',
    'quantity',
    'currency',
    'lval',
    'paidPrice',
    'actualPrice',
    'accountPercent',
    'accountPlusMinus',
  ],
};
export const TRADING_IDEAS_TABLE_HEADERS = {
  ['main']: [
    'name',
    'leadMan',
    'quantity',
    'currency',
    'lval',
    'paidAverage',
    'accountPercent',
    'partInPercent',
  ],
  ['buy']: ['name', 'date', 'quantity', 'accountPercent', 'price', 'comment'],
  ['sell']: ['name', 'date', 'quantity', 'account', 'price', 'comment'],
};

export const ACCOUNT_OVERVIEW_TABLE_HEADERS = {
  ['default']: ['date', 'instrumentTitle', 'amount', 'comment'],
};

export const TRANSACTIONS_VIEW_HEADERS = {
  ['buy']: [
    'name',
    'date',
    'quantity',
    'accountPercent',
    'price',
    'actualPrice',
    'fees',
    'comment',
  ],
  ['sell']: [
    'name',
    'date',
    'quantity',
    'account',
    'price',
    'actualPrice',
    'fees',
    'comment',
  ],
};
