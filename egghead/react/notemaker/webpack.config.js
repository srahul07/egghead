module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "bundle.js",
    path: "./public",
    publicPath: "/"
  },
  devServer: {
    inline: true,
    contentBase: "./public"
  },
  module: {
    loaders: [
      {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }
    ]
  }
};
