import { toast } from 'react-toastify';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { sortTableItems } from '../Table/helpers';
import { displayErrorToast } from '../../../../components/Toast';
import { headerMapping } from '../../components/Table/components/headerMapping';
import { portfoliosCalculatedScreenApolloConfig } from '../Portfolios/apolloConfig';
import {
  portfolioByKeyApolloConfig,
  portfolioScreenApolloConfig,
} from './apolloConfig';
import { getSpecialListingKeys } from '../../../../components/Widgets/components/MultipleInstrumentsGenericDataWithCallback/helpers';
import { DEFAULT_ERROR_MESSAGE } from '../../../../components/Toast/constants';
import {
  CUSTOM_VIEW,
  CUSTOM_VIEW_TABLE,
  DEFAULT_TABLE,
  LIMIT_TABLE,
  LIMIT_VIEW,
  MONITOR_TABLE,
  MONITOR_VIEW,
  ORIGINAL_CURRENCY_TABLE,
  ORIGINAL_CURRENCY_VIEW,
  PERFORMANCE_TABLE,
  PERFORMANCE_VIEW,
  SPECIAL_INFO_TABLE,
  SPECIAL_INFO_VIEW,
} from '../Table/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolio/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { SP500_LISTING_KEY_CUSTOM } from '../../../../components/Widgets/components/TopFlop/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolios/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screen */
import { GET_PORTFOLIOS, GET_PORTFOLIO_BY_KEY } from '../Portfolio/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolios/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screen */
import { GET_PORTFOLIOS_CALCULATED } from '../Portfolios/queries';
import { ViewType } from './typings';

export type TableType =
  | typeof DEFAULT_TABLE
  | typeof LIMIT_TABLE
  | typeof MONITOR_TABLE
  | typeof ORIGINAL_CURRENCY_TABLE
  | typeof PERFORMANCE_TABLE
  | typeof SPECIAL_INFO_TABLE
  | typeof CUSTOM_VIEW_TABLE;

export const tableByViewtype = (viewtype: ViewType): TableType => {
  switch (viewtype) {
    case LIMIT_VIEW:
      return LIMIT_TABLE;
    case ORIGINAL_CURRENCY_VIEW:
      return ORIGINAL_CURRENCY_TABLE;
    case PERFORMANCE_VIEW:
      return PERFORMANCE_TABLE;
    case SPECIAL_INFO_VIEW:
      return SPECIAL_INFO_TABLE;
    case MONITOR_VIEW:
      return MONITOR_TABLE;
    case CUSTOM_VIEW:
      return CUSTOM_VIEW_TABLE;
    default:
      return DEFAULT_TABLE;
  }
};

export const deleteInstrumentInPortfolio = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrumentKey' implicitly has an 'any' type. */
  instrumentKey,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrumentName' implicitly has an 'any' type. */
  instrumentName,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'deleteInstrumentMutation' implicitly has an 'any' type. */
  deleteInstrumentMutation,
  isOtherAsset = false,
) => {
  const errorMsg =
    'Leider ist beim Löschen ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
  if (portfolioKey && instrumentKey) {
    deleteInstrumentMutation({
      variables: {
        portfolioKey: portfolioKey,
        instrumentKey: instrumentKey,
        isOtherAsset: !!isOtherAsset,
      },
    })
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      .then(({ data }): Promise<void> => {
        if (
          data?.deleteInstrument &&
          data?.deleteInstrument?.error &&
          data?.deleteInstrument?.error !== null
        ) {
          if (
            __CLIENT__ &&
            !toast.isActive('portfolio-instrument-deleting-error')
          ) {
            displayErrorToast(errorMsg, 'portfolio-instrument-deleting-error');
          }
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
          return;
        }
        if (
          __CLIENT__ &&
          toast.isActive('portfolio-instrument-deleting-error')
        ) {
          toast.dismiss('portfolio-instrument-deleting-error');
        }

        // track tealium event on successful transaction deletion
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: 'instrument_delete',
            event_category: 'portfolio',
            event_action: 'instrument_delete',
            portfolio_key: portfolioKey,
            instrument_key: instrumentKey,
          },
        });
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.refetchPortfoliosGQL();
      })
      .catch((): void => {
        if (!toast.isActive('portfolio-settings-error')) {
          displayErrorToast(errorMsg, 'portfolio-instrument-deleting-error');
        }
      });
  } else {
    displayErrorToast(errorMsg, 'portfolio-settings-error');
  }
};

export const handleEditPortfolioMutation = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'mutationVariables' implicitly has an 'any' type. */
  mutationVariables,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'editPortfolioMutation' implicitly has an 'any' type. */
  editPortfolioMutation,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'setSubmitError' implicitly has an 'any' type. */
  setSubmitError,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'submitError' implicitly has an 'any' type. */
  submitError,
) => {
  const errorMsg =
    'Leider ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

  const { currentKey, name, isDefault = false } = mutationVariables;

  if (currentKey) {
    const { ...portfoliosCalculatedOptions } =
      portfoliosCalculatedScreenApolloConfig.options({
        location,
        params: {
          isAuthenticated: 'true',
        },
      });
    const { ...portfolioOptions } = portfolioScreenApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true',
      },
    });
    const { ...portfolioByKeyOptions } = portfolioByKeyApolloConfig.options({
      location,
      params: {
        portfolioKey: currentKey,
        isAuthenticated: 'true',
      },
    });
    const refetchQueries = [
      {
        query: GET_PORTFOLIOS,
        variables: portfolioOptions.variables,
      },
      {
        query: GET_PORTFOLIOS_CALCULATED,
        variables: portfoliosCalculatedOptions.variables,
      },
    ];
    if (currentKey) {
      refetchQueries.push({
        query: GET_PORTFOLIO_BY_KEY,
        variables: portfolioByKeyOptions.variables,
      });
    }
    editPortfolioMutation({
      variables: {
        portfolioKey: currentKey,
        name,
        defaultPortfolio: isDefault,
      },
      refetchQueries,
    })
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      .then(({ data }): Promise<void> => {
        if (data?.editPortfolio && data?.editPortfolio?.error) {
          if (!toast.isActive('portfolio-edit-error')) {
            displayErrorToast(errorMsg, 'portfolio-edit-error');
          }
          setSubmitError(true);
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
          return;
        }

        if (toast.isActive('portfolio-edit-error')) {
          toast.dismiss('portfolio-edit-error');
        }

        setSubmitError(false);

        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetchPortfolioList = global.refetchAllPortfoliosGQL;

        if (refetchPortfolioList) {
          refetchPortfolioList();
        }

        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        if (global.refetchPortfoliosGQL) {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.refetchPortfoliosGQL();
        }
      })
      .catch((): void => {
        if (!submitError && !toast.isActive('portfolio-edit-error')) {
          displayErrorToast(errorMsg, 'portfolio-edit-error');
        }

        setSubmitError(true);
        return;
      });
  } else {
    displayErrorToast(errorMsg, 'portfolio-edit-error');
  }
};

const downloadFile = (fileName: string, fileContent: string) => {
  const blob = new Blob([fileContent], {
    type: 'text/csv',
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

const filterInstruments = (
  instruments: Instrument[],
  query: any,
): Instrument[] => {
  if (query['sold-out'] === 'show') {
    return instruments;
  }
  return instruments.filter((instrument) => instrument.quantity !== '0');
};

export const downloadTransactionsCSV = (
  buyInstruments: any,
  sellInstruments: any,
) => {
  const headers = [
    { name: headerMapping['name'].name },
    { date: 'Datum' },
    { quantity: headerMapping['quantity'].name },
    { accountPercent: headerMapping['accountPercent'].name },
    { account: 'GEWINN/VERLUST CHF' },
    { price: 'Preis' },
    { actualPrice: headerMapping['actualPrice'].name },
    { fees: headerMapping['fees'].name },
    { type: 'Art' },
    { comment: 'Kommentar' },
  ];
  let csv = '';
  headers.forEach((header) => {
    csv += Object.values(header)[0] + ';';
  });
  csv = csv.slice(0, csv.length - 1) + '\n';
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
  buyInstruments.concat(sellInstruments).forEach((instrument) => {
    headers.forEach((header) => {
      const key = Object.keys(header)[0];
      let value = instrument[key];
      if (!value || value === '0') {
        value = '';
      }
      csv += value + ';';
    });
    csv = csv.slice(0, csv.length - 1) + '\n';
  });
  downloadFile('transaktionen.csv', csv);
};

export const downloadPortfolioCSV = (
  portfolio: Portfolio,
  activeHeaders: string[],
  query: any,
) => {
  if (
    (!query.group || query.group === 'no-grouping') &&
    (query.direction === 'asc' || query.direction === 'desc')
  ) {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2322 ->  Type 'ExtendedInstrument[]' is not assignable to type 'Instrument[]'. */
    portfolio.calculatedFields.instruments = sortTableItems(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<Instrument[]> | undefined' is not assignable to parameter of type 'ExtendedInstrument[]'. */
      portfolio?.calculatedFields?.instruments,
      query.sortBy,
      query.direction,
    );
  }
  let csv = '';
  if (!activeHeaders) {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    activeHeaders = JSON.parse(portfolio?.portfolioSettings?.customView).map(
      (value: { field: string }) => value.field,
    );
  }
  activeHeaders.forEach((header) => {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly name */
    csv += headerMapping[header].name + ';';
  });
  csv = csv.slice(0, csv.length - 1) + '\n';
  const instruments = portfolio?.calculatedFields?.instruments;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<Instrument[]> | undefined' is not assignable to parameter of type 'Instrument[]'. */
  const filterdInstruments = filterInstruments(instruments, query);
  filterdInstruments.forEach((instrument) => {
    activeHeaders.forEach((header) => {
      if (header === 'alertsUpperLimit' || header === 'alertsLowerLimit') {
        csv += 'Limit field' + ';';
      } else {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Instrument'. */
        let value = instrument[header];
        if (!value || value === '0') {
          value = '';
        }
        csv += value + ';';
      }
    });
    csv = csv.slice(0, csv.length - 1) + '\n';
  });
  downloadFile('portfolio.csv', csv);
};

export const handleDeleteTransaction = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
  instrumentKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'transactionKey' implicitly has an 'any' type. */
  transactionKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isOtherAsset' implicitly has an 'any' type. */
  isOtherAsset,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isDeletingTransaction' implicitly has an 'any' type. */
  isDeletingTransaction,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setIsDeletingTransaction' implicitly has an 'any' type. */
  setIsDeletingTransaction,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'deleteTransactionMutation' implicitly has an 'any' type. */
  deleteTransactionMutation,
}) => {
  const variables: any = {
    portfolioKey,
    instrumentKey,
    transactionKey,
    isOtherAsset,
  };

  if (isDeletingTransaction) {
    return;
  }
  setIsDeletingTransaction(true);

  deleteTransactionMutation({
    variables,
  })
    /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
    .then(async ({ data }): Promise<void> => {
      if (
        data?.deleteTransaction &&
        data?.deleteTransaction?.error &&
        data?.deleteTransaction?.error !== null
      ) {
        if (!toast.isActive('portfolio-delete-transaction-error')) {
          displayErrorToast(
            DEFAULT_ERROR_MESSAGE,
            'portfolio-delete-transaction-error',
          );
        }
        setIsDeletingTransaction(false);
        return;
      }

      if (toast.isActive('portfolio-delete-transaction-error')) {
        toast.dismiss('portfolio-delete-transaction-error');
      }

      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      if (global.refetchPortfolioGQL) {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.refetchPortfolioGQL().then(() => {
          setIsDeletingTransaction(false);
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'transaction_remove',
              event_category: 'portfolio',
              event_action: 'transaction_remove',
              portfolio_key: portfolioKey,
              instrument_key: instrumentKey,
              transation_key: transactionKey || null,
            },
          });
        });
      }
    })
    .catch(() => {
      displayErrorToast(
        DEFAULT_ERROR_MESSAGE,
        'portfolio-delete-transaction-error',
      );
      setIsDeletingTransaction(false);
    });
};

export const printTable = () => {
  toast.dismiss();
  setTimeout(() => {
    window.print();
  }, 200);
};

export const deleteCashItem = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'cashItemKey' implicitly has an 'any' type. */
  cashItemKey,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'deleteCashItemMutation' implicitly has an 'any' type. */
  deleteCashItemMutation,
) => {
  const errorMsg =
    'Leider ist beim Löschen ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
  if (portfolioKey && cashItemKey) {
    deleteCashItemMutation({
      variables: {
        portfolioKey: portfolioKey,
        cashItemKey: cashItemKey,
      },
    })
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      .then(({ data }): Promise<void> => {
        if (
          data?.deleteCashItem &&
          data?.deleteCashItem?.error &&
          data?.deleteCashItem?.error !== null
        ) {
          if (!toast.isActive('cash-item-deleting-error')) {
            displayErrorToast(errorMsg, 'cash-item-deleting-error');
          }
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
          return;
        }
        if (toast.isActive('cash-item-deleting-error')) {
          toast.dismiss('cash-item-deleting-error');
        }

        // track tealium event on successful transaction deletion
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: 'account_transaction_delete',
            event_category: 'portfolio',
            event_action: 'account_transaction_delete',
            portfolio_key: portfolioKey,
            cashitem_key: cashItemKey,
          },
        });
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.refetchCashItems();
      })
      .catch((): void => {
        if (!toast.isActive('cash-item-error')) {
          displayErrorToast(errorMsg, 'cash-item-deleting-error');
        }
      });
  } else {
    displayErrorToast(errorMsg, 'cash-item-error');
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'tableView' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'currentCustomView' implicitly has an 'any' type. */
export const hasTransactionFields = (tableView, currentCustomView) => {
  const transactionFields = ['buyingDate'];

  return (
    tableView === SPECIAL_INFO_VIEW ||
    (tableView === CUSTOM_VIEW &&
      currentCustomView?.length > 0 &&
      transactionFields.some((column) =>
        currentCustomView?.includes(column),
      )) ||
    false
  );
};

export const isListingKey = (key: string): boolean => {
  if (!key) {
    return false;
  }
  if (
    getSpecialListingKeys()
      .map((key) => key.key)
      .includes(key) ||
    key === SP500_LISTING_KEY_CUSTOM
  ) {
    return true;
  }
  const pattern = new RegExp('^[0-9]+?-[0-9]+?-[0-9]+?$');
  return pattern.test(key);
};

export const isListingKeyList = (keys: string): boolean => {
  if (!keys) {
    return false;
  }
  return keys.split(',').every(isListingKey);
};
