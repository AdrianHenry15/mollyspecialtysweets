import React from "react";

import { CakeFlavors } from "@/lib/constants";
import AutocompleteFormInput from "../autocomplete-form-input";

interface ICakeFlavorProps {
    control: any;
}

const CakeFlavor = (props: ICakeFlavorProps) => {
    return <AutocompleteFormInput title="Cake Flavor" name="cakeFlavor" options={CakeFlavors} label="Flavor" control={props.control} />;
};

export default CakeFlavor;
