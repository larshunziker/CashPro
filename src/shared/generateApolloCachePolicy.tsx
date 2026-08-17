import {
  InvalidationPolicyCache,
  RenewalPolicy,
} from '@nerdwallet/apollo-cache-policies';
import possibleTypes from './possibleTypes.json';

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

// create new cache instance for each client (and for each requests on SSR)
const generateApolloCachePolicy = (state = {}) => {
  const apolloCache = new InvalidationPolicyCache({
    possibleTypes: { ...possibleTypes },
    typePolicies: {
      // we don't have ids on the environment wrapper.
      // TODO: check this carefully with history back etc to
      // ensure it works as expected! also check results with
      // nested subqueries like a routeByPath and a globalSearch
      // to see how the cache behavess
      Query: {
        fields: {
          environment: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
          fusionSearch: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
          integration: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
      Channel: {
        fields: {
          settings: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
    invalidationPolicies: {
      timeToLive: ONE_DAY,
      renewalPolicy: RenewalPolicy.AccessAndWrite,
      types: {
        Watchlist: {
          timeToLive: ONE_HOUR,
          renewalPolicy: RenewalPolicy.WriteOnly,
        },
        CashItem: {
          timeToLive: ONE_HOUR,
          renewalPolicy: RenewalPolicy.WriteOnly,
        },
        // Keep settings aligned with their parent entity TTL. A shorter TTL with
        // WriteOnly caused Watchlist/Portfolio to stay cached (1h) while settings
        // expired (~1m); cache-first then returned the parent without settings and
        // fell back to default view / no-grouping when switching lists.
        WatchlistSettings: {
          timeToLive: ONE_HOUR,
          renewalPolicy: RenewalPolicy.AccessAndWrite,
        },
        Portfolio: {
          timeToLive: ONE_HOUR,
          renewalPolicy: RenewalPolicy.WriteOnly,
        },
        PortfolioSettings: {
          timeToLive: ONE_HOUR,
          renewalPolicy: RenewalPolicy.AccessAndWrite,
        },
        Instrument: {
          timeToLive: ONE_MINUTE,
        },
        Transaction: {
          timeToLive: ONE_MINUTE,
          renewalPolicy: RenewalPolicy.WriteOnly,
        },
        PortfolioCalculatedFields: {
          timeToLive: ONE_MINUTE,
          renewalPolicy: RenewalPolicy.WriteOnly,
        },
        AlertListItem: {
          timeToLive: ONE_MINUTE,
          renewalPolicy: RenewalPolicy.WriteOnly,
        },
      },
    },
  }).restore(state);

  return apolloCache;
};
export default generateApolloCachePolicy;
