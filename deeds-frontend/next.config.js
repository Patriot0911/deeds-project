/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/deeds',
                destination: '/',
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
