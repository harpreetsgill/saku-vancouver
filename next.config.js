/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["s3.us-west-2.amazonaws.com", "scontent.cdninstagram.com"],
  },
};

module.exports = nextConfig;
