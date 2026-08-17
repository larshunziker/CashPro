import { toast } from 'react-toastify';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { handleEditPortfolioMutation } from '../Portfolio/helpers';
import { handleEditWatchlistMutation } from '../Watchlist/helpers';
import { portfolioEdit } from '../../../../components/PortfolioManagementForm';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../../../../components/Toast';
import { watchlistEdit } from '../../../../components/WatchlistManagementForm';
import modal from '../../../../components/Modal';
import {
  portfolioByKeyApolloConfig,
  portfolioScreenApolloConfig,
} from '../Portfolio/apolloConfig';
import { portfoliosCalculatedScreenApolloConfig } from '../Portfolios/apolloConfig';
import { watchlistByKeyApolloConfig } from '../Watchlist/apolloConfig';
import { ROUTE_PORTFOLIOS } from '../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolio/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { GET_PORTFOLIOS, GET_PORTFOLIO_BY_KEY } from '../Portfolio/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolios/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screen */
import { GET_PORTFOLIOS_CALCULATED } from '../Portfolios/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Watchlist/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { GET_WATCHLIST_BY_KEY } from '../Watchlist/queries';

export const saveUserSettings = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'currentKey' implicitly has an 'any' type. */
  currentKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'query' implicitly has an 'any' type. */
  query,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'editDefaultsMutation' implicitly has an 'any' type. */
  editDefaultsMutation,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setEditLoading' implicitly has an 'any' type. */
  setEditLoading,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setSubmitError' implicitly has an 'any' type. */
  setSubmitError,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'submitError' implicitly has an 'any' type. */
  submitError,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isDirty' implicitly has an 'any' type. */
  isDirty,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'originType' implicitly has an 'any' type. */
  originType,
}) => {
  const errorMsg =
    'Leider ist beim Speichern Ihrer Einstellungen ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

  if (currentKey) {
    const isPortfolio = originType === 'portfolio';
    const { ...options } =
      (isPortfolio &&
        portfolioByKeyApolloConfig.options({
          location,
          params: {
            portfolioKey: currentKey,
            withTransaction: 'false',
          },
        })) ||
      watchlistByKeyApolloConfig.options({
        location,
        params: {
          watchlistKey: currentKey,
        },
      });

    editDefaultsMutation({
      variables: {
        key: currentKey,
        view: query?.type || '',
        grouping: query?.group || '',
        settingsType: originType,
      },
      refetchQueries: [
        {
          query: (isPortfolio && GET_PORTFOLIO_BY_KEY) || GET_WATCHLIST_BY_KEY,
          variables: {
            ...options.variables,
          },
        },
      ],
    })
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      .then(({ data }): Promise<void> => {
        if (
          data?.editDefaults &&
          data?.editDefaults?.error &&
          data?.editDefaults?.error !== null
        ) {
          if (!toast.isActive(`${originType}-settings-error`)) {
            displayErrorToast(errorMsg, `${originType}-settings-error`);
          }
          setSubmitError(true);
          setEditLoading(false);
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
          return;
        }

        if (toast.isActive(`${originType}-settings-error`)) {
          toast.dismiss(`${originType}-settings-error`);
        }

        setEditLoading(false);
        setSubmitError(false);
        if (isDirty) {
          isDirty.current = null;
        }

        displaySuccessToast(
          'Die aktuelle Ansicht und Gruppierung wurde als Standard gespeichert. ',
          `${originType}-settings-submitted`,
        );
      })
      .catch((): void => {
        if (!submitError && !toast.isActive(`${originType}-settings-error`)) {
          displayErrorToast(errorMsg, `${originType}-settings-error`);
        }

        setSubmitError(true);
        setEditLoading(false);
        return;
      });
  } else {
    displayErrorToast(errorMsg, `${originType}-settings-error`);
  }
};

export const handleSetDefaultClick = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'isDefault' implicitly has an 'any' type. */
  isDefault,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'editMutation' implicitly has an 'any' type. */
  editMutation,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'mutationVariables' implicitly has an 'any' type. */
  mutationVariables,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'submitError' implicitly has an 'any' type. */
  submitError,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'setSubmitError' implicitly has an 'any' type. */
  setSubmitError,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'originType' implicitly has an 'any' type. */
  originType,
) => {
  const isPortfolio = originType === 'portfolio';
  const portfolioDefaultInfoMessage =
    'Das Portfolio "%name%" ist bereits Ihr Standard-Portfolio.';
  const watchlistDefaultInfoMessage =
    'Die Watchlist "%name%" ist bereits Ihre Standard-Watchlist.';
  if (isDefault) {
    displayInfoToast(
      (isPortfolio &&
        portfolioDefaultInfoMessage.replace(
          '%name%',
          mutationVariables.name,
        )) ||
        watchlistDefaultInfoMessage.replace('%name%', mutationVariables.name),
      `${originType}-set-default-info`,
    );
  } else if (isPortfolio) {
    handleEditPortfolioMutation(
      mutationVariables,
      editMutation,
      setSubmitError,
      submitError,
    );
  } else {
    handleEditWatchlistMutation(
      mutationVariables,
      editMutation,
      setSubmitError,
      submitError,
    );
  }
};

export const deletePortfolio = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'deletePortfolioMutation' implicitly has an 'any' type. */
  deletePortfolioMutation,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setDeletePortfolioLoading' implicitly has an 'any' type. */
  setDeletePortfolioLoading,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
  navigate,
}) => {
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
  const errorMsg =
    'Leider ist beim Löschen Ihres Portfolios ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

  if (portfolioKey) {
    setDeletePortfolioLoading(true);
    deletePortfolioMutation({
      variables: {
        portfolioKey: portfolioKey,
      },
      refetchQueries: [
        {
          query: GET_PORTFOLIOS,
          variables: portfolioOptions.variables,
        },
        {
          query: GET_PORTFOLIOS_CALCULATED,
          variables: portfoliosCalculatedOptions.variables,
        },
      ],
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
    }).then(({ data }): Promise<void> => {
      if (
        data?.deletePortfolio &&
        data?.deletePortfolio?.error &&
        data?.deletePortfolio?.error !== null
      ) {
        if (!toast.isActive('portfolio-delete-error')) {
          displayErrorToast(errorMsg, 'portfolio-delete-error');
        }
        setDeletePortfolioLoading(false);
        /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
        return;
      }

      if (toast.isActive('portfolio-delete-error')) {
        toast.dismiss('portfolio-delete-error');
      }

      setDeletePortfolioLoading(false);
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      const refetchPortfolioList = global.refetchAllPortfoliosGQL;
      if (refetchPortfolioList) {
        refetchPortfolioList().then(() => {
          // track tealium event on successful portfolio deletion
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'portfolio_delete',
              event_category: 'portfolio',
              event_action: 'portfolio_delete',
              portfolio_key: portfolioKey,
            },
          });

          // navigate to the default portfolio when the current portfolio was successfully deleted
          navigate(`/${ROUTE_PORTFOLIOS}`);
        });
      }
    });
  } else {
    displayErrorToast(errorMsg, 'portfolio-delete-error');
  }
};

export const deleteWatchlist = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'watchlistKey' implicitly has an 'any' type. */
  watchlistKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'deleteWatchlistMutation' implicitly has an 'any' type. */
  deleteWatchlistMutation,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setDeleteWatchlistLoading' implicitly has an 'any' type. */
  setDeleteWatchlistLoading,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
  navigate,
}) => {
  const errorMsg =
    'Leider ist beim Löschen Ihrer Watchlist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

  if (watchlistKey) {
    setDeleteWatchlistLoading(true);
    deleteWatchlistMutation({
      variables: {
        watchlistKey,
      },
      /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
    }).then(({ data }): Promise<void> => {
      if (
        data?.deleteWatchlist &&
        data?.deleteWatchlist?.error &&
        data?.deleteWatchlist?.error !== null
      ) {
        if (!toast.isActive('watchlist-delete-error')) {
          displayErrorToast(errorMsg, 'watchlist-delete-error');
        }
        setDeleteWatchlistLoading(false);
        /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'Promise<void>'. */
        return;
      }

      if (toast.isActive('watchlist-delete-error')) {
        toast.dismiss('watchlist-delete-error');
      }

      setDeleteWatchlistLoading(false);
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      const refetchWatchlistCollection = global.refetchAllWatchlistsGQL;
      if (refetchWatchlistCollection) {
        refetchWatchlistCollection().then(() => {
          // track tealium event on successful watchlist deletion
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'watchlist_delete',
              event_category: 'watchlist',
              event_action: 'watchlist_delete',
              watchlist_key: watchlistKey,
            },
          });

          // navigate to the standard watchlist when the current watchlist was successfully deleted
          navigate('/watchlist');
        });
      }
    });
  } else {
    displayErrorToast(errorMsg, 'watchlist-delete-error');
  }
};

const handleModalDeleteClick = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'originType' implicitly has an 'any' type. */
  originType,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
  key,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'deleteMutation' implicitly has an 'any' type. */
  deleteMutation,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setDeleteLoading' implicitly has an 'any' type. */
  setDeleteLoading,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
  navigate,
}) => {
  if (originType === 'portfolio') {
    deletePortfolio({
      portfolioKey: key,
      deletePortfolioMutation: deleteMutation,
      setDeletePortfolioLoading: setDeleteLoading,
      navigate,
    });
  } else if (originType === 'watchlist') {
    deleteWatchlist({
      watchlistKey: key,
      deleteWatchlistMutation: deleteMutation,
      setDeleteWatchlistLoading: setDeleteLoading,
      navigate,
    });
  }
};

export const handleDeleteClick = ({
  name,
  key,
  isDefault,
  deleteMutation,
  setDeleteLoading,
  navigate,
  originType,
}: any) => {
  const isPortfolio = originType === 'portfolio';
  const portfolioDeleteInfoMessage = `Es ist nicht möglich Ihr Standard-Portfolio zu löschen. Bitte wählen Sie zuerst ein anderes Portfolio als Standard bevor Sie dieses löschen.`;
  const watchlistDeleteInfoMessage = `Es ist nicht möglich Ihre Standard-Watchlist zu löschen. Bitte wählen Sie zuerst eine andere Watchlist als Standard bevor Sie dieses löschen.`;
  if (isDefault) {
    displayInfoToast(
      isPortfolio ? portfolioDeleteInfoMessage : watchlistDeleteInfoMessage,
      `${originType}-delete-info`,
    );
  } else {
    modal({
      title: `"${name}" löschen`,
      hasStickyHeader: true,
      hasStickyFooter: true,
      closeOnClickOutside: false,
      closeOnLocationChange: true,
      content: `Sind Sie sicher, dass Sie "${name}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`,
      buttons: [
        {
          children: 'Abbrechen',
        },
        {
          variant: 'secondary',
          children: 'Löschen',
          iconTypeLeft: 'IconTrash',
          onClick: () => {
            handleModalDeleteClick({
              originType,
              key,
              deleteMutation,
              setDeleteLoading,
              navigate,
            });
          },
        },
      ],
    });
  }
};

export const handleEditClick = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
  key,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'name' implicitly has an 'any' type. */
  name,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isDefault' implicitly has an 'any' type. */
  isDefault,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
  navigate,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'originType' implicitly has an 'any' type. */
  originType,
}) => {
  if (originType === 'portfolio') {
    return portfolioEdit({
      portfolioKey: key,
      portfolioName: name,
      isDefaultPortfolio: isDefault,
      navigate,
    });
  } else if (originType === 'watchlist') {
    return watchlistEdit({
      watchlistKey: key,
      watchlistName: name,
      isStandardWatchlist: isDefault,
      navigate,
    });
  }
};
