/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
    images: {
        domains:['avatars.githubusercontent.com']
    },
    reactStrictMode: false,
}

module.exports = withPlugins([optimizedImages], nextConfig)
