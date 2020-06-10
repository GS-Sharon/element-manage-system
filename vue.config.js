module.exports = {
  devServer: {
    port: "9081",
    open: true
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
};
