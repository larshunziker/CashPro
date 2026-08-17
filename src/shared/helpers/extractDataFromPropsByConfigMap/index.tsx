/**
 * @file   resolve Data By Config Map
 * @author Pascal Tan <pascal.tan@ringieraxelspringer.ch>
 * @date   2019-02-06
 *
 */

import { getObjectValueByPath } from '../utils';

export const EXTRACT_DATA_FROM_PATH = 'extract-data/type-path';

/* @ts-ignore TODO: TS7006 ->  Parameter 'config' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
export const extractDataFromPropsByConfigMap = (config, props) => {
  const data = {};

  // iterate through all config keys
  Object.keys(config).forEach((key) => {
    // handle simple values (string, null)
    if (typeof config[key] === 'string' || config[key] === null) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      data[key] = config[key];
    }

    // handle object type "path"
    if (
      typeof config[key] === 'object' &&
      config[key] !== null &&
      config[key].type &&
      config[key].type === EXTRACT_DATA_FROM_PATH &&
      config[key].value &&
      Array.isArray(config[key].value) &&
      config[key].value.length > 0
    ) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'object' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'currentValue' implicitly has an 'any' type. */
      data[key] = config[key].value.reduce((object, currentValue) => {
        // handle arrays of items
        if (Array.isArray(object)) {
          return object.map((entry, index) =>
            // handle next path
            getObjectValueByPath(object[index], currentValue),
          );
        }

        // handle next path
        if (typeof object === 'object') {
          return getObjectValueByPath(object, currentValue);
        }

        return currentValue;
      }, props);
    }
  });

  return data;
};
