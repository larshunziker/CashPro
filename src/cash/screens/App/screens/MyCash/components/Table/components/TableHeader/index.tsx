import React, { ReactNode } from 'react';
import SortableHeaders from '../../../SortableHeaders';

type TableHeaderProps = {
  addClass?: string;
  columnName?: string;
  children: ReactNode;
  sortable: boolean;
  isDirtySortTableRef: React.MutableRefObject<boolean>;
  location: Partial<RaschRouterLocation>;
  hasCustomOrder: boolean;
  hasCustomGroup: boolean;
  group: string;
};

const TableHeader = ({
  children,
  columnName,
  addClass,
  sortable,
  isDirtySortTableRef,
  location,
  hasCustomOrder,
  hasCustomGroup,
  group,
}: TableHeaderProps) => {
  return (
    <th className={addClass}>
      {(!sortable && <>{children}</>) || null}
      {(sortable && (
        <SortableHeaders
          isDirtySortTableRef={isDirtySortTableRef}
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          column={columnName}
          location={location}
          hasCustomOrder={hasCustomOrder}
          hasCustomGroup={hasCustomGroup}
          group={group}
        >
          {children}
        </SortableHeaders>
      )) ||
        null}
    </th>
  );
};

export default TableHeader;
