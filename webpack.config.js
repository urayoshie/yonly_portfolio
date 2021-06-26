const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  output: {
    filename: '[name].js',
    path: outputPath,
    clean: true
  },
  entry: {
    news: ['./js/news.js'],
    works: ['./js/works.js'],
    contact: ['./js/contact.js'],
  },
  // エラーを回避するため
  devtool: 'eval-source-map',
  devServer: {
    // ディレクトリを指定（必要）
    contentBase: './',
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
};
