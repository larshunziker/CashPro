import { useSelector } from 'react-redux';
import {
  SUBSCRIPTION_TYPE_ANLEGER,
  SUBSCRIPTION_TYPE_BANKING,
  SUBSCRIPTION_TYPE_BASIC,
  SUBSCRIPTION_TYPE_PROFI,
  SUBSCRIPTION_TYPE_REALTIME,
} from '../../screens/App/constants';

export const useSubscriptions = () => {
  const isAuthenticated = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.isAuthenticated,
  );
  const hasSubscriptions = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.hasSubscriptions || false,
  );
  const subscriptions = useSelector<ReduxState, string[]>(
    ({ auth }) => auth.subscriptions || [],
  );
  const isCrawler = useSelector<ReduxState, boolean>(
    ({ route }) => route.isCrawler || false,
  );

  const isBasic = subscriptions.includes(SUBSCRIPTION_TYPE_BASIC);
  const isBanking = subscriptions.includes(SUBSCRIPTION_TYPE_BANKING);
  const isProfi = subscriptions.includes(SUBSCRIPTION_TYPE_PROFI);
  const isRealtime = subscriptions.includes(SUBSCRIPTION_TYPE_REALTIME);
  const isAnleger = subscriptions.includes(SUBSCRIPTION_TYPE_ANLEGER);

  const isSubscribedTo = (subs: string | string[]) =>
    Array.isArray(subs)
      ? subs.every((s) => subscriptions.includes(s))
      : subscriptions.includes(subs);

  return {
    isAuthenticated,
    hasSubscriptions,
    isCrawler,
    isBasic,
    isBanking,
    isProfi,
    isRealtime,
    isAnleger,
    isSubscribedTo,
  };
};
