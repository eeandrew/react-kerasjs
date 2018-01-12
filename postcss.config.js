module.exports = () => {
  return {
    plugins: [
      require('postcss-import'),
      require('postcss-cssnext', {
        browsers: ['last 2 version']
      }),
    ]
  }
}
