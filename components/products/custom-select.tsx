import { CakeSizeAndServings } from "@/lib/types";
import React, { useState } from "react";

interface ICustomSelectProps {
    title: string;
    options: string[] | CakeSizeAndServings[];
    handleChange?: (item: string) => void;
    error?: string; // Optional error message
}

const CustomSelect = (props: ICustomSelectProps) => {
    const { title, options, handleChange, error } = props;
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelectClick = (item: string) => {
        handleChange && handleChange(item);

        setSelected(item);
        console.log(item);
    };
    return (
        <div className="flex flex-col mt-4">
            <h1 className="text-white">{title.toUpperCase()}</h1>
            <div className="flex flex-wrap">
                {options?.map((item, index) => {
                    // Handle options based on type
                    const displayText = typeof item === "string" ? item : `${item.size} - (${item.serves.toLowerCase})`;
                    return (
                        <p
                            className={`${selected === item ? "border-blue-500 border-2" : "border-zinc-500"} hover:border-blue-500 border-2 duration-300 ease-in-out transition-colors bg-zinc-700 flex items-center justify-center text-white rounded-full m-2 px-4 cursor-pointer`}
                            key={index}
                            onClick={() => handleSelectClick(displayText)}
                        >
                            {displayText}
                        </p>
                    );
                })}
            </div>
            {/* Conditional error message rendering */}
            {error && <p className="text-red-500 italic mt-2">{error}</p>}
            <aside className="text-zinc-400 italic my-4">Prices varied upon selection.</aside>
        </div>
    );
};

export default CustomSelect;
