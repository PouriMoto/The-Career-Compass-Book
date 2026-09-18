/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // GitHub Pages فقط فایل‌های استاتیک سرو می‌کنه
  output: 'export',

  // اگه ریپوت user-page نباشه (username.github.io)، basePath لازمه
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // GitHub Pages از Image Optimization پشتیبانی نمی‌کنه
  images: {
    unoptimized: true,
  },

  // trailing slash برای سازگاری با GitHub Pages
  trailingSlash: true,
};

export default nextConfig;