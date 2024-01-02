import React from "react";
import { FieldErrors } from "react-hook-form";

import { Amounts } from "@/lib/constants";
import FormItem from "../form-item";

interface ICupcakeAmountProps {
    control: any;
    errors: FieldErrors;
}

const CupcakeAmount = (props: ICupcakeAmountProps) => {
    return (
        <FormItem
            required
            autocomplete
            options={Amounts as []}
            errors={props.errors}
            control={props.control}
            title={"Cupcake Amount"}
            name={"cupcakeAmount"}
            label={"Cupcake Amount"}
        />
    );
};

export default CupcakeAmount;
