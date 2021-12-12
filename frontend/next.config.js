// const withCSS = require('@zeit/next-css');

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig:{
    APP_NAME:'Blog',
    API:'https://blog077.herokuapp.com/api/v1',
    PRODUCTION:false,
    DOMAIN_DEVELOPMENT:"https://blog-iota-mauve.vercel.app",
    DOMAIN_PRODUCTION:'https://blog-iota-mauve.vercel.app',
    DISQUS_SHORTNAME:'blog-vkper12jwe'
  }
};
