import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                port: '3001',
                hostname: 'localhost',
            },
            {
                protocol: 'http',
                port: '3001',
                hostname: '13.60.129.12'
            },
            {
                protocol: 'https',
                hostname: 'mini-maestro.com'
            },
            {
                protocol: 'https',
                hostname: 'api.mini-maestro.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'tailwindui.com'
            }
        ]
    }
};

export default withNextIntl(nextConfig);
