import React, { createContext } from 'react';
import { log } from '../../../shared/helpers/utils';

const SSRContext = createContext({
  isSSR: null,
});

// use `const { isSSR } = useSSRContext();` in your component to know whether you're on the server or client
export function useSSRContext() {
  const context = React.useContext(SSRContext);
  if (context === undefined || typeof context.isSSR !== 'boolean') {
    log('SSRContextProvider', ['context not defined'], 'red');
    throw new Error('useSSRContext must be used within a SSRContextProvider');
  }
  return context;
}

// The SSRContextProvider fixes the problems we had with __SERVER__ and __CLIENT__ variables and with the useIsSSR hook. The problems we had with those solutions were:
// 1. __SERVER__ and __CLIENT__ variables did change during the hydration process, which caused a hydration mismatch.
// 2. The useIsSSR hook relied on the `isInitialPage` redux state. Unfortunately this redux state updated too fast, after a client-side navigation, which caused the old screen to re-render before the page transition.
class SSRContextProvider extends React.Component<{
  children: React.ReactNode;
}> {
  state = {
    isSSR: __PRODUCTION__ ? true : false,
  };

  componentDidMount() {
    this.setState({ isSSR: false });
    log('SSRContextProvider', ['componentDidMount'], 'green');
  }

  render() {
    log('SSRContextProvider', ['render', this.state], 'green');
    return (
      /* @ts-ignore TODO: TS2322 ->  Type '{ isSSR */
      <SSRContext.Provider value={this.state}>
        {this.props.children}
      </SSRContext.Provider>
    );
  }
}

export default SSRContextProvider;
