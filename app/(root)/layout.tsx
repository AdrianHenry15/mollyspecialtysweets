"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Suspense, useEffect } from "react";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import PromotionBanner from "@/components/promotion-banner";
import { Loader } from "@/components/loader";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { isSignedIn } = useAuth();
    useEffect(() => {
        if (isSignedIn) {
            axios
                .post("/api/create-square-customer")
                .then((response) => {
                    console.log("Square customer created or fetched:", response.data);
                })
                .catch((error) => {
                    console.error("Error creating Square customer:", error);
                });
        }
    }, [isSignedIn]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col relative w-full">
                <Navbar />
                {/* <PromotionBanner /> */}
                <div className="flex relative w-full">
                    <Suspense fallback={<Loader />}>{children}</Suspense>
                </div>
                <Footer />
            </div>
        </LocalizationProvider>
    );
}
