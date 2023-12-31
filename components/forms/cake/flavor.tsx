import React from "react";

import { CakeFlavors } from "@/lib/constants";
import AutocompleteFormInput from "../inputs/autocomplete-form-input";

interface ICakeFlavorProps {
    control: any;
}

const CakeFlavor = (props: ICakeFlavorProps) => {
    return (
        <AutocompleteFormInput
            title="Cake Flavor"
            name="cakeFlavor"
            options={CakeFlavors as []}
            label="Cake Flavor"
            required
            control={props.control}
        />
    );
};

export default CakeFlavor;
