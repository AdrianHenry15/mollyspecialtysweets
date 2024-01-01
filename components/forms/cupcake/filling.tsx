import React from "react";

import AutocompleteFormInput from "../form-item";
import { CupcakeFillings } from "@/lib/constants";
import { FieldErrors } from "react-hook-form";

interface ICupcakeFillingProps {
    control: any;
}

const CupcakeFilling = (props: ICupcakeFillingProps) => {
    return (
        <AutocompleteFormInput
            autocomplete
            title="Cupcake Filling"
            name="CupcakeFilling"
            options={CupcakeFillings as []}
            label="Cupcake Filling"
            control={props.control}
        />
    );
};

export default CupcakeFilling;
