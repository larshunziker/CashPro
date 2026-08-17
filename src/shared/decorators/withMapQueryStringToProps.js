/**
 * @file   with map query string to props
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-04-01
 *
 */

import React from 'react';
import compose from 'recompose/compose';
import namedComponent from 'decorators/namedComponent';
import { log } from 'helpers/utils';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const mapQueryStringToProps = (config) => (Component) => (props) => {
  if (!props || !props.location || !props.location.query) {
    log("this HoC requires that 'location' gets passed within base props!");
    return <Component {...props} />;
  }

  const queryStrings = Array.isArray(config) ? config : [config];

  const queryStringsProps = queryStrings.reduce((acc, value) => {
    let queryStringValue =
      props.location.query[value.name] || value.initialValue;
    if (queryStringValue && !isNaN(queryStringValue) && value.parseInt) {
      queryStringValue = parseInt(queryStringValue, 10);
    }

    return {
      ...acc,
      [value.name]: queryStringValue,
    };
  }, {});

  return <Component {...props} {...queryStringsProps} />;
};

export default (config) => (Component) =>
  compose(
    namedComponent('withMapQueryStringToProps'),
    mapQueryStringToProps(config),
  )(Component);
