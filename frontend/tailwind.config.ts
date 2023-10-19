import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {},
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".content-auto": {
                    "content-visibility": "auto",
                },
                ".content-hidden": {
                    "content-visibility": "hidden",
                },
                ".content-visible": {
                    "content-visibility": "visible",
                },
            });
        }),
    ],
};
export default config;
