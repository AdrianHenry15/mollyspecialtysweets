import React from "react";
import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CupcakeToppings } from "@/lib/constants";

interface ICupcakeToppingProps {
    control: any;
    className?: string;
}

const CupcakeTopping = (props: ICupcakeToppingProps) => {
    return (
        <AutocompleteFormInput
            title="Cupcake Topping"
            name="CupcakeTopping"
            options={CupcakeToppings}
            label="Cupcake Topping"
            control={props.control}
        />
    );
};

export default CupcakeTopping;
