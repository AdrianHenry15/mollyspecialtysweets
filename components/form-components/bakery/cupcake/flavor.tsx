import React from "react";
import { FieldErrors } from "react-hook-form";

import { CupcakeFlavors } from "@/lib/constants";
import FormItem from "../../form-item";

interface ICupcakeFlavorProps {
    control: any;
    errors: FieldErrors;
}

const CupcakeFlavor = (props: ICupcakeFlavorProps) => {
    return (
        <FormItem
            required
            autocomplete
            errors={props.errors}
            title="Cupcake Flavor"
            name="cupcakeFlavor"
            options={CupcakeFlavors as []}
            label="Cupcake Flavor"
            control={props.control}
        />
    );
};

export default CupcakeFlavor;
