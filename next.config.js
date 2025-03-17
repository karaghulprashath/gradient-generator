/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/gradient-generator" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/gradient-generator/" : "",
};

module.exports = nextConfig;
