import { CakeSizeAndServings } from "@/lib/types";
import React, { forwardRef, useState } from "react";

interface ICustomSelectProps {
    title: string;
    options: string[] | CakeSizeAndServings[];
    value: string;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    control?: any;
    handleChange?: (item: string) => void;
    handleFruitInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasFruit?: boolean;
    fruitValue?: string;
    error?: string; // Optional error message
}

const CustomSelect = forwardRef<HTMLDivElement, ICustomSelectProps>((props, ref) => {
    // Props
    const { title, value, fruitValue, options, handleFruitInputChange, handleInputChange, handleChange, error, control } = props;

    // Store
    const [selected, setSelected] = useState<string | null>(null);
    const [addFruit, setAddFruit] = useState(false);

    const handleSelectClick = (item: string) => {
        handleChange && handleChange(item);

        setSelected(item);
        console.log(item);
    };

    const renderFruitBtn = () => {
        if (addFruit) {
            return (
                <div className="flex flex-col w-full px-4 pb-4 lg:w-1/2">
                    <p className="text-gray-400 mb-1">Add Fruit:</p>
                    <input value={fruitValue} onChange={handleFruitInputChange} />
                    <button
                        className={`${fruitValue === "" ? "bg-red-500 hover:bg-red-700" : "hover:bg-green-700 bg-green-500"}  duration-300 ease-in-out transition-colors flex mt-4 w-min px-6 py-1 items-center border border-black whitespace-nowrap text-white rounded-md`}
                        onClick={() => setAddFruit(false)}
                    >
                        {fruitValue === "" ? "No Fruit" : "Complete"}
                    </button>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col mt-4 ml-4">
                    <p className="italic">{fruitValue}</p>
                    <button
                        className="hover:bg-blue-700 duration-300 ease-in-out transition-colors flex w-min px-6 py-1 items-center border border-black bg-blue-500 whitespace-nowrap text-white rounded-md"
                        onClick={() => setAddFruit(true)}
                    >
                        {fruitValue === "" ? "Add Fruit" : "Edit Fruit"}
                    </button>
                </div>
            );
        }
    };

    return (
        <div ref={ref} className="flex flex-col mt-4">
            <h1 className="text-white">{title.toUpperCase()}</h1>
            <div className="flex flex-wrap">
                {options?.map((item, index) => {
                    // Handle options based on type
                    const displayText = typeof item === "string" ? item : `${item.size} (${item.serves.toLowerCase()})`;
                    return (
                        <p
                            className={`${selected === displayText ? "border-blue-500 border-2" : "border-zinc-500"} hover:border-blue-500 border-2 duration-300 ease-in-out transition-colors bg-zinc-700 flex items-center justify-center text-white rounded-full m-2 px-4 cursor-pointer`}
                            key={index}
                            onClick={() => handleSelectClick(displayText)}
                        >
                            {displayText}
                        </p>
                    );
                })}
            </div>
            {/* Conditional error message rendering */}
            {selected?.toLowerCase() === "other" && (
                <div className="flex flex-col w-full px-4 pb-4 lg:w-1/2">
                    <p className="text-gray-400 mb-1">
                        Other <span className="italic">(Type Here)</span>
                    </p>
                    <input value={value.toLowerCase() === "other" ? "" : value} onChange={handleInputChange} />
                </div>
            )}
            {error && <p className="text-red-500 italic mt-2">{error}</p>}
            {props.hasFruit && renderFruitBtn()}

            <aside className="text-zinc-400 italic my-4">Prices varied upon selection.</aside>
        </div>
    );
});

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
