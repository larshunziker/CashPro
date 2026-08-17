/**
 * withWebkitCheck decorator, propagates "props.isWebkit=true|false"
 *
 *
 */

import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import namedComponent from 'decorators/namedComponent';

const withWebkitCheckProp = withProps((ownerProps) => ({
  isWebkit: __CLIENT__ && 'webkitRequestAnimationFrame' in window,
  ...ownerProps,
}));

export default (Component) =>
  compose(namedComponent('withWebkitCheck'), withWebkitCheckProp)(Component);
