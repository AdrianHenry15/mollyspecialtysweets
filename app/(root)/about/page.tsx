import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about Molly and the care behind every dessert from Molly's Specialty Sweets.",
};

const values = [
    {
        number: "01",
        title: "Made with care",
        description: "Every dessert is thoughtfully prepared with attention given to flavor, presentation, and the people celebrating.",
    },
    {
        number: "02",
        title: "Personal by design",
        description: "From favorite flavors to meaningful colors and themes, each order should feel connected to the occasion.",
    },
    {
        number: "03",
        title: "Made for memories",
        description: "Dessert is often at the center of birthdays, holidays, milestones, and moments families remember.",
    },
];

export default function AboutPage() {
    return (
        <>
            <section className="overflow-hidden bg-gradient-to-br from-pink-50 via-white to-amber-50">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">About Molly</p>

                        <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
                            Made with care for life&apos;s sweetest moments
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600 sm:text-lg">
                            Molly&apos;s Specialty Sweets is built around a simple idea: the desserts people share should feel just as
                            special as the moments they are celebrating.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/menu"
                                className="rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-600"
                            >
                                Browse the Menu
                            </Link>

                            <Link
                                href="/contact"
                                className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 transition-colors hover:border-pink-300 hover:text-pink-700"
                            >
                                Contact Molly
                            </Link>
                        </div>
                    </div>

                    <div className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center rounded-[3rem] bg-pink-100 p-10 shadow-sm">
                        <div className="absolute left-6 top-6 size-20 rounded-full bg-white/60" aria-hidden="true" />

                        <div className="absolute bottom-8 right-8 size-28 rounded-full bg-amber-100" aria-hidden="true" />

                        <div className="relative flex size-64 items-center justify-center rounded-full bg-white shadow-xl sm:size-80">
                            <Image
                                src="/mollys-logo-black.png"
                                alt="Molly's Specialty Sweets"
                                width={260}
                                height={260}
                                sizes="(min-width: 640px) 260px, 200px"
                                priority
                                className="size-52 object-contain sm:size-64"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">The heart behind it</p>

                        <h2 className="mt-4 font-serif text-3xl font-semibold text-neutral-950 sm:text-5xl">More than something sweet</h2>
                    </div>

                    <div className="space-y-6 text-base leading-8 text-neutral-600 sm:text-lg">
                        <p>
                            Molly creates cakes, cupcakes, cookies, and specialty desserts for the moments that bring people together. Each
                            dessert begins with the occasion and the people at the center of it.
                        </p>

                        <p>
                            Whether it is a familiar flavor or a custom cake designed around a celebration, the goal is to create something
                            that looks beautiful, tastes memorable, and feels personal.
                        </p>

                        <p>As the business grows, the same care will remain at the center of every menu item and approved custom order.</p>
                    </div>
                </div>
            </section>

            <section className="bg-[#171217]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">What matters most</p>

                        <h2 className="mt-4 font-serif text-3xl font-semibold text-white sm:text-5xl">
                            The ingredients behind the experience
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {values.map((value) => (
                            <article key={value.number} className="rounded-3xl border border-pink-200/20 bg-[#241b24] p-7 shadow-sm">
                                <span className="text-sm font-semibold text-pink-300">{value.number}</span>

                                <h3 className="mt-8 font-serif text-2xl font-semibold text-white">{value.title}</h3>

                                <p className="mt-4 text-sm leading-7 text-neutral-200">{value.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-pink-50">
                <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24">
                    <span className="inline-flex rounded-full bg-pink-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-pink-900">
                        A temporary pause
                    </span>

                    <h2 className="mt-6 font-serif text-3xl font-semibold text-neutral-950 sm:text-5xl">
                        Molly is currently taking a maternity break
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl leading-8 text-neutral-600">
                        Orders and custom requests are temporarily closed while Molly focuses on her growing family. You can still explore
                        the future menu and send general questions through the contact page.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/menu"
                            className="rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-600"
                        >
                            Explore the Menu
                        </Link>

                        <Link
                            href="/contact"
                            className="rounded-full border border-pink-300 bg-white px-6 py-3 font-semibold text-pink-800 transition-colors hover:border-pink-400"
                        >
                            Send a Question
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
