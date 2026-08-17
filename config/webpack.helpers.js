/**
 * @file   webpack helpers
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2019-03-19
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const color = require('css-color-function');

const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';
const ENV_SIMPLE = 'simple';

// common function to get style loaders
const getStyleLoaders = ({
  isEnvDevelopment,
  isEnvProduction,
  shouldUseSourceMap,
  shouldUseRelativeAssetPaths,
  cssOptions,
  preProcessor,
  postCssMixinsPath = paths.postCssMixins,
  postCssVariablesPath = paths.postCssVars,
}) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    // NOTE: currently not possible to use cache-loader before minicssextract plugin
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined,
      ),
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [
            'postcss-import',
            'postcss-for',
            [
              'postcss-mixins',
              {
                mixinsDir: postCssMixinsPath,
              },
            ],
            [
              'postcss-simple-vars',
              {
                variables: () => require(postCssVariablesPath),
              },
            ],
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            'postcss-focus', // Add a :focus to every :hover
            'postcss-calc',
            'postcss-nested',
            'postcss-global-import',
            [
              'postcss-functions',
              {
                functions: {
                  color: (value) => color.convert(`color(${value})`),
                },
              },
            ],
          ],
        },
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
    });
  }
  return loaders;
};

module.exports = {
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
  ENV_SIMPLE,
  getStyleLoaders,
};
