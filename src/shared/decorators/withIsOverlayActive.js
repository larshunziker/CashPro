/**
 * @file   with is overlay active state
 * @author Timo Obereder <timo.obereder@gmail.com>
 * @date   2017-03-28
 *
 */

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import namedComponent from 'decorators/namedComponent';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

export default (Component) =>
  compose(
    namedComponent('withIsOverlayActive'),
    withState('isActive', 'setActive', false),
  )(Component);
