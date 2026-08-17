import { ROUTE_PORTFOLIOS } from '../../../../constants';

/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'group' implicitly has an 'any' type. */
export const getDataByGroup = (data, group) => {
  const newData = Object.keys(data)
    .filter(
      (key) =>
        data[key].group === group ||
        (Array.isArray(data[key].group) && data[key].group.includes(group)),
    )
    .reduce((obj, key) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      obj[key] = data[key];
      return obj;
    }, {});

  return newData;
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'customList' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
export const getOptionsData = ({ customList, data, isWatchlist = false }) => {
  if (!customList) {
    return [];
  }

  return Object.keys(data).map((key) => {
    return {
      label:
        (isWatchlist &&
          data[key].description.replace('Portfolio', 'Watchlist')) ||
        data[key].description,
      value: key,
      initiallyChecked: customList.includes(key),
      disabled: false,
    };
  });
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
export const getBreadcrumbsByType = (type) => {
  const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
    count: 2,
    totalCount: 2,
    edges: [
      (type === 'watchlist' && {
        node: {
          id: 'watchlist',
          label: 'Watchlist',
          link: '/watchlist',
          __typename: 'ActiveMenuTrailItem',
        },
        __typename: 'ActiveMenuTrailItemEdge',
      }) || {
        node: {
          id: 'portfolios',
          label: 'Portfolios',
          link: `/${ROUTE_PORTFOLIOS}`,
          __typename: 'ActiveMenuTrailItem',
        },
        __typename: 'ActiveMenuTrailItemEdge',
      },
      {
        node: {
          id: 'portfolio',
          label: 'Portfolio',
          link: '/portfolio',
          __typename: 'ActiveMenuTrailItem',
        },
        __typename: 'ActiveMenuTrailItemEdge',
      },
      {
        node: {
          id: 'custom-view',
          label: 'Eigene Ansicht anpassen',
          link: '',
          __typename: 'ActiveMenuTrailItem',
        },
        __typename: 'ActiveMenuTrailItemEdge',
      },
    ],
    __typename: 'ActiveMenuTrailItemConnection',
  };

  return breadcrumbItems;
};
