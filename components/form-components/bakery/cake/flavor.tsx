import React from "react";

import { CakeFlavors } from "@/lib/constants";
import FormItem from "../../form-item";
import { FieldErrors } from "react-hook-form";

interface ICakeFlavorProps {
    control: any;
    errors?: FieldErrors;
}

const CakeFlavor = (props: ICakeFlavorProps) => {
    return (
        <FormItem
            freeSolo
            hasFruit
            autocomplete
            required
            errors={props.errors}
            control={props.control}
            title={"Choose Cake Flavor"}
            name={"cakeFlavor"}
            options={CakeFlavors as []}
            label={"Cake Flavor"}
        />
    );
};

export default CakeFlavor;
