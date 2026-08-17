/**
 * @file    SortOrder
 * @author  Damian Bucki <damian.bucki@dreamlab.pl>
 * @date    2018-09-20
 */

import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import Link from '../../../../../../../common/components/Link';
import {
  GLOBAL_SEARCH_SORT_BY_DATE,
  GLOBAL_SEARCH_SORT_BY_RELEVANCE,
} from '../../../../../../../shared/constants/globalSearch';
import styles from './styles.legacy.css';
import { SortOrderProps } from './typings';

type SortOrderPropsInner = SortOrderProps & {
  routeQuery?: Record<string, string>;
  routePathname?: string;
  queryStringName?: string;
};

type SortOrderItem = {
  name: string;
  sort: string;
};

const sortItems: Array<SortOrderItem> = [
  {
    name: 'Relevanz',
    sort: GLOBAL_SEARCH_SORT_BY_RELEVANCE,
  },
  {
    name: 'Aktualität',
    sort: GLOBAL_SEARCH_SORT_BY_DATE,
  },
];

const getHref = (
  pathname: string,
  query: Record<string, string>,
  sort: string,
) => {
  if (!sort || !pathname || !query) {
    return undefined;
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

const SortOrder: ComponentType<SortOrderPropsInner> = ({
  currentSortOrder,
  routeQuery,
  routePathname,
}) => (
  <div
    className={`sort-order ${styles.Wrapper}`}
    data-testid="sort-order-wrapper"
  >
    <div
      className={styles.FilterWrapper}
      data-testid="sort-order-filter-wrapper"
    >
      <span className={styles.Label}>Sortiert nach:</span>

      {sortItems.map((item, index) => (
        <Link
          /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string | undefined'. */
          path={
            currentSortOrder !== item.sort
              ? /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
                getHref(routePathname, routeQuery, item.sort)
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
);

const mapStateToProps = (state: ReduxState) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  routeQuery: locationStateSelector(state).locationBeforeTransitions.query,
});

export default connect(mapStateToProps)(SortOrder);
