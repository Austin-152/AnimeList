/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
import {randomBytes} from "node:crypto";

dotenv.config();

const nextConfig = {
    /** @type {import('next').NextConfig} */
  reactStrictMode: true,

  // transpilePackages 用于指定要编译的 ES 模块
  transpilePackages: ['kitchen-flow-editor', '@ant-design/pro-editor',
      'zustand', 'leva', "@ant-design/icons-svg","@babel/runtime",
      "/rc-util","@ant-design/icons","@ant-design/pro-utils",
      "@ant-design/pro-provider","@ant-design/pro-layout","@ant-design/pro-utils","rc-pagination","rc-picker"],
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
    }
}

export default nextConfig;
