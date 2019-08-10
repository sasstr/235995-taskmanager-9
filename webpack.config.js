const path = require(`path`);
module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  /* module: {
    rules: [
      {
          test: /\.js$/,
          exclude: '/node_modules/'
      }
    ]
  } ,*/
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`), // Где искать сборку
    publicPath: `http://localhost:8080/`, // Веб адрес сборки
    compress: true, // Сжатие
    overlay: true, // Выводит ошибки на экране.
    // Автоматическая перезагрузка страницы
    // Если не работает по стандартному URLу в браузере ‘http://localhost:8080’,
    // то добавьте к нему ‘/webpack-dev-server/‘: ‘http://localhost:8080/webpack-dev-server/'
    watchContentBase: true
  }
};
