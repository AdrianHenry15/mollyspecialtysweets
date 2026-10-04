import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Menu",
    description: "Explore the cakes, cupcakes, cookies, and specialty desserts offered by Molly's Specialty Sweets.",
};

type MenuItem = { name: string; description: string; popular?: boolean };

type MenuSection = { id: string; name: string; description: string; icon: string; items: MenuItem[] };

const menuSections: MenuSection[] = [
    {
        id: "cakes",
        name: "Cakes",
        description: "Classic and specialty cakes available in a variety of flavors, fillings, and finishes.",
        icon: "🎂",
        items: [
            { name: "Chocolate Cake", description: "Rich chocolate cake with smooth chocolate frosting.", popular: true },
            { name: "Red Velvet Cake", description: "Classic red velvet cake paired with cream cheese frosting.", popular: true },
            { name: "Strawberry Cake", description: "Soft strawberry cake with a sweet strawberry finish." },
            { name: "Lemon Cake", description: "Bright lemon cake with a light, refreshing citrus flavor." },
            { name: "Carrot Cake", description: "Spiced carrot cake finished with cream cheese frosting." },
            { name: "Coconut Cake", description: "Soft coconut cake with creamy frosting and coconut flakes." },
            { name: "Coffee Cake", description: "A warm, comforting cake with cinnamon and brown sugar flavor." },
        ],
    },
    {
        id: "cupcakes",
        name: "Cupcakes",
        description: "Individual treats perfect for birthdays, celebrations, parties, and dessert tables.",
        icon: "🧁",
        items: [
            { name: "Vanilla Cupcakes", description: "Classic vanilla cupcakes with smooth vanilla buttercream.", popular: true },
            { name: "Chocolate Cupcakes", description: "Rich chocolate cupcakes topped with chocolate frosting.", popular: true },
            { name: "Red Velvet Cupcakes", description: "Red velvet cupcakes finished with cream cheese frosting." },
            { name: "Strawberry Cupcakes", description: "Sweet strawberry cupcakes with strawberry frosting." },
            { name: "Carrot Cupcakes", description: "Spiced carrot cupcakes topped with cream cheese frosting." },
            { name: "Marble Cupcakes", description: "A swirl of vanilla and chocolate cake in every cupcake." },
        ],
    },
    {
        id: "cookies",
        name: "Cookies",
        description: "Freshly baked cookies made for sharing, gifting, or keeping all to yourself.",
        icon: "🍪",
        items: [
            { name: "Chocolate Chip Cookies", description: "Classic cookies filled with rich chocolate chips.", popular: true },
            { name: "Sugar Cookies", description: "Soft, buttery sugar cookies with a delicate sweetness." },
            { name: "Peanut Butter Cookies", description: "Rich peanut butter cookies with a soft, chewy center." },
            { name: "Oatmeal Raisin Cookies", description: "Comforting oatmeal cookies filled with sweet raisins." },
            { name: "Double Chocolate Cookies", description: "Chocolate cookies packed with even more chocolate.", popular: true },
            { name: "Snickerdoodle Cookies", description: "Soft cinnamon-sugar cookies with a warm, classic flavor." },
        ],
    },
];

export default function MenuPage() {
    return (
        <>
            <section className="bg-gradient-to-br from-pink-50 via-white to-amber-50">
                <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-24">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">Molly&apos;s Specialty Sweets</p>

                    <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
                        Something sweet for every celebration
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                        Browse our collection of cakes, cupcakes, and cookies. Orders are currently paused while Molly takes a maternity
                        break.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {menuSections.map((section) => (
                            <Link
                                key={section.id}
                                href={`#${section.id}`}
                                className="rounded-full border border-pink-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-pink-400 hover:text-pink-700"
                            >
                                {section.icon} {section.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-pink-100 bg-pink-50/60">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-5 py-6 text-center sm:px-8">
                    <span className="rounded-full bg-pink-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pink-900">
                        Orders temporarily closed
                    </span>

                    <p className="text-sm leading-6 text-neutral-700">
                        This menu is available to browse, but checkout and custom requests will return when Molly begins accepting orders
                        again.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl space-y-24 px-5 py-20 sm:px-8 sm:py-24">
                {menuSections.map((section) => (
                    <MenuSection key={section.id} section={section} />
                ))}
            </div>

            <section className="bg-neutral-950">
                <div className="mx-auto max-w-5xl px-5 py-20 text-center text-white sm:px-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">Custom cakes</p>

                    <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-5xl">Have something special in mind?</h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-neutral-300">
                        Custom cake requests will require Molly&apos;s approval when ordering reopens. Customers will be able to submit
                        their event details, design ideas, serving needs, and inspiration photos.
                    </p>

                    <Link
                        href="/contact"
                        className="mt-8 inline-flex rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-600"
                    >
                        Ask a General Question
                    </Link>
                </div>
            </section>
        </>
    );
}

function MenuSection({ section }: { section: MenuSection }) {
    return (
        <section id={section.id} className="scroll-mt-40" aria-labelledby={`${section.id}-heading`}>
            <div className="mb-10 max-w-2xl">
                <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-pink-100 text-2xl" aria-hidden="true">
                        {section.icon}
                    </span>

                    <h2 id={`${section.id}-heading`} className="font-serif text-3xl font-semibold text-neutral-950 sm:text-4xl">
                        {section.name}
                    </h2>
                </div>

                <p className="mt-4 leading-7 text-neutral-600">{section.description}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                    <article
                        key={item.name}
                        className="relative rounded-3xl border border-pink-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-pink-200 hover:shadow-md"
                    >
                        {item.popular && (
                            <span className="absolute right-5 top-5 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                                Popular
                            </span>
                        )}

                        <div className={item.popular ? "pr-20" : undefined}>
                            <h3 className="font-serif text-xl font-semibold text-neutral-950">{item.name}</h3>

                            <p className="mt-3 text-sm leading-6 text-neutral-600">{item.description}</p>
                        </div>

                        <p className="mt-6 text-xs font-medium uppercase tracking-wider text-neutral-400">
                            Available when ordering reopens
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
