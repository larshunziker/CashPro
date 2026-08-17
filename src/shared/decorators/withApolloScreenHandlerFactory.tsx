/**
 * @file   with apollo screen handler factory
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-03-23
 */

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import raf from 'raf';
import { getTealiumData } from '../helpers/tealium/helper';
import namedComponent from './namedComponent';

export type WithApolloScreenHandlerFactoryOptions = {
  setScreenReady: Function;
};

// ---------------------------------------------------------------------------------- //
// HOC
// ---------------------------------------------------------------------------------- //

const mapDispatchToProps = (
  options: WithApolloScreenHandlerFactoryOptions,
) => ({
  setScreenReady: options.setScreenReady,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const updateScreenReadyState = (props): void => {
  // if on base component there is no apollo data
  // or if the data of the request has changed (due to gql refetch) => set screen ready
  if ((props && props.data && !props.data.loading) || !props || !props.data) {
    const withTealiumTracking =
      (props?.data?.environment?.routeByPath &&
        getTealiumData(props.data.environment.routeByPath)) ||
      (props?.data?.routeByPath && getTealiumData(props.data.routeByPath)) ||
      {};
    // force screen ready on next frame
    // since we have a raf on locationchange we got some timing issues on history.back()
    // TODO: find a better way for the screenReady and locationchange states
    raf(() => {
      props.setScreenReady(true, withTealiumTracking);
    });
  }
};

const withLifecycle = lifecycle<any, any>({
  componentDidMount(): void {
    updateScreenReadyState(this.props);
  },
  componentDidUpdate(): void {
    // if gql data are already in local cache the set screen ready call is fired within
    // the same update as it was set to false on SI. with the raf() we push it to a new
    // update on react which solved the issue
    raf(() => {
      updateScreenReadyState(this.props);
    });
  },
});

export default (options: WithApolloScreenHandlerFactoryOptions) =>
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
  (Component) =>
    compose<any, any>(
      namedComponent('withApolloScreenHandler'),
      connect(undefined, mapDispatchToProps(options)),
      withLifecycle,
    )(Component);
