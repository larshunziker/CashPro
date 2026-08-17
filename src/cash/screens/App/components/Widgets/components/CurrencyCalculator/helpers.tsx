import { listingKeysMapping } from './constants';

/* @ts-ignore TODO: TS7006 ->  Parameter 'date' implicitly has an 'any' type. */
export const convertDateToIsoString = (date) => {
  return date.toISOString().split('T')[0];
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
export const getPickedDateRange = (value) => {
  const selectedDate = new Date(value?.date).valueOf();
  const currentTimeStamp = Date.now();
  const difference = currentTimeStamp - selectedDate;

  const oneWeek = 604800000;
  const oneMonth = 2629746000;
  const threeMonths = 3 * oneMonth;
  const sixMonths = 6 * oneMonth;
  const oneYear = 12 * oneMonth;
  const threeYears = 3 * oneYear;
  const fiveYears = 5 * oneYear;
  const tenYears = 10 * oneYear;
  let pickedDateRange = null;

  if (difference <= oneWeek) {
    pickedDateRange = 'oneWeek';
  } else if (difference > oneWeek && difference <= oneMonth) {
    pickedDateRange = 'oneMonth';
  } else if (difference > oneMonth && difference <= threeMonths) {
    pickedDateRange = 'threeMonths';
  } else if (difference > threeMonths && difference <= sixMonths) {
    pickedDateRange = 'sixMonths';
  } else if (difference > sixMonths && difference <= oneYear) {
    pickedDateRange = 'oneYear';
  } else if (difference > oneYear && difference <= threeYears) {
    pickedDateRange = 'threeYears';
  } else if (difference > threeYears && difference <= fiveYears) {
    pickedDateRange = 'fiveYears';
  } else if (difference > fiveYears && difference <= tenYears) {
    pickedDateRange = 'analyse';
  }

  return pickedDateRange;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'identifier' implicitly has an 'any' type. */
export const getCurrentListingKey = (identifier) => {
  let currentListingKey = '';

  Object.entries(listingKeysMapping).find((item) => {
    if (item[1] === identifier) {
      currentListingKey = item[0];
    }
  });

  return currentListingKey;
};
