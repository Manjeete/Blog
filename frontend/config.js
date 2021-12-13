import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ?'https://blog077.herokuapp.com/api/v1':"https://blog077.herokuapp.com/api/v1";
export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRODUCTION:publicRuntimeConfig.DOMAIN_DEVELOPMENT

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME