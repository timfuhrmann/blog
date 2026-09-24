/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  // Non-default qualities used with <ContentfulImage /> must be whitelisted (Next 16).
  images: {
    qualities: [75, 85, 100],
  },
};

export default nextConfig;
