"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface IIconItemProps {
    href: string;
    src: any;
    name: string;
    description: string;
    linkText: string;
}

const IconItem = (props: IIconItemProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            threshold: 0.1, // Adjust the threshold as needed (percentage of element visibility)
        };

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    containerRef.current?.classList.add("show");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect(); // Cleanup observer on component unmount
    }, []);
    return (
        <article ref={containerRef} className={`fade-in flex flex-col px-4 py-10 justify-center items-center flex-1 md:mx-10`}>
            <Image src={props.src} alt="cookie-icon" width={75} height={75} />
            <h5 className="text-white my-4 font-semibold text-2xl">{props.name}</h5>
            <p className="text-white font-light w-[300px]">{props.description}</p>
            <Link
                href={props.href}
                className="text-pink-500 flex items-center justify-center pt-10 transition-colors duration-500 hover:text-blue-400"
            >
                <aside className="mr-2">{props.linkText}</aside>
                <ChevronRightIcon width={15} />
            </Link>
        </article>
    );
};

export default IconItem;
