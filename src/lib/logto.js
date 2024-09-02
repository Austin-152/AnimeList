import LogtoClient from '@logto/next';
import {env} from "eslint-config-next";

export const logtoClient = new LogtoClient({
    endpoint: 'https://auth.tzpro.xyz/oidc/auth',
    appId: env.LogtoAppId,
    appSecret: env.LogtoAppSecret,
    baseUrl: env.BaseURL,
    cookieSecret: env.CookieSecret,
    cookieSecure: process.env.NODE_ENV === 'production',
});
