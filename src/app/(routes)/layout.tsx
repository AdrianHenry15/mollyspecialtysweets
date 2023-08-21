"use client";
import Footer from "../_components/Footer";
import Modal from "../_components/Modal";
import Navbar from "../_components/Navbar";
import HydrationZustand from "../_helpers/HydrationZustand";
import "./globals.css";

const roboto = { className: "font-roboto" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Marck+Script&display=swap" rel="stylesheet" />
                <link rel="icon" href="../../static/pastry (1).png" sizes="32x32" />
                <title>{`Molly's Specialty Sweets`}</title>
            </head>
            <body className={roboto.className}>
                <HydrationZustand>
                    <Navbar />
                    <Modal />
                    {children}
                    <Footer />
                </HydrationZustand>
            </body>
        </html>
    );
}
