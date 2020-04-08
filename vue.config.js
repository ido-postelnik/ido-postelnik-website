module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/123',
  configureWebpack: {
    optimization: {
        splitChunks: {
            minSize: 10000,
            maxSize: 250000,
        }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  }
};