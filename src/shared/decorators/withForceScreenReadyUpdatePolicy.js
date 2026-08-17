/**
 * @file   with force screen ready update policy
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2016-12-11
 *
 */

import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import namedComponent from 'decorators/namedComponent';
import { log } from 'helpers/utils';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const updatePolicy = shouldUpdate((props, nextProps) => {
  if (!props.locationState || !nextProps.locationState) {
    log(
      'with-force-screen-ready-state',
      'to use this HoC, the child component HAS to be connected to the locationState',
      'red',
    );
    return true;
  }

  // if screen is ready, allow updates. otherwise block all re-renderings
  return !!nextProps.locationState.screenReady;
});

export default (Component) =>
  compose(
    namedComponent('withForceScreenReadyUpdatePolicy'),
    updatePolicy,
  )(Component);
