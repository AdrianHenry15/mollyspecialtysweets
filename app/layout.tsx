import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
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
                <link rel="icon" href="/favicons/cake-icon-96.png" sizes="96x96" />
                <link rel="icon" href="/favicons/cake-icon-32.png" sizes="32x32" />
                <link rel="icon" href="/favicons/cake-icon-16.png" sizes="16x16" />
                <body className={inter.variable}>
                    <Toaster />
                    <div className="flex flex-col">
                        <Suspense fallback={<Loader />}>{children}</Suspense>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
