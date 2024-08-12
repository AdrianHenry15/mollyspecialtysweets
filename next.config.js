/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
        NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY,
        NEXT_PRIVATE_KEY: process.env.NEXT_PRIVATE_KEY,
        WEBHOOK_DEV_SECRET: process.env.WEBHOOK_DEV_SECRET,
        WEBHOOK_PROD_SECRET: process.env.WEBHOOK_PROD_SECRET
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                hostname: 'img.clerk.com',
            },
        ],
    }
};

module.exports = nextConfig;
