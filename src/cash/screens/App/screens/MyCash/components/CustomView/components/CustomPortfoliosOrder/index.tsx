import React, { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import classNames from 'classnames';
import update from 'immutability-helper';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import { getBreadcrumbsByType } from './../../helpers';
import locationStateSelector from '../../../../../../../../shared/selectors/locationStateSelector';
import { useStableNavigate } from '../../../../../../../../../shared/hooks/useStableNavigateContext';
import Breadcrumbs from '../../../../../../components/Breadcrumbs';
import ButtonWithLoading from '../../../../../../components/ButtonWithLoading';
import Helmet from '../../../../../../components/Helmet';
import Icon from '../../../../../../components/Icon';
import ListItem from './../../components/ListItem';
import { displayErrorToast } from '../../../../../../components/Toast';
import { portfolioScreenApolloConfig } from '../../../Portfolio/apolloConfig';
import { portfoliosApolloConfig } from '../../../Portfolios/apolloConfig';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../../../shared/constants/structuredData';
import { DEFAULT_ERROR_MESSAGE } from '../../../../../../components/Toast/constants';
import { ROUTE_PORTFOLIOS } from '../../../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../Portfolio/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/s */
import { GET_PORTFOLIOS } from '../../../Portfolio/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../Portfolios/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/ */
import { GET_PORTFOLIOS_CALCULATED } from '../../../Portfolios/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './../../queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/ */
import { EDIT_USER_CUSTOM_PORTFOLIOS_ORDER_SETTINGS } from './../../queries';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PortfolioProps } from '../../../Portfolio/typings';

const CustomPortfoliosOrder = ({ location }: PortfolioProps) => {
  const navigate = useStableNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const [editUserSettingsCustomPortfoliosOrderMutation] = useMutation(
    EDIT_USER_CUSTOM_PORTFOLIOS_ORDER_SETTINGS,
  );

  const breadcrumbItems = getBreadcrumbsByType('portfolios');
  const breadcrumbItemsCopy = JSON.parse(JSON.stringify(breadcrumbItems));
  breadcrumbItemsCopy.edges.pop();
  const { query, ...portfolioOptions } = portfoliosApolloConfig.options({
    location,
    params: {
      isAuthenticated: 'true',
    },
  });

  const {
    data: fetchedData,
    loading,
    refetch,
  } = useQuery(query, portfolioOptions);
  const data = fetchedData?.portfolios || null;
  const [listItems, setListItems] = useState([]);
  const { ...options } = portfolioScreenApolloConfig.options({
    location,
    params: {
      isAuthenticated: 'true',
    },
  });

  if (!loading && listItems.length === 0) {
    setListItems(data.items || []);
  }

  const handleEditUsersettings = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'newListItems' implicitly has an 'any' type. */
    (newListItems) => {
      setSubmitLoading(true);
      /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
      const prepareCustomView = newListItems?.reduce((acc, item: Portfolio) => {
        acc.push(item?.portfolioKey);
        return acc;
      }, []);

      const variables: any = {
        value: JSON.stringify(prepareCustomView),
      };
      const { variables: portfoliosCalculatedScreenVariables } =
        portfoliosApolloConfig.options({
          location,
          params: {
            isAuthenticated: 'true',
          },
        });

      editUserSettingsCustomPortfoliosOrderMutation({
        variables,
        refetchQueries: [
          {
            query: GET_PORTFOLIOS,
            variables: options.variables,
          },
          {
            query: GET_PORTFOLIOS_CALCULATED,
            variables: portfoliosCalculatedScreenVariables,
          },
        ],
      }).then(async ({ data }): Promise<void> => {
        if (
          data?.editCustomPortfoliosOrder &&
          data?.editCustomPortfoliosOrder?.error &&
          data?.editCustomPortfoliosOrder?.error !== null
        ) {
          if (!toast.isActive('user-settings-error')) {
            displayErrorToast(DEFAULT_ERROR_MESSAGE, 'user-settings-error');
          }
          setSubmitLoading(false);
          return;
        }
        refetch().finally(() => {
          setSubmitLoading(false);
        });

        const scope = 'portfolios';
        const event = 'row_order';
        // track tealium event
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: `${scope}_edit_custom_portfolios_order_${event}`,
            event_category: scope,
            event_action: `${scope}_edit_custom_portfolios_order_${event}`,
            [`${scope}_key`]: null,
          },
        });
      });
    },
    [
      editUserSettingsCustomPortfoliosOrderMutation,
      location,
      options.variables,
      refetch,
    ],
  );

  const saveListItems = useCallback(() => {
    const items = listItems;
    setListItems(items);
    handleEditUsersettings(items);
  }, [handleEditUsersettings, listItems]);

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

  breadcrumbItemsCopy.edges.pop();
  breadcrumbItemsCopy.edges.push({
    node: {
      id: 'custom-order',
      label: 'Reihenfolge bearbeiten',
      link: '',
      __typename: 'ActiveMenuTrailItem',
    },
    __typename: 'ActiveMenuTrailItemEdge',
  });

  const handleNavigateBack = () => {
    navigate(`/${ROUTE_PORTFOLIOS}`);
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
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
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
            Zurück
          </ButtonWithLoading>
        </div>
        <h1 className={styles.Heading}>Reihenfolge bearbeiten</h1>
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
            <>
              Passen Sie die Tabelle an Ihre Bedürfnisse an. Die Reihenfolge der
              Zeilen kann per <span className={styles.Bold}>Drag and Drop</span>{' '}
              geändert werden. Um eine Zeile schnell an die oberste Position zu
              setzen, können Sie auf den Pfeil nach oben klicken. Ihre Änderung
              sind sofort gespeichert.
            </>
          </div>

          <div className={styles.ListWrapper}>
            <DndProvider options={HTML5toTouch}>
              <div className={styles.List}>
                {listItems &&
                  listItems?.map((item: Portfolio, index) => {
                    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'Portfolio'. */
                    const id = item?.[0] || item?.portfolioKey;
                    return (
                      <ListItem
                        isLoading={loading || submitLoading}
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'Portfolio'. */
                        key={`list-item${item[0] || item?.portfolioKey}`}
                        index={index}
                        id={id}
                        name={
                          <>
                            {item?.name}
                            {item?.defaultPortfolio && (
                              <Icon
                                addClass={styles.StarIcon}
                                type="IconStarSolid"
                              ></Icon>
                            )}
                          </>
                        }
                        moveItem={moveItem}
                        listItemsCount={listItems.length}
                        saveListItems={saveListItems}
                        moveListItemToTop={moveListItemToTop}
                        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '(index */
                        removeListItemByIndex={null}
                        isDeletable={false}
                        isCustomOrder={true}
                      />
                    );
                  })}
              </div>
            </DndProvider>
            <div id="last-item" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomPortfoliosOrder;
