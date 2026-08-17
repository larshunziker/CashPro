import React, { useState } from 'react';
import { useMatch, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { downloadPortfolioCSV, printTable } from '../Portfolio/helpers';
import {
  handleDeleteClick,
  handleEditClick,
  handleSetDefaultClick,
  saveUserSettings,
} from './helpers';
import Link from '../../../../../../../common/components/Link';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Dropdown from '../../../../components/Dropdown';
import DropdownItem from '../../../../components/Dropdown/components/DropdownItem';
import Icon from '../../../../components/Icon';
import { addOtherAsset } from '../../../../components/PortfolioManagementForm/components/AddOtherAssetForm';
import { displayErrorToast } from '../../../../components/Toast';
import { addCashItem } from '../CashItems/components/AddCashItem';
import modal from '../../../../components/Modal';
import { portfolioByKeyApolloConfig } from '../Portfolio/apolloConfig';
import { watchlistByKeyApolloConfig } from '../Watchlist/apolloConfig';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import { DEFAULT_ERROR_MESSAGE } from '../../../../components/Toast/constants';
import { ROUTE_PORTFOLIO, ROUTE_WATCHLIST } from '../../../../constants';
import {
  CURRENCY_GROUPING,
  CUSTOM_VIEW,
  CUSTOM_VIEW_TABLE,
  DEFAULT_TABLE,
  LIMIT_TABLE,
  LIMIT_VIEW,
  MARKET_GROUPING,
  MONITOR_TABLE,
  MONITOR_VIEW,
  ORIGINAL_CURRENCY_TABLE,
  ORIGINAL_CURRENCY_VIEW,
  PAPER_VALUES_GROUPING,
  PERFORMANCE_TABLE,
  PERFORMANCE_VIEW,
  SPECIAL_INFO_TABLE,
  SPECIAL_INFO_VIEW,
  TRADER_TABLE,
  TRADER_VIEW,
} from '../Table/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/sc */
import { EDIT_DEFAULTS } from '../../queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../CustomView/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screen */
import { EDIT_USER_CUSTOM_ORDER_SETTINGS } from '../CustomView/queries';
import {
  DELETE_PORTFOLIO,
  EDIT_PORTFOLIO,
  GET_PORTFOLIO_BY_KEY,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolio/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
} from '../Portfolio/queries';
import {
  DELETE_WATCHLIST,
  EDIT_WATCHLIST,
  GET_WATCHLIST_BY_KEY,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Watchlist/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
} from '../Watchlist/queries';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActionButtonsProps } from './typings';

const ActionButtons = ({
  currentKey,
  name,
  isDefault,
  userSettings,
  query,
  isDirty,
  tableType,
  isLoading,
  isEmpty,
  soldOutPositions = false,
  portfolio,
  headers,
  isDirtySortTableRef,
}: ActionButtonsProps) => {
  const customOrder = JSON.parse(userSettings?.customOrder || 'null');
  const [editDefaultsMutation] = useMutation(EDIT_DEFAULTS);
  const [editPortfolioMutation] = useMutation(EDIT_PORTFOLIO);
  const [editWatchlistMutation] = useMutation(EDIT_WATCHLIST);
  const [deletePortfolioMutation] = useMutation(DELETE_PORTFOLIO);
  const [deleteWatchlistMutation] = useMutation(DELETE_WATCHLIST);
  const [editUserSettingsCustomOrderMutation] = useMutation(
    EDIT_USER_CUSTOM_ORDER_SETTINGS,
  );
  const isPortfolio = useMatch(`/${ROUTE_PORTFOLIO}/*`);
  const isWatchlist = useMatch(`/${ROUTE_WATCHLIST}/*`);

  const originType =
    isPortfolio?.pathnameBase.replace('/', '') ||
    isWatchlist?.pathnameBase.replace('/', '');

  const [submitError, setSubmitError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const deleteMutation =
    (isPortfolio && deletePortfolioMutation) || deleteWatchlistMutation;
  const editMutation =
    (isPortfolio && editPortfolioMutation) || editWatchlistMutation;

  const { ...options } =
    (isWatchlist &&
      watchlistByKeyApolloConfig.options({
        location,
        params: {
          watchlistKey: currentKey,
        },
      })) ||
    portfolioByKeyApolloConfig.options({
      location,
      params: {
        portfolioKey: currentKey,
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams({});
  const navigate = useStableNavigate();

  /* @ts-ignore TODO: TS7006 ->  Parameter 'query' implicitly has an 'any' type. */
  const setActions = (query) => {
    isDirty.current = 'true';
    isDirtySortTableRef.current = null;
    const queryCopy = JSON.parse(JSON.stringify(query));
    delete queryCopy['sortBy'];
    delete queryCopy['direction'];
    setSearchParams({
      ...queryCopy,
    });
  };

  const shouldDisplayViewAndGrouping = !isEmpty || soldOutPositions;

  return (
    <div
      key={`action-buttons-${JSON.stringify(query)}-${JSON.stringify(
        userSettings,
      )}-${name}`}
      className={classNames(styles.ButtonWrapper, 'hide-on-print')}
    >
      {shouldDisplayViewAndGrouping && (
        <>
          <div className={styles.ButtonItem}>
            <Dropdown
              align="right"
              iconTypeLeft="IconTableVertical"
              iconTypeRight="IconChevronDown"
              iconTypeRightActive="IconChevronUp"
              label="Standard Ansicht"
              loading={isLoading}
            >
              <>
                <DropdownItem
                  label="Standard Ansicht"
                  initActive={tableType === DEFAULT_TABLE}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => (
                    <div
                      key={`dropdown-option-${itemId}`}
                      className={classNames(styles.DropdownViewLink, {
                        [styles.Active]: isActive,
                      })}
                      role="link"
                      tabIndex={0}
                      onClick={(event) => {
                        event.preventDefault();
                        handleOptionClick(itemId);
                        delete query.type;
                        setActions(query);
                      }}
                      onKeyDown={(event) => {
                        event.preventDefault();
                        handleOptionClick(itemId);
                        delete query.type;
                        setActions(query);
                      }}
                    >
                      {label}
                      {isActive ? (
                        <Icon
                          type="IconCheck"
                          addClass={styles.CheckmarkIcon}
                        ></Icon>
                      ) : null}
                    </div>
                  )}
                </DropdownItem>
                {(isPortfolio && (
                  <DropdownItem
                    label={'Original-Währung Ansicht'}
                    initActive={tableType === ORIGINAL_CURRENCY_TABLE}
                  >
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {({ handleOptionClick, itemId, isActive, label }) => (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: ORIGINAL_CURRENCY_VIEW,
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: ORIGINAL_CURRENCY_VIEW,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    )}
                  </DropdownItem>
                )) || (
                  <DropdownItem
                    label={'Trader Ansicht'}
                    initActive={tableType === TRADER_TABLE}
                  >
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {({ handleOptionClick, itemId, isActive, label }) => (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: TRADER_VIEW,
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: TRADER_VIEW,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    )}
                  </DropdownItem>
                )}
                <DropdownItem
                  label={'Limiten Ansicht'}
                  initActive={tableType === LIMIT_TABLE}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => {
                    return (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: LIMIT_VIEW,
                          });
                        }}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: LIMIT_VIEW,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    );
                  }}
                </DropdownItem>
                <DropdownItem
                  label={'Performance Ansicht'}
                  initActive={tableType === PERFORMANCE_TABLE}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => {
                    return (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: PERFORMANCE_VIEW,
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: PERFORMANCE_VIEW,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    );
                  }}
                </DropdownItem>
                {(isPortfolio && (
                  <DropdownItem
                    label={'Spezial-Infos'}
                    initActive={tableType === SPECIAL_INFO_TABLE}
                  >
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {({ handleOptionClick, itemId, isActive, label }) => {
                      return (
                        <div
                          key={`dropdown-option-${itemId}`}
                          className={classNames(styles.DropdownViewLink, {
                            [styles.Active]: isActive,
                          })}
                          role="link"
                          tabIndex={0}
                          onClick={(event) => {
                            event.preventDefault();
                            handleOptionClick(itemId);
                            setActions({
                              ...query,
                              type: SPECIAL_INFO_VIEW,
                            });
                          }}
                          onKeyDown={(event) => {
                            event.preventDefault();
                            handleOptionClick(itemId);
                            setActions({
                              ...query,
                              type: SPECIAL_INFO_VIEW,
                            });
                          }}
                        >
                          {label}
                          {isActive ? (
                            <Icon
                              type="IconCheck"
                              addClass={styles.CheckmarkIcon}
                            ></Icon>
                          ) : null}
                        </div>
                      );
                    }}
                  </DropdownItem>
                )) || <></>}
                <DropdownItem
                  label={'Monitor Ansicht'}
                  initActive={tableType === MONITOR_TABLE}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => {
                    return (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: MONITOR_VIEW,
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          setActions({
                            ...query,
                            type: MONITOR_VIEW,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    );
                  }}
                </DropdownItem>
                <DropdownItem
                  label="Eigene Ansicht"
                  initActive={tableType === CUSTOM_VIEW_TABLE}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => {
                    if (!userSettings?.customView) {
                      return null;
                    }
                    return (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            type: CUSTOM_VIEW,
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          setActions({
                            ...query,
                            type: CUSTOM_VIEW,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    );
                  }}
                </DropdownItem>
              </>
            </Dropdown>
          </div>
          <div className={styles.ButtonItem}>
            <Dropdown
              align="right"
              iconTypeRight="IconChevronDown"
              iconTypeRightActive="IconChevronUp"
              iconTypeLeft="IconTableHorizontal"
              loading={isLoading}
            >
              <>
                <DropdownItem
                  label="Wertschriften-Typ"
                  initActive={query.group === PAPER_VALUES_GROUPING}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => {
                    return (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            group: PAPER_VALUES_GROUPING,
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            group: PAPER_VALUES_GROUPING,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    );
                  }}
                </DropdownItem>
                <DropdownItem
                  label="Währung"
                  initActive={query.group === CURRENCY_GROUPING}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => {
                    return (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            group: CURRENCY_GROUPING,
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            group: CURRENCY_GROUPING,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    );
                  }}
                </DropdownItem>
                <DropdownItem
                  label="Börse"
                  initActive={query.group === MARKET_GROUPING}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => {
                    return (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            group: MARKET_GROUPING,
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            group: MARKET_GROUPING,
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    );
                  }}
                </DropdownItem>
                <DropdownItem
                  label="keine Gruppierung"
                  initActive={!query.group || query.group === 'no-grouping'}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {({ handleOptionClick, itemId, isActive, label }) => {
                    return (
                      <div
                        key={`dropdown-option-${itemId}`}
                        className={classNames(styles.DropdownViewLink, {
                          [styles.Active]: isActive,
                        })}
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            group: 'no-grouping',
                          });
                        }}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          handleOptionClick(itemId);
                          setActions({
                            ...query,
                            group: 'no-grouping',
                          });
                        }}
                      >
                        {label}
                        {isActive ? (
                          <Icon
                            type="IconCheck"
                            addClass={styles.CheckmarkIcon}
                          ></Icon>
                        ) : null}
                      </div>
                    );
                  }}
                </DropdownItem>
              </>
            </Dropdown>
          </div>
        </>
      )}
      <>
        <div className={styles.ButtonItem}>
          <Dropdown
            align="right"
            iconTypeLeft="IconPenToSquare"
            label="Bearbeiten"
            loading={isLoading || deleteLoading}
          >
            <>
              <DropdownItem>
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                {({ setIsOpen }) => {
                  return (
                    <div
                      className={styles.DropdownViewLink}
                      role="link"
                      tabIndex={0}
                      onClick={(event) => {
                        event.preventDefault();
                        handleSetDefaultClick(
                          isDefault,
                          editMutation,
                          {
                            currentKey,
                            name,
                            isDefault: true,
                          },
                          submitError,
                          setSubmitError,
                          originType,
                        );
                        setIsOpen(false);
                      }}
                      onKeyDown={(event) => {
                        event.preventDefault();
                        handleSetDefaultClick(
                          isDefault,
                          editMutation,
                          {
                            currentKey,
                            name,
                            isDefault: true,
                          },
                          submitError,
                          setSubmitError,
                          originType,
                        );
                        setIsOpen(false);
                      }}
                    >
                      <div className={styles.DropdownListItem}>
                        <Icon
                          addClass={styles.Icons}
                          type={(isDefault && `IconStarSolid`) || `IconStar`}
                        ></Icon>
                        {(isPortfolio && (
                          <p>
                            {(isDefault && 'Dies ist Ihr Standard-Portfolio') ||
                              `Als Standard-Portfolio setzen`}
                            <span className={styles.DescriptionFavorit}>
                              Wird jeweils auf der rechten Seite als
                              Mini-Portfolio angezeigt.
                            </span>
                          </p>
                        )) ||
                          (isWatchlist && (
                            <p>
                              {(isDefault &&
                                'Dies ist Ihre Standard-Watchlist') ||
                                `Als Standard-Watchlist setzen`}
                              <span className={styles.DescriptionFavorit}>
                                Wird jeweils auf der rechten Seite als
                                Mini-Watchlist angezeigt.
                              </span>
                            </p>
                          ))}
                      </div>
                    </div>
                  );
                }}
              </DropdownItem>
              <DropdownItem label="Umbenennen">
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                {({ setIsOpen }) => {
                  return (
                    <Link
                      className={styles.DropdownViewLink}
                      onClick={(event) => {
                        event.preventDefault();
                        setIsOpen(false);
                        handleEditClick({
                          key: currentKey,
                          name,
                          isDefault,
                          navigate,
                          originType,
                        });
                      }}
                    >
                      <div className={styles.DropdownListItem}>
                        <Icon
                          type="IconPenToSquare"
                          addClass={styles.Icons}
                        ></Icon>
                        <p>Umbenennen</p>
                      </div>
                    </Link>
                  );
                }}
              </DropdownItem>
              <DropdownItem label="Löschen">
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                {({ setIsOpen }) => {
                  return (
                    <div
                      className={styles.DropdownViewLink}
                      role="link"
                      tabIndex={0}
                      onClick={(event) => {
                        event.preventDefault();
                        handleDeleteClick({
                          name,
                          key: currentKey,
                          isDefault,
                          deleteMutation,
                          setDeleteLoading,
                          navigate,
                          originType,
                        });
                        setIsOpen(false);
                      }}
                      onKeyDown={(event) => {
                        event.preventDefault();
                        handleDeleteClick({
                          name,
                          key: currentKey,
                          isDefault,
                          deleteMutation,
                          setDeleteLoading,
                          navigate,
                          originType,
                        });
                        setIsOpen(false);
                      }}
                    >
                      <div
                        className={classNames(
                          styles.DropdownListItem,
                          styles.DeleteItem,
                        )}
                      >
                        <Icon type="IconTrash" addClass={styles.Icons}></Icon>
                        <p>Löschen</p>
                      </div>
                    </div>
                  );
                }}
              </DropdownItem>
            </>
          </Dropdown>
        </div>
        {(isEmpty && !soldOutPositions && <></>) || (
          <div className={styles.ButtonItem}>
            <Dropdown
              align="right"
              iconTypeLeft="IconThreeDots"
              label="Mehr"
              loading={isLoading || editLoading}
            >
              {(!isEmpty && (
                <>
                  <DropdownItem label="Ansicht und Gruppierung merken">
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {({ setIsOpen, label }) => {
                      return (
                        <Link
                          className={styles.DropdownViewLink}
                          onClick={(event) => {
                            event.preventDefault();
                            setEditLoading(true);
                            saveUserSettings({
                              currentKey,
                              query,
                              editDefaultsMutation,
                              setEditLoading,
                              setSubmitError,
                              submitError,
                              isDirty,
                              originType,
                            });
                            setIsOpen(false);
                          }}
                        >
                          <div className={styles.DropdownListItem}>
                            <Icon
                              addClass={styles.Icons}
                              type="IconTableVertical"
                            ></Icon>
                            <p>{label}</p>
                          </div>
                        </Link>
                      );
                    }}
                  </DropdownItem>
                  <DropdownItem
                    label={
                      (userSettings?.customView && 'Eigene Ansicht anpassen') ||
                      'Eigene Ansicht erstellen'
                    }
                  >
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {({ label }) => {
                      return (
                        <Link
                          className={styles.DropdownViewLink}
                          path={`/${originType}/${currentKey}/eigene-ansicht`}
                        >
                          <div className={styles.DropdownListItem}>
                            <Icon
                              type="IconSliders"
                              addClass={styles.Icons}
                            ></Icon>
                            <p>{label}</p>
                          </div>
                        </Link>
                      );
                    }}
                  </DropdownItem>
                  <DropdownItem label="Zeilen-Reihenfolge bearbeiten">
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {({ label }) => {
                      return (
                        <Link
                          className={styles.DropdownViewLink}
                          path={`/${originType}/${currentKey}/eigene-reihenfolge`}
                        >
                          <div className={styles.DropdownListItem}>
                            <Icon
                              type="IconArrowUpArrowDown"
                              addClass={styles.Icons}
                            ></Icon>
                            <p>{label}</p>
                          </div>
                        </Link>
                      );
                    }}
                  </DropdownItem>
                  <DropdownItem label="Zeilen-Reihenfolge zurücksetzen">
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                    {({ label, setIsOpen }) => {
                      return (
                        <Link
                          className={classNames(styles.DropdownViewLink, {
                            [styles.Disabled]: !Array.isArray(customOrder),
                          })}
                          onClick={(event) => {
                            event.preventDefault();
                            if (!customOrder) {
                              return;
                            }
                            setIsOpen(false);
                            modal({
                              title: 'Zeilen-Reihenfolge zurücksetzen',
                              hasStickyHeader: true,
                              hasStickyFooter: true,
                              closeOnClickOutside: false,
                              closeOnLocationChange: true,
                              content:
                                'Sind Sie sicher, dass Sie die Reihenfolge zurücksetzen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
                              buttons: [
                                {
                                  children: 'Abbrechen',
                                },
                                {
                                  variant: 'secondary',
                                  children: 'Zurücksetzen',
                                  onClick: () => {
                                    editUserSettingsCustomOrderMutation({
                                      variables: {
                                        key: currentKey,
                                        value: 'null',
                                        settingsType: originType,
                                      },
                                      refetchQueries: [
                                        {
                                          query:
                                            (isWatchlist &&
                                              GET_WATCHLIST_BY_KEY) ||
                                            GET_PORTFOLIO_BY_KEY,
                                          variables: {
                                            ...options.variables,
                                          },
                                        },
                                      ],
                                    }).then(async ({ data }): Promise<void> => {
                                      if (
                                        data?.editCustomOrder &&
                                        data?.editCustomOrder?.error &&
                                        data?.editCustomOrder?.error !== null
                                      ) {
                                        if (
                                          __CLIENT__ &&
                                          !toast.isActive('user-settings-error')
                                        ) {
                                          displayErrorToast(
                                            DEFAULT_ERROR_MESSAGE,
                                            'user-settings-error',
                                          );
                                        }
                                        return;
                                      }
                                      const scope = isWatchlist
                                        ? 'watchlist'
                                        : 'portfolio';
                                      // track tealium event
                                      tealiumTrackEvent({
                                        type: 'link',
                                        payload: {
                                          event_name: `${scope}_edit_custom_row_order`,
                                          event_category: scope,
                                          event_action: `${scope}_edit_custom_row_order`,
                                          [`${scope}_key`]: currentKey,
                                        },
                                      });
                                      (isPortfolio &&
                                        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                                        global.refetchPortfoliosGQL()) ||
                                        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                                        global.refetchWatchlistsGQL();
                                    });
                                  },
                                },
                              ],
                            });
                          }}
                        >
                          <div
                            className={classNames(styles.DropdownListItem, {
                              [styles.Disabled]: !Array.isArray(customOrder),
                            })}
                          >
                            <Icon
                              type="IconArrowRotateLeft"
                              addClass={styles.Icons}
                            ></Icon>
                            <p>{label}</p>
                          </div>
                        </Link>
                      );
                    }}
                  </DropdownItem>
                  {(isPortfolio && (
                    <>
                      <DropdownItem
                        label={`Ausverkaufte Titel ${
                          query['sold-out'] ? 'ausblenden' : 'einblenden'
                        }`}
                      >
                        {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                        {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                        {({ setIsOpen, label }) => {
                          return (
                            <Link
                              className={styles.DropdownViewLink}
                              onClick={(event) => {
                                event.preventDefault();
                                if (query['sold-out']) {
                                  delete query['sold-out'];
                                } else {
                                  query['sold-out'] = 'show';
                                }
                                setSearchParams({
                                  ...query,
                                });
                                setIsOpen(false);
                              }}
                            >
                              <div className={styles.DropdownListItem}>
                                <Icon
                                  type="IconHammer"
                                  addClass={styles.Icons}
                                ></Icon>
                                <p>{label}</p>
                              </div>
                            </Link>
                          );
                        }}
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          className={styles.DropdownViewLink}
                          path={`/portfolio/${currentKey}/transaktionen`}
                        >
                          <div className={styles.DropdownListItem}>
                            <Icon
                              type="IconArrowsRotateCheck"
                              addClass={styles.Icons}
                            ></Icon>
                            <p>Transaktionen anzeigen</p>
                          </div>
                        </Link>
                      </DropdownItem>
                      <DropdownItem label="Download CSV-Datei">
                        {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                        {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                        {({ setIsOpen, label }) => {
                          return (
                            <Link
                              className={styles.DropdownViewLink}
                              onClick={(event) => {
                                event.preventDefault();
                                /* @ts-ignore TODO: TS2345 ->  Argument of type 'Portfolio | undefined' is not assignable to parameter of type 'Portfolio'. */
                                downloadPortfolioCSV(portfolio, headers, query);
                                setIsOpen(false);
                              }}
                            >
                              <div className={styles.DropdownListItem}>
                                <Icon
                                  type="IconArrowDownToSquare"
                                  addClass={styles.Icons}
                                ></Icon>
                                <p>{label}</p>
                              </div>
                            </Link>
                          );
                        }}
                      </DropdownItem>
                      <DropdownItem label="Titel manuell eintragen">
                        {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                        {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                        {({ setIsOpen, label }) => {
                          return (
                            <Link
                              className={styles.DropdownViewLink}
                              onClick={(event) => {
                                event.preventDefault();
                                addOtherAsset({
                                  portfolioKey: currentKey,
                                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                                  portfolioCurrency: portfolio.currency,
                                  navigate,
                                });
                                setIsOpen(false);
                              }}
                            >
                              <div className={styles.DropdownListItem}>
                                <Icon
                                  type="IconPlus"
                                  addClass={styles.Icons}
                                ></Icon>
                                <p>{label}</p>
                              </div>
                            </Link>
                          );
                        }}
                      </DropdownItem>
                    </>
                  )) || <></>}
                </>
              )) || <></>}
              <DropdownItem label="Drucken">
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                {({ setIsOpen, label }) => {
                  return (
                    <Link
                      className={styles.DropdownViewLink}
                      onClick={(event) => {
                        event.preventDefault();
                        printTable();
                        setIsOpen(false);
                      }}
                    >
                      <div className={styles.DropdownListItem}>
                        <Icon type="IconPrint" addClass={styles.Icons}></Icon>
                        <p>{label}</p>
                      </div>
                    </Link>
                  );
                }}
              </DropdownItem>
              {(isPortfolio && (
                <>
                  <DropdownItem label="Konto Übersicht">
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {({ label }) => {
                      return (
                        <Link
                          className={styles.DropdownViewLink}
                          path={`/portfolio/${currentKey}/konto`}
                        >
                          <div className={styles.DropdownListItem}>
                            <Icon
                              type="IconCoins"
                              addClass={styles.Icons}
                            ></Icon>
                            <p>{label}</p>
                          </div>
                        </Link>
                      );
                    }}
                  </DropdownItem>
                  <DropdownItem label="Einzahlung">
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                    {({ label, setIsOpen }) => {
                      return (
                        <Link
                          className={styles.DropdownViewLink}
                          onClick={() => {
                            setIsOpen(false);
                            addCashItem({
                              portfolioKey: currentKey,
                              portfolioCurrency: portfolio?.currency,
                              navigate,
                              type: 'deposit',
                              origin: 'more-dropdown/cash-items-deposit',
                            });
                          }}
                        >
                          <div className={styles.DropdownListItem}>
                            <Icon
                              type="IconCirclePlus"
                              addClass={styles.Icons}
                            ></Icon>
                            <p>{label}</p>
                          </div>
                        </Link>
                      );
                    }}
                  </DropdownItem>
                  <DropdownItem label="Abhebung">
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                    {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                    {({ label, setIsOpen }) => {
                      return (
                        <Link
                          className={styles.DropdownViewLink}
                          onClick={() => {
                            setIsOpen(false);
                            addCashItem({
                              portfolioKey: currentKey,
                              portfolioCurrency: portfolio?.currency,
                              navigate,
                              type: 'withdraw',
                              origin: 'more-dropdown/cash-items-withdraw',
                            });
                          }}
                        >
                          <div className={styles.DropdownListItem}>
                            <Icon
                              type="IconCircleMinus"
                              addClass={styles.Icons}
                            ></Icon>
                            <p>{label}</p>
                          </div>
                        </Link>
                      );
                    }}
                  </DropdownItem>
                </>
              )) || <></>}
            </Dropdown>
          </div>
        )}

        <div className={classNames(styles.ButtonItem, grid.HiddenMdDown)}>
          <ButtonWithLoading
            size="small"
            iconTypeLeft="IconArrowRotateRight"
            onClick={() => {
              window.location.reload();
            }}
          >
            Aktualisieren
          </ButtonWithLoading>
        </div>
      </>
    </div>
  );
};

export default ActionButtons;
