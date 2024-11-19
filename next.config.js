/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'img.clerk.com',

            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    }
};

module.exports = nextConfig;
