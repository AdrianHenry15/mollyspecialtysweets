"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col">
                <Navbar />
                {children}
                <Footer />
            </div>
        </LocalizationProvider>
    );
}
