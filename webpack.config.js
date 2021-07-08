const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const glob = require('glob');
const htmlPath = './src/pages/';
const htmlPlugins = glob.sync(`${htmlPath}**/*.html`).map((filePath) => {
  return new HtmlWebpackPlugin({
    template: filePath,
    filename: filePath.replace(htmlPath, ''),
  });
});

module.exports = {
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    filename: '[name].js',
    path: outputPath,
  },
  // エラーを回避するため
  devtool: 'eval-source-map',
  devServer: {
    // ディレクトリを指定（必要）
    contentBase: outputPath,
    // 開くファイル（index.html を開く）
    openPage: './',
  },
  module: {
    rules: [
      {
        // 対象のファイル（.js, .mjs ので終わるファイル全て）
        test: /\.m?js$/i,
        // node_modules ディレクトリは対象外とする
        exclude: /node_modules/,
        // 使用するローダー
        use: 'babel-loader',
      },
    ],
  },
  plugins: htmlPlugins,
};
