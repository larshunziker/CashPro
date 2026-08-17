import React from 'react';
import classNames from 'classnames';
import useRaschRouterLocation from '../../../../../../../shared/hooks/useRaschRouterLocation';
import Link from '../../../../../../../common/components/Link';
import { sortItems } from './constants';
import styles from './styles.legacy.css';

const getHref = (
  pathname: string,
  query: Record<string, string>,
  sort: string,
) => {
  if (!sort || !pathname || !query) {
    return;
  }

  const searchQuery = {
    ...query,
    sort,
  };

  const search = Object.keys(searchQuery)
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ sort */
    .map((value) => `${value}=${searchQuery[value]}`)
    .join('&');

  return `${pathname}${(search && '?' + search) || ''}`;
};

const SortOrder = () => {
  const { pathname, query } = useRaschRouterLocation();
  const currentSortOrder = query?.sort || 'Relevance';
  return (
    <div className={`sort-order ${styles.Wrapper}`}>
      <div className={styles.FilterWrapper}>
        <span className={styles.Label}>Sortiert nach</span>
        <div className={styles.FilterItemWrapper}>
          {sortItems.map((item, index) => (
            <Link
              /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string | undefined'. */
              path={
                currentSortOrder !== item.sort
                  ? /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
                    getHref(pathname, query, item.sort)
                  : null
              }
              key={`sort-link-${item.name || index}`}
              className={classNames(styles.FilterItem, {
                [styles.ActiveFilterItem]: currentSortOrder === item.sort,
              })}
              label={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortOrder;
