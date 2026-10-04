import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { BakeryStatusBanner } from "@/components/layout/bakery-status-banner";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Molly's Specialty Sweets",
        template: "%s | Molly's Specialty Sweets",
    },
    description:
        "Browse custom cakes, cupcakes, cookies, and other handcrafted desserts from Molly's Specialty Sweets.",
    icons: {
        icon: [
            {
                url: "/favicons/cake-icon-96.png",
                sizes: "96x96",
                type: "image/png",
            },
            {
                url: "/favicons/cake-icon-32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/favicons/cake-icon-16.png",
                sizes: "16x16",
                type: "image/png",
            },
        ],
    },
};

type MainLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function MainLayout({ children }: MainLayoutProps) {
    return (
         <html lang="en" className="scroll-smooth">
            <body
                className={`${inter.variable} min-h-screen bg-white font-sans text-neutral-950 antialiased`}
            >
                <Toaster
                    position="top-center"
                    containerClassName="z-[900000]"
                />

                <div className="flex min-h-screen flex-col">
                    <BakeryStatusBanner />
                    <Navbar />

                    <main className="flex-1">{children}</main>

                    {/* Footer comes next */}
                    <Footer />
                </div>
            </body>
        </html>
    );
}