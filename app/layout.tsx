// These styles apply to every route in the application
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Loader } from "@/components/loader";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const title = "Molly's Specialty Sweets";
const description = "Bakery specializing in custom cakes, cupcakes, cookies, and more!";

export const metadata: Metadata = {
    title,
    description,
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
    metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
    themeColor: "#FFF",
};

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" className="!scroll-smooth">
                <link rel="icon" href="/mollys-logo-pink-favicon.png" sizes="16x16" className="w-[16px] h-[16px]" />
                <body className={inter.variable}>
                    <div className="flex flex-col justify-center items-center w-full">
                        <Suspense fallback={<Loader />}>{children}</Suspense>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
