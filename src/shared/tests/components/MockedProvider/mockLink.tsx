// src: https://github.com/apollographql/apollo-client/blob/main/src/utilities/testing/mocking/mockLink.ts

//RASCH: added gql import
import { gql } from '@apollo/client';
import {
  ApolloLink,
  FetchResult,
  GraphQLRequest,
  Operation,
} from '@apollo/client/link/core';
import {
  Observable,
  addTypenameToDocument,
  cloneDeep,
  removeClientSetsFromDocument,
  removeConnectionDirectiveFromDocument,
} from '@apollo/client/utilities';
import { equal } from '@wry/equality';
import { print } from 'graphql/language/printer';
import { invariant } from 'ts-invariant';

export type ResultFunction<T> = () => T;

export interface MockedResponse<TData = Record<string, any>> {
  request: GraphQLRequest;
  result?: FetchResult<TData> | ResultFunction<FetchResult<TData>>;
  error?: Error;
  delay?: number;
  newData?: ResultFunction<FetchResult>;
}

// RASCH: added wildcard query export
export const WILDCARD_QUERY = gql`
  query WILDCARD {
    environment {
      __typename
    }
  }
`;

function requestToKey(request: GraphQLRequest, addTypename: Boolean): string {
  const queryString =
    request.query &&
    print(addTypename ? addTypenameToDocument(request.query) : request.query);
  const requestKey = { query: queryString };
  return JSON.stringify(requestKey);
}

export class MockLink extends ApolloLink {
  public operation: Operation;
  public addTypename: Boolean = true;
  private mockedResponsesByKey: { [key: string]: MockedResponse[] } = {};
  private wildcardFallbackResponse: any | null = null; //RASCH: added this member
  private isWildCardResponse = false;

  constructor(
    mockedResponses: ReadonlyArray<MockedResponse>,
    addTypename: Boolean = true,
  ) {
    super();
    this.addTypename = addTypename;
    if (mockedResponses) {
      mockedResponses.forEach((mockedResponse) => {
        //RASCH: wildcard handling
        if (
          // @ts-ignore
          mockedResponse?.request?.query?.definitions[0]?.name?.value ===
          'WILDCARD'
        ) {
          this.wildcardFallbackResponse = mockedResponse?.result || {
            usedWildcard: true,
          };
          this.isWildCardResponse = true;
        }

        this.addMockedResponse(mockedResponse);
      });
    } else {
      // RASCH: if no mocks are provided by the developer, we asume that we want to use
      // the wildcard query
      this.wildcardFallbackResponse = { usedWildcard: true };
      this.isWildCardResponse = true;
    }
  }

  public addMockedResponse(mockedResponse: MockedResponse) {
    const normalizedMockedResponse =
      this.normalizeMockedResponse(mockedResponse);
    const key = requestToKey(
      normalizedMockedResponse.request,
      this.addTypename,
    );
    let mockedResponses = this.mockedResponsesByKey[key];
    if (!mockedResponses) {
      mockedResponses = [];
      this.mockedResponsesByKey[key] = mockedResponses;
    }
    mockedResponses.push(normalizedMockedResponse);
  }

  public request(operation: Operation): Observable<FetchResult> | null {
    this.operation = operation;
    const key = requestToKey(operation, this.addTypename);
    let responseIndex = 0;
    const response = (this.mockedResponsesByKey[key] || []).find(
      (res, index) => {
        const requestVariables = operation.variables || {};
        const mockedResponseVariables = res.request.variables || {};

        if (equal(requestVariables, mockedResponseVariables)) {
          responseIndex = index;
          return true;
        }
        return false;
      },
    );

    if (
      (!response || typeof responseIndex === 'undefined') &&
      !this.isWildCardResponse // RASCH: addition
    ) {
      this.onError(
        new Error(
          `No more mocked responses for the query: ${print(
            operation.query,
          )}, variables: ${JSON.stringify(operation.variables)}`,
        ),
      );
      return null;
    }

    if (this.isWildCardResponse) {
      // console.info('wildcard query mocked result used');
    }

    // RASCH: wrapped this if statement around the splice
    if (!this.isWildCardResponse) {
      this.mockedResponsesByKey[key].splice(responseIndex, 1);
    }

    const { newData } = response || {};

    if (newData && !this.isWildCardResponse) {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      response.result = newData();
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'MockedResponse<Record<string, any>> | undefined' is not assignable to parameter of type 'MockedRespon */
      this.mockedResponsesByKey[key].push(response);
    }

    const { error, delay } = response || {};
    let { result } = response || {};

    // RASCH: quick workaround the response handling
    if (!result && this.isWildCardResponse) {
      result = this.wildcardFallbackResponse;
    }

    if (!result && !error) {
      this.onError(
        new Error(
          `Mocked response should contain either result or error: ${key}`,
        ),
      );
    }

    return new Observable((observer) => {
      const timer = setTimeout(
        () => {
          if (error) {
            observer.error(error);
          } else {
            if (result) {
              observer.next(
                typeof result === 'function'
                  ? (result as ResultFunction<FetchResult>)()
                  : result,
              );
            }
            observer.complete();
          }
        },
        delay ? delay : 0,
      );

      return () => {
        clearTimeout(timer);
      };
    });
  }

  private normalizeMockedResponse(
    mockedResponse: MockedResponse,
  ): MockedResponse {
    const newMockedResponse = cloneDeep(mockedResponse);
    const queryWithoutConnection = removeConnectionDirectiveFromDocument(
      newMockedResponse.request.query,
    );
    invariant(queryWithoutConnection, 'query is required');
    /* @ts-ignore TODO: TS2322 ->  Type 'DocumentNode | null' is not assignable to type 'DocumentNode'. */
    newMockedResponse.request.query = queryWithoutConnection;
    const query = removeClientSetsFromDocument(newMockedResponse.request.query);
    if (query) {
      newMockedResponse.request.query = query;
    }
    return newMockedResponse;
  }
}

export interface MockApolloLink extends ApolloLink {
  operation?: Operation;
}

// Pass in multiple mocked responses, so that you can test flows that end up
// making multiple queries to the server.
// NOTE: The last arg can optionally be an `addTypename` arg.
export function mockSingleLink(...mockedResponses: Array<any>): MockApolloLink {
  // To pull off the potential typename. If this isn't a boolean, we'll just
  // set it true later.
  let maybeTypename = mockedResponses[mockedResponses.length - 1];
  let mocks = mockedResponses.slice(0, mockedResponses.length - 1);

  if (typeof maybeTypename !== 'boolean') {
    mocks = mockedResponses;
    maybeTypename = true;
  }

  return new MockLink(mocks, maybeTypename);
}
