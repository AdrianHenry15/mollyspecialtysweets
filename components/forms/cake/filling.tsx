import React from "react";

import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CakeFillings } from "@/lib/constants";
import { FieldErrors } from "react-hook-form";
import FormItem from "../form-item";

interface ICakeFillingProps {
    control: any;
    errors?: FieldErrors;
}

const CakeFilling = (props: ICakeFillingProps) => {
    return (
        // <AutocompleteFormInput
        //     title="Cake Filling"
        //     name="cakeFilling"
        //     required
        //     options={(CakeFillings as []) || []}
        //     label="Cake Filling"
        //     control={props.control}
        // />
        <FormItem
            freeSolo
            autocomplete
            control={props.control}
            title={"Cake Filling"}
            name={"cakeFilling"}
            options={CakeFillings as []}
            label={"Cake Filling"}
        />
    );
};

export default CakeFilling;
