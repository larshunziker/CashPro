import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import raf from 'raf';
import { sort } from '../../helpers';
import {
  getGroupedInstruments,
  getTotals,
  groupByType,
  sortMarketGroupList,
  sortPaperValuesGroupList,
} from '../helpers';
import autoUpdateStateSelector from '../../../../../../../../../shared/selectors/autoUpdateStateSelector';
import locationStateSelector from '../../../../../../../../shared/selectors/locationStateSelector';
import { useMutationObserver } from '../../../../../../../../../shared/hooks/useMutationObserver';
import useRaschRouterLocation from '../../../../../../../../../shared/hooks/useRaschRouterLocation';
import { useScrollbarSync } from '../../../../../../../../../shared/hooks/useScrollbarSync';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import GroupTableRow from './components/GroupTableRow';
import Pager, {
  PAGER_TYPE_LAZY_LOADER,
} from '../../../../../../components/Pager';
import { headerMapping } from '../headerMapping';
import { CHART_COMPARISON_ORIGIN } from '../../../../../../components/Highcharts/components/ChartComparison/constants';
import { PARAGRAPHS_RENDERER_ORIGIN } from '../../../../../../components/Paragraphs/components/ParagraphsRenderer/constants';
import {
  CURRENCY_GROUPING,
  MARKET_GROUPING,
  OTHER_ASSETS_TITLE,
  PAPER_VALUES_GROUPING,
} from '../../constants';
import styles from '../styles.legacy.css';
import { TableProps } from '../../typings';
import { ExtendedInstrument } from '../TableRow/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.UpperAlert, styles.LowerAlert];

type GroupedListProps = {
  group: 'currency' | 'market' | 'paper-values' | 'Other Assets';
  instruments: ExtendedInstrument[];
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'original' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'clone' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'tableRef' implicitly has an 'any' type. */
const syncTdWidths = (original, clone, tableRef) => {
  if (!original || !clone) return;
  const tds: HTMLElement[] = [...original.children];
  const cloneTds: HTMLElement[] = [...clone.children];

  tds.forEach((td, index) => {
    if (td && td.clientWidth && cloneTds && cloneTds[index]) {
      cloneTds[index].style.width = `${td.getBoundingClientRect().width}px`;
    }
  });

  tableRef.classList.add(styles.IsVisible);
};

const MainTable = ({
  tableFieldHeaders,
  data,
  groupType,
  isDirtySortTableRef,
  component,
  type,
  origin,
  itemsPerPage,
}: TableProps) => {
  /* @ts-ignore TODO: TS2322 ->  Type 'ExtendedAlertListItem[] | Instrument[]' is not assignable to type 'ExtendedInstrument[]'. */
  let instruments: ExtendedInstrument[] =
    data?.calculatedFields?.instruments ||
    data?.instruments ||
    data.items ||
    null;

  const [page, setPage] = useState(1);
  const [headerPlusScrollbarHeight, setHeaderPlusScrollbarHeight] = useState(0);
  const viewportLabel = useSelector(
    (state: ReduxState) => state.window.viewport.label,
  );
  const location = useRaschRouterLocation();

  // scrollable table element refs for scroll sync
  const stickyTableHeaderRef = useRef(null);
  const mainTableHeaderRef = useRef(null);

  // header <tr> refs for <th> width sync
  const stickyTrHeaderRef = useRef(null);
  const mainTrHeaderRef = useRef(null);

  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const autoUpdateData = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => autoUpdateStateSelector(state).data,
  );
  const calculateHeaderOffsetY = useCallback(() => {
    const stickyHeader = stickyTableHeaderRef?.current;
    const mainHeader = mainTableHeaderRef?.current;
    if (stickyHeader && mainHeader) {
      /* @ts-ignore TODO: TS2339 ->  Property 'getBoundingClientRect' does not exist on type 'never'. */
      const stickyHeaderHeight = stickyHeader.getBoundingClientRect().height;
      const mainHeaderHeight = mainHeader
        /* @ts-ignore TODO: TS2339 ->  Property 'querySelector' does not exist on type 'never'. */
        .querySelector('thead')
        .getBoundingClientRect().height;
      const scrollbarHeight =
        /* @ts-ignore TODO: TS2339 ->  Property 'offsetHeight' does not exist on type 'never'. */
        /* @ts-ignore TODO: TS2339 ->  Property 'clientHeight' does not exist on type 'never'. */
        stickyHeader.offsetHeight - stickyHeader.clientHeight;

      setHeaderPlusScrollbarHeight(
        scrollbarHeight
          ? stickyHeaderHeight - scrollbarHeight
          : mainHeaderHeight,
      );
    }
  }, [stickyTableHeaderRef]);

  const onMutation = useCallback(() => {
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    stickyTableHeaderRef.current.classList.remove(styles.IsVisible);

    syncTdWidths(
      mainTrHeaderRef.current,
      stickyTrHeaderRef.current,
      stickyTableHeaderRef.current,
    );
    raf(() => {
      calculateHeaderOffsetY();
    });
  }, [calculateHeaderOffsetY]);

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'Node'. */
  useMutationObserver(mainTrHeaderRef.current, onMutation);

  // handle scroll sync
  useScrollbarSync(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'Element'. */
    stickyTableHeaderRef.current,
    mainTableHeaderRef.current,
    'horizontal',
  );
  useScrollbarSync(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'Element'. */
    mainTableHeaderRef.current,
    stickyTableHeaderRef.current,
    'horizontal',
  );

  useEffect(() => {
    // sync td widths on mount and on viewport change
    syncTdWidths(
      mainTrHeaderRef.current,
      stickyTrHeaderRef.current,
      stickyTableHeaderRef.current,
    );
    raf(() => {
      calculateHeaderOffsetY();
    });
  }, [viewportLabel, autoUpdateData, calculateHeaderOffsetY]);

  if (type === 'transactions-sell') {
    /* @ts-ignore TODO: TS7034 ->  Variable 'sellInstruments' implicitly has type 'any[]' in some locations where its type cannot be determined. */
    const sellInstruments = [];
    instruments?.forEach((instrument, index) => {
      instrument?.transactions &&
        instrument?.transactions
          .filter(({ type }) => type === 'SELL')
          .map((item) =>
            sellInstruments.push({
              ...item,
              name: instrument.name,
              mName: instrument.mName,
              fullquoteUri: instrument.fullquoteUri,
              instrumentType: instrument.type,
              otherAsset: instruments?.[index]?.otherAsset,
              instrumentKey: instruments?.[index]?.instrumentKey,
              scGrouped: instruments?.[index]?.scGrouped,
            }),
          );
    });
    /* @ts-ignore TODO: TS7005 ->  Variable 'sellInstruments' implicitly has an 'any[]' type. */
    instruments = sort(sellInstruments, 'date', 'desc');
  }

  if (type === 'transactions-buy') {
    /* @ts-ignore TODO: TS7034 ->  Variable 'buyInstruments' implicitly has type 'any[]' in some locations where its type cannot be determined. */
    const buyInstruments = [];
    instruments?.forEach((instrument, index) => {
      instrument?.transactions &&
        instrument?.transactions
          .filter(({ type }) => type === 'BUY')
          .map((item) =>
            buyInstruments.push({
              ...item,
              name: instrument.name,
              mName: instrument.mName,
              fullquoteUri: instrument.fullquoteUri,
              instrumentType: instrument.type,
              otherAsset: instruments?.[index]?.otherAsset,
              instrumentKey: instruments?.[index]?.instrumentKey,
              scGrouped: instruments?.[index]?.scGrouped,
            }),
          );
    });
    /* @ts-ignore TODO: TS7005 ->  Variable 'buyInstruments' implicitly has an 'any[]' type. */
    instruments = sort(buyInstruments, 'date', 'desc');
  }

  const initialInstrumentCount = instruments?.length || 0;
  if (itemsPerPage) {
    instruments = instruments.slice(0, itemsPerPage * page);
  }

  const groupListMapping =
    type === 'watchlist'
      ? {
          market: 'market',
          currency: 'mCur',
          'paper-values': 'type',
        }
      : {
          market: 'market',
          currency: 'currency',
          'paper-values': 'type',
        };

  const groupedItems =
    (groupType &&
      instruments &&
      groupByType(instruments, groupType, groupListMapping)) ||
    null;

  const totals = getTotals({
    instruments: instruments,
    title: 'Total',
  });

  const showTotals =
    groupType !== 'no-grouping' &&
    type === 'portfolio' &&
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    !['monitor-table', 'performance-table'].includes(component) &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    groupedItems?.length > 0;

  if (!instruments || instruments?.length === 0) {
    return null;
  }

  let groupedList = null;
  const list: GroupedListProps[] = [];
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  groupedItems?.length > 0 &&
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    groupedItems.map((group) => {
      const groupedInstruments = getGroupedInstruments(
        instruments,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        groupType,
        group,
        groupListMapping,
      );

      list.push({
        group: group,
        instruments: groupedInstruments,
      });
    });

  if (groupType === PAPER_VALUES_GROUPING && list?.length > 0) {
    groupedList = sortPaperValuesGroupList(list);
  } else if (groupType === MARKET_GROUPING && list?.length > 0) {
    groupedList = sortMarketGroupList(list);
  } else if (groupType === CURRENCY_GROUPING && list?.length > 0) {
    groupedList = list.sort((a, b) => {
      const groupA = a.group;
      const groupB = b.group;
      if (!groupB || groupA < groupB) {
        return -1;
      }
      if (!groupA || groupA > groupB) {
        return 1;
      }
      return 0;
    }) as any;
  } else {
    groupedList = list;
  }

  return (
    <>
      <div
        className={classNames(styles.StickyTableHeaderContainer, {
          [styles.IsHybrid]: isHybridApp,
        })}
      >
        <div className={styles.TableHeaderWrapper} ref={stickyTableHeaderRef}>
          <table className={classNames(styles.Table, styles.HeaderTable)}>
            <thead>
              <tr className={styles.Header} ref={stickyTrHeaderRef}>
                {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                {tableFieldHeaders.map((headerKey, headerIndex) => {
                  let header = headerKey;
                  let headerObject = null;
                  if (typeof headerKey === 'object') {
                    headerObject = Object.keys(headerKey);
                    header = headerObject[0];
                  }
                  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly name */
                  const settings = headerMapping[header];
                  if (!settings) {
                    return null;
                  }

                  const isSortable = [
                    PARAGRAPHS_RENDERER_ORIGIN,
                    CHART_COMPARISON_ORIGIN,
                    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
                  ].includes(origin)
                    ? false
                    : settings.sortable;

                  return (
                    <TableHeader
                      isDirtySortTableRef={isDirtySortTableRef}
                      key={`table-header-${headerIndex}-${groupType}`}
                      addClass={classNames(styles.TableRow, settings.style, {
                        [styles.Sticky]: headerIndex === 0,
                      })}
                      columnName={header}
                      sortable={isSortable}
                      location={location}
                      hasCustomOrder={
                        !!JSON.parse(
                          data?.portfolioSettings?.customOrder || 'null',
                        )
                      }
                      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                      group={groupType}
                      hasCustomGroup={groupType !== 'no-grouping'}
                    >
                      {settings.name}
                    </TableHeader>
                  );
                })}
                <th
                  className={headerMapping['lastToggleItem'].style}
                  style={{ border: 'none', opacity: 0 }}
                >
                  <span className={styles.Toggle}></span>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div
        className={styles.ScrollableTable}
        ref={mainTableHeaderRef}
        style={{ marginTop: `-${headerPlusScrollbarHeight}px` }}
      >
        <table
          id="main-table"
          className={classNames(styles.MainTable, styles.Table)}
        >
          <thead>
            <tr className={styles.Header} ref={mainTrHeaderRef}>
              {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
              {tableFieldHeaders.map((headerKey, headerIndex) => {
                let header = headerKey;
                let headerObject = null;
                if (typeof headerKey === 'object') {
                  headerObject = Object.keys(headerKey);
                  header = headerObject[0];
                }
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly name */
                const settings = headerMapping[header];
                if (!settings) {
                  return null;
                }
                return (
                  <TableHeader
                    isDirtySortTableRef={isDirtySortTableRef}
                    key={`table-header-${headerIndex}-${groupType}`}
                    addClass={classNames(styles.TableRow, settings.style)}
                    columnName={header}
                    sortable={
                      origin === PARAGRAPHS_RENDERER_ORIGIN
                        ? false
                        : settings.sortable
                    }
                    location={location}
                    hasCustomOrder={
                      !!JSON.parse(
                        data?.portfolioSettings?.customOrder || 'null',
                      )
                    }
                    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                    group={groupType}
                    hasCustomGroup={groupType !== 'no-grouping'}
                  >
                    {settings.name}
                  </TableHeader>
                );
              })}
              <th
                className={headerMapping['lastToggleItem'].style}
                style={{ border: 'none' }}
              >
                <span className={styles.Toggle}></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedList?.length > 0 &&
              groupedList.map(
                /* @ts-ignore TODO: TS7006 ->  Parameter 'groupIndex' implicitly has an 'any' type. */
                ({ group, instruments }: GroupedListProps, groupIndex) => {
                  /* @ts-ignore TODO: TS7006 ->  Parameter 'groupType' implicitly has an 'any' type. */
                  const getTitleByGroupType = (groupType) => {
                    switch (groupType) {
                      case 'currency':
                        return `Total ${instruments?.[0]?.currency}`;
                      case 'market':
                        if (instruments?.[0]?.otherAsset) {
                          return `Total ${OTHER_ASSETS_TITLE}`;
                        }
                        return `Total ${instruments?.[0]?.market}`;
                      case 'paper-values':
                        return `Total ${instruments?.[0]?.type}`;
                      default:
                        return 'Total';
                    }
                  };

                  const title = getTitleByGroupType(groupType);

                  const groupedTotals = getTotals({
                    instruments: instruments,
                    title,
                  });

                  return (
                    <Fragment
                      key={`grouped-instruments-${group}-${groupIndex}`}
                    >
                      {(group && (
                        <GroupTableRow
                          group={group}
                          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                          groupType={groupType}
                          /* @ts-ignore TODO: TS2322 ->  Type 'string[] | undefined' is not assignable to type 'string[]'. */
                          tableFieldHeaders={tableFieldHeaders}
                          groupedInstruments={instruments}
                        />
                      )) ||
                        null}
                      {instruments.map((instrument, index) => {
                        return (
                          <TableRow
                            /* @ts-ignore TODO: TS2322 ->  Type 'string[] | undefined' is not assignable to type 'string[]'. */
                            tableFieldHeaders={tableFieldHeaders}
                            key={`instrument-item-grouped-${
                              instrument?.instrumentKey ||
                              instrument.fullquoteUri
                            }-${instrument?.transactionKey}`}
                            instrument={instrument}
                            data={data}
                            index={index}
                            type={type}
                          />
                        );
                      })}
                      {/* Totals for groups */}
                      {showTotals && groupedTotals?.mName && (
                        <TableRow
                          /* @ts-ignore TODO: TS2322 ->  Type 'string[] | undefined' is not assignable to type 'string[]'. */
                          tableFieldHeaders={tableFieldHeaders}
                          key={`totals-item-grouped-${group}`}
                          instrument={groupedTotals}
                          disableDropdown
                          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Portfolio & Watchlist & AlertListData'. */
                          data={null}
                          index={groupIndex}
                          type={type}
                          fallbackValue={<></>}
                        />
                      )}
                    </Fragment>
                  );
                },
              )}
            {/* overall totals for groups */}
            {showTotals && totals?.mName && (
              <>
                <tr>
                  <td
                    className={styles.TotalsSpacer}
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    colSpan={tableFieldHeaders.length + 1}
                  ></td>
                </tr>
                <TableRow
                  /* @ts-ignore TODO: TS2322 ->  Type 'string[] | undefined' is not assignable to type 'string[]'. */
                  tableFieldHeaders={tableFieldHeaders}
                  instrument={totals}
                  disableDropdown
                  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Portfolio & Watchlist & AlertListData'. */
                  data={null}
                  index={0}
                  type={type}
                  fallbackValue={<></>}
                />
              </>
            )}
            {(!groupType && instruments && instruments?.length && (
              <>
                {instruments.map((instrument, instrumentIndex) => {
                  return (
                    <TableRow
                      key={`instrument-item-ungrouped-${
                        instrument?.instrumentKey || instrument.fullquoteUri
                      }-${instrument?.transactionKey}`}
                      instrument={instrument}
                      data={data}
                      index={instrumentIndex}
                      /* @ts-ignore TODO: TS2322 ->  Type 'string[] | undefined' is not assignable to type 'string[]'. */
                      tableFieldHeaders={tableFieldHeaders}
                      type={type}
                    />
                  );
                })}
              </>
            )) ||
              null}
          </tbody>
        </table>
      </div>
      {(instruments &&
        groupType === 'no-grouping' &&
        itemsPerPage &&
        instruments?.length > 0 && (
          <div className={styles.LoadMoreWrapper}>
            <Pager
              itemsCount={initialInstrumentCount || 0}
              itemsPerPage={itemsPerPage}
              currentPage={page}
              component={PAGER_TYPE_LAZY_LOADER}
              updatePage={() => setPage(page + 1)}
            />
          </div>
        )) ||
        null}
    </>
  );
};

export default MainTable;
