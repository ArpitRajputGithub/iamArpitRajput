/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    viewTransition: true, // animated page changes via React's <ViewTransition> (see app/layout.jsx)
  },
};

module.exports = nextConfig;
