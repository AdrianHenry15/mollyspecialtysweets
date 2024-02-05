import type { Config } from "tailwindcss";
import utilityClasses from "./lib/utility-classes";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            ...utilityClasses["@layer utilities"],
            gridTemplateColumns: {
                "13": "repeat(13, minmax(0, 1fr))",
            },
            colors: {
                blue: {
                    400: "#2589FE",
                    500: "#0070F3",
                    600: "#2F6FEB",
                },
            },
            keyframes: {
                shimmer: {
                    "100%": {
                        transform: "translateX(100%)",
                    },
                },
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                blink: {
                    "0%": { opacity: "0.2" },
                    "20%": { opacity: "1" },
                    "100% ": { opacity: "0.2" },
                },
            },
            animation: {
                fadeIn: "fadeIn .3s ease-in-out",
                carousel: "marquee 60s linear infinite",
                blink: "blink 1.4s both infinite",
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
export default config;
