/**
 * @file   object utils
 */

/**
 * @desc Returns a new object having all its null properties removed
 * @param {any} object - Any kind of object (possibly containing attributes with value null)
 * @param {Boolean} toLowerCase - convert object keys to lowercase
 * @returns {any} - Object without null properties
 */
export const removeEmptyKeysFromObject: Function = (
  object: any,
  toLowerCase = false,
): any =>
  Object.keys(object)
    .filter((key: string) => object[key] !== null)
    .reduce((newObject: any, key: string) => {
      newObject[(toLowerCase && key.toLowerCase()) || key] =
        typeof object[key] === 'object'
          ? removeEmptyKeysFromObject(object[key])
          : object[key];
      return newObject;
    }, {});
