import { toast } from 'react-toastify';
import { useLazyQuery } from '@apollo/client';
import { displayErrorToast } from '../../../../components/Toast';
import { alertsScreenApolloConfig } from './apolloConfig';
import { DEFAULT_ERROR_MESSAGE } from '../../../../components/Toast/constants';
import { CUSTOM_VIEW, LIMIT_VIEW } from '../Table/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_ALERTS_LIST_EXTERNAL } from './queries';

export const handleDeleteAlert = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'alertKey' implicitly has an 'any' type. */
  alertKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'deleteAlertMutation' implicitly has an 'any' type. */
  deleteAlertMutation,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'startLoadingCallback' implicitly has an 'any' type. */
  startLoadingCallback,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'stopLoadingCallback' implicitly has an 'any' type. */
  stopLoadingCallback,
}) => {
  startLoadingCallback();

  const { variables: alertScreenVariables } = alertsScreenApolloConfig.options({
    location,
  });

  deleteAlertMutation({
    variables: {
      alertKey: `${alertKey}`,
    },
    refetchQueries: [
      {
        query: GET_ALERTS_LIST_EXTERNAL,
        variables: alertScreenVariables,
      },
    ],
  })
    /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
    .then(async ({ data }): Promise<void> => {
      if (
        data?.deleteAlert &&
        data?.deleteAlert?.error &&
        data?.deleteAlert?.error !== null
      ) {
        // eslint-disable-next-line no-console
        console.error(
          'there was an error sending the query',
          data?.deleteAlert.error,
          data?.deleteAlert.status,
        );
        if (!toast.isActive('alert-delete-error')) {
          displayErrorToast(
            DEFAULT_ERROR_MESSAGE,
            'portfolio-delete-transaction-error',
          );
        }
        stopLoadingCallback();
        return;
      }

      if (toast.isActive('alert-delete-error')) {
        toast.dismiss('alert-delete-error');
      }

      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      if (global.refetchAlertListGQL) {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.refetchAlertListGQL().then(() => {
          stopLoadingCallback();
        });
      }
    })
    .catch((): void => {
      displayErrorToast(DEFAULT_ERROR_MESSAGE, 'alert-delete-error');
      stopLoadingCallback();
    });
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'tableView' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'currentCustomView' implicitly has an 'any' type. */
export const hasAlertsColumn = (tableView, currentCustomView) => {
  const alertColumns = ['alertsLowerLimit', 'alertsUpperLimit'];

  return (
    tableView === LIMIT_VIEW ||
    (tableView === CUSTOM_VIEW && currentCustomView?.length > 0
      ? alertColumns.some((column) => currentCustomView?.includes(column))
      : false)
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'hasAlerts' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'currentKey' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'apolloConfig' implicitly has an 'any' type. */
export const GetAlerts = ({ hasAlerts, currentKey, apolloConfig }) => {
  const { query: alertsQuery, ...alertsOptions } = apolloConfig.options({
    location,
    params: {
      ...currentKey,
    },
  });

  const [getAlerts, { data, loading, called, refetch }] = useLazyQuery(
    alertsQuery,
    alertsOptions,
  );

  const hasKey = !!Object.values(currentKey)[0];

  if (!called && !loading && hasAlerts && hasKey) {
    getAlerts();
  }

  return { data, loading, refetch };
};
