import React from "react";
import AutocompleteFormInput from "../form-item";
import { CupcakeToppings } from "@/lib/constants";

interface ICupcakeToppingProps {
    control: any;
    className?: string;
}

const CupcakeTopping = (props: ICupcakeToppingProps) => {
    return (
        <AutocompleteFormInput
            autocomplete
            title="Cupcake Topping"
            name="CupcakeTopping"
            options={CupcakeToppings as []}
            label="Cupcake Topping"
            control={props.control}
        />
    );
};

export default CupcakeTopping;
