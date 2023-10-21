/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
    images: {
        domains:['avatars.githubusercontent.com']
    },
}

module.exports = withPlugins([optimizedImages], nextConfig)
