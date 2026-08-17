// Table types
export const DEFAULT_TABLE = 'default-table';
export const LIMIT_TABLE = 'limit-table';
export const MONITOR_TABLE = 'monitor-table';
export const ORIGINAL_CURRENCY_TABLE = 'original-currency-table';
export const PERFORMANCE_TABLE = 'performance-table';
export const SPECIAL_INFO_TABLE = 'special-info-table';
export const CUSTOM_VIEW_TABLE = 'custom-view-table';
export const TRADER_TABLE = 'trader-table';
export const HIGHT_LOW_TABLE = 'hight-low-table';
export const VOLUME_TABLE = 'volume-table';
export const CHART_COMPARISON_TABLE = 'chart-comparison-table';

// View types
export const DEFAULT_VIEW = 'default';
export const LIMIT_VIEW = 'limit';
export const MONITOR_VIEW = 'monitor';
export const ORIGINAL_CURRENCY_VIEW = 'original-currency';
export const PERFORMANCE_VIEW = 'performance';
export const SPECIAL_INFO_VIEW = 'special-info';
export const CUSTOM_VIEW = 'eigene-ansicht';
export const CUSTOM_ORDER = 'eigene-reihenfolge';
export const TRADER_VIEW = 'trader';
export const HIGHT_LOW_VIEW = 'hoch-tief';
export const VOLUME_VIEW = 'volumen';
export const CHART_COMPARISON_VIEW = 'chart-comparison';

// Group types
export const NO_GROUPING = '';
export const PAPER_VALUES_GROUPING = 'paper-values';
export const MARKET_GROUPING = 'market';
export const CURRENCY_GROUPING = 'currency';

export const nonTradableTypes = ['IND', 'CUR', 'INT'];

export const MONITOR_ICON = 'monitorIcon';
export const CHANCE_ICON = 'chanceIcon';
export const SENSITIVITY_ICON = 'sensitivityIcon';

// Other
export const TOTALS_ROW_IDENTIFIER = 'totals-row-identifier';
export const OTHER_ASSETS_TITLE = 'Other Assets';

export const PAPER_VALUES_GROUPING_MAPPING = {
  EQU: 'Aktien',
  ETF: 'Fonds',
  FON: 'Fonds',
  TFO: 'Fonds',
  BON: 'Bonds',
  DER: 'Derivate inkl. Wikifolios',
  FUT: 'Derivate inkl. Wikifolios',
  FOP: 'Derivate inkl. Wikifolios',
  OPT: 'Derivate inkl. Wikifolios',
  CCR: 'Kryptowährungen',
  IND: 'Indizes',
  COM: 'Commodities',
  CUR: 'Währungen',
  LIQ: 'LIQ',
};
