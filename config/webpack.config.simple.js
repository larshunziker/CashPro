'use strict';

const { getSharedConfigFactory } = require('./webpack.config.shared');
const { ENV_SIMPLE } = require('./webpack.helpers');

module.exports = function ({ entry, output }) {
  const baseConfig = getSharedConfigFactory({
    webpackEnv: ENV_SIMPLE,
    isTargetNodeJs: false,
  });

  // set entry and output
  const config = {
    ...baseConfig,
    entry,
    output,
    mode: 'production',
  };

  return config;
};
