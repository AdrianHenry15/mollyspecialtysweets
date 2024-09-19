import React from "react";
import { FieldErrors } from "react-hook-form";

import { CupcakeFillings } from "@/lib/constants";
import FormItem from "../../form-item";

interface ICupcakeFillingProps {
    control: any;
}

const CupcakeFilling = (props: ICupcakeFillingProps) => {
    return (
        <FormItem
            autocomplete
            title="Cupcake Filling"
            name="cupcakeFilling"
            options={CupcakeFillings as []}
            label="Cupcake Filling"
            control={props.control}
        />
    );
};

export default CupcakeFilling;
