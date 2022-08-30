/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    HASURA_API_URI: process.env.HASURA_API_URI,
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  },
};

module.exports = nextConfig;
