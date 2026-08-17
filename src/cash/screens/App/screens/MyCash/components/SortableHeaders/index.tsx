import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { SortableHeadersProps } from './typings';

const SortableHeaders = ({
  column,
  isDirtySortTableRef,
  children,
  location,
  hasCustomOrder,
  group,
}: SortableHeadersProps) => {
  const { query: locationQuery } = location;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const sortBy = locationQuery.sortBy;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const direction = sortBy === column ? locationQuery.direction : '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams({});

  /* @ts-ignore TODO: TS7006 ->  Parameter 'query' implicitly has an 'any' type. */
  const setActions = (query) => {
    isDirtySortTableRef.current = true;
    setSearchParams({
      ...query,
    });
  };

  const sort = () => {
    let newDirection =
      direction === 'asc' && sortBy === column ? 'desc' : 'asc';
    if (column === 'name' && !direction && !sortBy && !hasCustomOrder) {
      newDirection = 'desc';
    }
    setActions({
      ...locationQuery,
      sortBy: column,
      direction: newDirection,
    });
  };

  const displaySortableHeader = group === 'no-grouping';

  return (
    <>
      {(displaySortableHeader && (
        <span
          className={styles.Wrapper}
          data-testid="sortable-header-btn"
          onClick={sort}
          onKeyDown={() => null}
          role="button"
          tabIndex={-1}
        >
          {children}
          <div
            className={classNames(styles.TriangleButton, {
              [styles.IsActive]: sortBy === column,
              [styles.IsDesc]: direction === 'desc',
            })}
          />
        </span>
      )) || <div>{children}</div>}
    </>
  );
};

export default SortableHeaders;
