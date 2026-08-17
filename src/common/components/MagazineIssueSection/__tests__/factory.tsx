import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, waitFor } from '@testing-library/react';
import magazineIssueSectionFactory from '../factory';
import { windowInitialState } from '../../../../shared/reducers/window';
import MockedProvider, {
  WILDCARD_QUERY,
} from '../../../../shared/tests/components/MockedProvider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../handelszeitung/screens/App/components/MagazineIssueSection/qu */
import { GET_ISSUE } from '../../../../handelszeitung/screens/App/components/MagazineIssueSection/queries';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
let componentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

const apolloConfig = {
  options: {
    variables: {
      publication: 'HZ',
      id: 42392,
    },
  },
};

beforeEach(() => {
  componentFactoryOptions = {
    TeaserMagazineIssue: () => <div className="TeaserMagazineIssue"></div>,
    GET_ISSUE: GET_ISSUE,
    publication: apolloConfig.options.variables.publication,
    styles: {
      Wrapper: 'WrapperClass',
      Row: 'RowClass',
      Content: 'ContentClass',
    },
  };

  initialState = {
    window: windowInitialState,
    route: {
      screenReady: true,
      isInitialPage: true,
      locationBeforeTransitions: {
        pathname: '/',
      },
    },
  };

  Component = magazineIssueSectionFactory(componentFactoryOptions);
});

describe('[Component] Magazine Issue Section', () => {
  it('Should render nothing when there is no issueId', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <MockedProvider>
        <Provider store={store}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component />
        </Provider>
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly when there is a issue id', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: WILDCARD_QUERY,
              variables: apolloConfig.options.variables,
            },
            result: {},
          },
        ]}
      >
        <Provider store={store}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component issueId={apolloConfig.options.variables.id} />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
