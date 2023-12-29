import React from "react";

import AutocompleteFormInput from "../autocomplete-form-input";
import { CakeFillings } from "@/lib/constants";

interface ICakeFillingProps {
    control: any;
}

const CakeFilling = (props: ICakeFillingProps) => {
    return <AutocompleteFormInput title="Cake Filling" name="cakeFilling" options={CakeFillings} label="Filling" control={props.control} />;
};

export default CakeFilling;
