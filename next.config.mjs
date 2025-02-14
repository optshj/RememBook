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
    images: {
        domains: ["image.aladin.co.kr"]
    }
}

export default nextConfig
