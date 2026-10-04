import Image from "next/image";
import Link from "next/link";

const footerNavigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-pink-100 bg-pink-50">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3">
                <div>
                    <Link href="/" className="inline-flex items-center" aria-label="Molly's Specialty Sweets home">
                        <Image src="/mollys-logo-black.png" alt="" width={80} height={80} sizes="80px" className="size-20 object-contain" />
                    </Link>

                    <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600">
                        Handcrafted cakes, cupcakes, cookies, and specialty desserts made for life&apos;s sweetest moments.
                    </p>

                    <p className="mt-3 text-sm font-medium text-pink-700">Currently taking a maternity break.</p>
                </div>

                <div>
                    <h2 className="font-serif text-lg font-semibold text-neutral-950">Explore</h2>

                    <ul className="mt-4 space-y-3">
                        {footerNavigation.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="text-sm text-neutral-600 transition-colors hover:text-pink-600">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="font-serif text-lg font-semibold text-neutral-950">Get in touch</h2>

                    <p className="mt-4 text-sm leading-6 text-neutral-600">
                        Have a general question? Send us a message and we&apos;ll respond as soon as possible.
                    </p>

                    <div className="mt-5 flex flex-col items-start gap-3">
                        <a
                            href="mailto:mograv123@gmail.com"
                            className="text-sm font-medium text-pink-700 transition-colors hover:text-pink-800"
                        >
                            mograv123@gmail.com
                        </a>

                        <a
                            href="https://www.instagram.com/mollyspecialtysweets/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-pink-700 transition-colors hover:text-pink-800"
                        >
                            Follow us on Instagram
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-pink-100">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-center text-xs text-neutral-500 sm:px-8 md:flex-row md:items-center md:justify-between md:text-left">
                    <p>© {currentYear} Molly&apos;s Specialty Sweets. All rights reserved.</p>

                    <p>
                        Website by{" "}
                        <a
                            href="https://thirdgenerationstudios.com"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-neutral-700 hover:text-pink-600"
                        >
                            Third Generation Studios
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
