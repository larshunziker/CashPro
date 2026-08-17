import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import classNames from 'classnames';
import {
  defaultOptions,
  scrollToAnchorElement,
} from '../../../../../common/components/SmoothScroll/helpers';
import {
  DATE_FORMAT_SIMPLYBOOK,
  formatDate,
} from '../../../../../shared/helpers/dateTimeElapsed';
import { replaceAll } from '../../../../../shared/helpers/replaceAll';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import { isListingKey } from '../../screens/MyCash/components/Portfolio/helpers';
import { formatPrice } from '../Highcharts/helpers';
import Link from '../../../../../common/components/Link';
import ButtonWithLoading from '../ButtonWithLoading';
import DropdownItem from '../Dropdown/components/DropdownItem';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import InputField from '../Paragraphs/components/WebformParagraph/components/InputField';
import BigPortfolioWarning, {
  MAX_INSTRUMENT_PER_PORTFOLIO,
} from '../../screens/MyCash/components/Portfolio/components/BigPortfolioWarning';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { formatPriceWithCache } from '../../screens/MyCash/components/Table/components/headerMapping';
import { portfolioCreate } from '../PortfolioManagementForm';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../Toast';
import modal from '../Modal';
import { cashItemsApolloConfig } from '../../screens/MyCash/components/CashItems/apolloConfig';
import {
  portfolioByKeyApolloConfig,
  portfolioScreenApolloConfig,
} from '../../screens/MyCash/components/Portfolio/apolloConfig';
import {
  transactionApolloConfig,
  transactionInfoApolloConfig,
} from './apolloConfig';
import {
  ROUTE_PORTFOLIO_INSTRUMENT,
  ROUTE_PORTFOLIO_TRANSACTION,
} from '../../constants';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
  DEFAULT_ERROR_MESSAGE,
} from '../Toast/constants';
import {
  PORTFOLIO_TRADE_FORM_TYPE_BUY,
  PORTFOLIO_TRADE_FORM_TYPE_EDIT,
  PORTFOLIO_TRADE_FORM_TYPE_SELL,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/MyCash/components/CashItems/queries'. '/Users/bhs/code/work */
import { GET_CASH_ITEMS } from '../../screens/MyCash/components/CashItems/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/MyCash/components/Portfolio/queries'. '/Users/bhs/code/work */
import { GET_PORTFOLIO_BY_KEY } from '../../screens/MyCash/components/Portfolio/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../AutoUpdateProvider/queries'. '/Users/bhs/code/work/rasch-stack/src/cas */
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from '../AutoUpdateProvider/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { ADD_TRANSACTION, EDIT_TRANSACTION, GET_TRANSACTION } from './queries';
import styles from './styles.legacy.css';
import { QueryResultInstrumentData } from '../Widgets/components/CorporateActions/typings';

type PortfolioTradeFormProps = {
  formType?:
    | typeof PORTFOLIO_TRADE_FORM_TYPE_BUY
    | typeof PORTFOLIO_TRADE_FORM_TYPE_SELL
    | typeof PORTFOLIO_TRADE_FORM_TYPE_EDIT;
  withNewPortfolio?: boolean;
  closeOverlay: () => void;
  portfolioKey: string;
  instrumentKey: string;
  transactionKey: string;
  isOtherAsset?: boolean;
  preventRefetch?: boolean;
  origin: string;
  drawerRef?: React.MutableRefObject<HTMLDivElement>;
  instrumentCount?: number;
};

const ANCHOR_ID = 'portfolio-transactions-anchor';

const scrollToTopWebform = (anchor = '') => {
  scrollToAnchorElement(anchor || ANCHOR_ID, {
    ...defaultOptions,
    replace: false,
  });
};

const getTitle = (formType: string): string => {
  switch (formType) {
    case PORTFOLIO_TRADE_FORM_TYPE_SELL:
      return 'Verkaufen';
    case PORTFOLIO_TRADE_FORM_TYPE_EDIT:
      return 'Bearbeiten';
    case PORTFOLIO_TRADE_FORM_TYPE_BUY:
    default:
      return 'Kaufen';
  }
};

const getShortTitle = (formType: string): string => {
  switch (formType) {
    case PORTFOLIO_TRADE_FORM_TYPE_SELL:
      return 'Verkauf';
    case PORTFOLIO_TRADE_FORM_TYPE_EDIT:
      return '';
    case PORTFOLIO_TRADE_FORM_TYPE_BUY:
    default:
      return 'Kauf';
  }
};

const PortfolioTradeForm = ({
  formType = PORTFOLIO_TRADE_FORM_TYPE_BUY,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'number'. */
  instrumentCount = null,
  closeOverlay,
  portfolioKey,
  instrumentKey,
  transactionKey,
  withNewPortfolio,
  preventRefetch,
  origin,
  drawerRef,
}: PortfolioTradeFormProps) => {
  const isInstrument = useMatch(ROUTE_PORTFOLIO_INSTRUMENT);
  const isAllPositions = useMatch(ROUTE_PORTFOLIO_TRANSACTION);
  const isPortfolio = useMatch('/portfolio');
  const isInMyCashPortfolio = isPortfolio || isInstrument || isAllPositions;
  const [activeForm, setActiveForm] = useState(formType);
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [addMutation] = useMutation(ADD_TRANSACTION);
  const [editMutation] = useMutation(EDIT_TRANSACTION);
  const initialDate = new Date().setDate(new Date().getDate());
  const formFields = useRef<FieldComponentProps[]>([]);
  const registerField = (formField: FieldComponentProps): void => {
    formFields.current.push(formField);
  };
  // we fetch the same data as we did on the listing page so we try to reuse the cached data
  const { query: portfolioQuery, ...portfolioOptions } =
    portfolioByKeyApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true', // we use this inside Protected routes, so we can assume that the user is authenticated
        portfolioKey: portfolioKey,
      },
    });

  const { data: apolloData, loading: portfolioLoading } = useQuery(
    portfolioQuery,
    portfolioOptions,
  );

  const portfolioCurrency = apolloData?.portfolio?.currency;
  const instrument = apolloData?.portfolio?.calculatedFields?.instruments?.find(
    (instrument: any) => instrument?.instrumentKey === instrumentKey,
  ) as Instrument;

  // this is needed if we add a new bond to a portfolio from a fullquote page
  // the data is only fetched if the instrument data is not already available
  const { data: instrumentData } = useQuery<QueryResultInstrumentData>(
    GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS,
    {
      variables: { listingKeys: instrumentKey },
      skip: !!instrument || !isListingKey(instrumentKey),
    },
  );

  const pricingQuotationId =
    instrument?.pricingQuotationId ||
    instrumentData?.quoteList?.quoteList?.edges[0]?.node?.pricingQuotationId;

  const isBondOrDerivative = pricingQuotationId === 4;

  const apolloParams = {
    portfolioKey: portfolioKey,
    instrumentKey: instrumentKey,
    transactionKey: transactionKey,
    isOtherAsset: instrument?.otherAsset,
    portfolioCurrency,
  };
  const { query, ...options } = transactionApolloConfig.options({
    params: apolloParams as Record<string, any>,
  });
  const { query: transactionInfoQuery, ...transactionInfoOptions } =
    transactionInfoApolloConfig.options({
      params: apolloParams as Record<string, any>,
    });
  const [
    getTransactionInfo,
    {
      called: transactionInfoCalled,
      data: transactionInfoData,
      loading: transactionInfoLoading,
    },
  ] = useLazyQuery(transactionInfoQuery, transactionInfoOptions);

  // fetch transaction data if we are in edit mode
  const [getTransaction, { called, loading, data: transactionData }] =
    useLazyQuery(query, options);

  if (apolloData?.portfolio && !transactionInfoCalled && !portfolioLoading) {
    getTransactionInfo();
  }

  const transaction = transactionData?.getTransaction || null;
  const isLoading =
    transactionInfoLoading || portfolioLoading || loading || formLoading;

  if (
    !transactionInfoLoading &&
    !portfolioLoading &&
    transactionInfoData?.getTransactionInfo
  ) {
    if (!called && formType === PORTFOLIO_TRADE_FORM_TYPE_EDIT) {
      getTransaction();
    }
    if (!isLoading && formFields.current && !submitted) {
      if (formType === PORTFOLIO_TRADE_FORM_TYPE_EDIT && transaction) {
        formFields.current.forEach((field: FieldComponentProps) => {
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          if (field.getId() === 'date' && transaction?.date) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.setValue(
              formatDate(transaction.date, DATE_FORMAT_SIMPLYBOOK),
            );
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          } else if (field.getId() === 'quantity' && transaction?.quantity) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.setValue(transaction.quantity);
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          } else if (field.getId() === 'fees' && transaction?.fees) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"UserInput"' is not assignable to parameter of type 'null | undefined'. */
            field.setValue(formatPrice(transaction.fees + '', 'UserInput'));
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          } else if (field.getId() === 'paid' && transaction?.price) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"UserInput"' is not assignable to parameter of type 'null | undefined'. */
            field.setValue(formatPrice(transaction.price, 'UserInput'));
          } else if (
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.getId() === 'value' &&
            transactionInfoData?.getTransactionInfo?.price
          ) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.setValue(
              formatPrice(
                transactionInfoData?.getTransactionInfo?.price,
                transactionInfoData?.getTransactionInfo?.type,
              ),
            );
          } else if (
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.getId() === 'rate' &&
            (transaction?.rate || transactionInfoData?.getTransactionInfo?.rate)
          ) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.setValue(
              formatPrice(
                transaction?.rate ||
                  transactionInfoData?.getTransactionInfo?.rate,
                /* @ts-ignore TODO: TS2345 ->  Argument of type '"UserInput"' is not assignable to parameter of type 'null | undefined'. */
                'UserInput',
              ).replace(/’/, ''),
            );
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          } else if (field.getId() === 'comment' && transaction?.comment) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.setValue(transaction.comment);
          }
        });
      } else {
        formFields.current.forEach((field: FieldComponentProps) => {
          if (
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.getId() === 'rate' &&
            transactionInfoData?.getTransactionInfo?.rate
          ) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.setValue(
              formatPrice(
                transactionInfoData?.getTransactionInfo?.rate,
                /* @ts-ignore TODO: TS2345 ->  Argument of type '"UserInput"' is not assignable to parameter of type 'null | undefined'. */
                'UserInput',
              ).replace(/’/, ''),
            );
          }
          if (
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.getId() === 'paid' &&
            transactionInfoData?.getTransactionInfo?.price
          ) {
            /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            field.setValue(
              formatPrice(
                transactionInfoData?.getTransactionInfo?.price,
                transactionInfoData?.getTransactionInfo?.type,
              ),
            );
          }
        });
      }
    }
  }

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

  const setQuantityInput = (value: string): void => {
    const formField = formFields.current.find(
      (field: FieldComponentProps): boolean => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return field.getId() === 'quantity';
      },
    );

    if (formField) {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      formField.setValue(value);
    }
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'values' implicitly has an 'any' type. */
  const handleAddEditTransaction = (values): void => {
    if (
      activeForm === PORTFOLIO_TRADE_FORM_TYPE_EDIT &&
      values.date !== formatDate(transaction?.date, DATE_FORMAT_SIMPLYBOOK)
    ) {
      const today = new Date();
      const date = new Date(values.date);
      date.setHours(today.getHours());
      date.setMinutes(today.getMinutes());
      date.setSeconds(today.getSeconds());
      values.date = date.toISOString();
    }

    let mutation = null;
    const variables: any = {
      portfolioKey: values.portfolioKey,
      instrumentKey: values?.instrumentKey,
      date: values.date,
      type: (activeForm === 'buy' && 'BUY') || 'SELL',
      quantity: values.quantity,
      fees: values.fees,
      paid: `${Number(values.paid)}`,
      rate: `${Number(values.rate)}`,
      comment: values.comment || '',
      isOtherAsset: instrument?.otherAsset || values.isOtherAsset || false,
    };

    if (activeForm === PORTFOLIO_TRADE_FORM_TYPE_EDIT) {
      variables.transactionKey = values.transactionKey;
      variables.type = transaction?.type;
    }

    if (
      !transactionInfoData?.getTransactionInfo?.rate &&
      portfolioCurrency ===
        transactionInfoData?.getTransactionInfo?.instrumentCurrency
    ) {
      delete variables.rate;
    }

    mutation =
      (activeForm !== PORTFOLIO_TRADE_FORM_TYPE_EDIT && addMutation) ||
      editMutation;

    if (submitted || isLoading || !mutation) {
      return;
    }
    setFormLoading(true);

    let anchor =
      (activeForm === PORTFOLIO_TRADE_FORM_TYPE_SELL &&
        'instrument-table-sell') ||
      'instrument-table-buy';
    if (activeForm === PORTFOLIO_TRADE_FORM_TYPE_EDIT) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
      anchor = null;
    }
    const { ...cashItemsOptions } = cashItemsApolloConfig.options({
      params: {
        portfolioKey,
      },
    });

    const refetchQueries = [
      {
        query: GET_CASH_ITEMS,
        variables: {
          ...cashItemsOptions.variables,
        },
      },
      {
        query: GET_TRANSACTION,
        variables: {
          ...options.variables,
        },
      },
    ];
    if (portfolioKey) {
      refetchQueries.push({
        query: GET_PORTFOLIO_BY_KEY,
        variables: {
          ...portfolioOptions.variables,
        },
      });
    }
    // send mutation
    mutation({
      variables,
      refetchQueries,
    })
      .then(async ({ data }): Promise<void> => {
        if (
          (data?.addTransaction &&
            data?.addTransaction?.error &&
            data?.addTransaction?.error !== null) ||
          (data?.editTransaction &&
            data?.editTransaction?.error &&
            data?.editTransaction?.error !== null)
        ) {
          if (!toast.isActive('portfolio-error')) {
            displayErrorToast(DEFAULT_ERROR_MESSAGE, 'portfolio-error');
          }
          setSubmitError(true);
          setFormLoading(false);
          return;
        }

        if (toast.isActive('portfolio-error')) {
          toast.dismiss('portfolio-error');
        }

        setSubmitError(false);
        setSubmitted(true);
        // TODO: check with naume, why we ever need to refetch all portfolios and not only the current one?
        // There was a bug, that the portfolio was not updated after edition a transaction, when coming from the home page -- > portfolio page -- > transaction page. I reversed the order for now
        const refetch =
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.refetchPortfolioGQL || global.refetchPortfoliosGQL;

        if (refetch && !preventRefetch) {
          refetch().then(() => {
            closeOverlay();
            setFormLoading(false);
            if (withNewPortfolio) {
              displaySuccessToast(
                'Portfolio wurde erfolgreich erstellt und die Transaktion wurde hinzugefügt.',
                'portfolio-created-with-transaction',
                {
                  text: 'Zum neuen Portfolio',
                  path: `/portfolio/${portfolioKey}`,
                  onClick: () => {
                    tealiumTrackEvent({
                      type: 'link',
                      payload: {
                        event_name: 'portfolio_open',
                        event_category: 'portfolio',
                        from: 'toast/link',
                        portfolio_key: portfolioKey,
                      },
                    });
                  },
                },
              );
            } else {
              // track tealium event on successful portfolio
              tealiumTrackEvent({
                type: 'link',
                payload: {
                  event_name: 'transaction_add',
                  event_category: 'portfolio',
                  event_action: 'transaction_add',
                  portfolio_key: portfolioKey,
                  instrument_key: instrumentKey,
                  instrument_isin: instrument?.isin || null,
                  instrument_valor: instrument?.mValor || null,
                  instrument_other_asset: instrument?.otherAsset || false,
                  instrument_type:
                    instrument?.type ||
                    transactionInfoData?.getTransactionInfo?.type ||
                    null,
                  transaction_type: activeForm,
                  from: `portfolio-trade/${origin}`,
                },
              });
              if (!isInstrument) {
                displaySuccessToast(
                  `Transaktion ${getShortTitle(activeForm)} "${
                    instrument?.mName ||
                    transactionInfoData?.getTransactionInfo?.name
                  }" ${
                    (activeForm !== PORTFOLIO_TRADE_FORM_TYPE_EDIT &&
                      'hinzugefügt') ||
                    'bearbeitet'
                  }. `,
                  'portfolio-transaktion-submitted',
                  {
                    text: 'Alle Transaktionen dieser Position zeigen',
                    path: `/portfolio/${portfolioKey}/transaktionen/${instrumentKey}`,
                  },
                );
              }
              scrollToTopWebform(anchor);
            }
          });
        } else {
          closeOverlay();
          setFormLoading(false);
          if (withNewPortfolio) {
            displaySuccessToast(
              'Portfolio wurde erfolgreich erstellt und die Transaktion wurde hinzugefügt.',
              'portfolio-created-with-transaction',
              {
                text: 'Zum neuen Portfolio',
                path: `/portfolio/${portfolioKey}`,
                onClick: () => {
                  tealiumTrackEvent({
                    type: 'link',
                    payload: {
                      event_name: 'portfolio_open',
                      event_category: 'portfolio',
                      from: 'toast/link',
                      portfolio_key: portfolioKey,
                    },
                  });
                },
              },
            );
          } else {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'transaction_add',
                event_category: 'portfolio',
                event_action: 'transaction_add',
                portfolio_key: portfolioKey,
                instrument_key: instrumentKey,
                instrument_isin: instrument?.isin || null,
                instrument_valor: instrument?.mValor || null,
                instrument_other_asset: instrument?.otherAsset || false,
                instrument_type:
                  instrument?.type ||
                  transactionInfoData?.getTransactionInfo?.type ||
                  null,
                transaction_type: activeForm,
                from: `portfolio-trade/${origin}`,
              },
            });
            if (!isInstrument) {
              displaySuccessToast(
                `Transaktion "${
                  instrument?.mName ||
                  transactionInfoData?.getTransactionInfo?.name
                }" ${
                  (activeForm !== PORTFOLIO_TRADE_FORM_TYPE_EDIT &&
                    'hinzugefügt') ||
                  'bearbeitet'
                }. `,
                'portfolio-transaktion-submitted',
                {
                  text: 'Alle Transaktionen dieser Position zeigen',
                  path: `/portfolio/${portfolioKey}/transaktionen/${instrumentKey}`,
                },
              );
            }

            scrollToTopWebform(anchor);
          }
        }
      })
      .catch((): void => {
        if (!submitError && !toast.isActive('portfolio-error')) {
          displayErrorToast(DEFAULT_ERROR_MESSAGE, 'portfolio-error');
        }

        setSubmitError(true);
        setSubmitted(false);
        setFormLoading(false);
      });
  };

  const getButton = (formType: string) => {
    switch (formType) {
      case PORTFOLIO_TRADE_FORM_TYPE_SELL:
        return {
          label: 'Verkaufen',
          callback: handleAddEditTransaction,
        };
      case PORTFOLIO_TRADE_FORM_TYPE_EDIT:
        return {
          label: 'Speichern',
          callback: handleAddEditTransaction,
        };
      default:
        return {
          label: (isInMyCashPortfolio && 'Mehr Kaufen') || 'Kaufen',
          callback: handleAddEditTransaction,
        };
    }
  };
  const button = getButton(activeForm);

  const validateForm = (): void => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    event.preventDefault();
    const errors: Array<boolean> = formFields.current
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      .map((formField: FieldComponentProps): boolean => formField.validate())
      .filter((result: boolean): boolean => !result);

    if (errors.length) {
      scrollToTopWebform();
      return;
    }

    const values = {};
    // get the values of all registered fields within this form
    formFields.current.forEach((formField: FieldComponentProps): void => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      return (values[formField.getId()] =
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        typeof formField.getValue() === 'string' ||
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        formField.getValue() instanceof String
          ? /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            replaceAll(formField.getValue(), /['’]/, '')
          : /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            formField.getValue());
    });

    button.callback(values);
  };

  const headerJsx = (
    <div id={ANCHOR_ID} className={styles.Title}>
      {getTitle(activeForm)}
      {((instrument?.mName || transactionInfoData?.getTransactionInfo?.name) &&
        ` - ${
          instrument?.mName || transactionInfoData?.getTransactionInfo?.name
        }`) ||
        null}
    </div>
  );

  const formSubmitButtonsJsx = (
    <div className={styles.ButtonWrapper}>
      <ButtonWithLoading
        onClick={closeOverlay}
        variant="secondary"
        ariaLabel="Abbrechen"
        tabIndex={-1}
        type="button"
      >
        Abbrechen
      </ButtonWithLoading>
      <ButtonWithLoading
        loading={isLoading}
        onClick={validateForm}
        ariaLabel={`${button.label}`}
        tabIndex={0}
        type="submit"
      >
        {button.label}
      </ButtonWithLoading>
    </div>
  );

  const stickyHeaderContainer =
    document.getElementById('ModalStickyHeader') || null;

  const stickyFooterContainer =
    document.getElementById('ModalStickyFooter') || null;

  const stickyHeader =
    (drawerRef?.current &&
      stickyHeaderContainer &&
      createPortal(<>{headerJsx}</>, stickyHeaderContainer)) ||
    null;

  const stickyFooter =
    (drawerRef?.current &&
      stickyFooterContainer &&
      createPortal(<>{formSubmitButtonsJsx}</>, stickyFooterContainer)) ||
    null;

  const showBigPortfolioWarning =
    instrumentCount + 1 >= MAX_INSTRUMENT_PER_PORTFOLIO;

  const paidLabel = isBondOrDerivative
    ? 'Kaufpreis in %'
    : (transactionInfoData?.getTransactionInfo?.instrumentCurrency &&
        `Preis in ${transactionInfoData?.getTransactionInfo?.instrumentCurrency}`) ||
      'Preis';

  const paidErrorMessage = 'Bitte wählen Sie einen $1 aus'.replace(
    '$1',
    isBondOrDerivative
      ? 'Kaufpreis in %'
      : (transactionInfoData?.getTransactionInfo?.instrumentCurrency &&
          `Preis in ${transactionInfoData?.getTransactionInfo?.instrumentCurrency}`) ||
          'Preis',
  );

  const quantityLabel = isBondOrDerivative ? 'Nennwert' : 'Anzahl';

  const quantityErrorMessage = 'Bitte geben Sie eine$1 an'.replace(
    '$1',
    isBondOrDerivative ? 'n Nennwert' : ' Anzahl',
  );

  return (
    <div className={styles.Wrapper}>
      <>
        {stickyHeader}
        {activeForm !== PORTFOLIO_TRADE_FORM_TYPE_EDIT && (
          <ul className={styles.Tabs}>
            <li
              className={classNames(styles.Tab, {
                [styles.Active]: activeForm === PORTFOLIO_TRADE_FORM_TYPE_BUY,
              })}
            >
              <Link
                className={styles.Link}
                onClick={() => {
                  setActiveForm(PORTFOLIO_TRADE_FORM_TYPE_BUY);
                }}
              >
                Kaufen
              </Link>
            </li>
            <li
              className={classNames(styles.Tab, {
                [styles.Active]: activeForm === PORTFOLIO_TRADE_FORM_TYPE_SELL,
              })}
            >
              <Link
                className={styles.Link}
                onClick={() => {
                  setActiveForm(PORTFOLIO_TRADE_FORM_TYPE_SELL);
                }}
              >
                Verkaufen
              </Link>
            </li>
          </ul>
        )}
        {showBigPortfolioWarning && (
          <BigPortfolioWarning instrumentCount={instrumentCount} />
        )}
        <form onSubmit={validateForm.bind(this)} noValidate lang="de-CH">
          <InputField
            animatedLabel
            fieldName="portfolioKey"
            disabled={true}
            label={'portfolioKey'}
            title={'portfolioKey'}
            maxlength={255}
            value={portfolioKey}
            register={registerField.bind(this)}
            withErrorIcon={false}
            type="hidden"
            initialValue={portfolioKey}
            errorMessage={''}
            id={'portfolioKey'}
            required={true}
            validate={() => validateForm}
            getValue={getValue}
            getId={() => 'portfolioKey'}
          />
          <InputField
            animatedLabel
            fieldName="instrumentKey"
            disabled={true}
            label={'instrumentKey'}
            title={'instrumentKey'}
            maxlength={255}
            value={instrumentKey}
            register={registerField.bind(this)}
            withErrorIcon={false}
            type="hidden"
            initialValue={instrumentKey}
            errorMessage={''}
            id={'instrumentKey'}
            required={true}
            validate={() => validateForm}
            getValue={getValue}
            getId={() => 'instrumentKey'}
          />
          <InputField
            animatedLabel
            fieldName="transactionKey"
            disabled={true}
            label={'transactionKey'}
            title={'transactionKey'}
            maxlength={255}
            value={transactionKey}
            register={registerField.bind(this)}
            withErrorIcon={false}
            type="hidden"
            initialValue={transactionKey}
            errorMessage={''}
            id={'transactionKey'}
            required={activeForm === PORTFOLIO_TRADE_FORM_TYPE_EDIT || false}
            validate={() => validateForm}
            getValue={getValue}
            getId={() => 'transactionKey'}
          />
          <div
            className={classNames(styles.InputTextWrapper, {
              [styles.SellFieldWrapper]:
                activeForm === PORTFOLIO_TRADE_FORM_TYPE_SELL,
            })}
          >
            <InputField
              animatedLabel
              fieldName="quantity"
              disabled={isLoading}
              label={quantityLabel}
              title="quantity"
              maxlength={255}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="number"
              initialValue={''}
              errorMessage={quantityErrorMessage}
              id={'quantity'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'quantity'}
              pattern="^(0*[1-9'’][0-9'’]*(\.[0-9'’]+)?|0+\.[0-9'’]*[1-9'’][0-9'’]*)$"
              /* @ts-ignore TODO: TS2322 ->  Type 'string | false | null | undefined' is not assignable to type 'string | undefined'. */
              helperText={
                activeForm === PORTFOLIO_TRADE_FORM_TYPE_SELL &&
                instrument?.quantity &&
                `Volumen ${formatPriceWithCache(
                  instrument?.quantity,
                  /* @ts-ignore TODO: TS2345 ->  Argument of type '"Volume"' is not assignable to parameter of type 'null | undefined'. */
                  'Volume',
                )} verfügbar`
              }
            />
            {activeForm === PORTFOLIO_TRADE_FORM_TYPE_SELL && (
              <div className={styles.QuantityButtonWrapper}>
                <ButtonWithLoading
                  onClick={(event) => {
                    event.preventDefault();
                    setQuantityInput(`${instrument?.quantity || 0}`);
                  }}
                  size="small"
                  variant="tertiary"
                  ariaLabel="Kompletter Bestand setzen"
                  tabIndex={-1}
                  type="button"
                >
                  Kompletter Bestand
                </ButtonWithLoading>
              </div>
            )}
          </div>
          <div className={styles.InputTextWrapper}>
            <InputField
              animatedLabel
              fieldName="paid"
              disabled={isLoading}
              label={paidLabel}
              title="Preis"
              required
              maxlength={255}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="text"
              initialValue={''}
              errorMessage={paidErrorMessage}
              id={'paid'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'paid'}
              pattern="^(([0-9]+[.])?[0-9]+|([0-9]+['’])?([0-9]+[.])?[0-9])+$"
              inputmode="decimal"
            />
          </div>
          <div className={styles.InputTextWrapper}>
            <InputField
              animatedLabel
              fieldName="date"
              disabled={isLoading}
              label={'Datum'}
              title={'Datum'}
              value={''}
              register={registerField.bind(this)}
              initialValue={formatDate(initialDate, DATE_FORMAT_SIMPLYBOOK)}
              withErrorIcon={false}
              type="date"
              errorMessage={'Bitte wählen Sie ein gültiges Datum aus'}
              id={'date'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'date'}
            />
          </div>
          <div className={styles.InputTextWrapper}>
            <InputField
              animatedLabel
              fieldName="fees"
              disabled={isLoading}
              label={
                (portfolioCurrency && `Gebühr in ${portfolioCurrency}`) ||
                'Gebühr'
              }
              title={
                (portfolioCurrency && `Gebühr in ${portfolioCurrency}`) ||
                'Gebühr'
              }
              maxlength={255}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="text"
              initialValue={''}
              errorMessage=""
              id={'fees'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'fees'}
              inputmode="decimal"
              pattern="^(([0-9]+[.])?[0-9]+|([0-9]+['’])?([0-9]+[.])?[0-9])+$"
            />
          </div>
          <div
            className={classNames({
              [styles.InputTextWrapper]:
                transactionInfoData?.getTransactionInfo?.rate &&
                portfolioCurrency !==
                  transactionInfoData?.getTransactionInfo?.instrumentCurrency,
            })}
          >
            <InputField
              animatedLabel
              fieldName="rate"
              disabled={isLoading}
              label="Kurs"
              title="Kurs"
              maxlength={255}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type={
                (transactionInfoData?.getTransactionInfo?.rate &&
                  portfolioCurrency !==
                    transactionInfoData?.getTransactionInfo
                      ?.instrumentCurrency &&
                  'text') ||
                (!transactionInfoData?.getTransactionInfo?.error && 'hidden')
              }
              initialValue={'1.00'}
              id={'rate'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'rate'}
              errorMessage=""
            />
          </div>
          <div key={transaction?.comment} className={styles.InputTextWrapper}>
            <InputField
              animatedLabel
              fieldName="comment"
              disabled={isLoading}
              label="Kommentar"
              title="Kommentar"
              value=""
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="textarea"
              errorMessage="Bitte geben Sie einen Kommentar ein"
              initialValue={transaction?.comment || ''}
              id="comment"
              required={false}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'comment'}
              maxlength={200}
              maxlengthMessage=" Anzahl Zeichen aufgebraucht"
            />
          </div>
          {stickyFooter}
        </form>
      </>
    </div>
  );
};

export const portfolioTrade = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
  instrumentKey,
  instrumentCount = null,
  transactionKey = null,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
  type,
  withNewPortfolio = false,
  preventRefetch = false,
  origin = '',
}) => {
  const token = Auth0.getIdToken();
  if (!token) {
    displayInfoToast(
      AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
      AUTHORIZATION_ERROR_ID,
      {
        text: 'Hier einloggen oder registrieren.',
        onClick: () => Auth0.login(),
      },
    );
    return;
  }

  return modal({
    type: 'drawer',
    hasStickyHeader: true,
    hasStickyFooter: true,
    hideDefaultButtons: true,
    closeOnClickOutside: false,
    closeOnLocationChange: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
    customUi: ({ close, drawerRef }) => {
      return (
        <PortfolioTradeForm
          portfolioKey={portfolioKey}
          instrumentKey={instrumentKey}
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'number | undefined'. */
          instrumentCount={instrumentCount}
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
          transactionKey={transactionKey}
          closeOverlay={close}
          formType={type}
          withNewPortfolio={withNewPortfolio}
          preventRefetch={preventRefetch}
          origin={origin}
          drawerRef={drawerRef}
        ></PortfolioTradeForm>
      );
    },
  });
};

export const AddToPortfolio = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
  instrumentKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
  type,
  closeOverly = null,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
  origin,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
  drawerRef,
}) => {
  const { query: porfolioQuery, ...portfolioOptions } =
    portfolioScreenApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true', // we use this inside Protected routes, so we can assume that the user is authenticated
      },
    });

  const { loading, error, data } = useQuery(porfolioQuery, portfolioOptions);
  const allPortfolios = data?.portfolios?.items || [];

  const addNewPortfolioButtonJsx = (
    <div
      className={classNames(styles.DropdownPortfolioLink, styles.NewPortfolio)}
      role="link"
      tabIndex={0}
      onClick={(event) => {
        event.preventDefault();
        /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
        closeOverly && closeOverly();
        portfolioCreate({
          withTransaction: true,
          instrumentKey,
          origin,
        });
      }}
      onKeyDown={(event) => {
        event.preventDefault();
        /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
        closeOverly && closeOverly();
        portfolioCreate({
          withTransaction: true,
          instrumentKey,
          origin,
        });
      }}
    >
      <span>
        <Icon type="IconPlus" /> Neues Portfolio anlegen
      </span>
    </div>
  );

  const stickyFooterContainer =
    document.getElementById('ModalStickyFooter') || null;

  const stickyFooter =
    (drawerRef?.current &&
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element | DocumentFragment'. */
      createPortal(<>{addNewPortfolioButtonJsx}</>, stickyFooterContainer)) ||
    null;

  return (
    <div className={styles.DropdownPortfolioWrapper}>
      {loading && <LoadingSpinner width={20} />}
      {!loading && !error && allPortfolios && Array.isArray(allPortfolios) && (
        <>
          {allPortfolios.map((portfolio) => {
            return (
              <DropdownItem key={`portfolio-item-${portfolio?.portfolioKey}`}>
                <Link
                  className={styles.DropdownPortfolioLink}
                  onClick={() => {
                    /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
                    closeOverly && closeOverly();
                    portfolioTrade({
                      portfolioKey: portfolio?.portfolioKey,
                      instrumentCount: portfolio?.instrumentCount,
                      instrumentKey: instrumentKey,
                      type,
                      origin,
                    });
                  }}
                >
                  <span>{portfolio.name}</span>
                  {portfolio.defaultPortfolio && (
                    <Icon type="IconFavouriteFill" />
                  )}
                </Link>
              </DropdownItem>
            );
          })}
        </>
      )}
      {stickyFooter}
    </div>
  );
};

// for fibox calls to use
/* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
export const selectPortfolioAndTrade = ({ instrumentKey, type, origin }) => {
  const token = Auth0.getIdToken();
  if (!token) {
    displayInfoToast(
      AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
      AUTHORIZATION_ERROR_ID,
      {
        text: 'Hier einloggen oder registrieren.',
        onClick: () => Auth0.login(),
      },
    );
    return;
  }
  return modal({
    type: 'drawer',
    title: 'Hinzufügen zu',
    hasStickyHeader: true,
    hasStickyFooter: true,
    hideDefaultButtons: true,
    closeOnClickOutside: false,
    closeOnLocationChange: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
    customUi: ({ drawerRef }) => {
      return (
        <AddToPortfolio
          instrumentKey={instrumentKey}
          type={type}
          origin={origin}
          drawerRef={drawerRef}
        ></AddToPortfolio>
      );
    },
  });
};

export default PortfolioTradeForm;
