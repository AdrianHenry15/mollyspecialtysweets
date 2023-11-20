import { Nunito_Sans } from "next/font/google";
import { Metadata } from "next";

import "./global.css";

import { AuthSessionProvider } from "@/providers/auth-session-provider";

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Molly's Specialty Sweets",
    description: "Sweet Cakes",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <link rel="icon" href="/cake-icon.png" />
            <body className={inter.className}>
                <AuthSessionProvider>{children}</AuthSessionProvider>
            </body>
        </html>
    );
}
