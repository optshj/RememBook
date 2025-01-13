import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                "main-blue": "#45ACF5",
                "bg-gray": "#F3F3F3",
                "main-gray": "#A6A6A6",
                "main-blue-dark": "#2B8CCC",
                "bg-gray-dark": "#DADADA",
                "main-gray-dark": "#7F7F7F",

                "button-black": "#404040",
                yellow: "#FFD76D"
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            }
        }
    },
    plugins: []
}
export default config
