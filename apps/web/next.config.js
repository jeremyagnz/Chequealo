/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@chequealo/shared-types',
    '@chequealo/database',
    '@chequealo/ai-providers',
    '@chequealo/search-engine',
    '@chequealo/credibility-engine',
    '@chequealo/white-label',
  ],
};

module.exports = nextConfig;
