import React from "react";
import AutocompleteFormInput from "../form-item";
import { CupcakeFlavors } from "@/lib/constants";
import { FieldErrors } from "react-hook-form";

interface ICupcakeFlavorProps {
    control: any;
    errors: FieldErrors;
}

const CupcakeFlavor = (props: ICupcakeFlavorProps) => {
    return (
        <AutocompleteFormInput
            required
            autocomplete
            errors={props.errors}
            title="Cupcake Flavor"
            name="CupcakeFlavor"
            options={CupcakeFlavors as []}
            label="Cupcake Flavor"
            control={props.control}
        />
    );
};

export default CupcakeFlavor;
