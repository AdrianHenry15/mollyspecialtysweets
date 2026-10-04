import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

import Logo from "../public/mollys-logo-pink.png";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

interface SplashProps {
    img: string | StaticImageData;
    title: string;
    description?: string;
    link1: string;
    link2: string;
    link_title_1: string;
    link_title_2: string;
}

export default function Splash({ img, title, description, link1, link2, link_title_1, link_title_2 }: SplashProps) {
    return (
        <section className="relative isolate min-h-[650px] overflow-hidden bg-neutral-950 text-white sm:min-h-[720px]">
            <Image src={img} alt="" fill priority sizes="100vw" className="object-cover object-center" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" aria-hidden="true" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" aria-hidden="true" />

            <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-20 sm:min-h-[720px] sm:px-8">
                <div className="max-w-3xl">
                    <Image src={Logo} alt="" sizes="112px" className="h-auto w-24 sm:w-28" />

                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Handcrafted for every celebration</p>

                    <h1
                        className={`${playfair.className} mt-4 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl`}
                    >
                        {title}
                    </h1>

                    {description && <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-200 sm:text-lg">{description}</p>}

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={link1}
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-pink-500 px-7 font-semibold text-white transition-colors hover:bg-pink-600"
                        >
                            {link_title_1}
                        </Link>

                        <Link
                            href={link2}
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/60 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-neutral-950"
                        >
                            {link_title_2}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
