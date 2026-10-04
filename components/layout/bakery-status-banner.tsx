"use client";
import Link from "next/link";

export function BakeryStatusBanner() {
    return (
        <aside className="bg-pink-100 px-4 py-2.5 text-center text-sm text-pink-950" aria-label="Bakery status">
            <p>
                <span className="font-semibold">We’re currently taking a maternity break.</span> Orders are temporarily closed, but you can
                still{" "}
                <Link
                    href="/menu"
                    className="font-semibold underline decoration-pink-400 underline-offset-4 transition-colors hover:text-pink-700"
                >
                    browse our menu
                </Link>
                .
            </p>
        </aside>
    );
}
