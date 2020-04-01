module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/123',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  }
};