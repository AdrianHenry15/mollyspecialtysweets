"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { IoArrowRedoOutline } from "react-icons/io5";

import Button from "@/components/buttons/button";

interface IIconItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    link?: string;
    addBtn?: boolean;
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
        <div ref={containerRef} className={`fade-in flex flex-col items-center flex-1 px-6 py-10 md:py-0 md:px-2 lg:px-12 xl:px-16`}>
            <a className="flex flex-col items-center" href={props.link}>
                {props.icon}
                <h5 className="py-6 text-xl">{props.title}</h5>
            </a>
            <p className="leading-7 text-sm italic text-zinc-700 flex flex-1">{props.description}</p>
            {props.addBtn ? (
                <Link className="mt-4" href={props.link!}>
                    <Button altColor name={props.title} icon={<IoArrowRedoOutline size={20} className={`ml-2`} />} />
                </Link>
            ) : null}
        </div>
    );
};

export default IconItem;
