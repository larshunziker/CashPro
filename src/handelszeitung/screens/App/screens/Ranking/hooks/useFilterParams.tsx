import { useEffect, useState } from 'react';

/* @ts-ignore TODO: TS7006 ->  Parameter 'search' implicitly has an 'any' type. */
const getFilterParams = (search) => {
  if (!search) return {};

  return Object.fromEntries(
    search
      .slice(1)
      .split('&')
      /* @ts-ignore TODO: TS7006 ->  Parameter 'param' implicitly has an 'any' type. */
      .map((param) => {
        const [key, value] = param.split('=');
        return [key, decodeURIComponent(value)];
      }),
  );
};

export const useFilterParams = () => {
  const [params, setParams] = useState<any>(
    getFilterParams(global?.location?.search),
  );

  const updateFilter = (
    key = 'filterByGender',
    value: string,
    direction = 'asc',
  ) => {
    let newFilters = { ...params };

    if (key === 'sortBy') {
      if (value === 'rang' && direction === 'asc') {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sortBy, direction, ...rest } = params;
        newFilters = { ...rest };
      } else {
        newFilters = {
          ...params,
          sortBy: value,
          direction: direction,
        };
      }
    } else {
      const isRemove = value === '';

      if (isRemove) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
    }

    changeUrl(newFilters);
    setParams(newFilters);
  };

  const resetFilters = () => {
    changeUrl({});
    setParams({});
  };

  useEffect(() => {
    const handleFilterUpdates = () => {
      const filterParams = getFilterParams(location.search);
      setParams(filterParams);
    };

    // Listen for URL changes manually, since replaceState doesn't trigger them
    window.addEventListener('popstate', handleFilterUpdates);

    return () => {
      window.removeEventListener('popstate', handleFilterUpdates);
    };
  }, []);

  return { filterParams: params, updateFilter, resetFilters };
};

const changeUrl = (filters: Record<string, any>) => {
  const hasFilters = Object.entries(filters).length > 0;
  const newSearch = Object.entries(filters)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
  const newUrl = location.pathname + (hasFilters ? `?${newSearch}` : '');

  window.history.replaceState(null, '', newUrl);

  // Trigger a popstate event manually
  window.dispatchEvent(new PopStateEvent('popstate'));
};
