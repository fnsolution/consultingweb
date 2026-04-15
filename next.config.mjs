/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/무상진단",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/개인재무설계",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/부동산관리",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/인사제도",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/정부지원사업",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'fnsolution.co.kr',
      },
    ],
  },
};

export default nextConfig;
