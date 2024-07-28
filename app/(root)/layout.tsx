"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            const postUserData = async () => {
                const userData = {
                    name: user.fullName,
                    email: user.primaryEmailAddress?.emailAddress,
                    phoneNumber: user.primaryPhoneNumber?.phoneNumber,
                    clerkId: user.id,
                    image: user.imageUrl,
                };

                try {
                    const response = await fetch("/api/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to create user");
                    }

                    const result = await response.json();
                    console.log("User created:", result);
                } catch (error) {
                    console.error("Error creating user:", error);
                }
            };

            postUserData();
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
