"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
// import { useUser } from "@clerk/nextjs";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // CONSTANTS
    // const { user } = useUser();
    // const hasCheckedUser = useRef(false);
    // const pathname = usePathname();

    // useEffect(() => {
    //     if (user && !hasCheckedUser.current) {
    //         hasCheckedUser.current = true;
    //         const checkAndHandleUser = async () => {
    //             try {
    //                 const response = await axios.get(`/api/users/${user.id}`);
    //                 if (response.status === 200) {
    //                     const existingUser = response.data;
    //                     console.log("User already exists", existingUser);

    //                     try {
    //                         await axios.put(`/api/users/${user.id}`, {
    //                             email: user!.primaryEmailAddress?.emailAddress,
    //                             firstName: user!.firstName,
    //                             lastName: user!.lastName,
    //                             imageUrl: user!.imageUrl,
    //                             phoneNumber: user!.primaryPhoneNumber?.phoneNumber,
    //                         });
    //                         console.log("User updated:", existingUser);
    //                     } catch (updateError) {
    //                         console.error("Error updating user:", updateError);
    //                     }
    //                 }
    //             } catch (error: any) {
    //                 if (error.response && error.response.status === 404) {
    //                     const lastPathnameSegment = pathname.split("/").filter(Boolean).pop();
    //                     if (lastPathnameSegment === "sign-up") {
    //                         try {
    //                             const createResponse = await axios.post("/api/users", {
    //                                 clerkId: user!.id,
    //                                 email: user!.primaryEmailAddress?.emailAddress,
    //                                 firstName: user!.firstName,
    //                                 lastName: user!.lastName,
    //                                 imageUrl: user!.imageUrl,
    //                                 phoneNumber: user!.primaryPhoneNumber?.phoneNumber,
    //                             });
    //                             console.log("User created:", createResponse.data);
    //                         } catch (createError) {
    //                             console.error("Error creating user:", createError);
    //                         }
    //                     } else {
    //                         console.log("User does not need to be created.");
    //                     }
    //                 } else {
    //                     console.error("Error fetching user:", error);
    //                 }
    //             }
    //         };

    //         checkAndHandleUser().catch((error) => console.error("Unexpected error:", error));
    //     }
    // }, [user, pathname]);

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
