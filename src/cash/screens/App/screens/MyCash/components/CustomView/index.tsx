import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import classNames from 'classnames';
import update from 'immutability-helper';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import {
  defaultOptions,
  scrollToAnchorElement,
} from '../../../../../../../common/components/SmoothScroll/helpers';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { sort } from '../Table/helpers';
import {
  getBreadcrumbsByType,
  getDataByGroup,
  getOptionsData,
} from './helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import ExpansionPanel from '../../../../components/ExpansionPanel';
import Helmet from '../../../../components/Helmet';
import MultiField from '../../../../components/Paragraphs/components/WebformParagraph/components/MultiField';
import StatusPage from '../../../StatusPage';
import ListItem from './components/ListItem';
import {
  displayErrorToast,
  displaySuccessToast,
} from '../../../../components/Toast';
import { headerMapping } from '../Table/components/headerMapping';
import modal from '../../../../components/Modal';
import { portfolioByKeyApolloConfig } from '../Portfolio/apolloConfig';
import { watchlistByKeyApolloConfig } from '../Watchlist/apolloConfig';
import { SCROLLABLE_DRAWER_CONTENT_ID } from '../../../../../../../common/components/ScrollableDrawerContent/constants';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { DEFAULT_ERROR_MESSAGE } from '../../../../components/Toast/constants';
import {
  ROUTE_PORTFOLIO,
  ROUTE_PORTFOLIO_CUSTOM_VIEW,
  ROUTE_WATCHLIST_CUSTOM_VIEW,
} from '../../../../constants';
import { CUSTOM_ORDER, CUSTOM_VIEW } from '../Table/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolio/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { GET_PORTFOLIO_BY_KEY } from '../Portfolio/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Watchlist/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { GET_WATCHLIST_BY_KEY } from '../Watchlist/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { EDIT_USER_CUSTOM_ORDER_SETTINGS, EDIT_USER_SETTINGS } from './queries';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
const CustomView = ({ location }) => {
  const isWatchlist = useMatch(ROUTE_WATCHLIST_CUSTOM_VIEW);
  const isPortfolio = useMatch(ROUTE_PORTFOLIO_CUSTOM_VIEW);
  /* @ts-ignore TODO: TS2339 ->  Property 'params' does not exist on type 'PathMatch<string> | null'. */
  const { params } = (isWatchlist !== null && isWatchlist) || isPortfolio;
  const navigate = useStableNavigate();
  const { key, type } = params;
  const isCustomOrder = type === CUSTOM_ORDER;
  const isCustomView = type === CUSTOM_VIEW;
  const [submitLoading, setSubmitLoading] = useState(false);
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const [editUserSettingsMutation] = useMutation(EDIT_USER_SETTINGS);
  const [editUserSettingsCustomOrderMutation] = useMutation(
    EDIT_USER_CUSTOM_ORDER_SETTINGS,
  );
  const isDirty = useRef(false);
  const scrollableForm = useRef();
  const formFields = useRef<FieldComponentProps[]>([]);
  const registerField = (formField: FieldComponentProps): void => {
    formFields.current.push(formField);
  };
  const breadcrumbItems = getBreadcrumbsByType(
    (isWatchlist && 'watchlist') || 'portfolio',
  );
  const breadcrumbItemsCopy = JSON.parse(JSON.stringify(breadcrumbItems));

  const { query, ...options } =
    (isWatchlist &&
      watchlistByKeyApolloConfig.options({
        location,
        params: {
          watchlistKey: key,
        },
      })) ||
    portfolioByKeyApolloConfig.options({
      location,
      params: {
        portfolioKey: key,
        withTransaction: 'false',
      },
    });

  const { data: fetchedData, loading } = useQuery(query, options);
  const data =
    (isWatchlist && fetchedData?.watchlist) ||
    (isPortfolio && fetchedData?.portfolio) ||
    null;
  const customView = JSON.parse(
    (isWatchlist && data?.watchlistSettings?.customView) ||
      (isPortfolio && data?.portfolioSettings?.customView) ||
      'null',
  );
  const customOrder = JSON.parse(
    (isWatchlist && data?.watchlistSettings?.customOrder) ||
      (isPortfolio && data?.portfolioSettings?.customOrder) ||
      'null',
  );

  const initialCustomList = useMemo(() => ['name', 'lval'], []);
  const [customList, setCustomList] = useState(null);
  const [listItems, setListItems] = useState([]);

  const cleanCustomView =
    customView &&
    customView.length > 0 &&
    /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    customView?.reduce((acc, item) => {
      acc.push(item.field);
      return acc;
    }, []);

  if (cleanCustomView && !isCustomOrder) {
    isDirty.current = true;
  }

  if (!loading && listItems.length === 0 && isCustomView) {
    const list = cleanCustomView || initialCustomList;
    setCustomList(list);
    /* @ts-ignore TODO: TS7006 ->  Parameter 'obj' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
    const filteredList = list?.reduce((obj, key) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly name */
      if (headerMapping[key]) {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly name */
        obj[key] = headerMapping[key];
      }
      return obj;
    }, []);
    setListItems(filteredList && Object.entries(filteredList));
  } else if (!loading && listItems.length === 0 && isCustomOrder) {
    const list = customOrder || [];
    setCustomList(list);
    const instruments =
      (customOrder &&
        (data?.calculatedFields?.instruments || data?.instruments) &&
        sort(
          (isWatchlist &&
            JSON.parse(JSON.stringify(data?.instruments || null))) ||
            JSON.parse(
              JSON.stringify(data?.calculatedFields?.instruments || null),
            ),
          'instrumentKey',
          'asc',
          customOrder,
        )) ||
      (isWatchlist &&
        data?.instruments &&
        sort(JSON.parse(JSON.stringify(data?.instruments)), 'mName', 'asc')) ||
      (isPortfolio &&
        data?.calculatedFields?.instruments &&
        sort(
          JSON.parse(JSON.stringify(data?.calculatedFields?.instruments)),
          'name',
          'asc',
        ));
    setListItems(instruments || []);
  }

  const handleEditUsersettings = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'newListItems' implicitly has an 'any' type. */
    (newListItems, origin = 'drag') => {
      setSubmitLoading(true);
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      let prepareCustomView = newListItems.map((item) => {
        return {
          type: null,
          field: item[0],
        };
      });

      if (isCustomOrder) {
        /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        prepareCustomView = newListItems?.reduce((acc, item) => {
          acc.push(item?.instrumentKey);
          return acc;
        }, []);
      }

      const variables: any = {
        key,
        value: JSON.stringify(prepareCustomView),
        settingsType: (isWatchlist && 'watchlist') || 'portfolio',
      };

      const mutation = isCustomView
        ? editUserSettingsMutation
        : editUserSettingsCustomOrderMutation;

      mutation({
        variables,
        refetchQueries: [
          {
            query:
              (isWatchlist && GET_WATCHLIST_BY_KEY) || GET_PORTFOLIO_BY_KEY,
            variables: {
              ...options.variables,
            },
          },
        ],
      }).then(async ({ data }): Promise<void> => {
        if (
          (data?.editCustomView &&
            data?.editCustomView?.error &&
            data?.editCustomView?.error !== null) ||
          (data?.editCustomOrder &&
            data?.editCustomOrder?.error &&
            data?.editCustomOrder?.error !== null)
        ) {
          if (!toast.isActive('user-settings-error')) {
            displayErrorToast(DEFAULT_ERROR_MESSAGE, 'user-settings-error');
          }
          setSubmitLoading(false);
          return;
        }
        setSubmitLoading(false);
        if (isCustomView) {
          isDirty.current = true;
        }
        // update MiniWatchlist component as well
        if (
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.MiniWatchlistRefetch &&
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          typeof global.MiniWatchlistRefetch === 'function'
        ) {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.MiniWatchlistRefetch();
        }
        const scope = isWatchlist ? 'watchlist' : 'portfolio';
        const event = isCustomView ? 'view' : 'row_order';
        // track tealium event
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: `${scope}_edit_custom_${event}`,
            event_category: scope,
            event_action: `${scope}_edit_custom_${event}`,
            [`${scope}_key`]: key,
          },
        });
        if (!toast.isActive('user-settings-success') && origin === 'form') {
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          if (prepareCustomView.length > customList.length) {
            scrollToAnchorElement('last-item', {
              ...defaultOptions,
              offset: 350,
              replace: false,
            });
          }
        }
      });
    },
    [
      editUserSettingsMutation,
      editUserSettingsCustomOrderMutation,
      key,
      customList,
      isCustomView,
      isCustomOrder,
      isWatchlist,
      options.variables,
    ],
  );

  const updateListItems = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'newListItems' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
    (newListItems, origin) => {
      setListItems(newListItems);
      /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      const cleanCustomView = newListItems?.reduce((acc, item) => {
        acc.push(item?.[0]);
        return acc;
      }, []);
      setCustomList(cleanCustomView);
      handleEditUsersettings(newListItems, origin);
    },
    [handleEditUsersettings],
  );
  const saveListItems = useCallback(() => {
    const items = listItems;
    setListItems(items);
    handleEditUsersettings(items);
  }, [handleEditUsersettings, listItems]);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const removeListItemByIndex = (index) => {
    setListItems((prevCards) => {
      const list = update(prevCards, {
        $splice: [[index, 1]],
      });
      const cleanCustomView = list?.reduce((acc, item) => {
        acc.push(item?.[0]);
        return acc;
      }, []);
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'never[]' is not assignable to parameter of type 'SetStateAction<null>'. */
      setCustomList(cleanCustomView);
      handleEditUsersettings(list);
      return list;
    });
  };
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const moveListItemToTop = (index) => {
    setListItems((prevCards) => {
      const list = update(prevCards, {
        $splice: [
          [index, 1],
          [0, 0, prevCards[index]],
        ],
      });
      handleEditUsersettings(list);
      return list;
    });
  };

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setListItems((prevCards) => {
      return update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      });
    });
  }, []);

  const getValue = (id: string): string => {
    const formField = formFields.current.find(
      (field: FieldComponentProps): boolean => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return field.getId() === id;
      },
    );
    /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
    return formField ? formField.getValue() : '';
  };

  if (!isCustomView && !isCustomOrder) {
    return <StatusPage statusCode={404}></StatusPage>;
  }

  if (isCustomOrder) {
    breadcrumbItemsCopy.edges.pop();
    breadcrumbItemsCopy.edges.push({
      node: {
        id: 'custom-order',
        label: 'Zeilen-Reihenfolge bearbeiten',
        link: '',
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    });
  }

  if (data?.name && !isWatchlist) {
    breadcrumbItemsCopy.edges[1].node.label = data?.name;
    breadcrumbItemsCopy.edges[1].node.link =
      (data.defaultPortfolio && `/${ROUTE_PORTFOLIO}`) ||
      `/${ROUTE_PORTFOLIO}/${key}`;
  }

  const handleNavigateBack = () => {
    if (isWatchlist) {
      navigate(
        `/watchlist${
          data.standard
            ? ''
            : `/${key}${(isDirty.current && '?type=' + CUSTOM_VIEW) || ''}`
        }`,
      );
    } else if (isPortfolio) {
      navigate(
        `/portfolio${
          data.defaultPortfolio
            ? ''
            : `/${key}${(isDirty.current && '?type=' + CUSTOM_VIEW) || ''}`
        }`,
      );
    } else {
      return;
    }
  };

  return (
    <>
      <Helmet
        meta={[
          {
            name: 'robots',
            content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
          },
        ]}
      ></Helmet>
      <div className={styles.Wrapper}>
        {(!isHybridApp && (
          <Breadcrumbs
            pageUrl={location.pathname}
            items={breadcrumbItemsCopy}
          />
        )) ||
          null}
        <div className={styles.BackButtonWrapper}>
          <ButtonWithLoading
            size="small"
            loading={loading || submitLoading}
            variant="secondary"
            iconTypeLeft="IconChevronLeft"
            onClick={() => handleNavigateBack()}
          >
            {`zurück ${(isWatchlist && 'zur Watchlist') || `zum Portfolio`}`}
          </ButtonWithLoading>
        </div>
        <h1 className={styles.Heading}>
          {(isCustomView && 'Eigene Ansicht anpassen') ||
            'Zeilen-Reihenfolge bearbeiten'}
        </h1>
        <div className={styles.SubTitle}>{data?.name || <>&nbsp;</>}</div>
        <div
          className={classNames(
            grid.ColSm16,
            grid.ColOffsetSm4,
            grid.ColXl12,
            grid.ColOffsetXl6,
          )}
        >
          <div className={styles.Lead}>
            {(isCustomView && (
              <>
                Passen Sie die Tabelle an Ihre Bedürfnisse an. Die Reihenfolge
                der Spalten kann per{' '}
                <span className={styles.Bold}>Drag and Drop</span> geändert
                werden. Um eine Spalte schnell an die vorderste Position zu
                setzen, können Sie auf den Pfeil nach oben klicken. Ihre
                Änderungen werden sofort gespeichert.
              </>
            )) || (
              <>
                Passen Sie die Tabelle an Ihre Bedürfnisse an. Die Reihenfolge
                der Zeilen kann per{' '}
                <span className={styles.Bold}>Drag and Drop</span> geändert
                werden. Um eine Zeile schnell an die oberste Position zu setzen,
                können Sie auf den Pfeil nach oben klicken. Ihre Änderung sind
                sofort gespeichert.
              </>
            )}
          </div>

          {!loading && (
            <div className={styles.ListWrapper}>
              {isCustomView && (
                <div className={styles.ButtonWrapper}>
                  <ButtonWithLoading
                    loading={loading}
                    variant="secondary"
                    onClick={(event) => {
                      event.preventDefault();
                      modal({
                        hasStickyHeader: true,
                        hasStickyFooter: true,
                        hideDefaultButtons: true,
                        type: 'drawer',
                        title: 'Felder hinzufügen',
                        closeOnClickOutside: false,
                        closeOnLocationChange: true,
                        /* @ts-ignore TODO: TS7031 ->  Binding element 'overlayClose' implicitly has an 'any' type. */
                        /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
                        customUi: ({ close: overlayClose, drawerRef }) => {
                          /* @ts-ignore TODO: TS7006 ->  Parameter 'formEvent' implicitly has an 'any' type. */
                          const validateForm = (formEvent): void => {
                            formEvent.preventDefault();
                            const errors: Array<boolean> = formFields.current
                              .map((formField: FieldComponentProps): boolean =>
                                /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
                                formField.validate(),
                              )
                              .filter((result: boolean): boolean => !result);

                            if (errors.length) {
                              return;
                            }

                            const values = {};
                            // get the values of all registered fields within this form
                            formFields.current.forEach(
                              (formField: FieldComponentProps): void => {
                                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
                                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                                /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
                                return (values[formField.getId()] =
                                  /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
                                  formField.getValue());
                              },
                            );

                            /* @ts-ignore TODO: TS7034 ->  Variable 'newList' implicitly has type 'any[]' in some locations where its type cannot be determined. */
                            const newList = [];
                            for (const key in values) {
                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
                              /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
                              values[key].forEach((item) => {
                                newList.push(item);
                              });
                            }
                            const list = customList || initialCustomList;
                            const oldList = list.filter((item) =>
                              /* @ts-ignore TODO: TS7005 ->  Variable 'newList' implicitly has an 'any[]' type. */
                              newList.includes(item),
                            );
                            const listToUpdate = [
                              /* @ts-ignore TODO: TS7005 ->  Variable 'newList' implicitly has an 'any[]' type. */
                              ...new Set([...oldList, ...newList]),
                            ];

                            /* @ts-ignore TODO: TS7034 ->  Variable 'filteredList' implicitly has type 'any[]' in some locations where its type cannot be determined. */
                            const filteredList = [];
                            listToUpdate.forEach((key) => {
                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly name */
                              if (headerMapping[key]) {
                                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly name */
                                filteredList[key] = headerMapping[key];
                              }
                            });

                            displaySuccessToast(
                              'Ihre Ansicht wurden erfolgreich angepasst.',
                              'modified-table-columns',
                            );

                            if (listToUpdate.length < 1) {
                              formFields.current.forEach((formField) =>
                                /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
                                formField.setIsValid(false),
                              );

                              const scrollableMobile = document.getElementById(
                                SCROLLABLE_DRAWER_CONTENT_ID,
                              );
                              const scrollableDesktop = scrollableForm.current;

                              [scrollableDesktop, scrollableMobile].forEach(
                                (anker) => {
                                  if (anker) {
                                    anker.scrollTo({
                                      left: 0,
                                      top: 0,
                                      behavior:
                                        defaultOptions.behavior as ScrollBehavior,
                                    });
                                  }
                                },
                              );

                              return;
                            }

                            /* @ts-ignore TODO: TS2345 ->  Argument of type 'any[]' is not assignable to parameter of type 'SetStateAction<null>'. */
                            setCustomList(listToUpdate);
                            updateListItems(
                              /* @ts-ignore TODO: TS7005 ->  Variable 'filteredList' implicitly has an 'any[]' type. */
                              Object.entries(filteredList),
                              'form',
                            );
                            overlayClose();
                          };

                          // translate Stammdaten to english
                          const baseData = getDataByGroup(
                            headerMapping,
                            'Stammdaten',
                          );
                          const watchlistOrPortfolioData = getDataByGroup(
                            headerMapping,
                            (isWatchlist && `Watchlist`) || `Portfolio`,
                          );
                          const intradayData = getDataByGroup(
                            headerMapping,
                            'Intraday',
                          );
                          const portolioExtendedData = getDataByGroup(
                            headerMapping,
                            'Portfolio erweitert',
                          );
                          const intradayExtendedData = getDataByGroup(
                            headerMapping,
                            'Intraday erweitert',
                          );
                          const fundamentalData = getDataByGroup(
                            headerMapping,
                            'Fundamentaldaten',
                          );
                          const fundamentalExtendedData = getDataByGroup(
                            headerMapping,
                            'Fundamentaldaten erweitert',
                          );
                          const quoteMonitorData = getDataByGroup(
                            headerMapping,
                            'Aktienmonitor',
                          );
                          const marketData = getDataByGroup(
                            headerMapping,
                            'Kursentwicklung',
                          );
                          const marketExtendedData = getDataByGroup(
                            headerMapping,
                            'Kursentwicklung erweitert',
                          );
                          const volumenData = getDataByGroup(
                            headerMapping,
                            'Volumen',
                          );
                          const alertsData = getDataByGroup(
                            headerMapping,
                            'Alerts',
                          );

                          const formSubmitButtonsJsx = (
                            <div className={styles.ModalButtonWrapper}>
                              <ButtonWithLoading
                                variant="secondary"
                                type="button"
                                tabIndex={-1}
                                onClick={(event) => {
                                  event.preventDefault();
                                  overlayClose();
                                }}
                              >
                                Abbrechen
                              </ButtonWithLoading>
                              <ButtonWithLoading
                                type="submit"
                                onClick={validateForm}
                                tabIndex={0}
                                variant="primary"
                              >
                                Speichern
                              </ButtonWithLoading>
                            </div>
                          );

                          const stickyFooterContainer =
                            document.getElementById('ModalStickyFooter') ||
                            null;

                          const stickyFooter =
                            (drawerRef?.current &&
                              createPortal(
                                <>{formSubmitButtonsJsx}</>,
                                /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element | DocumentFragment'. */
                                stickyFooterContainer,
                              )) ||
                            null;

                          return (
                            <div className={styles.ModalWrapper}>
                              <div
                                className={styles.ModalBody}
                                /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
                                ref={scrollableForm}
                              >
                                <form
                                  onSubmit={validateForm.bind(this)}
                                  noValidate
                                  lang="de-CH"
                                >
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Stammdaten'}
                                      isOpen
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={grid.Row}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="baseData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={JSON.parse(
                                              JSON.stringify([
                                                ...getOptionsData({
                                                  customList,
                                                  data: baseData,
                                                  isWatchlist: !!isWatchlist,
                                                }),
                                              ]),
                                            )}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'baseData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'baseData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={
                                        (isWatchlist && `Watchlist`) ||
                                        `Portfolio`
                                      }
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName={
                                              (isWatchlist &&
                                                `watchlistData`) ||
                                              `portfolioData`
                                            }
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: watchlistOrPortfolioData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={
                                              (isWatchlist &&
                                                `watchlistData`) ||
                                              `portfolioData`
                                            }
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() =>
                                              (isWatchlist &&
                                                `watchlistData`) ||
                                              `portfolioData`
                                            }
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  {isPortfolio && (
                                    <div className={styles.ExpansionPannelItem}>
                                      <ExpansionPanel
                                        title={'Portfolio erweitert'}
                                        toggleOnChildrenClick={false}
                                      >
                                        <div className={classNames(grid.Row)}>
                                          <div className={grid.ColXs24}>
                                            <MultiField
                                              fieldName="portolioExtendedData"
                                              disabled={loading}
                                              label={''}
                                              title={''}
                                              maxlength={255}
                                              value={''}
                                              options={[
                                                ...getOptionsData({
                                                  customList,
                                                  data: portolioExtendedData,
                                                }),
                                              ]}
                                              register={registerField.bind(
                                                this,
                                              )}
                                              type="checkboxes"
                                              errorMessage={
                                                'Bitte wählen Sie eine Option aus'
                                              }
                                              id={'portolioExtendedData'}
                                              validate={() => validateForm}
                                              getValue={getValue}
                                              getId={() =>
                                                'portolioExtendedData'
                                              }
                                            />
                                          </div>
                                        </div>
                                      </ExpansionPanel>
                                    </div>
                                  )}
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Intraday'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="intradayData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: intradayData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'intradayData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'intradayData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Intraday erweitert'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="intradayExtendedData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: intradayExtendedData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'intradayExtendedData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'intradayExtendedData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Fundamental'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="fundamentalData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: fundamentalData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'fundamentalData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'fundamentalData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Fundamental erweitert'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="fundamentalExtendedData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: fundamentalExtendedData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'fundamentalExtendedData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() =>
                                              'fundamentalExtendedData'
                                            }
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Aktienmonitor'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="quoteMonitorData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: quoteMonitorData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'quoteMonitorData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'quoteMonitorData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Kursentwicklung'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="marketData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: marketData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'marketData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'marketData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Kursentwicklung erweitert'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="marketExtendedData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: marketExtendedData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'marketExtendedData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'marketExtendedData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Volumen'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="volumenData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: volumenData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'volumenData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'volumenData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  <div className={styles.ExpansionPannelItem}>
                                    <ExpansionPanel
                                      title={'Alerts'}
                                      toggleOnChildrenClick={false}
                                    >
                                      <div className={classNames(grid.Row)}>
                                        <div className={grid.ColXs24}>
                                          <MultiField
                                            fieldName="alertsData"
                                            disabled={loading}
                                            label={''}
                                            title={''}
                                            maxlength={255}
                                            value={''}
                                            options={[
                                              ...getOptionsData({
                                                customList,
                                                data: alertsData,
                                                isWatchlist: !!isWatchlist,
                                              }),
                                            ]}
                                            register={registerField.bind(this)}
                                            type="checkboxes"
                                            errorMessage={
                                              'Bitte wählen Sie eine Option aus'
                                            }
                                            id={'alertsData'}
                                            validate={() => validateForm}
                                            getValue={getValue}
                                            getId={() => 'alertsData'}
                                          />
                                        </div>
                                      </div>
                                    </ExpansionPanel>
                                  </div>
                                  {stickyFooter}
                                </form>
                              </div>
                            </div>
                          );
                        },
                      });
                    }}
                  >
                    Felder hinzufügen
                  </ButtonWithLoading>
                </div>
              )}
              <DndProvider options={HTML5toTouch}>
                <div className={styles.List}>
                  {listItems?.map((item: any, index) => {
                    const id = item?.[0] || item?.instrumentKey;
                    const isDeletable = listItems.length > 1;
                    const hasValor = !!item?.mValor;
                    const hasSymb = !!item?.mSymb;
                    return (
                      <ListItem
                        isLoading={loading || submitLoading}
                        key={`list-item${item[0] || item?.instrumentKey}`}
                        index={index}
                        id={id}
                        name={
                          item?.[1]?.description ||
                          `${item?.mName || item?.name}${
                            hasValor || hasSymb
                              ? ' (' +
                                (hasValor ? item?.mValor : '') +
                                (hasValor && hasSymb ? ' | ' : '') +
                                (hasSymb ? item?.mSymb : '') +
                                ')'
                              : ''
                          }${
                            (parseInt(item.quantity) === 0 &&
                              isCustomOrder &&
                              ' (ausverkauft)') ||
                            ''
                          }`
                        }
                        moveItem={moveItem}
                        listItemsCount={listItems.length}
                        saveListItems={saveListItems}
                        moveListItemToTop={moveListItemToTop}
                        removeListItemByIndex={removeListItemByIndex}
                        isDeletable={isDeletable}
                        isCustomOrder={isCustomOrder}
                      />
                    );
                  })}
                </div>
              </DndProvider>
              <div id="last-item" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomView;
