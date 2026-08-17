'use strict';

const { getSharedConfigFactory } = require('./webpack.config.shared');
const { ENV_DEVELOPMENT } = require('./webpack.helpers');

module.exports = function () {
  const developConfig = getSharedConfigFactory({
    webpackEnv: ENV_DEVELOPMENT,
    isTargetNodeJs: false,
  });

  return developConfig;
};
