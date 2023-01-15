/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [process.env.IMAGE_URL],
  },
};
module.exports = nextConfig;
