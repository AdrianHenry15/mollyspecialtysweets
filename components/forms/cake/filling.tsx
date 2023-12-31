import React from "react";

import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CakeFillings } from "@/lib/constants";

interface ICakeFillingProps {
    control: any;
}

const CakeFilling = (props: ICakeFillingProps) => {
    return (
        <AutocompleteFormInput
            title="Cake Filling"
            name="cakeFilling"
            required
            options={(CakeFillings as []) || []}
            label="Cake Filling"
            control={props.control}
        />
    );
};

export default CakeFilling;
