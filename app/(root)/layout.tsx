"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import PromotionBanner from "@/components/promotion-banner";
import DeliveryMethodBanner from "@/components/delivery-method-banner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col relative">
                <Navbar />
                {/* <PromotionBanner /> */}
                {/* <DeliveryMethodBanner /> */}
                {children}
                <Footer />
            </div>
        </LocalizationProvider>
    );
}
