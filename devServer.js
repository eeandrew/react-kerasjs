var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
const WebpackDevServer = require('webpack-dev-server');
var compiler = webpack(config);

function startWebpackDevServer() {
  const server = new WebpackDevServer(compiler,{
    noInfo: false,
    hot: true,
    contentBase: path.join(__dirname),
    publicPath: config.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
  server.listen(3000, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`devServer is running at`);
  });
}


startWebpackDevServer()
