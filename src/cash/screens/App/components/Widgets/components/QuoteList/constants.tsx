import {
  DEFAULT_TABLE,
  HIGHT_LOW_TABLE,
  HIGHT_LOW_VIEW,
  MONITOR_TABLE,
  MONITOR_VIEW,
  PERFORMANCE_TABLE,
  PERFORMANCE_VIEW,
  TRADER_TABLE,
  TRADER_VIEW,
  VOLUME_TABLE,
  VOLUME_VIEW,
} from '../../../../screens/MyCash/components/Table/constants';

export const DEFAULT_ITEMS_PER_PAGE = 18;

export const QUOTES_TABLE_HEADERS = {
  [VOLUME_TABLE]: [
    'mName',
    'lval',
    'lvalDatetime',
    'iNetVperprVPr',
    'vol',
    'offvol',
    'totvol',
    'pmAvVol',
    'tottur',
    'mCur',
  ],
  [HIGHT_LOW_TABLE]: [
    {
      mName: {
        additionalFields: ['trendArrow', 'mCur', 'market'],
      },
    },
    {
      lval: {
        additionalFields: ['lvalDatetime'],
      },
    },
    {
      iNetVperprVPr: {
        additionalFields: ['iNetVperprV'],
      },
    },
    {
      high: {
        additionalFields: ['highDate'],
      },
    },
    {
      low: {
        additionalFields: ['lowDate'],
      },
    },
    {
      hi52w: {
        additionalFields: ['hi52wDatetime'],
      },
    },
    {
      lo52w: {
        additionalFields: ['lo52wDatetime'],
      },
    },
  ],
  [TRADER_TABLE]: [
    'mName',
    'trendArrow',
    'lval',
    'iNetVperprVPr',
    'bidVolume',
    'bid',
    'ask',
    'askVolume',
    'high',
    'low',
    'lvalDatetime',
  ],
  [PERFORMANCE_TABLE]: [
    'mName',
    'trendArrow',
    'lval',
    'lvalDatetime',
    'iNetVperprVPr',
    'perfPercentage1w',
    'perfPercentage4w',
    'perfPercentage52w',
    'perfPercentageYTD',
    'perfPercentage3Y',
    'mCur',
  ],
  [MONITOR_TABLE]: [
    'mName',
    'trendArrow',
    'lval',
    'iNetVperprVPr',
    'monitorFontIcon',
    'chanceFontIcon',
    'sensitivityFontIcon',
    'relativePerformance',
    'kgv',
    'lastDividend',
    'dividenYield',
    'lvalDatetime',
  ],
  [DEFAULT_TABLE]: [
    {
      mName: {
        additionalFields: ['trendArrow', 'mCur', 'market'],
      },
    },
    {
      lval: {
        additionalFields: ['lvalDatetime'],
      },
    },
    {
      iNetVperprVPr: {
        additionalFields: ['iNetVperprV'],
      },
    },
    {
      high: {
        additionalFields: ['highDate'],
      },
    },
    {
      low: {
        additionalFields: ['lowDate'],
      },
    },
    'monitorFontIcon',
    {
      dayBefore: {
        additionalFields: ['dayBeforeDate'],
      },
    },
  ],
};

export const DROPDOWN_QUOTES = {
  Schweiz: [
    {
      key: 'smi-index',
      label: 'SMI Index',
      path: '/kurse/aktien/schweiz/smi-index',
      listingKeys: '998089-4-1',
      constituents: true,
    },
    {
      key: 'spi-index',
      label: 'SPI Index',
      path: '/kurse/aktien/schweiz/spi-index',
      listingKeys: '998750-4-1',
      constituents: true,
    },
    {
      key: 'sli-index',
      label: 'SLI Index',
      path: '/kurse/aktien/schweiz/sli-index',
      listingKeys: '3025288-4-1',
      constituents: true,
    },
  ],
  Europa: [
    {
      key: 'dax-index-frankfurt-fra',
      label: 'DAX',
      path: '/kurse/aktien/deutschland/dax-index-frankfurt-fra',
      listingKeys: '998032-830-814',
      constituents: true,
    },
    {
      key: 'mdax-aktien-fra',
      label: 'MDAX',
      path: '/kurse/aktien/deutschland/mdax-aktien-fra',
      listingKeys: '252367-830-814',
      constituents: true,
    },
    {
      key: 'sdax-aktien-fra',
      label: 'SDAX',
      path: '/kurse/aktien/deutschland/sdax-aktien-fra',
      listingKeys: '701259-830-814',
      constituents: true,
    },
    {
      key: 'euro-stoxx-50',
      label: 'EURO STOXX 50',
      path: '/kurse/aktien/europa/euro-stoxx-50',
      listingKeys: '846480-353-814',
      constituents: true,
    },
    {
      key: 'cac-40-index-stocks',
      label: 'CAC 40 Index Stocks',
      path: '/kurse/aktien/europa/cac-40-index-stocks',
      listingKeys: '998033-1594-814',
      constituents: true,
    },
  ],
  'USA und Kanada': [
    {
      key: 'toronto-sp-tsx-60-index',
      label: 'Toronto S&P/TSX 60 Index',
      path: '/kurse/aktien/usa-und-kanada/toronto-sp-tsx-60-index',
      listingKeys: '986675-1371-184',
      constituents: true,
    },
    {
      key: 'nasdaq-100',
      label: 'Nasdaq 100',
      path: '/kurse/aktien/usa-und-kanada/nasdaq-100',
      listingKeys: '985336-1135-333',
      constituents: true,
    },
    {
      key: 'djia',
      label: 'Kursliste und TTMzero estimate for DJIA',
      path: '/kurse/aktien/usa-und-kanada/djia',
      listingKeys: 'custom-list-djia', // we fetch custom listingKeys from FI-Box on graphql-service by using this key
      constituents: false,
    },
    {
      key: 'sp500',
      label: 'Kursliste und TTMzero estimate for S&P 500',
      path: '/kurse/aktien/usa-und-kanada/sp500',
      listingKeys: 'custom-list-sp500', // we fetch custom listingKeys from FI-Box on graphql-service by using this key
      itemsPerPage: 200,
      constituents: false,
      disableUpdate: true,
    },
  ],
  Australien: [
    {
      key: 'asx-50-index',
      label: 'ASX 50 Index',
      path: '/kurse/aktien/australien/asx-50-index',
      listingKeys: '998441-3941-88',
      constituents: true,
    },
    {
      key: 'asx-100-index',
      label: 'ASX 100 Index',
      path: '/kurse/aktien/australien/asx-100-index',
      listingKeys: '247579-3941-88',
      constituents: true,
    },
  ],
};

export const DROPDOWN_CURRENCIES = {
  Devisen: [
    {
      key: 'chf-spot-rates-wichtigste-waehrungen',
      label: 'CHF Spot Rates (Wichtigste Währungen)',
      path: '/kurse/waehrungen/devisen/chf-spot-rates-wichtigste-waehrungen',
      listingKeys:
        '897789-148-1,275000-148-1,499048-148-1,275003-148-1,275015-148-1,275001-148-1,506042-148-1,275018-148-1,275014-148-1,275013-148-1,506012-148-1,506026-148-1',
      constituents: false,
    },
    {
      key: 'chf-spot-rates',
      label: 'CHF Spot Rates',
      path: '/kurse/waehrungen/devisen/chf-spot-rates',
      listingKeys:
        '506027-149-1,2464933-149-1,2462011-149-1,2462048-149-1,2024197-149-1,2462019-149-1,1357881-149-1,499048-148-1,2463792-149-1,2464013-149-1,2462054-149-1,2462042-149-1,1406511-149-1,2462035-149-1,2463306-149-1,2024201-149-1,2462072-149-1,2462058-149-1,992459-149-1,2462026-149-1,2462062-149-1,2462067-149-1,275003-148-1,2463303-149-1,506040-149-1,2463311-149-1,2024214-149-1,2463329-149-1,928044-149-1,2463468-149-1,275015-148-1,2463378-149-1,2463421-149-1,897789-148-1,2463456-149-1,2463445-149-1,275001-148-1,2464017-149-1,2024217-149-1,2464129-149-1,2463548-149-1,2463539-149-1,2463563-149-1,506042-148-1,2463469-149-1,831287-149-1,2463463-149-1,1406482-149-1,1406524-149-1,2024268-149-1,992446-149-1,2463481-149-1,1406488-149-1,2463492-149-1,2457579-149-1,275018-148-1,275014-149-1,506012-148-1,2779999-149-1,275013-148-1,506044-148-1,275000-148-1,506026-148-1',
      constituents: false,
    },
    {
      key: 'eur-spot-rates',
      label: 'EUR Spot Rates',
      path: '/kurse/waehrungen/devisen/eur-spot-rates',
      listingKeys:
        '948648-148-105,946687-148-88,985174-148-161,946690-148-184,897789-148-1,976314-148-220,946831-148-898,946836-148-272,946837-148-36,976300-148-290,946684-148-402,946843-148-470,985189-148-977,946854-148-474,946859-148-356,976306-148-538,946686-148-534,976301-148-546,948634-148-248,976317-148-624,946862-148-484,946864-148-594,946867-148-662,946689-148-686,976313-148-748,946868-148-753,2138001-148-797,946869-148-860,948647-148-74,946692-148-864,946870-148-846,946874-148-904,976298-148-924,1991307-148-921,946681-148-333,946884-148-20',
      constituents: false,
    },
    {
      key: 'usd-spot-rates',
      label: 'USD Spot Rates',
      path: '/kurse/waehrungen/devisen/usd-spot-rates',
      listingKeys:
        '286317-148-155,275027-148-184,275000-148-1,275222-148-212,328762-148-898,275031-148-272,275146-148-36,275126-148-470,282915-148-474,274944-148-500,275136-149-519,275155-148-356,275023-148-534,275141-148-546,275220-148-248,28388-148-484,275130-148-594,275030-148-662,275153-148-748,282921-148-753,839420-148-860,275128-148-74,275029-148-864,275129-148-846,275154-148-904,1991420-148-921,275016-148-366,275127-148-20',
      constituents: false,
    },
    {
      key: 'gbp-spot-rates',
      label: 'GBP Spot Rates',
      path: '/kurse/waehrungen/devisen/gbp-spot-rates',
      listingKeys:
        '275209-149-105,275200-149-88,282945-149-155,275196-149-184,275001-148-1,282950-149-220,282958-149-230,328766-148-898,275191-149-272,328746-149-290,947552-148-814,275198-149-470,651833-149-977,282962-149-474,282964-149-500,282965-149-519,275195-149-534,275202-149-594,275192-149-662,275201-149-686,282982-149-746,283019-149-722,283020-149-748,199535-149-714,283028-149-753,839173-149-860,275193-149-864,275199-149-846,283029-149-904,651960-149-924,1991436-149-921,275017-148-333,328759-149-949,275197-149-20',
      constituents: false,
    },
    {
      key: 'eur-cross-rates',
      label: 'EUR Cross Rates',
      path: '/kurse/waehrungen/devisen/eur-cross-rates',
      listingKeys:
        '973406-149-814,969108-149-814,968876-149-814,969112-149-814,968879-149-814,968880-149-814,1938285-149-814,1406451-149-814,969114-149-814,968882-149-814,947552-149-814,968893-149-814,969141-149-814,968898-149-814,973408-149-814,1804340-149-814,969142-149-814,968927-149-814,968928-149-814,992470-149-814,969144-149-814,969147-149-814,968934-149-814,968976-149-814,968979-149-814,992472-149-814,969154-149-814',
      constituents: false,
    },
    {
      key: 'jpy-cross-rates',
      label: 'JPY Cross Rates',
      path: '/kurse/waehrungen/devisen/jpy-cross-rates',
      listingKeys:
        '1357876-149-534,275683-149-534,275681-149-534,275327-149-534,1406599-149-534,613164-149-534,275699-149-534,1406593-149-534,275195-149-534,329050-149-534,831263-149-534,329371-149-534,1802882-149-534,329612-149-534,1117543-149-534,329293-149-534,1357843-149-534,497980-149-534,329149-149-534,329798-149-534,1992418-149-534,1117799-149-534',
      constituents: false,
    },
    {
      key: 'gbp-cross-rates',
      label: 'GBP Cross Rates',
      path: '/kurse/waehrungen/devisen/gbp-cross-rates',
      listingKeys:
        '611261-149-402,275682-149-402,611266-149-402,275680-149-402,274248-149-402,1406454-149-402,275698-149-402,946684-149-402,1117694-149-402,831288-149-402,1802881-149-402,275322-149-402,1186261-149-402,1117714-149-402,1117493-149-402,1117838-149-402,851604-149-402,497930-149-402,1117762-149-402,1992388-149-402,275321-149-402,1117791-149-402',
      constituents: false,
    },
    {
      key: 'cad-cross-rates',
      label: 'CAD Cross Rates',
      path: '/kurse/waehrungen/devisen/cad-cross-rates',
      listingKeys:
        '275719-149-88,275306-149-272,968879-149-814,275680-149-402,1117451-149-470,275681-149-534,1117454-149-594,1117446-149-662,851590-149-860,1117448-149-864,1117457-149-846,275114-149-333,1992384-149-921,1117458-149-20,275722-149-184,275270-149-184,275739-149-184,275196-149-184,614662-149-184,275268-149-184,614718-149-184,1117466-149-184,497977-149-184,614855-149-184,1992386-149-184,1117476-149-184',
      constituents: false,
    },
  ],
  Banknoten: [
    {
      key: 'chf-banknoten',
      label: 'CHF BANKNOTEN',
      path: '/kurse/waehrungen/banknoten/chf-banknoten',
      listingKeys:
        '280697-179-1,280737-179-1,280755-179-1,985672-179-1,1353227-179-1,280674-179-1,985661-179-1,280917-179-1,280944-179-1,281007-179-1,1991425-179-1,281043-179-1,568548-179-1',
      constituents: false,
    },
  ],
};

export const DROPDOWN_RAW_MATERIAL = {
  Edelmetalle: [
    {
      key: 'uebersicht-edelmetalle',
      label: 'Übersicht Edelmetalle',
      path: '/kurse/rohstoffe-edelmetalle/edelmetalle/uebersicht-edelmetalle',
      listingKeys:
        '274701-176-1,986865-176-814,274704-176-333,274705-176-333,274702-176-333,275078-176-333,287634-176-1,986869-176-814,274689-176-333,287642-176-333,287657-176-1,986868-176-814,274690-176-333,287639-176-333,986867-176-814,274706-176-1,274720-176-333,274694-176-333',
      constituents: false,
    },
    {
      key: 'preise-pro-kilo-und-unze',
      label: 'Preis pro Kilogramm und Unze',
      path: '/kurse/rohstoffe-edelmetalle/edelmetalle/preise-pro-kilo-und-unze',
      listingKeys:
        '274701-178-1,274706-176-1,287657-176-1,287634-176-1,274702-148-333,274694-176-333,287639-176-333,287642-176-333',
      constituents: false,
    },
  ],
};

export const DROPDOWN_VIEW = {
  Ansicht: [
    {
      key: DEFAULT_TABLE,
      label: 'Standard Ansicht',
      action: DEFAULT_TABLE,
    },
    {
      key: MONITOR_TABLE,
      label: 'Monitor',
      action: MONITOR_VIEW,
    },
    {
      key: PERFORMANCE_TABLE,
      label: 'Performance',
      action: PERFORMANCE_VIEW,
    },
    {
      key: TRADER_TABLE,
      label: 'Trader',
      action: TRADER_VIEW,
    },
    {
      key: HIGHT_LOW_TABLE,
      label: 'Hoch/Tief',
      action: HIGHT_LOW_VIEW,
    },
    {
      key: VOLUME_TABLE,
      label: 'Volumen',
      action: VOLUME_VIEW,
    },
  ],
};
