import React, { ReactElement, memo } from 'react';
import MainTable from './components/MainTable';
import TableLegend from './components/TableLegend';
import { CUSTOM_VIEW_TABLE, DEFAULT_TABLE } from '../Table/constants';
import { TableProps, TableLegendProps } from './typings';

const initialCustomView = ['name', 'paidPrice'];

export const getTableFieldHeaders = ({
  tableHeaders,
  component,
  type,
  data,
}: TableLegendProps): string[] | undefined => {
  if (tableHeaders?.length === 0) return [];

  let tableFieldHeaders: string[] = Object.values(
    (tableHeaders && tableHeaders[component || DEFAULT_TABLE]) || {},
  );

  if (component === CUSTOM_VIEW_TABLE) {
    const { customView } =
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"portfolioSettings" | "watchlistSettings" | "muster-po */
      data?.[`${type}Settings`] || initialCustomView;

    const parsedCustomView = JSON.parse(customView || {});
    /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
    const cleanCustomView = parsedCustomView?.reduce((acc, item: any) => {
      acc.push(item.field);
      return acc;
    }, []);

    tableFieldHeaders = cleanCustomView || initialCustomView;
  }

  return tableFieldHeaders;
};

const Table = (props: TableProps): ReactElement => {
  const tableFieldHeaders = getTableFieldHeaders(props);

  return (
    <>
      {props.type === 'portfolio' && <TableLegend {...props} />}
      <MainTable {...props} tableFieldHeaders={tableFieldHeaders} />
    </>
  );
};

export default memo<TableProps>(Table);
