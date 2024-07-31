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
            const checkAndHandleUser = async () => {
                try {
                    // Check if user exists
                    const response = await axios.get(`/api/users/${user.id}`);
                    if (response.status === 200) {
                        // User exists, handle updates if needed
                        const existingUser = response.data;
                        console.log("User already exists", existingUser);

                        // Update user details
                        await axios.put(`/api/users/${user.id}`, {
                            email: user.primaryEmailAddress?.emailAddress,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            imageUrl: user.imageUrl,
                            phoneNumber: user.primaryPhoneNumber?.phoneNumber,
                        });
                    } else if (response.status === 404) {
                        // User does not exist, create new user
                        const secondResponse = await axios.post("/api/users", {
                            clerkId: user.id,
                            email: user.primaryEmailAddress?.emailAddress,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            imageUrl: user.imageUrl,
                            phoneNumber: user.primaryPhoneNumber?.phoneNumber,
                        });
                        console.log("User created:", secondResponse.data);
                    }
                } catch (error) {
                    console.error("Error creating user:", error);
                }
            };

            checkAndHandleUser();
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
