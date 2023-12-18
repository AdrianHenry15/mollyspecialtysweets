// These styles apply to every route in the application
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

import SessionProvider from "@/providers/auth-session-provider";

import "@/styles/globals.css";
import AuthStatus from "@/components/auth-status";

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
            <body className={inter.variable}>
                <Toaster />
                <Suspense fallback="Loading...">
                    <AuthStatus />
                </Suspense>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
