"use client";

import FormNav from "@/components/forms/form-nav";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-center">
            <FormNav />
            <div className="flex flex-col self-center w-full md:w-[66%] lg:w-[50%] xl:w-[35%]">{children}</div>
        </div>
    );
}
