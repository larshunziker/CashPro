/**
 * @file   redux provider factory for testing purposes
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2018-05-30
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, useInRouterContext } from 'react-router-dom';

const ReduxProviderFactory = (configureStore, initialStates) => {
  const ReduxProvider = ({ initialState = initialStates, children }) => {
    // merge passed initial state with default initial states
    const finalInitialState = Object.assign({}, initialStates, initialState);

    const store = configureStore(finalInitialState);
    const hasLocationContext = useInRouterContext();
    if (hasLocationContext) {
      return <Provider store={store}>{children}</Provider>;
    } else {
      return (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );
    }
  };
  return ReduxProvider;
};

export default ReduxProviderFactory;
