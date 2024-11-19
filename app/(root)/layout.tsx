"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Header from "@/components/header";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col relative">
                <Header />
                {/* <PromotionBanner /> */}
                {/* <DeliveryMethodBanner /> */}
                {children}
                <Footer />
            </div>
        </LocalizationProvider>
    );
}
