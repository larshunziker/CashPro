/**
 * @file   ras apollo links
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date    2017-11-01
 */
import {
  ApolloLink,
  Observable,
  Operation,
  createHttpLink,
} from '@apollo/client';
import { removeDirectivesFromDocument } from '@apollo/client/utilities';
import { print as gqlPrint } from 'graphql';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './helpers/nonSecureHasher'. '/Users/bhs/code/work/rasch-stack/src/shared/ */
import { hashCode } from './helpers/nonSecureHasher';
import { Auth0 } from '../common/components/Auth0Provider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './getQueryDocumentKey'. '/Users/bhs/code/work/rasch-stack/src/shared/getQ */
import { getQueryDocumentKey } from './getQueryDocumentKey';
import multiEntryApolloLinks from './multiEntryApolloLinks';
import fallbackJson from './graphql-mocks/451.json';
import queryMapData from './queries';

type ApolloGetRequestData = {
  version: string;
  id: number;
  variables: any;
  operationName: string;
};

type RasApolloLinkFactoryOptions = {
  uri: string;
  host: string;
  apiOrigin: string;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  fetchAfterware?: (any) => any;
  headers?: HeadersInit;
  req?: Request;
};

const getDataForGetRequest = (operation: Operation): ApolloGetRequestData => {
  const queryDocument: any = operation.query;

  const queryKey: string = hashCode(getQueryDocumentKey(queryDocument));

  return {
    id: queryMapData.map[queryKey],
    version: queryMapData.version,
    variables: operation.variables,
    operationName: operation.operationName,
  };
};

const hasToForcePostRequest = (operation: Operation) => {
  if (Array.isArray(operation?.query?.definitions)) {
    return operation.query.definitions.some((d) => {
      return d.kind === 'OperationDefinition' && d.operation === 'mutation';
    });
  }
  return false;
};

const getRequestHeaders = (
  predefinedHeaders = {},
  isAuthorizationHeaderEnabled = false,
) => {
  const headers: HeadersInit = {
    ...predefinedHeaders,
    accept: 'application/json',
  };

  // add authorization header
  const token = (isAuthorizationHeaderEnabled && Auth0.getIdToken()) || '';
  if (token && isAuthorizationHeaderEnabled) {
    headers.authorization = `Bearer ${token}`;
  }
  // headers['X-RAS-PUBLICATION'] = 'api.stage.handelszeitung.ch';
  return headers;
};

// check status code and handle promise
/* @ts-ignore TODO: TS7006 ->  Parameter 'request' implicitly has an 'any' type. */
const parseAndCheckResponse = (request) => (response: Response) => {
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
          `Server response was missing for query '${request.operationName}'.`,
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

const removeCustomDirectives = (operation: Operation) => {
  return Object.assign(operation, {
    query: removeDirectivesFromDocument(
      [{ name: 'api', remove: true }],
      operation.query,
    ),
  });
};

class HttpGetLink extends ApolloLink {
  private uri: string;
  private apiOrigin: string;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  private fetchAfterware: (any) => any | null;
  private headers: HeadersInit;

  /* @ts-ignore TODO: TS7031 ->  Binding element 'uri' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'apiOrigin' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'fetchAfterware' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'headers' implicitly has an 'any' type. */
  constructor({ uri, apiOrigin, fetchAfterware, headers }) {
    super();
    this.uri = uri;
    this.apiOrigin = apiOrigin;
    this.fetchAfterware = fetchAfterware;
    this.headers = headers;
  }

  /* @ts-ignore TODO: TS2416 ->  Property 'request' in type 'HttpGetLink' is not assignable to the same property in base type 'ApolloLink'. */
  request(operation: Operation) {
    //The function passed to the Observable's constructor is called when the first subscribe is called
    return new Observable((observer) => {
      // get all required GET data
      const requestData = getDataForGetRequest(operation);
      const forcePostRequest = hasToForcePostRequest(operation);
      // create fetch options
      const fetchOptions: RequestInit = {
        headers: getRequestHeaders(this.headers, forcePostRequest),
      };

      const variables = { ...requestData.variables };

      for (const [key, value] of Object.entries(variables)) {
        if (typeof value === 'string') {
          variables[key] = encodeURIComponent(value);
        }
      }

      // create request uri;
      let requestUri = `${this.uri}?version="${requestData.version}"&id="${
        requestData.id
      }"&variables=${JSON.stringify(variables)}&operationName="${
        requestData.operationName
      }"`;

      // make sure that quotes are escaped so the browser won't encode them!
      requestUri = requestUri.replace(/%22/g, '\\"');

      // overrule GET with a POST request if forced
      if (forcePostRequest) {
        requestUri = this.uri;
        fetchOptions.method = 'POST';
        fetchOptions.body = JSON.stringify({
          operationName: requestData.operationName,
          query: gqlPrint(operation.query),
          variables,
        });
      }

      // TEMP LOGS!!
      const doDebugLog =
        requestData.id === 9 && variables.path === 'home-hz' && __SERVER__;
      const debugLog: Array<Array<string>> = [];

      // if (doDebugLog) {
      //   fetchOptions.headers.pragma =
      //     'akamai-x-get-client-ip, akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key, akamai-x-get-extracted-values, akamai-x-get-nonces, akamai-x-get-ssl-client-session-id, akamai-x-get-true-cache-key, akamai-x-serial-no, akamai-x-feo-trace, akamai-x-get-request-id';
      // }

      // fetch data with custom header
      fetch(requestUri, fetchOptions)
        // attach the raw response to the context for usage
        .then((response) => {
          operation.setContext({ response });

          if (doDebugLog) {
            debugLog.push(['Request URL', requestUri]);
            debugLog.push([
              'Request Data',
              JSON.stringify(requestData, null, 2),
            ]);
            debugLog.push([
              'fetchOptions',
              JSON.stringify(fetchOptions, null, 2),
            ]);
            let headers = '';
            response.headers.forEach((val, key) => {
              headers = `${headers}${key}: ${val}\n`;
            });
            debugLog.push(['Response Headers', headers]);
          }

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
        .then((response) => {
          const data = (Array.isArray(response) && response[0]) || response;

          if (doDebugLog) {
            // debugLog.push(['Response Body', JSON.stringify(data)]);

            // eslint-disable-next-line no-console
            console.log(
              debugLog
                .map((logEntry) => `${logEntry[0]}\n${logEntry[1]}\n`)
                .join(' ---- ')
                .replace(/\n/g, ' ---- '),
            );
          }

          //calls the next callback for the subscription
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          // handle geo blocked content
          if (error?.statusCode === 450) {
            observer.next(fallbackJson);
            observer.complete();
            return;
          }

          observer.error.bind(observer);
        });
    });
  }
}
/* @ts-ignore TODO: TS7031 ->  Binding element 'uri' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'headers' implicitly has an 'any' type. */
const httpPostLink = ({ uri, headers }) =>
  createHttpLink({
    fetch,
    uri,
    headers: getRequestHeaders(headers, true),
  }).request;

class DirectiveLink extends ApolloLink {
  constructor() {
    super();
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'operation' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'forward' implicitly has an 'any' type. */
  request(operation, forward) {
    return forward(removeCustomDirectives(operation));
  }
}

const rasApolloLinkFactory = ({
  uri,
  apiOrigin,
  host,
  fetchAfterware,
  headers = {},
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Request'. */
  req = null,
}: RasApolloLinkFactoryOptions) => {
  if (__APP_NAME__ === 'cash' || __APP_NAME__ === 'beobachter') {
    return multiEntryApolloLinks({ fetchAfterware, headers, host, req });
  }

  // switch GET and POST gql request
  const forcePostRequests =
    JSON.parse(process.env.__GRAPHQL_FORCE_POST__ || 'false') || false;
  const isProduction =
    process.env.NODE_ENV === 'production' && !forcePostRequests;
  return ApolloLink.from([
    new DirectiveLink(),
    ApolloLink.split(
      () => isProduction,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HttpGetLink' is not assignable to parameter of type 'ApolloLink | RequestHandler'. */
      new HttpGetLink({ uri, apiOrigin, fetchAfterware, headers }),
      httpPostLink({ uri, headers }),
    ),
  ]);
};

export default rasApolloLinkFactory;
