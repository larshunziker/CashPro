import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import Link from '../../../../../../../common/components/Link';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Dropdown from '../../../../components/Dropdown';
import DropdownItem from '../../../../components/Dropdown/components/DropdownItem';
import Icon from '../../../../components/Icon';
import CategoryButtons from '../CategoryButtons';
import EmptyScreen from '../EmptyScreen';
import Card from './components/Card';
import { portfolioCreate } from '../../../../components/PortfolioManagementForm';
import { displayErrorToast } from '../../../../components/Toast';
import modal from '../../../../components/Modal';
import { portfolioScreenApolloConfig } from '../Portfolio/apolloConfig';
import { portfoliosApolloConfig } from './apolloConfig';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { DEFAULT_ERROR_MESSAGE } from '../../../../components/Toast/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../CustomView/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screen */
import { EDIT_USER_CUSTOM_PORTFOLIOS_ORDER_SETTINGS } from '../CustomView/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolio/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { GET_PORTFOLIOS } from '../Portfolio/queries';
import styles from './styles.legacy.css';
import { PortfoliosProps } from './typings';

const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
  count: 2,
  totalCount: 2,
  edges: [
    {
      node: {
        id: '',
        label: 'Portfolios',
        link: null,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
  ],
  __typename: 'ActiveMenuTrailItemConnection',
};

const Portfolios = ({ location }: PortfoliosProps) => {
  const navigate = useStableNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editUserSettingsCustomPortfoliosOrderMutation] = useMutation(
    EDIT_USER_CUSTOM_PORTFOLIOS_ORDER_SETTINGS,
  );
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const { query: porfoliosQuery, ...portfoliosOptions } =
    portfoliosApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true',
      },
    });

  const { loading, data, error, refetch } = useQuery(
    porfoliosQuery,
    portfoliosOptions,
  );

  const allPortfolios: Portfolio[] = (!error && data?.portfolios?.items) || [];
  const hasPortfolios = allPortfolios.length > 0;

  const { ...options } = portfolioScreenApolloConfig.options({
    location,
    params: {
      isAuthenticated: 'true',
    },
  });

  return (
    <>
      <div className={styles.Wrapper}>
        <Helmet
          title="Portfolios | cash"
          meta={[
            {
              name: 'robots',
              content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
            },
          ]}
        ></Helmet>
        {(!isHybridApp && (
          <Breadcrumbs
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            pageUrl={location.pathname}
            /* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */
            items={breadcrumbItems}
            addClass="hide-on-print"
          />
        )) ||
          null}
        <h1 className={classNames(styles.Heading, 'hide-on-print')}>
          Portfolios
        </h1>
        {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'never'. */}
        {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
        <CategoryButtons pathname={location.pathname} />
        {!hasPortfolios && !loading && !isLoading && (
          <EmptyScreen entity="portfolio" />
        )}
      </div>

      <div className={styles.InnerWrapper}>
        <div className={styles.ActionsWrapper}>
          <div>
            <ButtonWithLoading
              onClick={(event) => {
                event.preventDefault();
                /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
                portfolioCreate({ navigate, origin: 'portfolio' });
              }}
              size="small"
              variant="secondary"
              ariaLabel="Neues Portfolio anlegen"
            >
              <Icon type="IconPlus" addClass={styles.Icons}></Icon>
            </ButtonWithLoading>
          </div>
          <Dropdown
            key={`dropdown-${loading || isLoading ? 'loading' : 'loaded'}`}
            align="right"
            variant="secondary"
            iconTypeLeft="IconPenToSquare"
            loading={loading || isLoading}
          >
            <>
              <DropdownItem label="Portfolio-Reihenfolge bearbeiten">
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                {({ label }) => {
                  return (
                    <Link
                      className={styles.DropdownViewLink}
                      path={`/portfolios/eigene-reihenfolge`}
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
              <DropdownItem label="Portfolio-Reihenfolge zurücksetzen">
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                {({ label, setIsOpen }) => {
                  return (
                    <Link
                      className={styles.DropdownViewLink}
                      onClick={(event) => {
                        event.preventDefault();
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
                                setIsLoading(true);
                                editUserSettingsCustomPortfoliosOrderMutation({
                                  variables: {
                                    value: 'null',
                                  },
                                  refetchQueries: [
                                    {
                                      query: GET_PORTFOLIOS,
                                      variables: options.variables,
                                    },
                                  ],
                                }).then(async ({ data }): Promise<void> => {
                                  if (
                                    data?.editCustomPortfoliosOrder &&
                                    data?.editCustomPortfoliosOrder?.error &&
                                    data?.editCustomPortfoliosOrder?.error !==
                                      null
                                  ) {
                                    if (
                                      !toast.isActive('user-settings-error')
                                    ) {
                                      displayErrorToast(
                                        DEFAULT_ERROR_MESSAGE,
                                        'user-settings-error',
                                      );
                                    }
                                    setIsLoading(false);
                                    return;
                                  }
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
                                  refetch().finally(() => {
                                    setIsLoading(false);
                                  });
                                });
                              },
                            },
                          ],
                        });
                      }}
                    >
                      <div className={styles.DropdownListItem}>
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
            </>
          </Dropdown>
        </div>
        <div className={styles.CardWrapper}>
          {allPortfolios.map((portfolio) => (
            <Card
              key={`card-${portfolio?.portfolioKey}`}
              portfolio={portfolio}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Portfolios;
