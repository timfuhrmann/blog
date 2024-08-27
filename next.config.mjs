/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
