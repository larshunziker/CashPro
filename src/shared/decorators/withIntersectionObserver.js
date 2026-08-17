/**
 * @file   with intersection observer
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2018-08-23
 *
 */

import React from 'react';

// include polyfill
// https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill
require('helpers/intersection-observer');

// ---------------------------------------------------------------------------------- //
// HELPERS
// ---------------------------------------------------------------------------------- //

export const isIntersectionObserverSupported = 'IntersectionObserver' in global;

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const intersectionObserverConfig = {
  rootMargin: '100px',
  threshold: 0,
};

const withIntersectionObserver = (Component, config, onEntry) =>
  class WithIntersectionObserverInner extends React.Component {
    constructor(props) {
      super(props);
      this._observer = null;
    }

    observeTargets() {
      // do nothing if intersection observer is not supported
      if (!isIntersectionObserverSupported) {
        return;
      }

      // remove already registered observers
      this.disconnectObserver();

      // merge configs
      const options = Object.assign({}, intersectionObserverConfig, config);

      this._observer = new IntersectionObserver(onEntry, options);
      const selectors = document.querySelectorAll(options.selectors.join(','));

      // have to spread the NodeList into Array to support >IE8

      [...selectors].forEach((selector) => {
        this._observer.observe(selector);
      });
    }

    disconnectObserver() {
      if (this._observer) {
        this._observer.disconnect();
      }
    }

    componentDidMount() {
      this.observeTargets();
    }

    componentDidUpdate() {
      this.observeTargets();
    }

    componentWillUnmount() {
      this.disconnectObserver();
    }

    render() {
      return <Component {...this.props} />;
    }
  };

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

export default (config, onEntry) => (Component) =>
  withIntersectionObserver(Component, config, onEntry);
