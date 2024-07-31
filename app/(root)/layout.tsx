"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            const createUser = async () => {
                try {
                    const response = await axios.post("/api/users", {
                        clerkId: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        imageUrl: user.imageUrl,
                        phoneNumber: user.primaryPhoneNumber?.phoneNumber,
                    });
                    console.log("User created:", response.data);
                } catch (error) {
                    console.error("Error creating user:", error);
                }
            };

            createUser();
        }
    }, [user]);

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
