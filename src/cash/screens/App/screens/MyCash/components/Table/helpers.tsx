import { ExtendedInstrument } from './components/TableRow/typings';

const sortString = (a: string, b: string, direction: 'asc' | 'desc') => {
  a = a ? a.toLowerCase() : '';
  b = b ? b.toLowerCase() : '';
  if (direction === 'asc') {
    return a > b ? 1 : -1;
  }
  return a < b ? 1 : -1;
};

const sortNumber = (a: number, b: number, direction: 'asc' | 'desc') => {
  return direction === 'asc' ? a - b : b - a;
};

const convertToNumber = (str: string): number => {
  if (typeof str === 'number') {
    return str;
  }

  if (!str) {
    return 0;
  }
  const cleanString = str.replace('%', '');
  const n = +cleanString;
  return isNaN(n) ? 0 : n;
};

const findColumnType = (fields: string[]): 'string' | 'number' => {
  let str = 0;
  let num = 0;
  fields.forEach((field) => {
    !isNaN(+field) ? num++ : str++;
  });
  return num > str ? 'number' : 'string';
};

const filterInstrumentKey = (data: any) =>
  data.filter((instrument: Instrument) => !!instrument?.instrumentKey);

export const sort = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
  instrument,
  by: 'instrumentKey' | 'name' | 'mName' | 'date',
  direction = 'asc',
  customOrder = [],
) => {
  if (instrument?.length <= 0) {
    return filterInstrumentKey(instrument);
  }
  if (by === 'instrumentKey' && customOrder === null) {
    return filterInstrumentKey(instrument);
  }

  switch (by) {
    case 'instrumentKey':
      /* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
      return filterInstrumentKey(instrument).sort((a, b) => {
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'any' is not assignable to parameter of type 'never'. */
        const aIndex = customOrder.indexOf(a.instrumentKey);
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'any' is not assignable to parameter of type 'never'. */
        const bIndex = customOrder.indexOf(b.instrumentKey);
        if (aIndex === -1 && bIndex === -1) {
          return 0;
        }
        if (aIndex === -1) {
          return 1;
        }
        if (bIndex === -1) {
          return -1;
        }
        return aIndex - bIndex;
      });
    case 'name':
      /* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
      return instrument?.sort((a, b) => {
        if (a?.name < b?.name) {
          return direction === 'desc' ? 1 : -1;
        }
        if (a?.name > b?.name) {
          return direction === 'desc' ? -1 : 1;
        }
        return 0;
      });
    case 'mName':
      /* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
      return instrument?.sort((a, b) => {
        if (a?.mName < b?.mName) {
          return direction === 'desc' ? 1 : -1;
        }
        if (a?.mName > b?.mName) {
          return direction === 'desc' ? -1 : 1;
        }
        return 0;
      });
    case 'date':
      /* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
      return instrument.sort((a, b) => {
        if (a?.date < b?.date) {
          return direction === 'desc' ? 1 : -1;
        }
        if (a?.date > b?.date) {
          return direction === 'desc' ? -1 : 1;
        }
        return 0;
      });
  }
  return instrument;
};

// use generic type here to be able to use this sort function for Portfolio, Watchlist and Alerts
export const sortTableItems = <Type extends ExtendedInstrument>(
  items: Type[],
  column: string,
  direction: 'asc' | 'desc',
): Type[] => {
  if (!items || items.length <= 0) {
    return items;
  }
  const columnType = findColumnType(
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ExtendedInstrumen */
    items?.map((instrument) => instrument[column]),
  );

  if (column === 'trendArrow') {
    column = 'iNetVperprVPr';
  }

  return [...items].sort((a, b) => {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ExtendedInstrumen */
    let field1 = a[column];
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ExtendedInstrumen */
    let field2 = b[column];
    if (columnType === 'number') {
      field1 = convertToNumber(field1);
      field2 = convertToNumber(field2);
      return sortNumber(field1, field2, direction);
    }
    return sortString(field1, field2, direction);
  });
};
