import dotenv from 'dotenv';
import { randomBytes } from 'node:crypto';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    reactCompiler: true,
    transpilePackages: [
        'kitchen-flow-editor', '@ant-design/pro-editor',
        'zustand', 'leva', '@ant-design/icons-svg', '@babel/runtime',
        'rc-util', '@ant-design/icons', '@ant-design/pro-utils',
        '@ant-design/pro-provider', '@ant-design/pro-layout',
        '@ant-design/pro-utils', 'rc-pagination', 'rc-picker'
    ],
    env: {
        BaseURL: process.env.NEXT_PUBLIC_BASE_URL || 'https://animeapi.rypro.me',
        LogtoCallback: process.env.LOGTO_CALLBACK_URL || 'https://anime.tzpro.xyz',
        LogtoAppId: process.env.LOGTO_APP_ID,
        LogtoAppSecret: process.env.LOGTO_APP_SECRET,
        LogtoEndpoint: process.env.LOGTO_ENDPOINT || 'https://auth.tzpro.xyz/oidc/auth',
        CookieSecret: process.env.COOKIE_SECRET || randomBytes(32).toString('hex'),
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
            {
                protocol: 'https',
                hostname: 'www.olevod.tv',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'olevod.tv',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
