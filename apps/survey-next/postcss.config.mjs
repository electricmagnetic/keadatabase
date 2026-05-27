/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-nesting': {},
    // Discard comments only in production builds
    ...(process.env.NODE_ENV === 'production' && {
      'postcss-discard-comments': { removeAll: true },
    }),
  },
};

export default config;
