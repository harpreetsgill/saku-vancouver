/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "saku-vancouver.s3.us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "scontent.cdninstagram.com",
      "images.unsplash.com",
      "static.wixstatic.com",
      "lh5.googleusercontent.com",
      "raw.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
