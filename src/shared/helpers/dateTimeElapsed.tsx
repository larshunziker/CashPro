/**
 * @file   elapsed time
 * @author Grégory Witmer <gregory.witmer@ringieraxelspringer.ch>
 * @author Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date   2019-09-17
 *
 */

export const DATE_FORMAT_DEFAULT = 'dd.MM.yyyy';
export const DATE_FORMAT_SHORT = 'dd.MM.yy';
export const DATE_FORMAT_YEAR = 'yyyy';
export const DATE_FORMAT_FULL = 'dd.MM.yyyy - HH:ii';
export const DATE_FORMAT_WITH_TIME_FULL = 'dd.MM.yyyy - HH:ii:ss';
export const DATE_FORMAT_MONTH_YEAR = 'MM.yyyy';
export const DATE_FORMAT_MONTHNAME = 'dd. Month YYYY';
export const DATE_FORMAT_MONTHNAME_FULL = 'dd. Month YYYY - HH:ii';
export const DATE_FORMAT_SIMPLYBOOK = 'YYYY-MM-dd';
export const DATE_FORMAT_FULL_TIME = 'HH:mm:ss';
export const DATE_FORMAT_TIME = 'HH:MM';
export const TIME_ELAPSED_UNIT_MINUTES = 'minutes';
export const TIME_ELAPSED_UNIT_HOURS = 'hours';
export const TIME_ELAPSED_UNIT_DAYS = 'days';
export const TIME_ELAPSED_UNIT_WEEKS = 'weeks';
export const TIME_ELAPSED_UNIT_MONTHS = 'months';
export const TIME_ELAPSED_UNIT_YEARS = 'years';
export const TIME_ELAPSED_UNIT_DATE = 'date';
export const TIME_ELAPSED_UNIT_ERROR = 'error';

export const TIME_ELAPSED_FORMAT_LONG = 'time-elapsed/format-long';
export const TIME_ELAPSED_FORMAT_DATE_WITH_TIME =
  'time-elapsed/format-date-with-time';
export const TIME_ELAPSED_FORMAT_MONTHNAME_FULL =
  'time-elapsed/format--montname-full';
export const TIME_ELAPSED_FORMAT_FULL = 'time-elapsed/format-full';
export const TIME_ELAPSED_FORMAT_SHORT = 'time-elapsed/format-short';
export const TIME_ELAPSED_FORMAT_COMPACT = 'time-elapsed/format-compact';
export const TIME_ELAPSED_FORMAT_UP_TO_YEARS =
  'time-elapsed/format-up-to-years';

export const DEFAULT_LANGUAGE = 'DE';

export const TIME_ELAPSED_UNIT_LANGUAGE_MAP = {
  DE: {
    [TIME_ELAPSED_UNIT_MINUTES]: { value: 'Minute', plural: 'n' },
    [TIME_ELAPSED_UNIT_HOURS]: { value: 'Stunde', plural: 'n' },
    [TIME_ELAPSED_UNIT_DAYS]: { value: 'Tag', plural: 'en' },
    [TIME_ELAPSED_UNIT_WEEKS]: { value: 'Woche', plural: 'n' },
    [TIME_ELAPSED_UNIT_MONTHS]: { value: 'Monat', plural: 'en' },
    [TIME_ELAPSED_UNIT_YEARS]: { value: 'Jahr', plural: 'en' },
    [TIME_ELAPSED_UNIT_DATE]: { value: 'Jahr', plural: '' },
  },
  FR: {
    [TIME_ELAPSED_UNIT_MINUTES]: { value: 'minute', plural: 's' },
    [TIME_ELAPSED_UNIT_HOURS]: { value: 'heure', plural: 's' },
    [TIME_ELAPSED_UNIT_DAYS]: { value: 'jour', plural: 's' },
    [TIME_ELAPSED_UNIT_WEEKS]: { value: 'semaine', plural: 's' },
    [TIME_ELAPSED_UNIT_MONTHS]: { value: 'mois', plural: '' },
    [TIME_ELAPSED_UNIT_YEARS]: { value: 'an', plural: 's' },
    [TIME_ELAPSED_UNIT_DATE]: { value: 'an', plural: '' },
  },
};

const ELAPSED_TIME_PREFIX = {
  DE: {
    timeAgoText: 'vor',
    publishedSinceText: 'Publiziert vor',
    publishedOnText: 'Publiziert am',
  },
  FR: {
    timeAgoText: 'Publié il y a',
    publishedSinceText: 'Publié il y a',
    publishedOnText: 'Publié le',
  },
};

const elapsedTimeSufix = {
  DE: {
    time: ' Uhr',
  },
  FR: {
    time: '',
  },
};

const monthNames = {
  DE: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  FR: [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ],
};

export const daysOfWeekNames = {
  DE: [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ],
};

export const getDateWithWeekdayName = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'date' implicitly has an 'any' type. */
  date,
  format = DATE_FORMAT_DEFAULT,
  language = DEFAULT_LANGUAGE,
}) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
  return `${daysOfWeekNames[language][d.getDay()]}, ${formatDate(
    date,
    format,
  )}`;
};

// check if given Date is the same day as today
/* @ts-ignore TODO: TS7006 ->  Parameter 'changeDate' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'currentTimeStamp' implicitly has an 'any' type. */
export const checkIfSameDay = (changeDate, currentTimeStamp) => {
  const dayToCheck = new Date(changeDate).setHours(0, 0, 0, 0);
  const today = new Date(currentTimeStamp).setHours(0, 0, 0, 0);

  return today === dayToCheck;
};

// check if given Date is in the future
/* @ts-ignore TODO: TS7006 ->  Parameter 'date' implicitly has an 'any' type. */
const isFutureDate = (date) => {
  const currentTimeStamp =
    (!__TESTING__ && new Date().getTime()) ||
    new Date('2022-09-27T08:00:00').getTime();

  const dateTimestamp = new Date(date).getTime();
  return dateTimestamp > currentTimeStamp;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'date' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'maxHours' implicitly has an 'any' type. */
export const isDateInRange = (date, maxHours) => {
  const currentTimeStamp =
    (!__TESTING__ && new Date().getTime()) ||
    new Date('2022-09-27T15:00:00').getTime();
  const dateTimestamp = new Date(date).getTime();

  const dateInFuture = isFutureDate(date);

  if (dateInFuture) {
    return false;
  }

  // The subtraction returns the difference between the two dates in milliseconds.
  // 36e5 is the scientific notation for 60*60*1000, dividing by which converts
  // the milliseconds difference into hours.
  const hoursDiffer = Math.round(
    Math.abs(dateTimestamp - currentTimeStamp) / 36e5,
  );

  // we need to check if the changeDate was today. Otherwise it can be confusing
  // to show "aktualisiert um: 23:00" if it's already the next day
  const isSameDay = checkIfSameDay(new Date(date).getTime(), currentTimeStamp);

  return hoursDiffer < maxHours && isSameDay;
};

/**
 * get formatted elapsed date
 *
 * @desc  returns article change date or create date as formatted string
 *        following the default schema with elapsed time
 * @returns {Element<any>|null}
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
export const getFormattedElapsedDate = (props): string | null => {
  switch (props.format) {
    case TIME_ELAPSED_FORMAT_DATE_WITH_TIME:
      return getFormattedElapsedDateLong(props);
    case TIME_ELAPSED_FORMAT_LONG:
      return getFormattedElapsedDateLong(props);
    case TIME_ELAPSED_FORMAT_FULL:
      props.dateFormat = DATE_FORMAT_FULL;
      return getFormattedElapsedDateLong(props);
    case TIME_ELAPSED_FORMAT_MONTHNAME_FULL:
      props.dateFormat = DATE_FORMAT_MONTHNAME_FULL;
      return getFormattedElapsedDateLong(props);
    case TIME_ELAPSED_FORMAT_UP_TO_YEARS:
      return getFormattedElapsedTimeUpToYears(props);
    case TIME_ELAPSED_FORMAT_SHORT:
      return getFormattedElapsedDateShort(props);
    default:
      return getFormattedElapsedDateCompact(props);
  }
};

export type DateValue = {
  format?: string;
  value?: string;
  createDate?: string;
  changeDate?: string;
};

export type TimeUnitValue = {
  unit?: string;
  value?: string | number;
};

/**
 * render our custom date or date-time string
 *
 * - Renders a prefix-text that was passed in (like 'am')
 * - Renders a formatted date in format DD.MM.YYYY (customizable with props)
 * - Renders the postfix-text ', aktualisiert ' if date and time are given
 * - Renders the  if only time is given
 * - Renders the postfix-text 'vor', the elapsed time value,
 *    the text 'Stunde' OR 'Minute' as well as a trailing 'n' (for plural) if appropriate
 */
const getDateTimeWithConfig = ({
  date = {},
  prefix = '',
  postfix = 'aktualisiert um',
  maxHours,
  language = DEFAULT_LANGUAGE,
  showModificationDate = false,
}: {
  date: DateValue;
  prefix: string;
  postfix: string;
  maxHours: number;
  language: string;
  showModificationDate: boolean;
}) => {
  /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
  const createDateTimestamp = new Date(date.createDate).getTime();
  /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
  const changeDateTimestamp = new Date(date.changeDate).getTime();

  const changeDateInFuture = isFutureDate(date.changeDate);

  const shouldDisplayChangeDate =
    showModificationDate &&
    date.changeDate &&
    changeDateTimestamp > createDateTimestamp &&
    !changeDateInFuture;

  const isChangeDateInRangeOfMaxHours =
    (showModificationDate && isDateInRange(date.changeDate, maxHours)) || false;

  const newDate =
    date.value ||
    (shouldDisplayChangeDate && date.changeDate) ||
    date.createDate;

  const time =
    formatDate(
      (shouldDisplayChangeDate && date.changeDate) || date.createDate,
      DATE_FORMAT_TIME,
      DEFAULT_LANGUAGE,
      '',
      false,
    ) || '';

  const dateString =
    ((newDate && prefix && prefix.trimEnd() + ' ') || '') +
      ((newDate &&
        !isChangeDateInRangeOfMaxHours &&
        `${formatDate(
          newDate,
          date.format,
          language,
          '\u00a0\u00a0\u00a0',
          false,
        ).trimEnd()}`) ||
        '') ||
    (time && postfix && `${postfix} ${time || ''}`) ||
    '';
  return dateString;
};

const getDateWithConfig = ({
  date = { value: undefined, format: undefined },
  time = { value: undefined },
  prefix = '',
  postfix = ', aktualisiert vor',
  language = DEFAULT_LANGUAGE,
}: {
  date?: DateValue;
  time?: TimeUnitValue;
  prefix?: string;
  postfix?: string;
  language?: string;
}) => {
  if (!date.value && !time.value) {
    return null;
  }

  const prefixText = (date.value && prefix && prefix.trimEnd() + ' ') || '';
  const formattedDate =
    (date.value && formatDate(date.value, date.format, language)) || '';
  const postfixText = (date.value && time.value && postfix) || '';
  const elapsedTimePrefix =
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
    (!date.value && time.value && ELAPSED_TIME_PREFIX[language].timeAgoText) ||
    '';
  const elapsedTime =
    (time.value && ` ${time.value} ${getTimeUnit(time, language)}`) || '';
  const dateString =
    prefixText +
    formattedDate.trimEnd() +
    postfixText +
    elapsedTimePrefix +
    elapsedTime;

  return dateString.trimEnd();
};

/**
 * get formatted elapsed date long
 *
 * @desc    Return elapsed date with create date and change date.
 *          Formats:
 *          - DD.MM.YYYY (optional hh:mm)
 *          - am DD.MM.YYYY
 *          - vor X Minute(n)/Stunde(n)
 *          - DD.MM.YYYY, aktualisiert vor X Minute(n)/Stunde(n)
 *          Ruleset:
 *          - changeDate given and < 24h: "[createDate (DD.MM.YYYY)], aktualisiert vor vor X Minute(n)/Stunde(n) [changeDate]"
 *          - No changeDate given and createDate < 24h: "vor [createDate]"
 *          - Default: "DD.MM.YYYY" (optional hh:mm)
 * @returns {Element<any>|null}
 */
const getFormattedElapsedDateLong = ({
  createDate = '',
  changeDate = '',
  dateFormat = '',
  format,
  prefix = '',
  postfix,
  showModificationDate,
  maxHours,
  language = DEFAULT_LANGUAGE,
}: {
  createDate?: string;
  changeDate?: string;
  dateFormat?: string;
  format: string;
  prefix?: string;
  postfix: string;
  showModificationDate: boolean;
  maxHours: number;
  language?: string;
}) => {
  if (createDate === '' && changeDate === '') {
    return '';
  }

  if (format === TIME_ELAPSED_FORMAT_DATE_WITH_TIME) {
    return getDateTimeWithConfig({
      prefix,
      postfix,
      maxHours,
      date: {
        createDate,
        changeDate,
        format: DATE_FORMAT_FULL,
      },
      language,
      showModificationDate,
    });
  } else {
    const timeElapsedCreateDate = timeElapsedWithConfig({
      dateString: createDate,
      maxHours,
    });

    const timeElapsedChangeDate = timeElapsedWithConfig({
      dateString: changeDate,
      maxHours,
    });

    if (
      timeElapsedChangeDate.unit === TIME_ELAPSED_UNIT_HOURS ||
      timeElapsedChangeDate.unit === TIME_ELAPSED_UNIT_MINUTES
    ) {
      return getDateWithConfig({
        prefix,
        postfix,
        date: {
          value: createDate,
          format: dateFormat,
        },
        time: timeElapsedChangeDate,
        language,
      });
    }

    if (
      timeElapsedCreateDate.unit === TIME_ELAPSED_UNIT_ERROR &&
      timeElapsedChangeDate.unit === TIME_ELAPSED_UNIT_ERROR
    ) {
      return null;
    }

    if (
      timeElapsedCreateDate.unit === TIME_ELAPSED_UNIT_HOURS ||
      timeElapsedCreateDate.unit === TIME_ELAPSED_UNIT_MINUTES
    ) {
      return getDateWithConfig({
        prefix,
        time: timeElapsedCreateDate,
        language,
      });
    }

    return getDateWithConfig({
      prefix,
      date: {
        value: createDate || changeDate,
        format: dateFormat,
      },
      language,
    });
  }
};

const getFormattedElapsedDateShort = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'createDate' implicitly has an 'any' type. */
  createDate,
  language = DEFAULT_LANGUAGE,
}) => formatDate(createDate, DATE_FORMAT_MONTH_YEAR, language);

/**
 * get formatted elapsed date compact
 *
 * @desc    Return elapsed date just for changeDate
 *          Formats:
 *          - vor X Minute(n)/Stunde(n)
 *          - am DD.MM.YYYY
 *          Ruleset:
 *          - changeDate given and < 24h: vor X Minute(n)/Stunde(n) [changeDate]
 *          - default: am DD.MM.YYYY [changeDate or createDate]
 * @returns {Element<any>|null}
 */
const getFormattedElapsedDateCompact = ({
  changeDate = '',
  createDate = '',
  dateFormat = '',
  prefix = 'am',
}) => {
  const timeElapsedChangeDate = timeElapsedWithConfig({
    dateString: changeDate,
  });

  if (
    timeElapsedChangeDate.unit === TIME_ELAPSED_UNIT_HOURS ||
    timeElapsedChangeDate.unit === TIME_ELAPSED_UNIT_MINUTES
  ) {
    return getDateWithConfig({
      time: timeElapsedChangeDate,
    });
  }

  if (!changeDate && !createDate) {
    return null;
  }

  return getDateWithConfig({
    prefix,
    date: {
      value: changeDate || createDate,
      format: dateFormat,
    },
  });
};

/**
 * get formatted Elapsed time in unit up to years string
 *
 * @desc    return Elapsed date just for changed date
 * @returns {string | null}
 */

export const getFormattedElapsedTimeUpToYears = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'createDate' implicitly has an 'any' type. */
  createDate,
  language = DEFAULT_LANGUAGE,
  prefix = 'am',
}) => {
  if (!createDate) {
    return '';
  }

  const timeElapsedPublicationDate = timeElapsedWithConfig({
    dateString: createDate,
  });

  if (timeElapsedPublicationDate.unit === TIME_ELAPSED_UNIT_DATE) {
    return `${prefix} ${formatDate(createDate, language)}`;
  }

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  if (timeElapsedPublicationDate.unit <= TIME_ELAPSED_UNIT_YEARS) {
    return getDateWithConfig({
      time: timeElapsedPublicationDate,
    });
  }

  return `${prefix} ${formatDate(createDate, language)}`;
};

// "2-digits" seems to be buggy on chrome (eventhough it should work if you believe the docs).
// https://stackoverflow.com/a/60584726
/* @ts-ignore TODO: TS7006 ->  Parameter 'val' implicitly has an 'any' type. */
const ensureTwoDigits = (val) => {
  return val.length !== 2 ? `0${val}` : val;
};

export const formatDate = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'date' implicitly has an 'any' type. */
  date,
  format = DATE_FORMAT_DEFAULT,
  language = DEFAULT_LANGUAGE,
  separator = ' - ',
  showElapsedTimeSuffix = true,
): string => {
  if (!date || date === 'NaN') {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    return null;
  }

  const d = new Date(date);
  const day = new Intl.DateTimeFormat('de-CH', { day: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat('de-CH', { month: '2-digit' }).format(
    d,
  );
  const year = new Intl.DateTimeFormat('de-CH', { year: 'numeric' }).format(d);
  // Intl formater get us 16 Uhr thats why we split
  const hour = new Intl.DateTimeFormat('de-CH', {
    hour: '2-digit',
  })
    .format(d)
    .split(' ')[0];
  const minute = new Intl.DateTimeFormat('de-CH', { minute: '2-digit' }).format(
    d,
  );
  const seconds = new Intl.DateTimeFormat('de-CH', {
    second: '2-digit',
  }).format(d);
  switch (format) {
    case DATE_FORMAT_FULL:
      return `${
        (day.length < 2 && '0') || ''
      }${day}.${month}.${year}${separator}${hour}:${
        (minute.length < 2 && '0') || ''
      }${minute}${
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
        (showElapsedTimeSuffix && elapsedTimeSufix[language].time) || ''
      } `;
    case DATE_FORMAT_WITH_TIME_FULL:
      return `${
        (day.length < 2 && '0') || ''
      }${day}.${month}.${year}${separator}${
        (hour.length < 2 && '0') || ''
      }${hour}:${(minute.length < 2 && '0') || ''}${minute}:${
        (seconds.length < 2 && '0') || ''
      }${seconds}`;
    case DATE_FORMAT_MONTHNAME:
      return `${day}${language === DEFAULT_LANGUAGE ? '.' : ''} ${
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
        monthNames[language][d.getMonth()]
      } ${year}`;
    case DATE_FORMAT_MONTHNAME_FULL:
      return `${day}${language === DEFAULT_LANGUAGE ? '.' : ''} ${
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
        monthNames[language][parseInt(month) - 1]
      } ${year} - ${hour}:${(minute.length < 2 && '0') || ''}${minute}${
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
        elapsedTimeSufix[language].time
      }`;
    case DATE_FORMAT_MONTH_YEAR:
      return `${month}.${year}`;
    case DATE_FORMAT_TIME:
      return `${ensureTwoDigits(hour)}:${ensureTwoDigits(minute)}`;
    case DATE_FORMAT_SIMPLYBOOK:
      return `${year}-${month}-${(day.length < 2 && '0') || ''}${day}`;
    case DATE_FORMAT_YEAR:
      return d.getFullYear().toString();
    case DATE_FORMAT_FULL_TIME:
      return `${hour}:${(minute.length < 2 && '0') || ''}${minute}:${
        (seconds.length < 2 && '0') || ''
      }${seconds}`;
    case DATE_FORMAT_SHORT:
      return `${(day.length < 2 && '0') || ''}${day}.${month}.${d
        .getFullYear()
        .toString()
        .substr(-2)}`;
    default:
      return `${(day.length < 2 && '0') || ''}${day}.${month}.${year}`;
  }
};

/**
 * time Elapsed
 *
 * @desc    calculates  time Elapsed till now in given format
 * @param   {number} date     - timestamp
 * @param   {unit}   string   - time unit
 * @returns {number}          - diff depending on unit
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'date' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'unit' implicitly has an 'any' type. */
const timeElapsed = (date, unit) => {
  // current date and time in zurich
  const currentDateTime = new Date(
    new Date(Date.now()).toUTCString().replace('GMT', ''),
  );

  //Calculate the correct time difference to Greenwich normal time (1 hours in winter, 2 hours in summer).
  const DSTclearedTimeZoneHours =
    (__TESTING__ && 2) || currentDateTime.getTimezoneOffset() / -60;

  currentDateTime.setHours(
    currentDateTime.getHours() + DSTclearedTimeZoneHours,
  );

  const elapsedInSeconds = (currentDateTime.getTime() - date) / 1000;
  switch (unit) {
    case TIME_ELAPSED_UNIT_MINUTES:
      return Math.floor(elapsedInSeconds / 60);
    case TIME_ELAPSED_UNIT_HOURS:
      return Math.floor(elapsedInSeconds / 3600);
    case TIME_ELAPSED_UNIT_DAYS:
      return Math.floor(elapsedInSeconds / 86400);
    case TIME_ELAPSED_UNIT_WEEKS:
      return Math.floor(elapsedInSeconds / 604800);
    case TIME_ELAPSED_UNIT_MONTHS:
      return Math.floor(elapsedInSeconds / 2592000);
    case TIME_ELAPSED_UNIT_YEARS:
      return Math.floor(elapsedInSeconds / 31536000);
    default:
      return Math.floor(elapsedInSeconds);
  }
};

/**
 * time Elapsed with config
 *
 * @desc    calculates time Elapsed till now in given format
 * @param   {TimeElapsedConfig}    config     - config options
 * @returns {TimeElapsedResult}
 */
export const timeElapsedWithConfig = ({
  biggestUnit = TIME_ELAPSED_UNIT_YEARS,
  dateString = '',
  maxMinutes = 59,
  maxHours = 23,
  maxDays = 6,
  maxWeeks = 3,
  maxMonths = 11,
  maxYears = 1,
}): TimeUnitValue => {
  // try to parse date and validate
  const parsedDate =
    ((!dateString || dateString === 'NaN') && null) ||
    new Date(dateString).getTime();

  if (isNaN(parsedDate)) {
    return {
      value: dateString,
      unit: TIME_ELAPSED_UNIT_ERROR,
    };
  }

  const order = {
    [TIME_ELAPSED_UNIT_MINUTES]: maxMinutes,
    [TIME_ELAPSED_UNIT_HOURS]: maxHours,
    [TIME_ELAPSED_UNIT_DAYS]: maxDays,
    [TIME_ELAPSED_UNIT_WEEKS]: maxWeeks,
    [TIME_ELAPSED_UNIT_MONTHS]: maxMonths,
    [TIME_ELAPSED_UNIT_YEARS]: maxYears,
  };

  const units = Object.keys(order);

  // iterate over all units defined in order
  for (let i = 0; i < units.length; i += 1) {
    const elapsed = timeElapsed(parsedDate, units[i]) || 1; // ceil values;

    // check if Elapsed time matches config
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ minutes */
    if (elapsed <= order[units[i]]) {
      return {
        value: elapsed.toString(),
        unit: units[i],
      };
    }

    // current unit is the biggest unit => return date
    if (units[i] === biggestUnit) {
      return {
        value: dateString,
        unit: TIME_ELAPSED_UNIT_DATE,
      };
    }
  }

  // fallback
  return {
    value: dateString,
    unit: TIME_ELAPSED_UNIT_DATE,
  };
};

export const getTimeUnit = (
  time: TimeUnitValue,
  language = DEFAULT_LANGUAGE,
) => {
  let plural = '';
  if (
    (typeof time.value === 'string' && parseInt(time.value, 10) > 1) ||
    (typeof time.value === 'number' && time.value > 1)
  ) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
    plural = TIME_ELAPSED_UNIT_LANGUAGE_MAP[language][time.unit].plural;
  }

  return `${
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
    TIME_ELAPSED_UNIT_LANGUAGE_MAP[language][time.unit].value
  }${plural}`;
};
export const formatElapsedDate = (
  date: string,
  language = DEFAULT_LANGUAGE,
) => {
  if (!date || Number.isNaN(Date.parse(date))) {
    return '';
  }

  const timeElapsed = timeElapsedWithConfig({
    dateString: date,
  });
  const elapsedValue =
    typeof timeElapsed.value === 'number'
      ? timeElapsed.value
      : /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        parseInt(timeElapsed.value);

  if (
    elapsedValue > 0 &&
    (timeElapsed.unit === TIME_ELAPSED_UNIT_HOURS ||
      timeElapsed.unit === TIME_ELAPSED_UNIT_MINUTES)
  ) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
    return `${ELAPSED_TIME_PREFIX[language].publishedSinceText} ${
      timeElapsed.value
    } ${getTimeUnit(timeElapsed, language)}`;
  }
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ DE */
  return `${ELAPSED_TIME_PREFIX[language].publishedOnText} ${formatDate(date)}`;
};
