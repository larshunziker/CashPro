import { formatDate } from '../../../../../shared/helpers/dateTimeElapsed';
import { replaceAll } from '../../../../../shared/helpers/replaceAll';
import { BreadcrumbsItems } from '../../../../../common/components/Breadcrumbs/typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'obj' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'title' implicitly has an 'any' type. */
export const replaceValues = (obj, title, valorName = '') => {
  if (!obj) {
    return null;
  }
  const regex = /\[title\]|\[valorName\]/gi;
  const newObj = JSON.stringify(obj).replace(regex, title);
  const newObj2 = newObj.replace(regex, valorName);
  return JSON.parse(newObj2);
};

type InsertWidgetUrlParamsData = {
  mSymb?: string;
  mIsin?: string;
  mMarketId?: number | string;
  mCurrencyId?: number | string;
  listingId?: string;
  compfullname?: string;
  mCur?: string;
  mMarket?: string;
  mMarketDescription?: string;
  mName?: string;
  scGrouped?: string;
  sec?: string;
  secId?: string;
  subtitle?: string;
  tradeType?: string;
  hrefBuy?: string;
  currencyTradingbasedShort?: string;
};

const getDatesFromTokens = (body: string, replacements: string) => {
  const date = new Date();

  const dateTokens = body.match(/{(Date:.*?)}/) || [];
  return [...dateTokens].reduce((acc, value) => {
    const dateFormat = value
      .replace('Date:', '')
      .replace(replacements.slice(0, 1), '')
      .replace(replacements.slice(1), '');
    const key = value
      .replace(replacements.slice(0, 1), '')
      .replace(replacements.slice(1), '');
    acc = {
      ...acc,
      [key]: formatDate(date, dateFormat),
    };
    return acc;
  }, {});
};

const enrichBodyWithWidgetParams = ({
  body,
  data,
  replacements = '[]',
}: {
  body: string;
  data: InsertWidgetUrlParamsData & {
    valorName: string;
    market: string;
    currency: string;
    pageType?: string;
  };
  replacements?: string;
}): string => {
  const {
    mIsin,
    mSymb,
    mCurrencyId,
    mMarketId,
    listingId,
    compfullname,
    mCur,
    mMarket,
    mMarketDescription,
    mName,
    scGrouped,
    sec,
    secId,
    valorName,
    market,
    currency,
    pageType,
    subtitle,
    tradeType,
    hrefBuy,
    currencyTradingbasedShort,
  } = data;
  if (!valorName && !market && !currency) {
    return body;
  }

  const widgetParams = `${valorName}/${market}/${currency}`;
  const valorNameList = (valorName && valorName.split('-')) || [];
  const valorNr = valorNameList[valorNameList.length - 1] || '';
  const mIsinParam = mIsin ? `/${mIsin}` : '';
  const dates = getDatesFromTokens(body, replacements);

  Object.entries({
    pageType,
    widgetParams,
    valorName,
    valorNr,
    mMarketId,
    mCurrencyId,
    mSymb,
    mIsin,
    mIsinParam,
    listingId,
    compfullname,
    mCur,
    mMarket,
    mMarketDescription,
    mName,
    scGrouped,
    sec,
    secId,
    subtitle,
    tradeType,
    hrefBuy,
    currencyTradingbasedShort,
    ...dates,
  }).forEach(([key, value]) => {
    value = String(value || '').replace(/"/g, '\\"');
    body = replaceAll(
      body,
      replacements.slice(0, 1) + key + replacements.slice(1),
      String(value),
    );
  });

  return body;
};

export const enrichBody = ({
  body,
  data,
  replacements = '[]',
}: {
  body: any;
  data: InsertWidgetUrlParamsData & {
    valorName: string;
    market: string;
    currency: string;
    pageType?: string;
  };
  replacements?: string;
}) => {
  if (!body) {
    return body;
  }
  // do deep copy of items to get ride of mutations
  const bodyCopy = JSON.stringify(body);
  const enrichedBody = enrichBodyWithWidgetParams({
    body: bodyCopy,
    data,
    replacements,
  });

  const processedBody = replaceAll(enrichedBody, String.raw`\S`, '/S');

  try {
    return JSON.parse(processedBody);
  } catch (e) {
    // If JSON parsing fails, return the original body
    return body;
  }
};

export const breadcrumbItems = (
  fullquotePage: FullquotePage,
): BreadcrumbsItems & { count: number; totalCount: number } => {
  let link = '';
  let label = '';

  switch (fullquotePage?.canonicalUrl?.split('/')[0]) {
    case 'fonds':
      link = '/fonds';
      label = 'Fonds';
      break;
    case 'etf':
      link = '/etf';
      label = 'Fonds';
      break;
    case 'kryptowaehrungen':
      link = '/kryptowaehrungen';
      label = 'Kryptowaehrungen';
      break;
    case 'rohstoffe-edelmetalle':
      link = '/rohstoffe-edelmetalle';
      label = 'Rohstoffe & Edelmetalle';
      break;
    case 'devisen-zinsen':
      link = '/devisen-zinsen';
      label = 'Devisen & Zinsen';
      break;
    case 'derivate':
    case 'neuemissionen':
      link = '/derivate';
      label = 'Derivate';
      break;
    case 'wikifolio':
      link = '/aktien/wikifolio';
      label = 'Wikifolios';
      break;
    default:
      link = '/boerse';
      label = 'Börse & Märkte';
      break;
  }

  return {
    count: 2,
    totalCount: 2,
    edges: [
      {
        node: {
          id: '',
          link: link,
          label: label,
        },
      },
      {
        node: {
          id: '',
          link: null,
          label: fullquotePage?.title,
        },
      },
    ],
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
export const getFullquoteHelmetNode = (mapProps) => {
  const routeByPathObject = (mapProps.data?.environment?.routeByPathSubPage
    ?.object ||
    mapProps.data?.environment?.routeByPath?.object ||
    null) as LandingPage;
  const getFullquotePage = mapProps.data?.getFullquotePage;

  // Return node with empty metaLinks to prevent canonical tag generation on 404 pages
  if (!routeByPathObject || !getFullquotePage) {
    return { metaLinks: [] };
  }

  let replacedRouteByPathObject = replaceValues(
    routeByPathObject,
    getFullquotePage?.title || '',
    mapProps.valorName || '',
  );
  const resolvedMarket =
    mapProps?.market || getFullquotePage?.mMarket?.toLowerCase() || '';
  const resolvedCurrency =
    mapProps?.currency || getFullquotePage?.mCur?.toLowerCase() || '';
  replacedRouteByPathObject = enrichBody({
    body: routeByPathObject,
    data: {
      ...getFullquotePage,
      valorName: mapProps?.valorName,
      currency: resolvedCurrency,
      market: resolvedMarket,
      pageType: mapProps?.location?.href
        .split(`/${mapProps?.valorName}`)?.[0]
        .slice(1),
    },
    replacements: '{}',
  });

  const metaCanonicalUrl = getFullquotePage?.canonicalUrl
    ? `${global.locationOrigin}/${getFullquotePage.canonicalUrl}`
    : null;

  return {
    ...replacedRouteByPathObject,
    ...(metaCanonicalUrl && {
      metaCanonicalUrl,
      metaLinks: [
        {
          rel: 'canonical',
          href: metaCanonicalUrl,
        },
      ],
    }),
  };
};
