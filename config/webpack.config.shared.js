'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const createEnvironmentHash = require('./webpack/persistentCache/createEnvironmentHash');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.DOT_ENV !== 'master';

const reactRefreshRuntimeEntry = require.resolve('react-refresh/runtime');
const reactRefreshWebpackPluginRuntimeEntry = require.resolve(
  '@pmmmwh/react-refresh-webpack-plugin',
);
const babelRuntimeEntry = require.resolve('babel-preset-react-app');
const babelRuntimeEntryHelpers = require.resolve(
  '@babel/runtime/helpers/esm/assertThisInitialized',
  { paths: [babelRuntimeEntry] },
);
const babelRuntimeEntryHelpers2 = require.resolve(
  '@babel/runtime/helpers/interopRequireDefault',
  { paths: [babelRuntimeEntry] },
);
const babelRuntimeRegenerator = require.resolve('@babel/runtime/regenerator', {
  paths: [babelRuntimeEntry],
});

const CircularDependencyPlugin = require('circular-dependency-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');

const {
  getStyleLoaders,
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
  ENV_SIMPLE,
} = require('./webpack.helpers');
const aliases = require('./aliases');
const globalDefinedWebpackVariables = require('./webpack.global.variables');

// allow custom css loader local indent name pattern
const cssLoaderLocalIndentNamePattern =
  process.env.USE_CUSTOM_CSS_LOADER_LOCAL_INDENT_NAME_PATTERN ||
  '[local]__[name]__[hash:base64:5]';

// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

const serviceWorkerPrecacheChunks = ['main', 'vendors'];
if (!shouldInlineRuntimeChunk) {
  serviceWorkerPrecacheChunks.push('runtime');
}

// miniCssExtractPluginConfig
const miniCssExtractPluginConfig = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    sourceMap: false,
    modules: {
      localIdentName: '[hash:base64:8]',
    },
  },
};

let detectedCircularDependencies = [];

let webAppRelatedApplications = {};

const hasAndroidRelatedApp =
  process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_ID ||
  process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_URL;

const hasIOSRelatedApp =
  process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID ||
  process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_URL;

if (hasAndroidRelatedApp || hasIOSRelatedApp) {
  webAppRelatedApplications = {
    prefer_related_applications: true,
    related_applications: [],
  };

  if (hasAndroidRelatedApp) {
    webAppRelatedApplications.related_applications.push({
      platform: 'play',
      id: process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_ID,
      url: process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_URL,
    });
  }

  if (hasIOSRelatedApp) {
    webAppRelatedApplications.related_applications.push({
      platform: 'itunes',
      id: process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID,
      url: process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_URL,
    });
  }
}

module.exports = {
  getSharedConfigFactory: function ({ webpackEnv, isTargetNodeJs = false }) {
    const isEnvDevelopment = webpackEnv === ENV_DEVELOPMENT;
    const isEnvProduction = webpackEnv === ENV_PRODUCTION;
    const isEnvSimple = webpackEnv === ENV_SIMPLE;

    // Variable used for enabling profiling in Production
    // passed into alias object. Uses a flag if passed into the build command
    const isEnvProductionProfile =
      isEnvProduction && process.argv.includes('--profile');

    // Webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // In development, we always serve from the root. This makes config easier.
    const publicPath = '/';
    // Some apps do not use client-side routing with pushState.
    // For these, "homepage" can be set to "." to enable relative asset paths.
    const shouldUseRelativeAssetPaths = publicPath === './';

    // `publicUrl` is just like `publicPath`, but we will provide it to our app
    // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
    // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
    const publicUrl = isEnvProduction
      ? publicPath.slice(0, -1)
      : isEnvDevelopment && '';

    // Get environment variables to inject into our app.
    const env = getClientEnvironment(publicUrl);

    return {
      mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
      // Stop compilation early in production
      bail: isEnvProduction,
      devtool: isEnvProduction
        ? shouldUseSourceMap
          ? 'source-map'
          : false
        : isEnvDevelopment && 'cheap-module-source-map',
      // These are the "entry points" to our application.
      // This means they will be the "root" imports that are included in JS bundle.
      entry: [
        !isTargetNodeJs && paths.appClientJs,
        isTargetNodeJs && paths.appServerJs,
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn't blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
      ].filter(Boolean),
      // RASCH: set correct target
      target: (isTargetNodeJs && 'node') || 'web',
      output: {
        // The build folder.
        path: isEnvProduction ? paths.appBuild : undefined,
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: isEnvDevelopment,
        // There will be one main bundle, and one file per asynchronous chunk.
        // In development, it does not produce real files.
        filename: isTargetNodeJs
          ? paths.serverEntry
          : isEnvProduction
          ? `static/js/[name].[contenthash:8].js`
          : isEnvDevelopment && `static/js/[name].js`,
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: isEnvProduction
          ? 'static/js/[name].[contenthash:8].chunk.js'
          : isEnvDevelopment && 'static/js/[name].chunk.js',
        // We inferred the "public path" (such as / or /my-project) from homepage.
        // We use "/" in development.
        publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: isEnvProduction
          ? (info) =>
              path
                .relative(paths.appSrc, info.absoluteResourcePath)
                .replace(/\\/g, '/')
          : isEnvDevelopment &&
            ((info) =>
              path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
      },
      cache: {
        type: 'filesystem',
        version: createEnvironmentHash(env.raw),
        cacheDirectory: paths.appWebpackCache,
        store: 'pack',
        profile: true,
        name:
          'default-' +
          (isEnvProduction ? 'production' : 'development') +
          ((isTargetNodeJs && '-node') || ''),
        buildDependencies: {
          defaultWebpack: ['webpack/lib/'],
          config: [__filename],
          tsconfig: [paths.appTsConfig, paths.appJsConfig].filter((f) =>
            fs.existsSync(f),
          ),
        },
      },
      infrastructureLogging: {
        level: 'error',
      },
      // RASCH: opt-out optimizations on node build
      optimization: isTargetNodeJs
        ? {}
        : {
            minimize: isEnvProduction || isEnvSimple,
            minimizer: [
              // This is only used in production mode
              new TerserPlugin({
                terserOptions: {
                  parse: {
                    // we want terser to parse ecma 8 code. However, we don't want it
                    // to apply any minfication steps that turns valid ecma 5 code
                    // into invalid ecma 5 code. This is why the 'compress' and 'output'
                    // sections only apply transformations that are ecma 5 safe
                    // https://github.com/facebook/create-react-app/pull/4234
                    ecma: 8,
                  },
                  compress:
                    process.env.USE_DEBUG_TRACING === 'true'
                      ? false
                      : {
                          ecma: 5,
                          warnings: false,
                          // Disabled because of an issue with Uglify breaking seemingly valid code:
                          // https://github.com/facebook/create-react-app/issues/2376
                          // Pending further investigation:
                          // https://github.com/mishoo/UglifyJS2/issues/2011
                          comparisons: false,
                          // Disabled because of an issue with Terser breaking valid code:
                          // https://github.com/facebook/create-react-app/issues/5250
                          // Pending futher investigation:
                          // https://github.com/terser-js/terser/issues/120
                          inline: 2,
                        },
                  mangle:
                    process.env.USE_DEBUG_TRACING === 'true'
                      ? false
                      : {
                          safari10: true,
                        },
                  // Added for profiling in devtools
                  keep_classnames: isEnvProductionProfile,
                  keep_fnames: isEnvProductionProfile,
                  output: {
                    ecma: 5,
                    comments: false,
                    // Turned on because emoji and regex is not minified properly using default
                    // https://github.com/facebook/create-react-app/issues/2488
                    ascii_only: true,
                  },
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
              }),
              // This is only used in production mode
              new CssMinimizerPlugin(),
            ],
            // Automatically split vendor and commons
            // https://twitter.com/wSokra/status/969633336732905474
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            splitChunks: {
              cacheGroups: {
                vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'initial',
                },
              },
            },
            // Keep the runtime chunk separated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            // RASCH: overwrite
            runtimeChunk: 'single',
          },
      resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to "win"
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebook/create-react-app/issues/253
        modules: [
          'node_modules',
          paths.appNodeModules,
          ...paths.appModules,
        ].concat(
          // It is guaranteed to exist because we tweak it in `env.js`
          process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
        ),
        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it, see:
        // https://github.com/facebook/create-react-app/issues/290
        // `web` extension prefixes have been added for better support
        // for React Native Web.
        extensions: paths.moduleFileExtensions
          .map((ext) => `.${ext}`)
          .filter((ext) => useTypeScript || !ext.includes('ts')),
        alias: {
          // Support React Native Web
          // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
          'react-native': 'react-native-web',
          // 'file-type': 'file-type',
          // Allows for better profiling with ReactDevTools
          ...(isEnvProductionProfile && {
            'react-dom$': 'react-dom/profiling',
            'scheduler/tracing': 'scheduler/tracing-profiling',
          }),
          ...(modules.webpackAliases || {}),
          ...aliases,
        },
        plugins: [
          // Adds support for installing with Plug'n'Play, leading to faster installs and adding
          // guards against forgotten dependencies and such.
          // Prevents users from importing files from outside of src/ (or node_modules/).
          // This often causes confusion because we only process files within src/ with babel.
          // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
          // please link the files into your node_modules/ and let module-resolution kick in.
          // Make sure your source files are compiled, as they will not be processed in any way.
          new ModuleScopePlugin(
            [paths.appSrc],
            [
              paths.appPackageJson,
              reactRefreshRuntimeEntry,
              reactRefreshWebpackPluginRuntimeEntry,
              babelRuntimeEntry,
              babelRuntimeEntryHelpers,
              babelRuntimeEntryHelpers2,
              babelRuntimeRegenerator,
            ],
          ),
        ],
      },
      resolveLoader: {
        modules: [path.resolve(__dirname, 'webpack/loaders'), 'node_modules'],
      },
      module: {
        strictExportPresence: true,
        rules: [
          {
            // "oneOf" will traverse all following loaders until one will
            // match the requirements. When no loader matches it will fall
            // back to the "file" loader at the end of the loader list.
            oneOf: [
              // "url" loader works like "file" loader except that it embeds assets
              // smaller than specified limit in bytes as data URLs to avoid requests.
              // A missing `test` is equivalent to a match.
              {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                  limit: 1000, // RASCH: reduced limit to 1000
                  name: 'static/media/[hash:32].[ext]',
                  esModule: false,
                },
              },
              // handle SVGIcon icon files
              {
                test: /SVGIcon.*\.svg(\?.*)?$/,
                use: [
                  {
                    loader: '@svgr/webpack',
                    options: {
                      // we have to disable particular options in svgo plugins to avoid remove our static fallbacks for animated svgs
                      svgoConfig: {
                        plugins: [
                          {
                            name: 'preset-default',
                            params: {
                              overrides: {
                                removeHiddenElems: {
                                  displayNone: false,
                                },
                                inlineStyles: {
                                  removeMatchedSelectors: false,
                                },
                              },
                            },
                          },
                          'prefixIds',
                        ],
                      },
                    },
                  },
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 100,
                      mimetype: 'image/svg+xml',
                      name: 'static/media/[hash:32].[ext]',
                    },
                  },
                ],
              },
              // handle regular .svg files but exclude SVGIcon and font files
              {
                test: /\.svg(\?.*)?$/,
                exclude: /(SVGIcon|assets\/fonts\/).*\.svg(\?.*)?$/,
                loader: require.resolve('url-loader'),
                options: {
                  limit: 100, // RASCH: reduced limit to 100
                  name: 'static/media/[hash:32].[ext]',
                  mimetype: 'image/svg+xml',
                  esModule: false,
                },
              },
              // Process application JS with Babel.
              // The preset includes JSX, TypeScript, and some ESnext features.
              {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: [paths.appSrc],
                use: [
                  {
                    loader: require.resolve('babel-loader'),
                    options: {
                      // This is a feature of `babel-loader` for webpack (not Babel itself).
                      // It enables caching results in ./node_modules/.cache/babel-loader/
                      // directory for faster rebuilds.
                      cacheDirectory: true,
                      cacheCompression: false, // recommended to disble if you deal with thousends of files
                      compact: isEnvProduction || isEnvSimple,
                      customize: require.resolve(
                        'babel-preset-react-app/webpack-overrides',
                      ),
                    },
                  },
                ].filter(Boolean),
              },
              // Process any JS outside of the app with Babel.
              // Unlike the application JS, we only compile the standard ES features.
              {
                test: /\.(js|mjs)$/,
                exclude: /@babel(?:\/|\\{1,2})runtime/,
                use: [
                  {
                    loader: require.resolve('babel-loader'),
                    options: {
                      babelrc: false,
                      configFile: false,
                      compact: false,
                      presets: [
                        [
                          require.resolve(
                            'babel-preset-react-app/dependencies',
                          ),
                          { helpers: true },
                        ],
                      ],
                      cacheDirectory: true,
                      // See #6846 for context on why cacheCompression is disabled
                      cacheCompression: false,

                      // Babel sourcemaps are needed for debugging into node_modules
                      // code.  Without the options below, debuggers like VSCode
                      // show incorrect code and set breakpoints on the wrong lines.
                      sourceMaps: shouldUseSourceMap,
                      inputSourceMap: shouldUseSourceMap,
                    },
                  },
                ].filter(Boolean),
              },
              // "postcss" loader applies autoprefixer to our CSS.
              // "css" loader resolves paths in CSS and adds assets as dependencies.
              // "style" loader turns CSS into JS modules that inject <style> tags.
              // In production, we use MiniCSSExtractPlugin to extract that CSS
              // to a file, but in development "style" loader enables hot editing
              // of CSS.
              // By default we support CSS Modules with the extension .module.css
              {
                test: /\.css$/,
                include: [paths.appSrc],
                use: getStyleLoaders({
                  isEnvDevelopment,
                  isEnvProduction,
                  shouldUseSourceMap,
                  shouldUseRelativeAssetPaths,
                  cssOptions: {
                    importLoaders: 1,
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                    esModule: false,
                    modules: {
                      // RASCH force modules w/o .modules suffix
                      localIdentName:
                        (isEnvDevelopment && cssLoaderLocalIndentNamePattern) ||
                        '[hash:base64:8]',
                    },
                  },
                }),
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                sideEffects: true,
              },
              // The GraphQL loader preprocesses GraphQL queries in .graphql files.
              {
                test: /\.(graphql|gql)$/,
                include: paths.appSrc,
                loader: 'graphql-tag/loader',
              },
              // Load fonts.font file
              {
                test: /\.font$/,
                include: [paths.appSrc],
                // RASCH: adopted loaders for dev and prod
                use: isEnvDevelopment
                  ? [
                      require.resolve('style-loader'),
                      require.resolve('css-loader'),
                    ]
                  : [MiniCssExtractPlugin.loader, miniCssExtractPluginConfig],
              },
              // handle font files
              {
                include: [/\.(woff|woff2|eot|ttf|svg)$/],
                type: 'asset/resource',
                generator: {
                  filename: 'static/media/[name].[hash:8][ext]',
                },
              },
              // "file" loader makes sure those assets get served by WebpackDevServer.
              // When you `import` an asset, you get its (virtual) filename.
              // In production, they would get copied to the `build` folder.
              // This loader doesn't use a "test" so it will catch all modules
              // that fall through the other loaders.
              {
                loader: require.resolve('file-loader'),
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise be processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /^$/],
                options: {
                  name: 'static/media/[hash:32].[ext]',
                },
              },
              // ** STOP ** Are you adding a new loader?
              // Make sure to add the new loader(s) before the "file" loader.
            ],
          },

          // load static gql queries during build time
          {
            test: /\.preload\.(js|tsx|ts)$/,
            exclude: /node_modules/,
            loader: 'gqldata-loader',
          },
        ].filter(Boolean),
      },
      ignoreWarnings: [/Failed to parse source map/],
      plugins: [
        isEnvDevelopment &&
          !disableESLintPlugin &&
          new ESLintPlugin({
            // Plugin options
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            formatter: require.resolve('react-dev-utils/eslintFormatter'),
            eslintPath: require.resolve('eslint'),
            failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
            context: paths.appSrc,
            cache: true,
            cacheLocation: path.resolve(
              paths.appNodeModules,
              '.cache/.eslintcache',
            ),
            // ESLint class options
            cwd: paths.appPath,
            resolvePluginsRelativeTo: __dirname,
          }),
        // Adds support for node:... schemes
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
          const mod = resource.request.replace(/^node:/, '');
          switch (mod) {
            case 'buffer':
              resource.request = 'buffer';
              break;
            case 'stream':
              resource.request = 'readable-stream';
              break;
            default:
              throw new Error(`Not found ${mod}`);
          }
        }),
        // Generates an `index.html` file with the <script> injected.
        !isTargetNodeJs &&
          !isEnvSimple &&
          new HtmlWebpackPlugin(
            Object.assign(
              {},
              {
                inject: true,
                template: `!!raw-loader!${
                  isEnvProduction ? paths.appHtmlProd : paths.appHtml
                }`,
                filename: isEnvProduction ? 'index.ejs' : 'index.html', // RASCH: we use ejs instead of html on production
              },
              isEnvProduction
                ? {
                    minify: {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeRedundantAttributes: true,
                      useShortDoctype: true,
                      removeEmptyAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      keepClosingSlash: true,
                      minifyJS: true,
                      minifyCSS: true,
                      minifyURLs: true,
                    },
                  }
                : undefined,
            ),
          ),
        // Inlines the webpack runtime script. This script is too small to warrant
        // a network request.
        isEnvProduction &&
          shouldInlineRuntimeChunk &&
          !isTargetNodeJs &&
          new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.+[.]js/]),
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In production, it will be an empty string unless you specify "homepage"
        // in `package.json`, in which case it will be the pathname of that URL.
        // In development, this will be an empty string.
        !isTargetNodeJs &&
          !isEnvSimple &&
          new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        // This gives some necessary context to module not found errors, such as
        // the requesting resource.
        !isTargetNodeJs &&
          !isEnvSimple &&
          new ModuleNotFoundPlugin(paths.appPath),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
        // It is absolutely essential that NODE_ENV is set to production
        // during a production build.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin(env.stringified),

        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),

        new LodashModuleReplacementPlugin({
          flattening: true,
        }),

        !isTargetNodeJs &&
          isEnvDevelopment &&
          new WebpackShellPluginNext({
            onBuildStart: ['yarn css:typedef'],
            dev: false, // makes sure command runs on file change
          }),

        new webpack.WatchIgnorePlugin({ paths: [/css\.d\.ts$/] }),

        new webpack.DefinePlugin({
          __CLIENT__: JSON.stringify(!isTargetNodeJs),
          __SERVER__: JSON.stringify(isTargetNodeJs),
          __DEVELOPMENT__: JSON.stringify(isEnvDevelopment),
          __PRODUCTION__: JSON.stringify(isEnvProduction),
          __TESTING__: JSON.stringify(false),
          __APP_NAME__: JSON.stringify(paths.appName),
          ...globalDefinedWebpackVariables,
        }),
        // This is necessary to emit hot updates (currently CSS only):
        isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebook/create-react-app/issues/240
        isEnvDevelopment && new CaseSensitivePathsPlugin(),
        isEnvDevelopment &&
          new ReactRefreshWebpackPlugin({
            overlay: false,
          }),
        isEnvProduction &&
          new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          }),

        // Generate a manifest file which contains a mapping of all asset filenames
        // to their corresponding output file so that tools can pick it up without
        // having to parse `index.html`.
        !isEnvSimple &&
          new WebpackManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: publicPath,
            generate: (seed, files, entrypoints) => {
              const manifestFiles = files.reduce((manifest, file) => {
                manifest[file.name] = file.path;
                return manifest;
              }, seed);
              const entrypointFiles = entrypoints.main.filter(
                (fileName) => !fileName.endsWith('.map'),
              );

              return {
                files: manifestFiles,
                entrypoints: entrypointFiles,
              };
            },
          }),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.IgnorePlugin({
          resourceRegExp: (/^\.\/locale$/, /moment$/),
        }),
        // Generate a service worker script that will precache, and keep up to date,
        // the HTML & assets that are part of the Webpack build.
        // RASCH: use full control over SW (to enable push)
        // => https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/
        isEnvProduction &&
          !isTargetNodeJs &&
          new WorkboxWebpackPlugin.InjectManifest({
            swSrc: paths.appServiceWorkerConfig,
            swDest: 'sw.js',
            chunks: serviceWorkerPrecacheChunks, // just precache major chunks
            dontCacheBustURLsMatching: new RegExp(/.*/, 'gm'), // we hash all assets on webpack so we don't need another revision on the SW caching!!!
          }),
        // TypeScript type checking
        useTypeScript &&
          new ForkTsCheckerWebpackPlugin({
            async: isEnvDevelopment,
            typescript: {
              typescriptPath: resolve.sync('typescript', {
                basedir: paths.appNodeModules,
              }),
              configOverwrite: {
                compilerOptions: {
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                  skipLibCheck: true,
                  inlineSourceMap: false,
                  declarationMap: false,
                  noEmit: true,
                  incremental: true,
                },
              },
              context: paths.appPath,
              diagnosticOptions: {
                syntactic: true,
              },
              mode: 'write-references',
              // profile: true,
            },
            issue: {
              include: ['../**/src/**/*.{ts,tsx}', '**/src/**/*.{ts,tsx}'].map(
                (file) => ({ file }),
              ),
              exclude: [
                '**/src/**/__tests__/**',
                '**/src/**/?(*.)(spec|test).*',
                '**/src/setupProxy.*',
                '**/src/setupTests.*',
              ].map((file) => ({ file })),
            },
            logger: 'webpack-infrastructure',
          }),

        // push manifest creation plugin if env file contains required info
        !isTargetNodeJs &&
          !isEnvSimple &&
          process.env.WEB_APP_MANIFEST_NAME &&
          process.env.WEB_APP_MANIFEST_NAME !== '' &&
          new WebpackPwaManifest({
            name: process.env.WEB_APP_MANIFEST_NAME,
            start_url: '/',
            display: 'standalone',
            background_color:
              process.env.WEB_APP_MANIFEST_BG_COLOR || '#ffffff',
            theme_color: process.env.WEB_APP_MANIFEST_THEME_COLOR || '#ffffff',
            ...webAppRelatedApplications,
            icons: [
              {
                src: path.resolve(
                  'src/' +
                    paths.appName +
                    '/screens/App/assets/graphics/raw/logo.png',
                ),
                sizes: [192, 512],
              },
            ],
          }),
        // circular dependency detectin for develop env
        isEnvDevelopment &&
          new CircularDependencyPlugin({
            include: /src/,
            exclude: /node_modules/,
            failOnError: false,
            // `onStart` is called before the cycle detection starts
            onStart() {
              detectedCircularDependencies = [];
            },
            // `onDetected` is called for each module that is cyclical
            onDetected({ paths }) {
              detectedCircularDependencies.push(paths.join(' -> '));
            },
            // `onEnd` is called before the cycle detection ends
            onEnd() {
              if (detectedCircularDependencies.length > 0) {
                const path = paths.circularDependencyOutput;
                const file = path + '/log.txt';
                fs.mkdir(path, { recursive: true }, (err) => {
                  if (err) {
                    return;
                  }
                  fs.writeFileSync(
                    file,
                    JSON.stringify(
                      {
                        count: detectedCircularDependencies.length,
                        issues: detectedCircularDependencies,
                      },
                      null,
                      4,
                    ),
                  );
                });

                console.log(
                  `🍎  detected ${detectedCircularDependencies.length} cycles and wrote the output to "${path}"`,
                );
              }
            },
          }),
        isEnvProduction &&
          !isTargetNodeJs &&
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.map$|\.css$|\.html$/,
            threshold: 2560,
            minRatio: 0.8,
          }),
        isEnvProduction &&
          !isTargetNodeJs &&
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.svg$/,
            threshold: 5120,
            minRatio: 0.8,
          }),
        isEnvProduction &&
          !isTargetNodeJs &&
          new CompressionPlugin({
            algorithm: 'brotliCompress',
            test: /\.js$|\.map$|\.css$|\.html$|\.svg$/,
            threshold: 5120,
            minRatio: 0.8,
          }),
      ].filter(Boolean),
      // Turn off performance processing because we utilize
      // our own hints via the FileSizeReporter
      performance: false,
      watchOptions: {
        ignored: /node_modules|build|coverage/,
        poll: 1000,
      },
    };
  },
};
