/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
import {randomBytes} from "node:crypto";

dotenv.config();

const nextConfig = {
  // load env
    env: {
        BaseURL: process.env.NEXT_PUBLIC_BASE_URL,
        LogtoCallback: (process.env.LOGTO_CALLBACK_URL || 'https://anime.tzpro.xyz'),
        LogtoAppId: (process.env.LOGTO_APP_ID || '607i5yfqohw99j66f1p3a'),
        LogtoAppSecret: (process.env.LOGTO_APP_SECRET || '9zXP71NQN3D8goUXqHpG6eIyo9aFr7yn'),
        LogtoEndpoint: (process.env.LOGTO_ENDPOINT || 'https://auth.tzpro.xyz/oidc/auth'),
        CookieSecret: (process.env.COOKIE_SECRET || randomBytes(32).toString('hex')),
    },
images: {
          unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-avatars.huggingface.co',
        port: '',
        pathname: '/v1/production/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/** ',
      },
      {
        protocol: 'https',
        hostname: 'avatars.microsoft.com',
        port: '',
        pathname: '/**',
      },
    ],
},

}

export default nextConfig;
