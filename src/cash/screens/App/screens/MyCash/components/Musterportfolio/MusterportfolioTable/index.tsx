import React from 'react';
import Table from '../../Table';
import { filterSoldItems } from '../../Portfolio';
import { TRADING_IDEAS_TABLE_HEADERS } from '../../Portfolio/constants';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'portfolio' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
const MusterportfolioTable = ({ portfolio, origin, type }) => {
  const filteredPortfolio = filterSoldItems(portfolio);
  const instruments = portfolio?.calculatedFields?.instruments;

  switch (type) {
    case 'sell':
      const hasSellTransactions = instruments?.some(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
        (instrument) =>
          instrument?.transactions &&
          /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
          instrument?.transactions.some(({ type }) => type === 'SELL'),
      );

      return (
        <>
          {(hasSellTransactions && (
            <div className={styles.TableHeading}>Verkäufe</div>
          )) ||
            null}
          <Table
            /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MutableRefObject<boolean>'. */
            isDirtySortTableRef={null}
            component={type}
            data={portfolio}
            groupType={'no-grouping'}
            type="transactions-sell"
            tableHeaders={TRADING_IDEAS_TABLE_HEADERS}
            /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Partial<RaschRouterLocation>'. */
            location={null}
            origin={origin}
            itemsPerPage={3}
          />
        </>
      );
    case 'buy':
      const hasBuyTransactions = instruments?.some(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
        (instrument) =>
          instrument?.transactions &&
          /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
          instrument?.transactions.some(({ type }) => type === 'BUY'),
      );
      return (
        <>
          {(hasBuyTransactions && (
            <div className={styles.TableHeading}>Käufe</div>
          )) ||
            null}
          <Table
            /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MutableRefObject<boolean>'. */
            isDirtySortTableRef={null}
            component={type}
            data={portfolio}
            groupType={'no-grouping'}
            type="transactions-buy"
            tableHeaders={TRADING_IDEAS_TABLE_HEADERS}
            /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Partial<RaschRouterLocation>'. */
            location={null}
            origin={origin}
            itemsPerPage={3}
          />
        </>
      );
    default:
      return (
        <Table
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MutableRefObject<boolean>'. */
          isDirtySortTableRef={null}
          component={type}
          data={filteredPortfolio}
          groupType={'no-grouping'}
          type="muster-portfolio"
          tableHeaders={TRADING_IDEAS_TABLE_HEADERS}
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Partial<RaschRouterLocation>'. */
          location={null}
          origin={origin}
        />
      );
  }
};

export default MusterportfolioTable;
