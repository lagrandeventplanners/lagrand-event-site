import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || "lagrandeadmin",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "LaGrande@2025!",
    ADMIN_SESSION_TOKEN: process.env.ADMIN_SESSION_TOKEN || "lgr_8f3k2m9x_admin_session_tok",
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    proxyClientMaxBodySize: "50mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
