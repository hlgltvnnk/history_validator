/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
        test: /\.ts|\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        });
        config.resolve.fallback = { fs: false, path: false };

        return config;
    },
};

module.exports = nextConfig
