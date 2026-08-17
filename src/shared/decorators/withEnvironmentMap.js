/**
 * @file   with environment map
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @description envirmonment field mapper ex. maps data.environment.routByPath to data.routeByPath
 * @date   2018-02-07
 *
 */

import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import namedComponent from 'decorators/namedComponent';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const withMapProps = mapProps((props) => {
  const newProps = { ...props };
  if (props.data && props.data.environment) {
    newProps.data = { ...newProps.data, ...props.data.environment };
    delete newProps.data.environment;
  }
  return newProps;
});

export default (Component) =>
  compose(namedComponent('withEnvironmentMap'), withMapProps)(Component);
