"use client";

import "@/styles/globals.css";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div className="w-full h-screen flex items-center justify-center">{children}</div>;
}
