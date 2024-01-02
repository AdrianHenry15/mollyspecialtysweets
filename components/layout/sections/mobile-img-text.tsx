"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

import Button from "@/components/buttons/button";

interface IMobileImgTextRowProps {
    textLeft?: boolean;
    src: any;
    link: string;
    title: string;
    description: string;
}

const MobileImgText = (props: IMobileImgTextRowProps) => {
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
        <section ref={containerRef} className="fade-in flex flex-col items-center px-4 pt-10 pb-20 md:hidden">
            <div className="">
                {/* IMAGE */}
                <div>
                    <Image loading="eager" className="max-h-[275px] min-h-[275px]" src={props.src} alt={props.title} />
                </div>
                {/* TEXT */}
                <div className={`${props.textLeft ? "text-left items-start" : "text-right items-end"} flex flex-1 flex-col`}>
                    <h5 className="font-semibold py-6 text-2xl">{props.title}</h5>
                    <p className="text-light text-sm text-zinc-950 px-4">{props.description}</p>
                    <Link href={"/estimate"}>
                        <Button
                            className={`${
                                props.textLeft ? "ml-4" : "mr-4"
                            } animate-pulse mt-4 items-center flex justify-center self-center`}
                            name={"Get Your Free Estimate Now"}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MobileImgText;
