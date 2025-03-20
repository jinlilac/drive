// craco.config.js

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
