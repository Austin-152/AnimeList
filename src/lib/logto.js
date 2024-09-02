import LogtoClient from '@logto/next';
import dotenv from "dotenv";
require('dotenv').config()

export const logtoClient = new LogtoClient({
    endpoint: dotenv.config().parsed.LOGTO_ENDPOINT,
    appId: dotenv.config().parsed.LOGTO_APP_ID,
    appSecret: dotenv.config().parsed.LOGTO_APP_SECRET,
    baseUrl: dotenv.config().parsed.BaseURL,
    cookieSecret: process.env.COOKIE_SECRET,
    cookieSecure: dotenv.config().parsed.NODE_ENV === 'production',
});
