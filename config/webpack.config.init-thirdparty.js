const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      // Process application JS with Babel.
      // The preset includes JSX, TypeScript, and some ESnext features.
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          cacheCompression: true,
          compact: true,
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.svg$/,
      threshold: 5120,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      test: /\.js$|\.css$|\.html$|\.svg$/,
      threshold: 5120,
      minRatio: 0.8,
    }),
  ],
};
