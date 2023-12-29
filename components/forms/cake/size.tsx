import React from "react";
import { Controller } from "react-hook-form";

type CakeSize = {
    value: string;
    label: string;
};

const CakeSizes: CakeSize[] = [
    {
        value: "6 inch",
        label: "6 inch (8 servings)",
    },
    {
        value: "8 inch",
        label: "8 inch (15 servings)",
    },
    {
        value: "9 inch",
        label: "9 inch (20 servings)",
    },
    {
        value: "10 inch",
        label: "10 inch (25 servings)",
    },
    {
        value: "12 inch",
        label: "12 inch (40 servings)",
    },
];

const SheetCakeSizes: CakeSize[] = [
    {
        value: "9x13 inch",
        label: "9x13 inch (24 servings)",
    },
    {
        value: "11x15 inch",
        label: "11x15 inch (35 servings)",
    },
    {
        value: "12x18 inch",
        label: "12x18 inch (24 servings)",
    },
];

interface ICakeSizeProps {
    control: any;
    cakeShape: string;
}

const CakeSize = (props: ICakeSizeProps) => {
    return (
        <div className="flex flex-col ">
            <h5 className="flex font-semibold text-xl w-full justify-start">Choose Cake Size:</h5>
            <div className="flex justify-evenly py-10">
                {/* SIZE */}
                <Controller
                    name="cakeSize"
                    control={props.control}
                    render={({ field }) => (
                        <select className="w-full" {...field}>
                            {props.cakeShape === "rectangle"
                                ? SheetCakeSizes.map((item: CakeSize) => (
                                      <option key={item.value} value={item.value}>
                                          {item.label}
                                      </option>
                                  ))
                                : CakeSizes.map((item: CakeSize) => (
                                      <option key={item.value} value={item.value}>
                                          {item.label}
                                      </option>
                                  ))}
                        </select>
                    )}
                />
            </div>
        </div>
    );
};

export default CakeSize;
