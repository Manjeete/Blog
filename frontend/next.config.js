// const withCSS = require('@zeit/next-css');

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig:{
    APP_NAME:'Blog',
    API:'http://localhost:8000/api/v1',
    PRODUCTION:false,
    DOMAIN_DEVELOPMENT:"http://localhost:3000",
    DOMAIN_PRODUCTION:'https://manjeet.com'
  }
};
