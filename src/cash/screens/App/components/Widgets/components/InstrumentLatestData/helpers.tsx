import { useSelector } from 'react-redux';
import {
  SUBSCRIPTION_TYPE_ANLEGER,
  SUBSCRIPTION_TYPE_PROFI,
  SUBSCRIPTION_TYPE_BANKING,
} from '../../../../constants';

export const useCheckUserSubscriptions = () => {
  const subscriptions = useSelector<ReduxState, string[]>(
    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
    ({ auth }) => auth.subscriptions,
  );

  const hasSubscriptions = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.hasSubscriptions || false,
  );

  const isCrawler = useSelector<ReduxState, boolean>(
    ({ route }) => route.isCrawler || false,
  );

  return (
    isCrawler ||
    (!hasSubscriptions
      ? false
      : [
          SUBSCRIPTION_TYPE_ANLEGER,
          SUBSCRIPTION_TYPE_PROFI,
          SUBSCRIPTION_TYPE_BANKING,
        ].some((abo) => subscriptions.includes(abo)))
  );
};
