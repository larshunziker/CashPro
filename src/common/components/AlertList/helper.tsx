import type { AlertList } from './typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'firstName' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'lastName' implicitly has an 'any' type. */
export const getName: Function = ({ firstName, lastName }): string =>
  (!firstName && lastName) ||
  (!lastName && firstName) ||
  `${firstName} ${lastName}`;

export const ensureAlertListInterface = (alertList: AlertList) => {
  const ensuredAlertList = alertList.map(
    (item) =>
      (item && {
        node: {
          id: item?.node?.nid || item?.node?.tid || item?.node?.id,
          label: item?.node?.label || getName(item?.node) || item?.node?.title,
          preferredUri: item?.node?.preferredUri || '',
          __typename: item?.node?.__typename || '',
        },
      }) ||
      {},
  );

  return ensuredAlertList;
};
