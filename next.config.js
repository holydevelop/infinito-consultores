/** @type {import('next').NextConfig} */

const { parsed } = require('dotenv').config();

const nextConfig = {
  env: {
    URL_API: parsed.URL_API,
  },
}

module.exports = nextConfig
