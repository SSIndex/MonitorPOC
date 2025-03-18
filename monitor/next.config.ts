import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "elasticbeanstalk-us-east-1-518344696083.s3.us-east-1.amazonaws.com",
        port: "",
        search: "",
      },
    ],
  },
  //TODO: DELETE ignoreBuildErrors LATER BEFORE LAUNCHING TO PRODUCTION, JUST USING AS TESTING THAT DEPLOYMENT WORKS
  eslint: {
    ignoreDuringBuilds: true,
  },
  //TODO: DELETE ignoreBuildErrors LATER BEFORE LAUNCHING TO PRODUCTION, JUST USING AS TESTING THAT DEPLOYMENT WORKS
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
};

export default nextConfig;
