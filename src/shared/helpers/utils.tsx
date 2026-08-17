/**
 * @TODO
 *
 * 1. Remove getElementStyle.
 * 2. Make log() available as global and alias it in webpack as noop()
 *    OR write a babel plugin to strip it away in production.
 */
// turn it on to get system state logs
export const LOG = false;
export const DEVICE_TYPE_IOS_MOBILE_TABLET = 'iOS';
export const DEVICE_TYPE_ANDROID = 'Android';
export const DEVICE_TYPE_WINDOWS_PHONE = 'Windows Phone';

/**
 * log
 *
 * @desc  console log with subject and color definition
 */
export const log = (
  subject = 'INFO',
  msg: any[] | any = '',
  color = 'red',
  isForced = false,
): void => {
  if (
    !__CLIENT__ ||
    __TESTING__ ||
    (!LOG &&
      !isForced &&
      document?.cookie &&
      document.cookie.indexOf('RASCHDEBUG') === -1)
  ) {
    return;
  }

  // force msg to be a array of any
  const body: Array<any> = Array.isArray(msg) ? msg : [msg];

  body.map((bodyMsg: any): null => {
    if (typeof bodyMsg !== 'string') {
      console.log(`%c[${subject.toUpperCase()}]`, `color:${color}`, bodyMsg); // eslint-disable-line no-console
      return null;
    }
    const css = 'color:black; background:rgba(255, 255, 255, .6); padding:4px;';

    // eslint-disable-next-line no-console
    console.log(
      `%c[${subject.toUpperCase()}] %c${bodyMsg}`,
      `color:${color};`,
      css,
    );
    return null;
  });
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'name' implicitly has an 'any' type. */
export const removeCookie = (name) => {
  if (__SERVER__) {
    return;
  }
  // to remove a cookie just set expire param to a date in the past
  // https://www.w3schools.com/js/js_cookies.asp
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

type SetCookie = (
  name: string,
  value: string,
  days?: number,
  path?: string,
  domain?: string,
) => void;

export const setCookie: SetCookie = (
  name,
  value,
  days,
  path = '/',
  domain,
): void => {
  if (__SERVER__) {
    return;
  }
  let cookie = `${name}=${value};`;
  if (days) {
    const now = new Date();
    const expiresTime = new Date(now.getTime() + 60 * 60 * 24 * 1000 * days);

    cookie += `expires=${expiresTime.toUTCString()};`;
  }

  if (domain) {
    cookie += `domain=${domain};`;
  }

  document.cookie = `${cookie} path=${path};`;
};

export const getCookieByName = (name: string): string => {
  if (__SERVER__) {
    return '';
  }

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (!match) {
    return '';
  }

  return match[2];
};

export const convertCookieToObject = (
  cookie: string,
  separator: string,
): Record<string, any> => {
  const separatedCookie = cookie.split(separator);
  return separatedCookie.reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
    prev[name] = decodeURIComponent(value.join('='));
    return prev;
  }, {});
};

/**
 * warn
 *
 * @desc  console warn which just logs on dev
 */
export const warn = (
  subject = 'INFO',
  msg: Array<any> | any = '',
  color = 'red',
): void => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV !== 'development' || !__CLIENT__) {
    return;
  }

  // forced default logging
  log(subject, msg, color, true);
};

/**
 * extract value of a object by a given path
 * @param   {Object}  object  - base object to traverse through
 * @param   {string}  path    - path to get from object ('root.bar.foo.baz')
 * @returns {mixed}
 */
export const getObjectValueByPath = (object: any, path: string): any => {
  if (!object || !path || path.length < 1 || typeof path !== 'string') {
    return null;
  }

  const pathSegments: Array<string> = path.split('.');

  if (pathSegments.length < 1) {
    return null;
  }

  return pathSegments.reduce(
    (value: any | string, currentPathSegment: string): any | string => {
      if (
        !value ||
        typeof value !== 'object' ||
        !value.hasOwnProperty(currentPathSegment)
      ) {
        return value;
      }
      return value[currentPathSegment];
    },
    object,
  );
};

/**
 * get all styles from an element
 *
 * @desc    all styles of element, also those coming from stylesheets, not only inline!
 * @param   {Element}   - element     - the DOM element to get styles from
 * @param   {string}    - styleName   - the name of the style property you want to know
 * @returns {string}
 */
export const getElementStyle = (element: any, styleName: string): any => {
  let styleValue = '';
  if (document.defaultView && document.defaultView.getComputedStyle) {
    styleValue = document.defaultView
      .getComputedStyle(element, '')
      .getPropertyValue(styleName);
  } else if (element.currentStyle) {
    const styleNameReplaced: string = styleName.replace(
      /-(\w)/g,
      (strMatch: string, p1: string): string => p1.toUpperCase(),
    );
    styleValue = element.currentStyle[styleNameReplaced];
  }
  return styleValue;
};

/**
 * truncate by word
 *
 * @desc    limits a string by word to set limit
 * @param   {string}  inputString
 * @param   {number}  limit
 * @param   {append}  characters to append after string
 * @returns {string}
 */
export const truncateByWord = (
  inputString: string,
  limit: number,
  append = '...',
): string => {
  if (inputString.length >= limit - append.length) {
    const fullWordsArray = inputString
      .substring(0, limit + append.length)
      .split(' ');
    fullWordsArray.pop(); // remove the last entry from the array which is probably "cutted"
    return fullWordsArray.join(' ') + append;
  }
  return inputString;
};

/**
 * truncate by chars
 *
 * @desc    limits a string by chars to set limit
 * @param   {string}  inputString
 * @param   {number}  limit
 * @param   {append}  characters to append after string
 * @returns {string}
 */
export const truncateByChars = (
  inputString: string,
  limit: number,
  append = '...',
): string => {
  if (inputString.length >= limit - append.length) {
    const fullWordsString: string = inputString.substring(
      0,
      limit - append.length,
    );

    return fullWordsString + append;
  }
  return inputString;
};

type truncateInBetweenOptions = {
  text: string;
  textMaxLength?: number;
  slicePosStart?: number;
  slicePosEnd?: number;
  separator?: string;
};
/* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
type truncateInBetweenType = (truncateInBetweenOptions) => string;

export const truncateInBetween: truncateInBetweenType = ({
  text = '',
  textMaxLength = 16,
  slicePosStart = 6,
  slicePosEnd = 7,
  separator = '...',
}: truncateInBetweenOptions): string => {
  if (text.length > textMaxLength) {
    const end = text.slice(text.length - slicePosStart, text.length);
    const start = text.slice(0, slicePosEnd);

    return `${start}${separator}${end}`;
  } else {
    return text;
  }
};

/**
 * is viewport in range
 *
 * @desc    is current viewport in range of given viewportNames
 * @param   {Viewport}  the current viewport redux state
 * @param   {Array<string>}  viewportNames of the range that should return true
 * @returns {boolean}
 */
export const isCurrentViewportInRange = (
  viewport: Viewport | string,
  viewportNames: string[],
): boolean => {
  if (!viewport) {
    return false;
  }

  for (let i = 0, len: number = viewportNames.length; i < len; i += 1) {
    if (
      viewportNames[i] ===
      (typeof viewport === 'string' ? viewport : viewport.label || '')
    ) {
      return true;
    }
  }

  return false;
};

export const mapToEdgesNode = (inputArray: any[]): any => {
  const newArray = inputArray.map((entry) => ({
    node: entry,
  }));
  return {
    edges: newArray,
  };
};

/**
 * string to int
 *
 * @desc    convert a string into an integer
 * @param   {string}  string to be converted
 * @returns {integer|null}
 */
export const stringToInt = (str: string): number | null => {
  const integer: number = parseInt(str, 10);
  if (isNaN(integer)) {
    return null;
  }
  return integer;
};

/**
 * format price
 *
 * @desc    format a price
 * @param   {number}  price in cents (Rappen in CH)
 * @returns {string|null}
 */
export const formatPrice = (priceInCents: number | string): string | null => {
  const dash = '–';
  /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number'. */
  const priceInCentsInteger: number =
    typeof priceInCents === 'number' ? priceInCents : stringToInt(priceInCents);
  if (!priceInCentsInteger) {
    return null;
  }
  const priceUnit: string = (priceInCentsInteger / 100).toFixed(2);
  return priceUnit.replace(/(\.00)+/, `.${dash}`);
};

/**
 * get correct date of article
 *
 * @desc    get correct date of article
 * @param   {Article} article
 * @returns {any}
 */
export const getArticleDate = (article: Article) => {
  // ❗️ATTENTION❗️ -> on BEO this case is using "changedDate", not "changeDate"!
  if (
    article.showUpdated === true &&
    typeof article.changeDate !== 'undefined'
  ) {
    return article.changeDate;
  }
  return article.publicationDate || article.createDate;
};

/**
 * get image alt tag
 *
 * @desc    makes sure, that the image gets the right alt tag
 * @param   {TeasableInterfaceNode} nodes
 * @returns {string}
 */
export const getImageAltTag = (node: Article): string => {
  if (node.teaserImage && !node.teaserImage.alt && node.teaserImage.image) {
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    const firstKey: string = Object.keys(node.teaserImage.image).shift();
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Image'. */
    return node.teaserImage.image[firstKey].alt || '';
  }
  return node.teaserImage && node.teaserImage.alt ? node.teaserImage.alt : '';
};

/**
 * remove's a possible existent + in any string
 *
 * @desc    remove's a possible existent + in any string
 * @param   {string}  number
 * @returns {string}
 */
export const stripPhoneNumber = (number: string): string =>
  number.replace(/\+/i, '');

export const noop = (): null => null;

// device detection from: https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
export const getMobileOperatingSystem = () => {
  const userAgent =
    // @ts-ignore
    global?.navigator?.userAgent || global?.navigator?.vendor || global?.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return DEVICE_TYPE_WINDOWS_PHONE;
  }

  if (/android/i.test(userAgent)) {
    return DEVICE_TYPE_ANDROID;
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  // @ts-ignore
  if (/iPad|iPhone|iPod/.test(userAgent) && !global.MSStream) {
    return DEVICE_TYPE_IOS_MOBILE_TABLET;
  }

  return '';
};

export const isPWApp: boolean =
  (!__TESTING__ &&
    __CLIENT__ &&
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"standalone"' can't be used to index type 'Navigator'. */
    (global?.navigator?.['standalone'] ||
      window.matchMedia('(display-mode: standalone)').matches)) ||
  false;

/**
 * removeReferrer
 * removes the referrer for SPAs
 */
export const removeReferrer = (): void => {
  if (!__CLIENT__) return;
  try {
    // @ts-ignore
    delete window.document.referrer;
    // @ts-ignore
    window.document.__defineGetter__('referrer', (): string => {
      return '';
    });
  } catch (e) {}
};

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/7616484#7616484
export const hashString = (text: string): number => {
  let hash = 0,
    i,
    chr;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * check if a given year is a leap year
 * @param {*} year
 */
export const isLeapYear = (year: number): boolean =>
  year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);

/**
 * Finds the paragraph id of the first paragraph of a certain paragraph type.
 * @param {*} body all paragraphs
 * @param {*} paragraphType paragraph type of which we want to find the first one's id.
 */
export const findFirstParagraphIdByType = (
  body: any,
  paragraphType: string,
) => {
  if (Array.isArray(body) && body.length > 0) {
    return (
      body.find((paragraph) => paragraph.__typename === paragraphType)?.id ||
      null
    );
  }

  return null;
};

/**
 * Generate an array with random numbers
 * @param {*} numberOfGeneratedItems number of keys to be generated
 */
export const generateRandomNumber = (
  numberOfGeneratedItems: number,
): Uint32Array | null => {
  if (
    typeof numberOfGeneratedItems !== 'number' ||
    numberOfGeneratedItems === 0
  ) {
    return null;
  }
  const array = new Uint32Array(numberOfGeneratedItems);
  return window.crypto.getRandomValues(array);
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'path' implicitly has an 'any' type. */
export const isFileLink = (path) => {
  const fileRegExp = /(\.(pdf|doc|docx|xls|xlsx|txt|md)$)|(\/rss_)/i;
  return fileRegExp.test(path);
};

export const getUserInitials = (fullName: string): string => {
  const allValues = fullName.trim().split(' ');

  return allValues.reduce((acc, curr, index) => {
    if (index === 0 || index === allValues.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
};

export const getSanitizedPhoneNumber = (
  phoneNumber: string,
  allowedCharacters: Array<string> = [],
): string => {
  const sanitizeMap = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    a: '2',
    b: '2',
    c: '2',
    d: '3',
    e: '3',
    f: '3',
    g: '4',
    h: '4',
    i: '4',
    j: '5',
    k: '5',
    l: '5',
    m: '6',
    n: '6',
    o: '6',
    p: '7',
    q: '7',
    r: '7',
    s: '7',
    t: '8',
    u: '8',
    v: '8',
    w: '9',
    x: '9',
    y: '9',
    z: '9',
  };

  return phoneNumber
    .toLowerCase()
    .split('')
    .reduce((sanitized, number) => {
      if (allowedCharacters.includes(number)) {
        return (sanitized += number);
      }

      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ '0' */
      sanitized += sanitizeMap[number] || '';

      return sanitized;
    }, '');
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'path' implicitly has an 'any' type. */
export const isStandalonePage = (path) => {
  const standalonePages = /^\/authorize/;
  return standalonePages.test(path);
};

export const slugify = (text: string) =>
  text &&
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

// remove HTML tags and new lines in a string
export const sanitizedString = (text: string) => {
  if (!text) return null;
  return text
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim()
    .replace(/[\r\n]+/g, ' ');
};
