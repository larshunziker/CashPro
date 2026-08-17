/**
 * @file   parse search query helper
 */

import { checkIfIsValidUrl } from './urlValidation';

export const parseSearchQuery = (
  searchQuery: string,
): Record<string, string> => {
  let query: string = searchQuery;
  if (typeof query !== 'string') {
    return {};
  }

  if (query.charAt(0) === '?') {
    query = query.substring(1);
  }
  const hashes: string[] = query.split('&');
  const params: Record<string, string> = {};
  hashes.forEach((hash: string): void => {
    const [key, value] = hash.split('=');

    if (checkIfIsValidUrl(key) && checkIfIsValidUrl(value)) {
      params[decodeURIComponent(key)] =
        value !== undefined ? decodeURIComponent(value) : '';
    } else if (checkIfIsValidUrl(key) && !checkIfIsValidUrl(value)) {
      params[decodeURIComponent(key)] = '';
    }
  });
  return params;
};
