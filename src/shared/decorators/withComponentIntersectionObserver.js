/**
 * @file   with component intersection observer
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2018-10-23
 *
 */

import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';

import {
  default as withIntersectionObserver,
  isIntersectionObserverSupported,
} from './withIntersectionObserver';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const handle = (config) => (Component) => (props) => {
  // define callback
  const onEntry = function (entries, observer) {
    // eslint-disable-line func-names
    entries.forEach((entry) => {
      //check if the component should be observed only until visible
      //when continuousObserving is set to true, it should never be unobserved
      if (!config.continuousObserving) {
        if (!entry.isIntersecting) {
          return;
        }

        if (!props.isComponentVisible) {
          props.setComponentVisible(true);
        }
        try {
          observer.unobserve(entry.target);
        } catch (e) {
          // ignore
        }
        return;
      } else {
        if (
          (entry.isIntersecting && props.isComponentVisible) ||
          (!entry.isIntersecting && !props.isComponentVisible)
        ) {
          return;
        } else {
          props.setComponentVisible(entry.isIntersecting);
        }
      }
    });
  };

  const FinalComponent = compose(withIntersectionObserver(config, onEntry))(
    Component,
  );
  return <FinalComponent {...props} />;
};

const withLifecycle = lifecycle({
  componentDidMount() {
    if (!isIntersectionObserverSupported || __TESTING__) {
      if (!this.props.isComponentVisible) {
        this.props.setComponentVisible(true);
      }
    }
  },
});

export default (config) => (Component) =>
  compose(
    withState('isComponentVisible', 'setComponentVisible', false),
    handle(config),
    withLifecycle,
  )(Component);
