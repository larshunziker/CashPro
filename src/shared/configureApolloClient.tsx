import { ApolloClient } from '@apollo/client';
import rasApolloLinks from './rasApolloLinks';

const apolloClient: any = (
  apiUri: string,
  apiOrigin: string,
  host: string,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'generateApolloCache' implicitly has an 'any' type. */
  generateApolloCache,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '() => any'. */
  fetchAfterware: () => any | null = null,
  headers = {},
  req = null,
) => {
  if (__CLIENT__) {
    /* eslint-disable-next-line */
    console.warn('consider using "asyncConfigureApolloClient" instead!');
  }

  const cache = generateApolloCache();

  // create client
  return new ApolloClient({
    ssrMode: true,
    ssrForceFetchDelay: 0,
    link: rasApolloLinks({
      uri: apiUri,
      apiOrigin,
      host,
      fetchAfterware,
      headers,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Request | undefined'. */
      req,
    }),
    cache,
  });
};

export default apolloClient;
