"use client";
import React, { useEffect, useState } from "react";

const HydrationZustand = ({ children }: any) => {
    const [isHydrated, setIsHydrated] = useState(false);

    // Wait till Next.js rehydration completes for persistence
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return <>{isHydrated ? <div className="flex flex-col justify-center items-center h-full">{children}</div> : null}</>;
};

export default HydrationZustand;
