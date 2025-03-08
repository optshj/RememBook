import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                "main-gray": "#A6A6A6",
                "bg-gray-dark": "#DADADA",
                "main-gray-dark": "#7F7F7F",

                cream: "#f0e9df",
                mocha: "#a57865",
                moonbeam: "#d1c8bf",

                "button-black": "#404040",
                yellow: "#FFD76D",
                kakao: "#FEE500"
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            },
            keyframes: {
                ripple: {
                    "0%": {
                        width: "0px",
                        height: "0px",
                        opacity: "0.6"
                    },
                    "100%": {
                        width: "400px",
                        height: "400px",
                        opacity: "0"
                    }
                }
            },
            animation: {
                ripple: "ripple 0.6s ease-out"
            }
        }
    },
    plugins: []
}
export default config
