/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        typescript: true,
                        dimensions: false
                    }
                }
            ]
        })
        return config
    },
    env: {
        NEXT_PUBLIC_ALADIN_TTB_KEY: process.env.NEXT_PUBLIC_ALADIN_TTB_KEY
    },
    images: {
        domains: ["image.aladin.co.kr"]
    }
}

export default nextConfig
