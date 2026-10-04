"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur">
            <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="group flex shrink-0 items-center"
                    aria-label="Molly's Specialty Sweets home"
                >
                    <Image
                        src="/mollys-logo-black.png"
                        alt=""
                        width={72}
                        height={72}
                        sizes="72px"
                        priority
                        className="size-[72px] object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navigationItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors ${
                                    isActive ? "text-pink-600" : "text-neutral-700 hover:text-pink-600"
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    <Link
                        href="/menu"
                        className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pink-600"
                    >
                        Browse the Menu
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((current) => !current)}
                    className="inline-flex size-11 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-pink-50 md:hidden"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-navigation"
                    aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </nav>

            {mobileMenuOpen && (
                <div id="mobile-navigation" className="border-t border-pink-100 bg-white px-5 py-5 md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-2">
                        {navigationItems.map((item) => {
                            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                                        isActive ? "bg-pink-50 text-pink-700" : "text-neutral-800 hover:bg-pink-50"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}

                        <Link
                            href="/menu"
                            onClick={closeMobileMenu}
                            className="mt-3 rounded-full bg-pink-500 px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-pink-600"
                        >
                            Browse the Menu
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

function MenuIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
        </svg>
    );
}
