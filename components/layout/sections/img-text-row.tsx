"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

import Button from "@/components/buttons/button";

interface IImgTextRowProps {
    imgLeft?: boolean;
    imgTopOnMobile?: boolean;
    textLeft?: boolean;
    src: any;
    link: string;
    title: string;
    description: string;
    btnName: string;
}

const ImgTextRow = (props: IImgTextRowProps) => {
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
        <section ref={containerRef} className="fade-in hidden items-center px-4 py-10 md:flex md:w-full md:justify-center">
            <div className="self-center md:h-[350px] md:w-[1200px] md:flex">
                {/* IMAGE */}
                {props.imgLeft || props.imgTopOnMobile ? (
                    <div className="md:flex md:flex-1">
                        <Image className="rounded-sm" loading="eager" src={props.src} alt={props.title} />
                    </div>
                ) : null}
                {/* TEXT */}
                <div
                    className={`${
                        props.textLeft ? "md:text-left md:items-start" : "md:text-right md:items-end"
                    } md:flex md:flex-1 md:flex-col`}
                >
                    <h5 className="font-semibold py-6 text-2xl">{props.title}</h5>
                    <p className="text-light text-sm text-zinc-950 px-4 md:max-w-md lg:max-w-lg">{props.description}</p>
                    <Link href={props.link}>
                        <Button className={`${props.textLeft ? "ml-4" : "mr-4"} animate-pulse mt-4`} name={props.btnName} />
                    </Link>
                </div>
                {/* IMAGE */}
                {!props.imgLeft ? (
                    <div className="md:flex md:flex-1">
                        <Image className="rounded-sm" loading="eager" src={props.src} alt={props.title} />
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default ImgTextRow;
