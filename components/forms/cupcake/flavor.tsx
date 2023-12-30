import React from "react";
import AutocompleteFormInput from "../autocomplete-form-input";
import { CupcakeFlavors } from "@/lib/constants";

interface ICupcakeFlavorProps {
    control: any;
    className?: string;
}

const CupcakeFlavor = (props: ICupcakeFlavorProps) => {
    return (
        <AutocompleteFormInput
            title="Cupcake Flavor"
            name="CupcakeFlavor"
            options={CupcakeFlavors}
            label="Cupcake Flavor"
            control={props.control}
        />
    );
};

export default CupcakeFlavor;
