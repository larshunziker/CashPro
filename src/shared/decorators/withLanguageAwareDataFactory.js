/**
 * @file   with language aware data
 * @author Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date   2017-09-14
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { getObjectValueByPath } from 'helpers/utils';
import namedComponent from 'decorators/namedComponent';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

/**
 * map state to props
 *
 * @desc     maps the redux store to props
 * @param    {Object} - state   - current state
 * @returns  {Object}
 */
const mapStateToProps = (options) => (state) => ({
  settingsState: options.settingsStateSelector(state),
});

const createLanguageAwareData = (config) => (Component) => (props) => (
  <Component
    languageAwareData={mapDataLanguage(config, props.settingsState.language)}
    {...props}
  />
);

const mapDataLanguage = (config, language) => {
  const data = {};

  // iterate through all config keys
  Object.keys(config).map((key) => {
    // handle simple values (string, null) or objects with no language prop
    if (
      typeof config[key] === 'string' ||
      config[key] === null ||
      (typeof config[key] === 'object' && !config[key].de) ||
      !config[key].fr
    ) {
      data[key] = config[key];
    }

    // handle object type "path"
    if (
      typeof config[key] === 'object' &&
      config[key] !== null &&
      config[key].de &&
      config[key].fr
    ) {
      data[key] = getObjectValueByPath(config[key], language);
    }

    return null;
  });

  return data;
};

export default (options) => (config) => (Component) =>
  compose(
    connect(mapStateToProps(options)),
    namedComponent('withLanguageAwareData'),
    createLanguageAwareData(config),
  )(Component);
