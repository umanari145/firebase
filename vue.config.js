module.exports = {
  devServer: {
    //クロスドメインのajax対策
    proxy: 'https://us-central1-dummy-80371.cloudfunctions.net/'
  }
};
