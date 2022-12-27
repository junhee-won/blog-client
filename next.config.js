/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["blog-image-bucket-123.s3.ap-northeast-2.amazonaws.com"],
  },
};
module.exports = nextConfig;
