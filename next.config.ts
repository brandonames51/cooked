import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "cooked-umber.vercel.app" }],
        destination: "https://rotted.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
