/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    'postcss-nested',
    // Discard comments only in production builds
    ...(process.env.NODE_ENV === 'production' ? ['postcss-discard-comments'] : []),
  ],
};

export default config;
