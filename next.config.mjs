/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

// 手动加载 .env 文件
dotenv.config();
const nextConfig = {
  // load env
    env: {
      BaseURL: process.env.NEXT_PUBLIC_BASE_URL,
    }
}

export default nextConfig;
