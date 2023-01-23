/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_URL,
        port: "",
        pathname: "/**",
      },
    ],
  },
};
module.exports = nextConfig;
