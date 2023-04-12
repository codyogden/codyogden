/** @type {import('next').NextConfig} */

const ASSETS_URL = (new URL(process.env.ASSETS_URL));
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: ASSETS_URL.protocol.replace(/:/g, ''),
                hostname: ASSETS_URL.hostname,
                pathname: '/**'
            }
        ]
    },
    experimental: {
        appDir: true,
        runtime: 'edge'
    },
};

module.exports = nextConfig;
