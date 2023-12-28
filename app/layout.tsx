// These styles apply to every route in the application
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

import SessionProvider from "@/providers/auth-session-provider";

import "@/styles/globals.css";
import AuthStatus from "@/components/auth-status";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="!scroll-smooth">
            <link rel="icon" href="/mollys-logo-pink-favicon.png" sizes="16x16" className="w-[16px] h-[16px]" />
            <body className={inter.variable}>
                <Toaster />
                <Suspense fallback="Loading...">
                    <AuthStatus />
                </Suspense>
                <SessionProvider>
                    <div className="flex flex-col">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
