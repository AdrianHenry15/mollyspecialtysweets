import React from "react";

import AutocompleteFormInput from "../autocomplete-form-input";
import { CupcakeFillings } from "@/lib/constants";

interface ICupcakeFillingProps {
    control: any;
    className?: string;
}

const CupcakeFilling = (props: ICupcakeFillingProps) => {
    return (
        <AutocompleteFormInput
            title="Cupcake Filling"
            name="CupcakeFilling"
            options={CupcakeFillings}
            label="Cupcake Filling"
            control={props.control}
        />
    );
};

export default CupcakeFilling;
