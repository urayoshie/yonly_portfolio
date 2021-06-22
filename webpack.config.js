module.exports = {
  mode: 'development',
  entry: {
    news: ['./js/news.js'],
    works: ['./js/works.js'],
    contact: ['./js/contact.js'],
  },
  output: {
    filename: '[name].js',
  },
  devServer: {
    index: 'index.html',
    open: true,
  },
};
