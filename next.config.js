/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_URL,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d1qlsar6961fb5.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
module.exports = nextConfig;
