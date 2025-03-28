export default (phase, {defaultConfig}) => {

    /** @type {import('next').NextConfig} */

    const nextConfig = {
        productionBrowserSourceMaps: true,
        webpack: (config) => {
            config.module.rules.push({
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            });

            return config;
        },
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'project-match-bucket.s3.ap-northeast-2.amazonaws.com'
                }
            ]
        },
    }

    return nextConfig;
}
