/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用严格模式
  reactStrictMode: true,
  
  // 实验性功能
  experimental: {
    // 启用服务器操作
    serverActions: {
      bodySizeLimit: '2mb'
    },
  },

  // 图片域名白名单
  images: {
    domains: [],
  },

  // 环境变量
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
};

module.exports = nextConfig; 