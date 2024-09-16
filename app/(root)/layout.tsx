"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Suspense, useEffect } from "react";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import PromotionBanner from "@/components/promotion-banner";
import { Loader } from "@/components/loader";
import { useUser } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            fetch("/api/square/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log("Square customer created:", data.customerId);
                    } else {
                        console.error("Failed to create Square customer");
                    }
                });
        }
    }, [user]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col relative w-full">
                <Navbar />
                <PromotionBanner />
                <div className="flex relative w-full">
                    <Suspense fallback={<Loader />}>{children}</Suspense>
                </div>
                <Footer />
            </div>
        </LocalizationProvider>
    );
}
