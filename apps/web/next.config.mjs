/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@foundersignal/core"]
};

export default nextConfig;
