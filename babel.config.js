/**
 * @file   babel rc file
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-29
 */

module.exports = function (api) {
  // false by default when using babelrc
  api.cache(false);

  const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  const app = process.env.APP || null;
  const shouldUseReactRefresh = process.env.FAST_REFRESH || false;

  // RASCH: use our own babel preset config
  const presets = [
    [
      require.resolve('./config/babel/babel-preset-react-app-rasch'),
      { typescript: true },
    ],
  ];

  const plugins = [
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-transform-optional-chaining',
    'lodash',
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['graphql-tag', { strip: true }],
  ];

  // handle styles-jsx for testing and other envs
  // if (env !== 'test') {
  //   plugins.push([
  //     'styled-jsx/babel',
  //     { plugins: ['styled-jsx-plugin-postcss'] },
  //     'graphql-tag',
  //   ]);
  // }
  // if (env === 'test') {
  //   plugins.push(['styled-jsx/babel-test']);
  // }

  // define plugin to remove test data attributes
  const withReactRemoveProperties = [
    require.resolve('babel-plugin-react-remove-properties'),
    { properties: ['data-testid'] },
  ];

  // load plugin on development only
  if (env === 'development' && shouldUseReactRefresh) {
    plugins.push('react-refresh/babel');
  }

  // strip testing attributes on production
  if (env === 'production') {
    plugins.push.apply(plugins, [withReactRemoveProperties]);
  }

  // return config
  return {
    ignore: ['node_modules'],
    presets: presets,
    plugins: plugins,
  };
};
