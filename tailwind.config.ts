import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        screens: {
            "2xs": "464px",
            xs: "560px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px"
        },
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
                },
                "fade-up-down": {
                    "0%": { opacity: "0", marginTop: "8px" },
                    "25%": { opacity: "1", marginTop: "0" },
                    "75%": { opacity: "1", marginTop: "0" },
                    "100%": { opacity: "0", marginTop: "8px" }
                }
            },
            animation: {
                ripple: "ripple 1s ease-out",
                "fade-up-down": "fade-up-down 1s ease-out forwards"
            }
        }
    },
    plugins: []
}
export default config
