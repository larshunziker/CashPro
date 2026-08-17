# MockedProvider api

We've implemented a custom `MockedProvider` to enhance the apollo cache data on the apollos `MockedProvider` -> `react-apollo/test-utils`,
so we don't have to pass the InMemoryCache data on each test.

##### Options:

| option  | default | example                                                                         |
| ------- | ------- | ------------------------------------------------------------------------------- |
| `mocks` | `[]`    | `[{request: {query: {}, variables: {}, result: {loading: boolean, data: {}}}}]` |

### request object info

You have new to exporting the `graphqlQuery` and the `apolloConfig` from component to be able to use the same gql data in the test.

Import the `graphqlQuery` and the `apolloConfig` in the test like in the example use the `graphqlQuery` to set it on the `request.query`
and the `apolloConfig` to use it on the `request.variables`.

### apolloConfig Object

If you have to pass some router props you can just use the `apolloConfig` and pass data as function
like `apolloConfig.options(initialProps).variables` where initial props can have the `page` prop

### how to call the MockedProvider

```js
<MockedProvider
  mocks={[
    {
      request: {
        query: graphqlQuery, // imported from main component
        variables:
          apolloConfig &&
          apolloConfig.options &&
          apolloConfig.options({
            page: 1,
            params: {
              splat: 'test',
            },
            location: {
              query: {
                page: 1,
              },
              pathname: '/test',
              search: '',
            },
          }).variables,
      },
      result: {data: environment: {...}},
    },
  ]}
>
  components...
</MockedProvider>
```

## Usage

### 1. Creating a test used the MockedProvider

Use the `MockedProvider` tag to wrap any React element, to make it testable with gql fetched mocked data.

example test used the `MockedProvider` component

```js
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ReduxProvider from 'tests/components/ReduxProvider';
import MockedProvider from 'tests/components/MockedProvider';
import { routeInitialState } from 'reducers/route';
import Component, { graphqlQuery, apolloConfig } from '../index';
import environmentMockedData from './mockData';

let gqlDataMock: Object = {};
let initialProps: Object = {};
let initialState: Object = {};

beforeEach(() => {
  initialProps = {
    page: 1,
    params: {
      splat: 'test',
    },
    location: {
      query: {
        page: 1,
      },
      pathname: '/test',
      search: '',
    },
  };

  global.locationOrigin = 'https://localhost:3000';

  // reset test data on each run
  initialState = {
    route: routeInitialState,
  };

  gqlDataMock = JSON.parse(JSON.stringify(environmentMockedData));
  gqlDataMock.data.loading = true;
});

describe('[Screen] Test', () => {
  test('Should render nothing', async () => {
    initialProps = {};
    gqlDataMock = {};
    const { container, queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: graphqlQuery,
              variables:
                apolloConfig &&
                apolloConfig.options &&
                apolloConfig.options(initialProps).variables,
            },
            result: gqlDataMock,
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );

    await waitFor(
      () =>
        expect(container.innerHTML).toBe('') &&
        expect(queryByTestId('test-wrapper')).toBeNull(),
    );
  });

  test('Should render nothing if routeByPath is not delivered', async () => {
    gqlDataMock.data.environment.routeByPath = null;
    const { container, queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: graphqlQuery,
              variables:
                apolloConfig &&
                apolloConfig.options &&
                apolloConfig.options(initialProps).variables,
            },
            result: gqlDataMock,
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );

    // return null is rendering an empty div `<div />` so innerhtml is empty
    await waitFor(
      () =>
        expect(container.innerHTML).toBe('') &&
        expect(queryByTestId('test-wrapper')).toBeNull(),
    );
  });

  test('Should render correctly', async () => {
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: graphqlQuery,
              variables:
                apolloConfig &&
                apolloConfig.options &&
                apolloConfig.options(initialProps).variables,
            },
            result: gqlDataMock,
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );

    await waitFor(() => expect(queryByTestId('test-wrapper')).not.toBeNull());
  });
});
```

Examble running test component within the test example used in this doc.

```js
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import compose from 'recompose/compose';
import windowStateSelector from 'selectors/windowStateSelector';
import { DEFAULT_PUBLICATION } from 'App/constants';
import TestFragment from 'tests/components/TestFragment';
import withApolloScreenHandler from 'decorators/withApolloScreenHandler';
import type { WithHelmetProps } from 'decorators/withHelmet';

type TestPropsInner = RouterProps &
  WithHelmetProps & {
    windowState: WindowState,
  };

const graphqlQuery = gql`
  query TestPage($publication: PublicationEnum, $path: String!) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on LandingPage {
            id
            title
            metaTitle
            metaDescription
            metaOgTitle
            metaOgDescription
            metaCanonicalUrl
            lead
            preferredUri
            activeMenuTrail {
              edges {
                node {
                  id
                  label
                  link
                }
              }
            }
          }
          teaserImage {
            image {
              id
              file(style: "16x9_1130") {
                id
                relativeOriginPath
              }
            }
          }
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const Test: Function = ({ data }: TestPropsInner): Element<any> | null => {
  const apolloConfig: QueryHookOptions = {
    variables: {
      path: 'test',
      publication: DEFAULT_PUBLICATION,
    },
  };

  const { data } = useQuery(graphqlQuery, apolloConfig);

  if (
    !data.environment ||
    !data.environment.routeByPath ||
    !data.environment.routeByPath.object
  ) {
    return null;
  }

  const landingPage: RouteInterface = data.environment.routeByPath.object;

  return (
    <TestFragment data-testid="test-wrapper">
      {landingPage.preferredUri && landingPage.activeMenuTrail && (
        <TestFragment data-testid="test-title-wrapper">
          {landingPage.title}
        </TestFragment>
      )}
    </TestFragment>
  );
};

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const mapStateToProps: Function = (state: Object): Object => ({
  windowState: windowStateSelector(state),
});

export default compose<any, any>(connect(mapStateToProps))(Test);

```
