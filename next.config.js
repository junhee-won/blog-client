/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
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
