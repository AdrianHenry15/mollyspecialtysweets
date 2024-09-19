import React from "react";
import { FieldErrors } from "react-hook-form";

import { CupcakeFrostings } from "@/lib/constants";
import FormItem from "../../form-item";

interface ICupcakeFrostingProps {
    control: any;
    errors: FieldErrors;
}

const CupcakeFrosting = (props: ICupcakeFrostingProps) => {
    return (
        <FormItem
            required
            autocomplete
            errors={props.errors}
            title="Cupcake Frosting"
            name="cupcakeFrosting"
            options={CupcakeFrostings as []}
            label="Cupcake Frosting"
            control={props.control}
        />
    );
};

export default CupcakeFrosting;
