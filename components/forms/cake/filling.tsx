import React from "react";

import AutocompleteFormInput from "../form-item";
import { CakeFillings } from "@/lib/constants";
import { FieldErrors } from "react-hook-form";
import FormItem from "../form-item";

interface ICakeFillingProps {
    control: any;
    errors?: FieldErrors;
}

const CakeFilling = (props: ICakeFillingProps) => {
    return (
        <FormItem
            hasFruit
            freeSolo
            autocomplete
            control={props.control}
            title={"Choose Cake Filling"}
            name={"cakeFilling"}
            options={CakeFillings as []}
            label={"Cake Filling"}
        />
    );
};

export default CakeFilling;
