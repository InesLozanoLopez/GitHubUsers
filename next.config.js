/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
    images: {
        domains:['avatars.githubusercontent.com']
    },

    async headers() {
        return [
            {
                source:'/static/(.*)',
                headers:[
                    {
                        key: 'Cache-Control',
                        value: process.env.NODE_ENV === 'production'
                        ? 'public, max-age=31536000, immutable'
                        : 'no-store'
                    }
                ]
            }
        ]
    }
}

module.exports = withPlugins([optimizedImages], nextConfig)
