/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
        NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY,
        NEXT_PRIVATE_KEY: process.env.NEXT_PRIVATE_KEY,
        WEBHOOK_SECRET: process.env.WEBHOOK_SECRET
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    images: {
        domains: ['img.clerk.com']
    }
};

module.exports = nextConfig;
