import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import FormContainer from "../../form-container";
import FormItem from "../../form-item";

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
    errors?: FieldErrors;
}

const CakeSize = (props: ICakeSizeProps) => {
    return (
        <FormItem
            freeSolo={false}
            autocomplete
            errors={props.errors}
            required
            control={props.control}
            title={"Choose Cake Size"}
            name={"cakeSize"}
            options={props.cakeShape === "rectangle" ? (SheetCakeSizes as []) : (CakeSizes as [])}
            label={"Cake Size"}
        />
    );
};

export default CakeSize;
