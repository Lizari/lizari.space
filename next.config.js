const withTM = require('next-transpile-modules')(['react-syntax-highlighter'])

module.exports = withTM({
  webpack: (config, options) => {
    config.plugins.push(
        new options.webpack.ProvidePlugin({
          React: 'react',
        }),
    );

    config.module.rules.push({
      test: /\.tsx$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: 'es2017',
      }
    });

    return config;
  },
});