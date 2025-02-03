/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/media",
  images: {
    domains: ["images.microcms-assets.io"],
  },
};

export default nextConfig;
