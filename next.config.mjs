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
        async redirects() {
            return [
                {
                    source: '/(project|user)/:path*(.*)',
                    missing: [
                        {
                            type: 'cookie',
                            key: 'user_id'
                        }
                    ],
                    destination: '/login',
                    permanent: false
                },
                {
                    source: '/api/(project|user)/:path*(^(?!.*simple).*$)',
                    missing: [
                        {
                            type: 'cookie',
                            key: 'user_id'
                        }
                    ],
                    destination: '/login',
                    permanent: false
                }
            ]
        },
        // async headers(){
        //    return [
        //        { source: "/api/:path*",
        //            headers:[
        //                { key: "Access-Control-Allow-Credentials", value: "true" },
        //                { key: "Access-Control-Allow-Origin", value: "www.trustcrews.com, trustcrews-front-forked-kim-eun-seons-projects.vercel.app" },
        //                { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        //                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        //            ]
        //        }
        //    ]
        //
        // }
    }

    return nextConfig;
}
