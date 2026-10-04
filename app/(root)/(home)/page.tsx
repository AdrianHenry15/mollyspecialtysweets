import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import CakeSplash from "../../../public/cake-splash.jpg";
import Cookie from "../../../public/cookie-icon.png";
import Cake from "../../../public/cake-icon.png";
import Cupcake from "../../../public/cupcake-icon.png";

import Splash from "@/components/splash";

export default function HomePage() {
    return (
        <>
            <Splash
                img={CakeSplash}
                title="Molly's Specialty Sweets"
                description="Thoughtfully handcrafted cakes, cupcakes, cookies, and specialty desserts made for life's sweetest moments."
                link1="/menu"
                link_title_1="Browse the Menu"
                link2="/contact"
                link_title_2="Ask a Question"
            />

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">Explore the menu</p>

                        <h2 className="mt-4 font-serif text-3xl font-semibold text-neutral-950 sm:text-5xl">Find your favorite sweet</h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-neutral-600">
                            Browse the flavors and desserts Molly plans to offer when ordering reopens.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <MenuPreviewCard
                            image={Cake}
                            name="Cakes"
                            description="Classic and specialty cakes with a variety of flavors, fillings, and finishes."
                        />

                        <MenuPreviewCard
                            image={Cupcake}
                            name="Cupcakes"
                            description="Individual treats made for birthdays, celebrations, and dessert tables."
                        />

                        <MenuPreviewCard
                            image={Cookie}
                            name="Cookies"
                            description="Handcrafted cookies made for sharing, gifting, or enjoying yourself."
                        />
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/menu"
                            className="inline-flex rounded-full bg-pink-500 px-7 py-3 font-semibold text-white transition-colors hover:bg-pink-600"
                        >
                            View the Full Menu
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-pink-50">
                <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">Behind the sweets</p>

                        <h2 className="mt-4 font-serif text-3xl font-semibold text-neutral-950 sm:text-5xl">Desserts made with care</h2>

                        <p className="mt-6 max-w-xl leading-8 text-neutral-600">
                            Molly creates cakes, cupcakes, cookies, and specialty desserts for the moments that bring people together. Every
                            dessert is designed to feel personal to the celebration.
                        </p>

                        <Link
                            href="/about"
                            className="mt-8 inline-flex rounded-full bg-neutral-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-600"
                        >
                            Meet Molly
                        </Link>
                    </div>

                    <div className="rounded-[2rem] border border-pink-200 bg-white p-8 shadow-sm sm:p-10">
                        <span className="inline-flex rounded-full bg-pink-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-pink-800">
                            Orders temporarily closed
                        </span>

                        <h2 className="mt-6 font-serif text-2xl font-semibold text-neutral-950 sm:text-3xl">
                            Molly is currently taking a maternity break
                        </h2>

                        <p className="mt-4 leading-7 text-neutral-600">
                            You can browse the future menu and send general questions, but new orders, estimates, and custom requests are
                            currently unavailable.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-7 inline-flex font-semibold text-pink-700 transition-colors hover:text-pink-800"
                        >
                            Send a general question
                            <span className="ml-2" aria-hidden="true">
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

function MenuPreviewCard({ image, name, description }: { image: StaticImageData; name: string; description: string }) {
    return (
        <article className="flex flex-col items-center rounded-[2rem] border border-pink-100 bg-pink-50/50 p-8 text-center transition duration-200 hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100/60">
            <div className="flex size-28 items-center justify-center rounded-full bg-white shadow-sm">
                <Image src={image} alt="" sizes="80px" className="size-20 object-contain" />
            </div>

            <h3 className="mt-6 font-serif text-2xl font-semibold text-neutral-950">{name}</h3>

            <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
        </article>
    );
}
