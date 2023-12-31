import React from "react";

import { CakeFlavors } from "@/lib/constants";
import FormItem from "../form-item";
import { FieldErrors } from "react-hook-form";

interface ICakeFlavorProps {
    control: any;
    errors?: FieldErrors;
}

const CakeFlavor = (props: ICakeFlavorProps) => {
    return (
        // <AutocompleteFormInput
        //     title="Cake Flavor"
        //     name="cakeFlavor"
        //     options={CakeFlavors as []}
        //     label="Cake Flavor"
        //     required
        //     control={props.control}
        // />
        <FormItem
            freeSolo
            autocomplete
            required
            errors={props.errors}
            control={props.control}
            title={"Cake Flavor"}
            name={"cakeFlavor"}
            options={CakeFlavors as []}
            label={"Cake Flavor"}
        />
    );
};

export default CakeFlavor;
