import React from "react";

import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CupcakeFrostings } from "@/lib/constants";

interface ICupcakeFrostingProps {
    control: any;
    className?: string;
}

const CupcakeFrosting = (props: ICupcakeFrostingProps) => {
    return (
        <AutocompleteFormInput
            title="Cupcake Frosting"
            name="CupcakeFrosting"
            options={CupcakeFrostings}
            label="Cupcake Frosting"
            control={props.control}
        />
    );
};

export default CupcakeFrosting;
