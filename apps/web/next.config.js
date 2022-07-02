// if(process.env.NODE_ENV === 'development') {
    const path = require('path');
    require('dotenv').config({ path: path.resolve('..', '..', '.env') });
// }
module.exports = {
    images: {
        domains: [
            'localhost',
            'codyogden.nyc3.digitaloceanspaces.com'
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/headless/:path*',
                destination: `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/:path*`,
            }
        ]
    }
};
