/**
 * Lazy component HoC
 *
 * @author Steven Wolf <steven.wolf@ringieraxelspringer.ch>
 * @date  2018-06-18
 *
 *
 */

import React from 'react';

export default (getComponent, moduleName) => {
  class AsyncComponent extends React.Component {
    static Component = null;

    constructor() {
      super();
      this.state = { Component: AsyncComponent.Component };
    }

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then((Module) => {
          const Component = moduleName ? Module[moduleName] : Module;

          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  }

  return AsyncComponent;
};
