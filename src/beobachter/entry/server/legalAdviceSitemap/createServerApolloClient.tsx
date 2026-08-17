import { Request } from 'express';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import rasApolloLinks from '../../../../shared/rasApolloLinks';
import { getServiceUrl } from '../../../../shared/helpers/serviceUrl';

export const createServerApolloClient = (
  req: Request,
): ApolloClient<NormalizedCacheObject> => {
  const graphqlHost = process.env.__GRAPHQL_HOST__ || '';
  const graphqlOrigin = process.env.__GRAPHQL_ORIGIN__ || '';
  const host = req.headers.host || '';

  return new ApolloClient({
    ssrMode: true,
    ssrForceFetchDelay: 0,
    link: rasApolloLinks({
      // @ts-ignore
      uri: getServiceUrl(graphqlHost, req),
      apiOrigin: graphqlOrigin,
      host,
      headers: {
        'X-Do-Not-Deny': '1',
      },
      // @ts-ignore
      req,
    }),
    cache: new InMemoryCache(),
  });
};

export const getBaseUrl = (req: Request): string => {
  const isProdEnv = process.env.NODE_ENV === 'production';
  const host = req.headers.host || 'www.beobachter.ch';
  let protocol = isProdEnv ? 'https' : req.protocol;

  if (host.includes('localhost')) {
    protocol = 'http';
  }

  return `${protocol}://${host}`;
};
