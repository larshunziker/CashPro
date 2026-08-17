import React, { useContext } from 'react';
import { formatPrice } from '../../../../../../../Highcharts/helpers';
import { HideRestrictedContent } from '../../../..';
import styles from './styles.legacy.css';
import { Rows } from '../Row/typings';

const formatPriceNoNaN = (price: any): any => {
  const value = formatPrice(price);
  return !price ? '-' : value;
};

const Minitables = ({ table }: { table: string[][] }) => {
  const tables = table.slice(1).map((row) => {
    if (row[0] === '') {
      return { type: 'heading', values: row };
    }
    return { type: 'data', values: row };
  }) as Rows[];

  const splitTables = (tables: Rows[]): Rows[][] => {
    const result = [];
    /* @ts-ignore TODO: TS7034 ->  Variable 'table' implicitly has type 'any[]' in some locations where its type cannot be determined. */
    let table = [];
    tables.forEach((row) => {
      if (row.type === 'heading' && table.length) {
        /* @ts-ignore TODO: TS7005 ->  Variable 'table' implicitly has an 'any[]' type. */
        result.push(table);
        table = [];
        table.push(row);
      } else {
        table.push(row);
      }
    });
    /* @ts-ignore TODO: TS7005 ->  Variable 'table' implicitly has an 'any[]' type. */
    result.push(table);
    return result;
  };

  const [ratingTable, predictionTable] = splitTables(tables);

  return (
    <div className={styles.Border}>
      <RatingTable table={ratingTable} />
      <PredictionTable table={predictionTable} />
    </div>
  );
};

const PredictionTable = ({ table }: { table: Rows[] }) => {
  const hideContent = useContext(HideRestrictedContent);
  if (!table) {
    return null;
  }
  const headings = table.map((row) => row?.values?.[0]);
  const rows: string[][] = [];
  for (let i = 1; i < table.length; i++) {
    rows.push(table.map((row) => row?.values?.[i]));
  }

  return (
    <div className={styles.PredictionTableWrapper}>
      <table>
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join()}>
              {row.map((cell) => {
                const cellIsString = isNaN(Number(cell));
                return (
                  <td key={cell}>
                    {hideContent
                      ? '000'
                      : cellIsString
                        ? cell
                        : formatPriceNoNaN(cell)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RatingTable = ({ table }: { table: Rows[] }) => {
  return (
    (table && (
      <div className={styles.Table}>
        <div className={styles.RatingRow}>
          <Cell heading="Rating Neu" value={table[1]?.values?.[1]} />
          <Cell
            heading="PT/FV (Fr.) Neu"
            value={formatPriceNoNaN(table[2]?.values?.[1])}
          />
        </div>
        <div className={styles.RatingRow}>
          <Cell heading="Rating Alt" value={table[1].values[2]} />
          <Cell
            heading="PT/FV (Fr.) Alt"
            value={formatPriceNoNaN(table[2].values[2])}
          />
        </div>
      </div>
    )) ||
    null
  );
};

const Cell = ({ heading, value }: { heading: string; value: string }) => {
  const hideContent = useContext(HideRestrictedContent);
  return (
    <div className={styles.Cell}>
      <p className={styles.CellInfo}>{heading}</p>
      <p className={styles.CellValue}>{hideContent ? '000' : value}</p>
    </div>
  );
};

export default Minitables;
