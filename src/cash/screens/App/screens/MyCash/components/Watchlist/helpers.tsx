import { toast } from 'react-toastify';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import {
  displayErrorToast,
  displaySuccessToast,
} from '../../../../components/Toast';
import {
  watchlistByKeyApolloConfig,
  watchlistScreenApolloConfig,
} from './apolloConfig';
import {
  CUSTOM_VIEW,
  CUSTOM_VIEW_TABLE,
  DEFAULT_TABLE,
  LIMIT_TABLE,
  LIMIT_VIEW,
  MONITOR_TABLE,
  MONITOR_VIEW,
  ORIGINAL_CURRENCY_TABLE,
  PERFORMANCE_TABLE,
  PERFORMANCE_VIEW,
  SPECIAL_INFO_TABLE,
  SPECIAL_INFO_VIEW,
  TRADER_TABLE,
  TRADER_VIEW,
} from '../Table/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_WATCHLISTS, GET_WATCHLIST_BY_KEY } from './queries';
import { ViewType } from './typings';

export type TableType =
  | typeof DEFAULT_TABLE
  | typeof LIMIT_TABLE
  | typeof MONITOR_TABLE
  | typeof ORIGINAL_CURRENCY_TABLE
  | typeof TRADER_TABLE
  | typeof PERFORMANCE_TABLE
  | typeof SPECIAL_INFO_TABLE
  | typeof CUSTOM_VIEW_TABLE;

export const tableByViewtype = (viewtype: ViewType): TableType => {
  switch (viewtype) {
    case LIMIT_VIEW:
      return LIMIT_TABLE;
    case TRADER_VIEW:
      return TRADER_TABLE;
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

export const addInstrumentToWatchlist = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'watchlistKey' implicitly has an 'any' type. */
  watchlistKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
  instrumentKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentName' implicitly has an 'any' type. */
  instrumentName,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'addInstrumentMutation' implicitly has an 'any' type. */
  addInstrumentMutation,
  isWatchlistOrigin = false,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
  origin,
}) => {
  const errorMsg =
    'Leider ist beim Hinzufügen ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
  if (watchlistKey && instrumentKey) {
    const { ...watchlistOptions } = watchlistScreenApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true',
      },
    });
    const { ...watchlistByKeyOptions } = watchlistByKeyApolloConfig.options({
      location,
      params: {
        watchlistKey,
      },
    });
    addInstrumentMutation({
      variables: {
        watchlistKey,
        instrumentKey: instrumentKey,
      },
      refetchQueries: [
        {
          query: GET_WATCHLISTS,
          variables: {
            ...watchlistOptions.variables,
          },
        },
        {
          query: GET_WATCHLIST_BY_KEY,
          variables: {
            ...watchlistByKeyOptions.variables,
          },
        },
      ],
    })
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      .then(({ data }): Promise<void> => {
        if (
          data?.addInstrumentToWatchlist &&
          data?.addInstrumentToWatchlist?.error &&
          data?.addInstrumentToWatchlist?.error !== null
        ) {
          if (!toast.isActive('watchlist-instrument-adding-error')) {
            displayErrorToast(errorMsg, 'watchlist-instrument-adding-error');
          }
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
          return;
        }
        if (toast.isActive('watchlist-instrument-adding-error')) {
          toast.dismiss('watchlist-instrument-adding-error');
        }

        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetchWatchlistCollection = global.refetchAllWatchlistsGQL;
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetch = global.refetchWatchlistsGQL;

        if (refetchWatchlistCollection && refetch && isWatchlistOrigin) {
          // track tealium event on successful portfolio
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'transaction_add',
              event_category: 'watchlist',
              event_action: 'transaction_add',
              watchlist_key: watchlistKey,
              instrument_key: instrumentKey,
              from: `add-to-watchlist/${origin}`,
            },
          });
          refetchWatchlistCollection()
            .then(refetch)
            .then(() => {
              displaySuccessToast(
                `"${instrumentName}" wurde erfolgreich zur Watchlist hinzugefügt. `,
                'watchlist-instrument-adding-success',
              );
            });
        } else {
          displaySuccessToast(
            `"${instrumentName}" wurde erfolgreich zur Watchlist hinzugefügt. `,
            'watchlist-instrument-adding-success',
            {
              text: 'Zur Watchlist',
              path: `/watchlist/${watchlistKey}`,
            },
          );
        }
      })
      .catch((): void => {
        if (!toast.isActive('watchlist-settings-error')) {
          displayErrorToast(errorMsg, 'watchlist-instrument-adding-error');
        }
      });
  } else {
    displayErrorToast(errorMsg, 'watchlist-settings-error');
  }
};

export const deleteInstrumentInWatchlist = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'watchlistKey' implicitly has an 'any' type. */
  watchlistKey,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrumentKey' implicitly has an 'any' type. */
  instrumentKey,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrumentName' implicitly has an 'any' type. */
  instrumentName,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'deleteInstrumentMutation' implicitly has an 'any' type. */
  deleteInstrumentMutation,
) => {
  const errorMsg =
    'Leider ist beim Löschen ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
  if (watchlistKey && instrumentKey) {
    const { ...watchlistByKeyOptions } = watchlistByKeyApolloConfig.options({
      location,
      params: {
        watchlistKey,
      },
    });
    deleteInstrumentMutation({
      variables: {
        watchlistKey,
        instrumentKey: instrumentKey,
      },
      refetchQueries: [
        {
          query: GET_WATCHLIST_BY_KEY,
          variables: {
            ...watchlistByKeyOptions.variables,
          },
        },
      ],
    })
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      .then(({ data }): Promise<void> => {
        if (
          data?.deleteInstrumentInWatchlist &&
          data?.deleteInstrumentInWatchlist?.error &&
          data?.deleteInstrumentInWatchlist?.error !== null
        ) {
          if (
            __CLIENT__ &&
            !toast.isActive('watchlist-instrument-deleting-error')
          ) {
            displayErrorToast(errorMsg, 'watchlist-instrument-deleting-error');
          }
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
          return;
        }
        if (
          __CLIENT__ &&
          toast.isActive('watchlist-instrument-deleting-error')
        ) {
          toast.dismiss('watchlist-instrument-deleting-error');
        }
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: 'transaction_remove',
            event_category: 'watchlist',
            event_action: 'transaction_remove',
            watchlist_key: watchlistKey,
            instrument_key: instrumentKey,
          },
        });
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.refetchWatchlistsGQL();
      })
      .catch((): void => {
        if (!toast.isActive('watchlist-settings-error')) {
          displayErrorToast(errorMsg, 'watchlist-instrument-deleting-error');
        }
      });
  } else {
    displayErrorToast(errorMsg, 'watchlist-settings-error');
  }
};

export const handleEditWatchlistMutation = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'mutationVariables' implicitly has an 'any' type. */
  mutationVariables,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'editWatchlistMutation' implicitly has an 'any' type. */
  editWatchlistMutation,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'setSubmitError' implicitly has an 'any' type. */
  setSubmitError,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'submitError' implicitly has an 'any' type. */
  submitError,
) => {
  const errorMsg =
    'Leider ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

  const {
    currentKey,
    name,
    description = '',
    isDefault = false,
  } = mutationVariables;

  if (currentKey) {
    editWatchlistMutation({
      variables: {
        watchlistKey: currentKey,
        name,
        standard: isDefault,
        description,
      },
    })
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      .then(({ data }): Promise<void> => {
        if (data?.editPortfolio && data?.editPortfolio?.error) {
          if (!toast.isActive('watchlist-edit-error')) {
            displayErrorToast(errorMsg, 'watchlist-edit-error');
          }
          setSubmitError(true);
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
          return;
        }

        if (toast.isActive('watchlist-edit-error')) {
          toast.dismiss('watchlist-edit-error');
        }

        setSubmitError(false);

        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetchWatchlistCollection = global.refetchAllWatchlistsGQL;

        if (refetchWatchlistCollection) {
          refetchWatchlistCollection().then(() => {
            if (
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              global.MiniWatchlistRefetch &&
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              typeof global.MiniWatchlistRefetch === 'function'
            ) {
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              global.MiniWatchlistRefetch();
            }
          });
        }
      })
      .catch((): void => {
        if (!submitError && !toast.isActive('watchlist-edit-error')) {
          displayErrorToast(errorMsg, 'watchlist-edit-error');
        }

        setSubmitError(true);
        return;
      });
  } else {
    displayErrorToast(errorMsg, 'watchlist-edit-error');
  }
};
