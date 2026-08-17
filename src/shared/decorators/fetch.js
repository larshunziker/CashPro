/**
 * @file    fetch and pass data from api to component
 * @author  unknown
 * @date    2016-01-01
 *
 */

/**
 * @TODO
 *
 * 1. Use redux-saga and a global reducer for arbitrary remote data.
 */

import React from 'react';
import compose from 'recompose/compose';
import withReducer from 'recompose/withReducer';
import namedComponent from 'decorators/namedComponent';

// reducer actions
const SET_RESPONSE = 'fetch/setResponse';
const SET_REQUEST_SENT = 'fetch/setRequestSent';

// initial reducer state
const initialState = {
  data: null,
  sent: false,
};

/**
 * fetch async data
 *
 * @desc    Higher order component which will provide data to the component coming from an api
 * @param   {String | Function} url       - api url
 * @param   {String}            name      - local variable name in the component
 * @param   {Component}         component - wrapped component
 * @param   {Object}            props     - component properties
 * @returns {Component}
 */
const fetchAsyncData = (url, name) => (Component) => (props) => {
  // don't send ajax request on the server
  if (__SERVER__) {
    return null;
  }

  // get the request url
  const apiUrl = typeof url === 'function' ? url(props) : url;

  if (!props.fetchRequest.get('sent')) {
    // multiple state props can't be updated in the same loop
    setTimeout(() => {
      // init set fetch request
      props.setFetchRequest({
        type: SET_REQUEST_SENT,
        payload: true,
      });

      // send request
      fetch(apiUrl)
        .then((response) => {
          if (response.status >= 400) {
            props.setFetchRequest({
              type: SET_RESPONSE,
              payload: null,
            });
          }

          return response.json();
        })
        .then((data) => {
          props.setFetchRequest({
            type: SET_RESPONSE,
            payload: data,
          });
        });
    });
  }

  const childProps = {
    [name]: props.fetchRequest.get('data'),
    ...props,
  };

  return <Component {...childProps} />;
};

/**
 * fetch reducer
 *
 * @desc    reducer for the fetch hoc, stores response data and request status
 * @param   {Object}  state   - initial reducer state
 * @param   {Object}  action  - reducer action
 * @returns {Object}
 */
const fetchReducer = (state = initialState, action) => {
  if (action.type === SET_RESPONSE) {
    // handle set response action
    return state.merge({
      data: action.payload,
    });
  } else if (action.type === SET_REQUEST_SENT) {
    // handle set request sent action
    return state.merge({
      sent: action.payload,
    });
  }

  return state;
};

export default (url, name = 'data') =>
  (Component) =>
    compose(
      namedComponent('fetch'),
      withReducer(
        'fetchRequest',
        'setFetchRequest',
        fetchReducer,
        initialState,
      ),
      fetchAsyncData(url, name),
    )(Component);
