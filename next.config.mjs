import dotenv from 'dotenv';
import { randomBytes } from 'node:crypto';
import WebpackObfuscator from 'webpack-obfuscator';
import TerserPlugin from 'terser-webpack-plugin';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    LogtoAppId: process.env.LOGTO_APP_ID || '607i5yfqohw99j66f1p3a',
    LogtoAppSecret: process.env.LOGTO_APP_SECRET || '9zXP71NQN3D8goUXqHpG6eIyo9aFr7yn',
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
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.output.filename = 'static/custom-js/[name].js';
      config.output.chunkFilename = 'static/external/[name].js';
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: {
              comments: false,
            },
          },
        })
      );

      config.plugins.push(
        new WebpackObfuscator({
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.75
        }, [])
      );
    }
    return config;
  },
};

export default nextConfig;
