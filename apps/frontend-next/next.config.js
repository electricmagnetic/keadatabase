/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  transpilePackages: ["geospatial"],
  async redirects() {
    return [
      // Deprecated but retained to prevent broken URLs (from original database)
      {
        source: "/report/sighting",
        destination: "/report",
        permanent: true,
      },
      {
        source: "/sightings",
        destination: "/observations",
        permanent: true,
      },
      {
        source: "/sightings/:id",
        destination: "/observations/:id",
        permanent: true,
      },
      {
        source: "/sponsor",
        destination: "/pages/donations",
        permanent: true,
      },
      // New page layout
      {
        source: "/about",
        destination: "/pages/about",
        permanent: true,
      },
      {
        source: "/donations",
        destination: "/pages/donations",
        permanent: true,
      },
      {
        source: "/help",
        destination: "/pages/help",
        permanent: true,
      },
      {
        source: "/licence",
        destination: "/pages/licence",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/pages/terms",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
