export const STOCK_FULLQUOTE_SHORTHAND_PATH_PATTERN = /^aktien\/[^/]+-\d+$/;
export const STOCK_FULLQUOTE_SHORTHAND_VALOR_NAME_PATTERN = /^[^/]+-\d+$/;

export const isStockFullquoteShorthandValorName = (
  valorName?: string,
): boolean =>
  Boolean(
    valorName && STOCK_FULLQUOTE_SHORTHAND_VALOR_NAME_PATTERN.test(valorName),
  );

export const isStockFullquoteShorthandPath = (path?: string): boolean => {
  const normalizedPath = path?.replace(/^\/+|\/+$/g, '') || '';

  return STOCK_FULLQUOTE_SHORTHAND_PATH_PATTERN.test(normalizedPath);
};

export const getFullquotePath = ({
  pageType,
  valorName,
  market,
  currency,
}: {
  pageType?: string;
  valorName?: string;
  market?: string;
  currency?: string;
}): string =>
  `/${[pageType, valorName, market, currency].filter(Boolean).join('/')}`;

export const getResolvedLongFullquotePath = ({
  pageType,
  valorName,
  market,
  currency,
  fullquotePage,
}: {
  pageType?: string;
  valorName?: string;
  market?: string;
  currency?: string;
  fullquotePage?: { mMarket?: string | null; mCur?: string | null };
}): string => {
  const resolvedMarket = market || fullquotePage?.mMarket?.toLowerCase() || '';
  const resolvedCurrency = currency || fullquotePage?.mCur?.toLowerCase() || '';

  if (!pageType || !valorName || !resolvedMarket || !resolvedCurrency) {
    return '';
  }

  return getFullquotePath({
    pageType,
    valorName,
    market: resolvedMarket,
    currency: resolvedCurrency,
  });
};
