import React, { memo } from 'react';
import {
  MARKET_GROUPING,
  PAPER_VALUES_GROUPING,
  PAPER_VALUES_GROUPING_MAPPING,
} from '../../../../constants';
import styles from './styles.legacy.css';
import { GroupTableRowProps } from './typings';

const GroupTableRow = ({
  group,
  groupType,
  tableFieldHeaders,
  groupedInstruments,
}: GroupTableRowProps) => {
  let groupLabel = group;
  if (
    groupType === MARKET_GROUPING &&
    groupedInstruments?.[0]?.marketDescription
  ) {
    groupLabel = `${groupedInstruments?.[0]?.marketDescription} (${group})`;
  } else if (groupType === PAPER_VALUES_GROUPING) {
    groupLabel =
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ EQU */
      (PAPER_VALUES_GROUPING_MAPPING[group] &&
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ EQU */
        `${PAPER_VALUES_GROUPING_MAPPING[group]} (${group})`) ||
      `Diverse (${group})`;
  }
  return (
    <tr className={group ? styles.SortLabel : ''}>
      <td colSpan={tableFieldHeaders.length}>
        <div className={styles.SortLabelSticky}>{groupLabel}</div>
      </td>
    </tr>
  );
};

export default memo<GroupTableRowProps>(GroupTableRow);
