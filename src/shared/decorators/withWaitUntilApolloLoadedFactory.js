/**
 * @file   only render component when loading === false
 * @author Steven Wolf <steven.wolf@ringieraxelspringer.ch>
 * @date   2017-03-23
 *
 * @deprecated use withWaitUntilApolloLoaded instead of factory
 */

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import namedComponent from 'decorators/namedComponent';
import { log } from 'helpers/utils';

// ---------------------------------------------------------------------------------- //
// HOC
// ---------------------------------------------------------------------------------- //

const withUpdatePolicy = shouldUpdate((props, nextProps) => {
  const shouldUpdate =
    nextProps && nextProps.locationState && nextProps.locationState.screenReady;
  if (shouldUpdate) {
    log('with-wait-until-apollo-loaded', 'screen is ready', 'green');
  } else {
    log(
      'with-wait-until-apollo-loaded',
      'screen is not ready - abort update',
      'orange',
    );
  }
  return shouldUpdate;
});

export const mapStateToProps = (options) => (state) => ({
  locationState: options.selectLocationState(state),
});

export const withStoreConnection = (options) =>
  connect(mapStateToProps(options));

export default (options) => (Component) =>
  compose(
    namedComponent('withWaitUntilApolloLoaded'),
    withStoreConnection(options),
    withUpdatePolicy,
  )(Component);
