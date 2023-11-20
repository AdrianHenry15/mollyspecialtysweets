"use client";
import React from "react";
import { useSession } from "next-auth/react";

import SignInModal from "../(public)/sign-in/page";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    if (!session) {
        return <SignInModal />;
    } else {
        return <section className="flex flex-col w-full h-full">{children}</section>;
    }
}
