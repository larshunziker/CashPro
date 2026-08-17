import { ApolloLink, HttpLink, Observable } from '@apollo/client';
import { Operation } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { RetryLink } from '@apollo/client/link/retry';
import { removeDirectivesFromDocument } from '@apollo/client/utilities';
import { sha256 } from 'crypto-hash';
import { OperationDefinitionNode, StringValueNode } from 'graphql';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'node-fetch'. '/Users/bhs/code/work/rasch-stack/node_modules/node-fetch/li */
import fetch from 'node-fetch';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './helpers/nonSecureHasher'. '/Users/bhs/code/work/rasch-stack/src/shared/ */
import { hashCode } from './helpers/nonSecureHasher';
import { getServiceUrl } from './helpers/serviceUrl';
import { Auth0 } from '../common/components/Auth0Provider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './getQueryDocumentKey'. '/Users/bhs/code/work/rasch-stack/src/shared/getQ */
import { getQueryDocumentKey } from './getQueryDocumentKey';
import fallbackJson from './graphql-mocks/451.json';
import { ShareUrlRedirectLink } from './ShareUrlRedirectLink';
import queryMapData from './queries';

const config = {
  endpoints: {
    cms: {
      default: String(process.env.__CMS_GRAPHQL_HOST__),
      preview: String(
        process.env.__CMS_PREVIEW_GRAPHQL_HOST__ ||
          process.env.__CMS_GRAPHQL_HOST__,
      ),
    },
    'graphql-service': {
      default: String(process.env.__GRAPHQL_HOST__),
      preview: String(
        process.env.__PREVIEW_GRAPHQL_HOST__ || process.env.__GRAPHQL_HOST__,
      ),
    },
  },
  defaultEndpoint: String(process.env.__DEFAULT_GRAPHQL_ENDPOINT__),
};

// ----------------------------------------------

const getDirectiveArgumentValueFromOperation = (
  operation: Operation,
  directiveName: string,
  argumentName: string,
) =>
  (
    (
      operation.query.definitions.find(
        (definition) => definition.kind === 'OperationDefinition',
      ) as OperationDefinitionNode
    )?.directives
      ?.find((directive) => directive.name?.value === directiveName)
      ?.arguments?.find((argument) => argument.name?.value === argumentName)
      ?.value as StringValueNode
  )?.value || config.defaultEndpoint;

const getApiDirectiveValue = (operation: Operation) => {
  return getDirectiveArgumentValueFromOperation(operation, 'api', 'name');
};

const getEndpointUri = ({
  operation,
  host,
  req,
}: {
  operation: Operation;
  host: string;
  req: Request;
}) => {
  const apiName = getApiDirectiveValue(operation);

  const env =
    host.includes('preview.') || __FORCE_PREVIEW_REQUESTS__
      ? 'preview'
      : 'default';

  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ cms */
  if (!config.endpoints[apiName][env]) {
    throw new Error(`No endpoint found for ${apiName}`);
  }

  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ cms */
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Request' is not assignable to parameter of type 'null | undefined'. */
  return getServiceUrl(config.endpoints[apiName][env], req);
};

const createContext = ({
  operation,
  host,
  req,
}: {
  operation: Operation;
  host: string;
  req: Request;
}) => {
  // get endpoint uri by reading the @api directive
  const endpointUri = getEndpointUri({ operation, host, req });
  const apiName = getApiDirectiveValue(operation);

  if (!endpointUri) {
    throw new Error('Was not able to find endpoint URI!');
  }

  const modifiedOperation = removeCustomDirectives(operation);

  if (!modifiedOperation.query) {
    throw new Error('Error while removing directive @api');
  }

  // set correct endpoint uri
  modifiedOperation.setContext({
    uri: endpointUri,
    apiName,
  });

  return modifiedOperation;
};

const removeCustomDirectives = (operation: Operation) => {
  return Object.assign(operation, {
    query: removeDirectivesFromDocument(
      [{ name: 'api', remove: true }],
      operation.query,
    ),
  });
};

const getDataForGetRequest = (operation: Operation) => {
  const queryDocument: Operation = operation.query as any;

  const queryKey: string = hashCode(getQueryDocumentKey(queryDocument));

  queryKey === undefined &&
    // eslint-disable-next-line
    console.error(
      'multiEntryApolloLinks hash',
      'hashCode undefined',
      JSON.stringify(queryDocument),
    );

  if (
    !(queryKey in queryMapData.map) ||
    queryMapData.map[queryKey] === undefined
  ) {
    // eslint-disable-next-line
    console.error(
      'multiEntryApolloLinks queryMapData',
      `query: ${JSON.stringify(queryDocument)}`,
      `queryKey: ${JSON.stringify(queryKey)}`,
      `queryMapData version: ${JSON.stringify(queryMapData.version)}`,
      `Object keys: ${JSON.stringify(Object.keys(queryMapData.map))}`,
      `Object IDs: ${JSON.stringify(Object.values(queryMapData.map))}`,
    );
  }

  return {
    id: queryMapData.map[queryKey],
    version: queryMapData.version,
    variables: operation.variables,
    operationName: operation.operationName,
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'operation' implicitly has an 'any' type. */
const parseAndCheckResponse = (operation) => (response: Response) => {
  return response
    .json()
    .then((result) => {
      // handle status code
      if (response.status >= 300)
        throw new Error(
          `Response not successful: Received status code ${response.status}`,
        );

      // extract data if we receive an array (just use first item)
      const data: any = (Array.isArray(result) && result[0]) || result;

      // validate data
      if (!data.hasOwnProperty('data') && !data.hasOwnProperty('errors')) {
        throw new Error(
          `Server response was missing for query '${operation.operationName}'.`,
        );
      }

      return data;
    })
    .catch((e) => {
      const httpError: any = new Error(
        `Network request failed with status ${response.status} - "${response.statusText}"`,
      );
      httpError.response = response;
      httpError.parseError = e;
      httpError.statusCode = response.status;

      throw httpError;
    });
};

const getRequestHeaders = ({
  predefinedHeaders = {},
  isAuthorizationHeaderRequired = false,
}) => {
  const headers: any = {
    ...predefinedHeaders,
    accept: 'application/json',
    'content-type': 'application/json', // must be set to a value which qualifies as "simple" according to https://fetch.spec.whatwg.org/#cors-protocol-and-credentials. atm switched back to application/json because of issue when running requests through akamai
  };

  // add authorization header
  const token = (isAuthorizationHeaderRequired && Auth0.getIdToken()) || '';
  if (token && isAuthorizationHeaderRequired) {
    headers.authorization = `Bearer ${token}`;
  }

  return headers;
};

const isMutation = (operation: Operation) => {
  if (Array.isArray(operation?.query?.definitions)) {
    return operation.query.definitions.some((d) => {
      return d.kind === 'OperationDefinition' && d.operation === 'mutation';
    });
  }
  return false;
};

// ----------------------------------------------

/**
 * We have to use here sha256 implementation.
 * https://github.com/apollographql/apollo-server/issues/2894
 * The intention of the client API was to provide a different implementation of SHA 256.
 * We are not looking to provide a custom hash implementation on the server-side.
 */
const persistedQueryLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
});

//TODO: geo blocking - verify this error handler
//https://jira.ringieraxelspringer.ch/browse/BG-341
const errorLink = onError((error) => {
  if (
    error.networkError &&
    'statusCode' in error.networkError &&
    error.networkError.statusCode === 450
  ) {
    error.networkError = undefined;
    error.response = { data: fallbackJson };
  }
});

class HeadersLink extends ApolloLink {
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  private fetchAfterware: (any) => any | null;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'fetchAfterware' implicitly has an 'any' type. */
  constructor(fetchAfterware) {
    super();
    this.fetchAfterware = fetchAfterware;
  }
  /* @ts-ignore TODO: TS7006 ->  Parameter 'operation' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'forward' implicitly has an 'any' type. */
  request(operation, forward) {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    return forward(operation).map((data) => {
      if (this.fetchAfterware) {
        this.fetchAfterware({
          response: operation.getContext().response,
          operationName: operation.operationName,
          variables: operation.variables,
        });
      }
      return data;
    });
  }
}

const retryLink = new RetryLink({
  attempts: {
    max: 5,
    retryIf: ({ statusCode, result }) => {
      const messages =
        /* @ts-ignore TODO: TS7006 ->  Parameter 'e' implicitly has an 'any' type. */
        (result?.errors && result.errors.map((e) => e.message).join(', ')) ||
        '';
      return (
        statusCode >= 500 &&
        statusCode !== 504 &&
        messages.indexOf('PersistedQueryNotFound') === -1
      );
    },
  },
  delay: {
    initial: 2000,
    max: Infinity,
    jitter: true,
  },
});

class HttpGetLink extends ApolloLink {
  private fetchAfterware;
  private headers;

  /* @ts-ignore TODO: TS7031 ->  Binding element 'headers' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'fetchAfterware' implicitly has an 'any' type. */
  constructor({ headers, fetchAfterware }) {
    super();
    this.fetchAfterware = fetchAfterware;
    this.headers = headers;
  }

  /* @ts-ignore TODO: TS2416 ->  Property 'request' in type 'HttpGetLink' is not assignable to the same property in base type 'ApolloLink'. */
  request(operation: Operation) {
    return new Observable((observer) => {
      const requestData = getDataForGetRequest(operation);

      const variables = { ...requestData.variables };

      for (const [key, value] of Object.entries(variables)) {
        if (typeof value === 'string') {
          variables[key] = encodeURIComponent(value);
        }
      }

      const requestUri = `${operation.getContext().uri}?version="${
        requestData.version
      }"&id="${requestData.id}"&operationName="${
        requestData.operationName
      }"&variables=${JSON.stringify(variables)}`.replace(/%22/g, '\\"');

      fetch(requestUri, {
        headers: getRequestHeaders({ predefinedHeaders: this.headers }),
      })
        /* @ts-ignore TODO: TS7006 ->  Parameter 'response' implicitly has an 'any' type. */
        .then((response) => {
          operation.setContext({ response });

          // run fetch afterware
          if (
            this.fetchAfterware &&
            typeof this.fetchAfterware === 'function'
          ) {
            this.fetchAfterware({
              response,
              operationName: requestData.operationName,
              variables,
            });
          }
          return response;
        })
        .then(parseAndCheckResponse(operation))
        /* @ts-ignore TODO: TS7006 ->  Parameter 'response' implicitly has an 'any' type. */
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  }
}

class HttpPostLink extends ApolloLink {
  private httpLink: HttpLink;
  private headers: any;

  /* @ts-ignore TODO: TS7031 ->  Binding element 'headers' implicitly has an 'any' type. */
  constructor({ headers }) {
    super();
    this.httpLink = new HttpLink({ fetch });
    this.headers = headers;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'operation' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'forward' implicitly has an 'any' type. */
  request(operation, forward) {
    const isWithCredentials =
      operation.operationName.indexOf('WithCredentials') > -1 &&
      operation.getContext().apiName !== 'cms';

    // Defer auth-required requests on the client until a non-expired identity
    // token is available. This covers two cases:
    //  1. Page load: `WithCredentials` operations (auto-update/portfolio/chart)
    //     fire before the async userinfo fetch populates the token.
    //  2. Tab reactivation: a backgrounded tab's renewal timer is throttled, so
    //     the in-memory token can be expired when the tab regains focus.
    // In both cases we renew on demand and only then send the request. When a
    // valid token is already present we proceed immediately (no added latency).
    if (__CLIENT__ && isWithCredentials && !Auth0.hasValidToken()) {
      return new Observable((observer) => {
        let sub: any;
        let cancelled = false;
        const start = () => {
          if (cancelled) {
            return;
          }
          const obs = this._doRequest(operation, forward);
          if (obs) {
            sub = obs.subscribe(observer);
          } else {
            observer.complete();
          }
        };
        Auth0.ensureFreshToken().then(start, start);
        return () => {
          cancelled = true;
          if (sub) {
            sub.unsubscribe();
          }
        };
      });
    }

    return this._doRequest(operation, forward);
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'operation' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'forward' implicitly has an 'any' type. */
  _doRequest(operation, forward) {
    // set headers
    operation.setContext({
      headers: getRequestHeaders({
        predefinedHeaders: this.headers,
        isAuthorizationHeaderRequired: isMutation(operation),
      }),
    });

    // TEMP: we include cookies on request if the query name contains `Search` (Search or SearchCategory)
    // as soon as we switch to a skeleton approach, we can remove this
    if (
      operation.operationName.indexOf('WithCredentials') > -1 &&
      operation.getContext().apiName !== 'cms'
    ) {
      const identityToken = Auth0.getIdToken();
      /* @ts-ignore TODO: TS7031 ->  Binding element 'headers' implicitly has an 'any' type. */
      operation.setContext({
        headers: {
          ...this.headers,
          ...(identityToken && {
            Authorization: `Bearer ${identityToken}`,
          }),
        },
      });
    }

    //TODO: it breaks local requests for RR data, needs to be fixed properly
    const requestData = getDataForGetRequest(operation);
    const variables = { ...requestData.variables };

    if (operation.getContext().apiName === 'cms' && variables) {
      for (const [key, value] of Object.entries(variables)) {
        if (typeof value === 'string') {
          variables[key] = encodeURIComponent(value);
        }
      }
      operation.variables = variables;
    }

    return this.httpLink.request(operation, forward);
  }
}

class ContextLink extends ApolloLink {
  private host: string;
  private req: Request;

  /* @ts-ignore TODO: TS7031 ->  Binding element 'host' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'req' implicitly has an 'any' type. */
  constructor({ host, req }) {
    super();
    this.host = host;
    this.req = req;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'operation' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'forward' implicitly has an 'any' type. */
  request(operation, forward) {
    return forward(
      createContext({ operation, host: this.host, req: this.req }),
    );
  }
}

// ----------------------------------------------

/* @ts-ignore TODO: TS7031 ->  Binding element 'fetchAfterware' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'headers' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'host' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'req' implicitly has an 'any' type. */
const multiEntryApolloLinks = ({ fetchAfterware, headers, host, req }) => {
  return ApolloLink.from([
    // ShareUrlRedirectLink MUST be the first link in the chain to intercept /r/ paths
    // before any other link processes the request.
    ApolloLink.split(
      () => __APP_NAME__ === 'beobachter',
      new ShareUrlRedirectLink(),
    ),

    // Read @api directive and create context. This link MUST run before any link that
    // relies on values from operation context (e.g. apiName), but may come after
    // ShareUrlRedirectLink which does not depend on the context.
    new ContextLink({ host, req }),

    // for graphql-service requests we use the error link
    ApolloLink.split((operation) => {
      const apiName = operation.getContext().apiName;
      return apiName === 'graphql-service';
    }, errorLink),

    // for graphql-service requests we use APQ link
    ApolloLink.split((operation) => {
      const apiName = operation.getContext().apiName;
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      const locationOrigin = global.locationOrigin || '';
      return (
        apiName === 'graphql-service' &&
        locationOrigin.indexOf('dev.local:') === -1
      );
    }, persistedQueryLink),

    // for graphql-service requests on the client we use the retry link
    ApolloLink.split((operation) => {
      const apiName = operation.getContext().apiName;
      return apiName === 'graphql-service' && __CLIENT__;
    }, retryLink),

    // for graphql-service requests we use the headers link
    ApolloLink.split((operation) => {
      const apiName = operation.getContext().apiName;
      return apiName === 'graphql-service';
    }, new HeadersLink(fetchAfterware)),

    // for CMS production query requests we use GET
    // for all other requests incl. mutations we use POST
    ApolloLink.split(
      (operation) => {
        const apiName = operation.getContext().apiName;

        const forcePostRequests =
          JSON.parse(process.env.__GRAPHQL_FORCE_POST__ || 'false') ||
          isMutation(operation) ||
          false;

        const isProduction =
          process.env.NODE_ENV === 'production' && !forcePostRequests;
        return apiName === 'cms' && isProduction;
      },
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HttpGetLink' is not assignable to parameter of type 'ApolloLink | RequestHandler'. */
      new HttpGetLink({ headers, fetchAfterware }),
      new HttpPostLink({ headers }),
    ),
  ]);
};

export default multiEntryApolloLinks;
