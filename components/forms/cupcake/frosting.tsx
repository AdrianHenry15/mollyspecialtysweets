import React from "react";

import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CupcakeFrostings } from "@/lib/constants";
import { FieldErrors } from "react-hook-form";

interface ICupcakeFrostingProps {
    control: any;
    errors: FieldErrors;
}

const CupcakeFrosting = (props: ICupcakeFrostingProps) => {
    return (
        <AutocompleteFormInput
            required
            autocomplete
            errors={props.errors}
            title="Cupcake Frosting"
            name="CupcakeFrosting"
            options={CupcakeFrostings as []}
            label="Cupcake Frosting"
            control={props.control}
        />
    );
};

export default CupcakeFrosting;
