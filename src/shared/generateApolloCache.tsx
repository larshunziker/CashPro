import { InMemoryCache } from '@apollo/client';
import possibleTypes from './possibleTypes.json';

// create new cache instance for each client (and for each requests on SSR)
const generateApolloCache = (state = {}) => {
  const apolloCache = new InMemoryCache({
    possibleTypes: {
      ...possibleTypes,
    } /* destructuring because of errors in the past https://dtc-rasch.slack.com/archives/GD6FRUFAA/p1696493678213159 */,
    typePolicies: {
      // we don't have ids on the evironemnt wrapper.
      // TODO: check this carefully with history back etc to
      // ensure it works as expected! also check results with
      // nested subqueries like a routeByPath and a globalSearch
      // to see how the cache behaves
      Query: {
        fields: {
          environment: {
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
      LegalAdviceCategory: {
        keyFields: false,
      },
      ArticleType: {
        keyFields: false,
      },
    },
  }).restore(state);
  return apolloCache;
};
export default generateApolloCache;
