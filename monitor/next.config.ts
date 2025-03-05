import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'elasticbeanstalk-us-east-1-518344696083.s3.us-east-1.amazonaws.com',
      port: '',
      search: '',
    }]
  }
};

export default nextConfig;
