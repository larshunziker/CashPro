/**
 * @file    return phone number in correct format for calls
 */
export const getTelLink = (tel: string): string => {
  const protocol = 'tel:';
  const telWithoutSpaces: string = tel.replace(/\s/g, '');
  const urlFriendlyPhoneNumber: string = telWithoutSpaces.replace(/\+/g, '00');
  const onlyFirstNumber: string =
    urlFriendlyPhoneNumber.substring(0, urlFriendlyPhoneNumber.indexOf(',')) ||
    urlFriendlyPhoneNumber;

  return protocol + onlyFirstNumber;
};
