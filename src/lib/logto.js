import LogtoClient from '@logto/next';
import dotenv from "dotenv";
require('dotenv').config()

export const logtoClient = new LogtoClient({
    endpoint: process.env.LOGTO_ENDPOINT,
    appId: process.env.LOGTO_APP_ID,
    appSecret: process.env.LOGTO_APP_SECRET,
    baseUrl: process.env.LOGTO_CALLBACK_URL,
    cookieSecret: process.env.COOKIE_SECRET,
    cookieSecure: process.env.NODE_ENV === 'production',
});
