const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  reactStrictMode: true,
  publicRuntimeConfig:{
    APP_NAME:'Blog',
    API:'http://localhost:8000/api/v1',
    PRODUCTION:false
  }
});
