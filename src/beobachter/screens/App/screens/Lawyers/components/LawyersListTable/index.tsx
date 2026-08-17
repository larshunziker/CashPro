import React, { memo, useEffect, useMemo, useState } from 'react';
import { RankingInfo } from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import shuffle from 'lodash/shuffle';
import { fuzzyFilter, fuzzySort } from '../helpers/fuzzySort';
import { parseJSON } from '../helpers/parseJSON';
import Filters from '../Filters';
import LawyersPagination from '../LawyersPagination';
import { lawAreas } from '../Filters/filtersList';
import styles from './styles.legacy.css';
import { ColumnNames, Lawyer } from '../types';

declare module '@tanstack/react-table' {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type Filter = {
  id: string;
  value: string;
};

const MinistageLawyers = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<Filter[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        '/assets/files/lawyers/Anwaltsnetz_Tabelle.json',
        {
          method: 'get',
          headers: {
            'content-type': 'text/json;charset=UTF-8',
          },
        },
      );
      const lawyers = await res.json();
      setLawyers(shuffle(parseJSON(lawyers) as Lawyer[]));
    }
    fetchData();
  }, []);

  const columns = useMemo<ColumnDef<Lawyer>[]>(
    () => [
      {
        enableColumnFilter: false,
        header: '',
        accessorKey: 'PicturePath',
        cell: (info) => {
          return (
            <div className={styles.ImageWrapper}>
              <img
                src={
                  info.getValue()
                    ? `https://www.beobachter.ch/${info.getValue()}`
                    : 'https://cms.ringiermedienschweiz.ch/sites/default/files/media/field_image/2025-04/lawyer_placeholder_0.jpg'
                }
                alt="Anwaltsfoto"
                className={styles.Image}
              />
            </div>
          );
        },
      },
      {
        accessorKey: 'Titel',
        cell: (info) => info.getValue(),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column
      },
      {
        accessorFn: (row) => row[ColumnNames.salutation],
        id: ColumnNames.salutation,
        cell: (info) => info.getValue(),
        filterFn: (row, columnId, filterValue) => {
          const columnValue = row.getValue(columnId) as string;
          return filterValue.every((value: any) => columnValue.includes(value));
        },
      },
      {
        accessorFn: (row) => `${row.Vorname} ${row.Nachname}`,
        id: 'Name',
        sortDescFirst: true,
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
      },
      {
        accessorFn: (row) => row['Firma/Kanzlei'],
        id: 'Kanzlei',
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
      },
      {
        accessorFn: (row) => `${row.Strasse}, ${row.PLZ} ${row.Ort}`,
        id: 'Adresse',
        header: 'Adresse',
        cell: (info) => info.getValue(),
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorFn: (row) => row[ColumnNames.cantons],
        id: ColumnNames.cantons,
        cell: (info) => info.getValue(),
        filterFn: (row, columnId, filterValue) => {
          const columnValue = row.getValue(columnId) as string;
          return filterValue.every((value: any) => columnValue.includes(value));
        },
      },
      {
        accessorFn: (row) => row[ColumnNames.languages],
        id: ColumnNames.languages,
        cell: (info) => info.getValue(),
        filterFn: (row, columnId, filterValue) => {
          const columnValue = row.getValue(columnId) as string;
          return filterValue.every((value: any) => columnValue.includes(value));
        },
      },
      {
        accessorFn: (row) => row[ColumnNames.additionalQualifications],
        id: ColumnNames.additionalQualifications,
        cell: (info) => info.getValue(),
        filterFn: (row, columnId, filterValue) => {
          const columnValue = row.getValue(columnId) as string;
          return filterValue.some((value: any) => columnValue.includes(value));
        },
      },
      {
        accessorFn: (row) => row[ColumnNames.areasOfActivity],
        id: ColumnNames.areasOfActivity,
        cell: (info) => info.getValue(),
        filterFn: (row, columnId, filterValue) => {
          const columnValue = row.getValue(columnId) as string;
          return filterValue.every((value: any) => columnValue.includes(value));
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: lawyers,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      columnVisibility: {
        [ColumnNames.cantons]: false,
        [ColumnNames.languages]: false,
        [ColumnNames.additionalQualifications]: false,
        [ColumnNames.areasOfActivity]: false,
      },
    },
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy', //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  if (!lawyers.length) {
    return null;
  }

  const onLawyerRowClick = (lawyerData: Lawyer) => {
    if (lawyerData.Website) {
      const website = `https://beobachter.ch${lawyerData.Website}`;
      window.open(website, '_blank');
    }
  };
  return (
    <div className="p-2">
      <Filters
        columnFilters={columnFilters}
        onColumnFilterChange={setColumnFilters}
        areasOfActivity={lawAreas}
      />

      <table className={styles.Table} aria-label="Anwaltstabelle">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorting = header.column.getIsSorted();
                let sortingLabel = 'none';
                if (isSorting) {
                  sortingLabel =
                    isSorting === 'desc' ? 'descending' : 'ascending';
                }

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={styles.TableRow}
                    role="columnheader"
                    aria-sort={
                      sortingLabel as 'none' | 'descending' | 'ascending'
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        className={classNames(styles.FilterButton, {
                          'cursor-pointer select-none':
                            header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <div
                          className={classNames(styles.TriangleButton, {
                            [styles.IsActive]: ['asc', 'desc'].includes(
                              header.column.getIsSorted() as string,
                            ),
                            [styles.IsDesc]:
                              header.column.getIsSorted() === 'desc',
                          })}
                        />
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            if (!row.original.Nachname) {
              return;
            }

            return (
              <tr
                key={row.id}
                className={styles.TBodyTr}
                onClick={() => onLawyerRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={classNames(styles.TBodyTd, styles.TableRow)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <LawyersPagination table={table} />
    </div>
  );
};

export default memo(MinistageLawyers);
