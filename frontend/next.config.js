/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,

    async redirects() {
        return [
            // Dead pages → homepage (301 permanent redirects to preserve link equity)
            {
                source: '/pw-coupon-code',
                destination: '/',
                permanent: true,
            },
            {
                source: '/services',
                destination: '/',
                permanent: true,
            },
            {
                source: '/services/:path*',
                destination: '/',
                permanent: true,
            },
            // check-results → vtu-results (canonical results page)
            {
                source: '/check-results',
                destination: '/vtu-results',
                permanent: true,
            },
            // vtu-results/index was a bogus entry — redirect to directory
            {
                source: '/vtu-results/index',
                destination: '/vtu-results',
                permanent: true,
            },
        ]
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
