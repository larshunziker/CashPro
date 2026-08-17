/**
 * @file   check if URL term is valid for an URL
 */

export const checkIfIsValidUrl = (term: string): boolean => {
  if (!term) {
    return false;
  }

  try {
    decodeURIComponent(term);
    return true;
  } catch (error) {
    return false;
  }
};
