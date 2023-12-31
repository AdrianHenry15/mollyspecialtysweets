import React from "react";

import { CakeFrostings } from "@/lib/constants";
import FormItem from "../form-item";
import { FieldErrors } from "react-hook-form";

interface ICakeFrostingProps {
    control: any;
    errors?: FieldErrors;
}

const CakeFrosting = (props: ICakeFrostingProps) => {
    return (
        // <AutocompleteFormInput
        //     title="Cake Frosting"
        //     name="cakeFrosting"
        //     required
        //     options={CakeFrostings as []}
        //     label="Cake Frosting"
        //     control={props.control}
        // />
        <FormItem
            hasFruit
            freeSolo
            autocomplete
            errors={props.errors}
            required
            control={props.control}
            title={"Cake Frosting"}
            name={"cakeFrosting"}
            options={CakeFrostings as []}
            label={"Cake Frosting"}
        />
    );
};

export default CakeFrosting;
