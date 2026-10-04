import { ContactForm } from "@/components/contact/contact-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact", description: "Send a general question to Molly's Specialty Sweets." };

export default function ContactPage() {
    return (
        <main className="bg-pink-50/50">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
                <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-pink-100/60 lg:grid-cols-[0.8fr_1.2fr]">
                    <ContactInformation />
                    <ContactForm />
                </div>
            </div>
        </main>
    );
}

function ContactInformation() {
    return (
        <section className="relative overflow-hidden bg-[#211820] px-7 py-12 text-white sm:px-10 lg:px-12 lg:py-16">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-pink-500/20 blur-3xl" aria-hidden="true" />

            <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-amber-300/10 blur-3xl" aria-hidden="true" />

            <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">Contact Molly</p>

                <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">Have a question? Let&apos;s talk.</h1>

                <p className="mt-6 max-w-md leading-7 text-neutral-300">
                    Molly is currently taking a maternity break. Although orders are temporarily closed, you&apos;re welcome to send general
                    questions about the menu or business.
                </p>

                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-pink-200">Currently unavailable</p>

                    <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                        <li>New orders</li>
                        <li>Custom cake requests</li>
                        <li>Event-date reservations</li>
                        <li>Pricing estimates</li>
                    </ul>
                </div>

                <div className="mt-10 space-y-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Email</p>

                        <a
                            href="mailto:mograv123@gmail.com"
                            className="mt-1 inline-block break-all text-sm font-medium text-white transition-colors hover:text-pink-300"
                        >
                            mograv123@gmail.com
                        </a>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Social</p>

                        <a
                            href="https://www.instagram.com/mollyspecialtysweets/"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block text-sm font-medium text-white transition-colors hover:text-pink-300"
                        >
                            @mollyspecialtysweets
                        </a>
                    </div>
                </div>

                <Link href="/menu" className="mt-10 inline-flex text-sm font-semibold text-pink-300 transition-colors hover:text-pink-200">
                    Browse the future menu
                    <span className="ml-2" aria-hidden="true">
                        →
                    </span>
                </Link>
            </div>
        </section>
    );
}
