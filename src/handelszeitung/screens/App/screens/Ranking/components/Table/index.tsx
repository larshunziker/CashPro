import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import Icon from '../../../../components/Icon';
import TableRow from '../TableRow';
import { useFilterParams } from '../../hooks/useFilterParams';
import TableLegend from '../TableLegend';
import styles from './styles.legacy.css';
import { TableHeaders, TableProps } from './typings';

const tableHeaders: TableHeaders = [
  { label: 'Rang', type: 'rankingPosition' },
  { label: 'Name', type: 'name' },
  { label: 'Vermögen', type: 'rankingValue' },
  { label: 'Branche', type: 'rankingIndustry' },
  { label: 'Kanton', type: 'rankingState' },
];

const getKey = (node: Maybe<Rankings>) =>
  `${node?.rankingPosition}_${node?.person?.id || Math.random() * 1000}`;

const Table = ({ year, rows }: TableProps) => {
  const { filterParams, updateFilter } = useFilterParams();
  const { sortBy, direction } = filterParams;
  const [sortedByLabel, setSortedByLabel] = useState(
    sortBy?.charAt(0)?.toUpperCase() + sortBy?.slice(1) || 'Rang',
  );
  const oldSortBy = useRef({ sortBy, direction });
  const isSortedByWealth = ['vermögen', 'rang'].includes(filterParams.sortBy);

  const sortByHeader = useCallback(
    (headerLabel: string) => {
      const sortBy = headerLabel.toLowerCase();
      if (sortedByLabel !== headerLabel) {
        updateFilter('sortBy', sortBy);
      } else {
        const direction = filterParams.direction === 'asc' ? 'desc' : 'asc';
        updateFilter(
          'sortBy',
          sortBy,
          sortBy === 'rang' && !filterParams.direction ? 'desc' : direction,
        );
      }
      setSortedByLabel(headerLabel);
    },
    [filterParams, sortedByLabel, updateFilter],
  );

  useEffect(() => {
    if (
      oldSortBy.current.sortBy !== filterParams.sortBy ||
      oldSortBy.current.direction !== filterParams.direction
    ) {
      const s = filterParams.sortBy || 'rang';
      const headerLabel = s.charAt(0).toUpperCase() + s.slice(1);

      setSortedByLabel(headerLabel);
      oldSortBy.current = { sortBy, direction };
    }
  }, [filterParams, direction, sortBy]);

  return (
    <>
      <TableLegend />
      <table className={styles.RankingTable}>
        <thead className={styles.TableHead}>
          <tr>
            {tableHeaders.map(({ type, label }) => (
              <th
                className={styles.TableHeadCell}
                onClick={() => sortByHeader(label)}
                key={`${type}${label}`}
              >
                <p className={styles.TableHeadCellLabel}>
                  {label}
                  {sortedByLabel === label && (
                    <Icon
                      type={`${
                        ((isSortedByWealth
                          ? filterParams.direction === 'desc'
                          : filterParams.direction === 'asc') &&
                          'IconArrowDownList') ||
                        'IconArrowUpList'
                      }`}
                      addClass={classNames(styles.SortByIcon, {})}
                    />
                  )}
                </p>
              </th>
            ))}
            <th className={styles.TableHeadCell}>&nbsp;</th>
          </tr>
        </thead>

        <tbody className={styles.TableBody}>
          {rows.map((row, index) => (
            <Fragment key={getKey(row)}>
              <TableRow {...{ ...row, index, year }} />
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
