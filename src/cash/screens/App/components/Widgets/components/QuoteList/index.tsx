import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { compose } from 'recompose';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import autoUpdateStateSelector from '../../../../../../../shared/selectors/autoUpdateStateSelector';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import withScrollOnLoad from '../../../../../../../shared/decorators/withScrollOnLoad';
import { setInstrumentKeysAnonymous } from '../../../../../../shared/actions/autoUpdate';
import useRaschRouterLocation from '../../../../../../../shared/hooks/useRaschRouterLocation';
import Link from '../../../../../../../common/components/Link';
import Table from '../../../../screens/MyCash/components/Table';
import Breadcrumbs from '../../../Breadcrumbs';
import Dropdown from '../../../Dropdown';
import DropdownItem from '../../../Dropdown/components/DropdownItem';
import Icon from '../../../Icon';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import {
  AD_PLACEMENT_SLOTS_QUOTELIST,
  QUOTELIST_CHARACTER_COUNTS,
  enrichItemsWithADs,
} from './ads';
import { hashString } from '../../../../../../../shared/helpers/utils';
import { sortTableItems } from '../../../../screens/MyCash/components/Table/helpers';
import {
  DEFAULT_TABLE,
  HIGHT_LOW_TABLE,
  HIGHT_LOW_VIEW,
  MONITOR_TABLE,
  MONITOR_VIEW,
  PERFORMANCE_TABLE,
  PERFORMANCE_VIEW,
  TRADER_TABLE,
  TRADER_VIEW,
  VOLUME_TABLE,
  VOLUME_VIEW,
} from '../../../../screens/MyCash/components/Table/constants';
import {
  DROPDOWN_CURRENCIES,
  DROPDOWN_QUOTES,
  DROPDOWN_RAW_MATERIAL,
  DROPDOWN_VIEW,
  QUOTES_TABLE_HEADERS,
} from './constants';
import styles from './styles.legacy.css';

const PAGER_ANCHOR_SCROLL_ID = 'page';

/* @ts-ignore TODO: TS7006 ->  Parameter 'viewtype' implicitly has an 'any' type. */
const tableByViewtype = (viewtype) => {
  switch (viewtype) {
    case VOLUME_VIEW:
      return VOLUME_TABLE;
    case HIGHT_LOW_VIEW:
      return HIGHT_LOW_TABLE;
    case TRADER_VIEW:
      return TRADER_TABLE;
    case PERFORMANCE_VIEW:
      return PERFORMANCE_TABLE;
    case MONITOR_VIEW:
      return MONITOR_TABLE;
    default:
      return DEFAULT_TABLE;
  }
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'widgetParagraph' implicitly has an 'any' type. */
const QuoteList = ({ widgetParagraph }) => {
  const isDirtySortTableRef = useRef(null);
  const [tableDataUpdated, setTableDataUpdated] = useState(null);
  const updateDataHashdRef = useRef(null);
  const dispatch = useDispatch();
  const location = useRaschRouterLocation();
  const params = useParams();
  const tableView = location?.query?.ansicht || DEFAULT_TABLE;
  const page = (location?.query?.page || 1) * 1;
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const screenReady = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
  );
  const autoUpdateData = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => autoUpdateStateSelector(state).data,
  );
  const queryJson = JSON.stringify(location?.query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryCopy = useMemo(() => ({ ...location?.query }), [queryJson]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams({});
  const splitParams = params['*']?.split?.('/');
  const quoteType = splitParams?.[splitParams?.length - 1];
  /* @ts-ignore TODO: TS7034 ->  Variable 'currentValue' implicitly has type 'any' in some locations where its type cannot be determined. */
  let currentValue = null;

  Object.entries({
    ...DROPDOWN_QUOTES,
    ...DROPDOWN_CURRENCIES,
    ...DROPDOWN_RAW_MATERIAL,
  }).forEach(([key, value]) => {
    if (!key) {
      return;
    }
    value.forEach((item) => {
      if (item.key === quoteType) {
        currentValue = item;
      }
    });
  });

  const tableType = tableByViewtype(tableView);
  const nodes = useMemo(() => {
    const edges = widgetParagraph?.quoteList?.quoteList?.edges || [];
    return edges.filter(
      (edge: any) =>
        edge?.node?.instrumentKey &&
        edge?.node?.lval !== null &&
        edge?.node?.lval !== undefined,
    );
  }, [widgetParagraph]);

  useEffect(() => {
    let closedMarketInstruments: any = [];
    if (
      /* @ts-ignore TODO: TS7005 ->  Variable 'currentValue' implicitly has an 'any' type. */
      currentValue?.listingKeys &&
      screenReady &&
      /* @ts-ignore TODO: TS7005 ->  Variable 'currentValue' implicitly has an 'any' type. */
      !currentValue?.disableUpdate
    ) {
      /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
      nodes.map(({ node }) => {
        if (node.isMarketOpen === false && node?.instrumentKey) {
          closedMarketInstruments.push({
            listingKey: node.instrumentKey,
            isMarketOpen: node.isMarketOpen,
          });
        }
      });

      const instrumentToUpdate = {
        /* @ts-ignore TODO: TS7005 ->  Variable 'currentValue' implicitly has an 'any' type. */
        ...((currentValue?.constituents && {
          /* @ts-ignore TODO: TS7005 ->  Variable 'currentValue' implicitly has an 'any' type. */
          listingKey: currentValue.listingKeys,
          /* @ts-ignore TODO: TS7005 ->  Variable 'currentValue' implicitly has an 'any' type. */
          constituents: currentValue.constituents,
          isMarketOpen: true,
        }) || {
          /* @ts-ignore TODO: TS7005 ->  Variable 'currentValue' implicitly has an 'any' type. */
          listingKey: currentValue.listingKeys,
          isMarketOpen: true,
        }),
      };
      dispatch(
        setInstrumentKeysAnonymous([
          instrumentToUpdate,
          ...closedMarketInstruments,
        ]),
      );
    }
    return () => {
      closedMarketInstruments = [];
    };
  }, [
    dispatch,
    /* @ts-ignore TODO: TS2339 ->  Property 'listingKeys' does not exist on type 'never'. */
    currentValue?.listingKeys,
    /* @ts-ignore TODO: TS2339 ->  Property 'constituents' does not exist on type 'never'. */
    currentValue?.constituents,
    /* @ts-ignore TODO: TS2339 ->  Property 'disableUpdate' does not exist on type 'never'. */
    currentValue?.disableUpdate,
    screenReady,
    nodes,
  ]);

  const tableData = useMemo(() => {
    return {
      ...widgetParagraph,
      /* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
      items: nodes.map((node) => {
        return {
          ...node.node,
        };
      }),
    };
  }, [nodes, widgetParagraph]);

  const tableDataCopy = useMemo(() => {
    let items = tableData?.items ? [...tableData.items] : [];

    if (items.length > 0 && queryCopy?.sortBy) {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      items = items.map((item) => {
        const updatedItem = autoUpdateData[item.listingId];
        return updatedItem ? { ...item, ...updatedItem } : { ...item };
      });
    } else {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      items = items.map((item) => ({ ...item }));
    }

    if (items.length > 0) {
      items =
        enrichItemsWithADs({
          items,
          adPlacementSlots: AD_PLACEMENT_SLOTS_QUOTELIST,
          characterCount: QUOTELIST_CHARACTER_COUNTS,
        }) || items;
    }

    return { ...tableData, items };
  }, [tableData, autoUpdateData, queryCopy?.sortBy]);

  const hashData = (data: unknown): string | null => {
    if (!data) {
      return null;
    }
    return hashString(JSON.stringify(data)).toString();
  };

  useEffect(() => {
    const autoUpdateDataHash = hashData(autoUpdateData);
    if (
      Object.keys(autoUpdateData).length > 0 &&
      queryCopy?.sortBy &&
      autoUpdateDataHash &&
      autoUpdateDataHash !== updateDataHashdRef?.current
    ) {
      /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'null'. */
      updateDataHashdRef.current = autoUpdateDataHash;
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      let items = (tableData?.items || []).map((item) => {
        const updatedItem = autoUpdateData[item.listingId];
        return updatedItem ? { ...item, ...updatedItem } : { ...item };
      });
      if (items.length > 0) {
        items =
          enrichItemsWithADs({
            items,
            adPlacementSlots: AD_PLACEMENT_SLOTS_QUOTELIST,
            characterCount: QUOTELIST_CHARACTER_COUNTS,
          }) || items;
      }
      items = sortTableItems(items, queryCopy.sortBy, queryCopy.direction);
      setTableDataUpdated({ ...tableData, items });
    }
  }, [autoUpdateData, tableData, queryCopy]);

  const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
    count: 2,
    totalCount: 2,
    edges: (location.pathname === '/kurse' && [
      {
        node: {
          id: '',
          link: null,
          label: 'Kurse',
        },
      },
    ]) || [
      {
        node: {
          id: '',
          link: '/kurse/aktien/schweiz/smi-index',
          label: 'Kurse',
        },
      },
      {
        node: {
          id: '',
          link: null,
          /* @ts-ignore TODO: TS2339 ->  Property 'label' does not exist on type 'never'. */
          label: currentValue?.label,
        },
      },
    ],
  };

  const debouncedSetSearchParams = debounce((params) => {
    setSearchParams(params);
  }, 100);

  return (
    <div>
      {isHybridApp ? null : (
        /* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */
        <Breadcrumbs pageUrl={location.pathname} items={breadcrumbItems} />
      )}
      {/* @ts-ignore TODO: TS2339 ->  Property 'label' does not exist on type 'never'. */}
      <h1 className={styles.Heading}>{currentValue?.label || ''}</h1>
      <div className={styles.ActionsWrapper}>
        <div className={styles.ActionsWrapper}>
          <Dropdown
            align="left"
            iconTypeRight="IconChevronDown"
            iconTypeRightActive="IconChevronUp"
            label="Aktien"
            variant="secondary"
          >
            <div className={styles.DropdownWrapper}>
              {Object.entries(DROPDOWN_QUOTES).map(([key, value]) => {
                return (
                  <>
                    <DropdownItem label={key}>
                      {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                      {({ label }) => (
                        <div
                          key={`dropdown-option-${key}`}
                          className={classNames(
                            styles.DropdownItem,
                            styles.Title,
                          )}
                        >
                          {label}
                        </div>
                      )}
                    </DropdownItem>
                    {value.map((item, index) => {
                      return (
                        <DropdownItem
                          key={`quote-option-${index}`}
                          label={item.label}
                        >
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                          {({ itemId, label, handleOptionClick }) => (
                            <Link
                              className={classNames(
                                styles.DropdownItem,
                                styles.Link,
                              )}
                              key={`dropdown-option-${itemId}`}
                              path={item.path}
                              onClick={() => {
                                handleOptionClick(itemId);
                              }}
                            >
                              <>
                                {label}
                                {quoteType === item.key && (
                                  <Icon
                                    addClass={styles.Icon}
                                    type="IconCheck"
                                  />
                                )}
                              </>
                            </Link>
                          )}
                        </DropdownItem>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </Dropdown>
          <Dropdown
            align="left"
            iconTypeRight="IconChevronDown"
            iconTypeRightActive="IconChevronUp"
            label="Währungen"
            variant="secondary"
          >
            <div className={styles.DropdownWrapper}>
              {Object.entries(DROPDOWN_CURRENCIES).map(([key, value]) => {
                return (
                  <>
                    <DropdownItem label={key}>
                      {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                      {({ label }) => (
                        <div
                          key={`dropdown-option-${key}`}
                          className={classNames(
                            styles.DropdownItem,
                            styles.Title,
                          )}
                        >
                          {label}
                        </div>
                      )}
                    </DropdownItem>
                    {value.map((item, index) => {
                      return (
                        <DropdownItem
                          key={`qurrencies-option-${index}`}
                          label={item.label}
                        >
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                          {({ itemId, label, handleOptionClick }) => (
                            <Link
                              className={classNames(
                                styles.DropdownItem,
                                styles.Link,
                              )}
                              key={`dropdown-option-${itemId}`}
                              path={item.path}
                              onClick={() => {
                                handleOptionClick(itemId);
                              }}
                            >
                              <>
                                {label}
                                {quoteType === item.key && (
                                  <Icon
                                    addClass={styles.Icon}
                                    type="IconCheck"
                                  />
                                )}
                              </>
                            </Link>
                          )}
                        </DropdownItem>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </Dropdown>
          <Dropdown
            align="left"
            iconTypeRight="IconChevronDown"
            iconTypeRightActive="IconChevronUp"
            label="Rohstoffe und Edelmetalle"
            variant="secondary"
          >
            <div className={styles.DropdownWrapper}>
              {Object.entries(DROPDOWN_RAW_MATERIAL).map(([key, value]) => {
                return (
                  <>
                    <DropdownItem label={key}>
                      {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                      {({ label }) => (
                        <div
                          key={`dropdown-option-${key}`}
                          className={classNames(
                            styles.DropdownItem,
                            styles.Title,
                          )}
                        >
                          {label}
                        </div>
                      )}
                    </DropdownItem>
                    {value.map((item) => {
                      return (
                        <DropdownItem
                          key={`raw-option-${item.key}`}
                          label={item.label}
                        >
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                          {({ itemId, label, handleOptionClick }) => (
                            <Link
                              className={classNames(
                                styles.DropdownItem,
                                styles.Link,
                              )}
                              key={`dropdown-option-${itemId}`}
                              path={item.path}
                              onClick={() => {
                                handleOptionClick(itemId);
                              }}
                            >
                              <>
                                {label}
                                {quoteType === item.key && (
                                  <Icon
                                    addClass={styles.Icon}
                                    type="IconCheck"
                                  />
                                )}
                              </>
                            </Link>
                          )}
                        </DropdownItem>
                      );
                    })}
                  </>
                );
              })}
              {/* somehow the factory expect to have more the one item as children */}
              <></>
            </div>
          </Dropdown>
        </div>
        <div>
          <Dropdown
            align="right"
            iconTypeRight="IconChevronDown"
            iconTypeRightActive="IconChevronUp"
            label="Ansicht"
            variant="secondary"
          >
            <>
              {Object.entries(DROPDOWN_VIEW).map(([key, value]) => {
                return (
                  <>
                    {value.map((item) => {
                      return (
                        <DropdownItem
                          key={`view-option-${key}-${item.key}`}
                          label={item.label}
                        >
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                          {({ itemId, label, handleOptionClick }) => (
                            <Link
                              className={classNames(
                                styles.DropdownItem,
                                styles.Link,
                              )}
                              key={`dropdown-option-${itemId}`}
                              onClick={() => {
                                if (item.key === DEFAULT_TABLE) {
                                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                                  delete location.query.ansicht;
                                  const newParams = {
                                    ...location.query,
                                  };
                                  debouncedSetSearchParams(newParams);
                                  handleOptionClick(itemId);
                                  return;
                                }
                                const newParams = {
                                  ...location.query,
                                  ansicht: item.action,
                                };
                                debouncedSetSearchParams(newParams);
                                handleOptionClick(itemId);
                              }}
                            >
                              <>
                                {label}
                                {tableView === item.action && (
                                  <Icon
                                    addClass={styles.Icon}
                                    type="IconCheck"
                                  />
                                )}
                              </>
                            </Link>
                          )}
                        </DropdownItem>
                      );
                    })}
                  </>
                );
              })}
              {/* somehow the factory expect to have more the one item as children */}
              <></>
            </>
          </Dropdown>
        </div>
      </div>

      <div id={PAGER_ANCHOR_SCROLL_ID} />

      <Table
        /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<null>' is not assignable to type 'MutableRefObject<boolean>'. */
        isDirtySortTableRef={isDirtySortTableRef}
        component={tableType}
        data={tableDataUpdated || tableDataCopy}
        groupType={'no-grouping'}
        type="quote-list"
        tableHeaders={QUOTES_TABLE_HEADERS}
        location={location}
      />

      {/* @ts-ignore TODO: TS2339 ->  Property 'itemsPerPage' does not exist on type 'never'. */}
      {currentValue?.itemsPerPage &&
        widgetParagraph?.quoteList?.quoteList?.count && (
          <Pager
            itemsCount={widgetParagraph?.quoteList?.quoteList?.count || 0}
            /* @ts-ignore TODO: TS2339 ->  Property 'itemsPerPage' does not exist on type 'never'. */
            itemsPerPage={currentValue.itemsPerPage}
            currentPage={page}
            component={PAGER_TYPE_PAGE_LOADER}
            anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
          />
        )}
    </div>
  );
};

export default compose<any, any>(withScrollOnLoad({ offset: 170 }))(QuoteList);
