import React from "react";

import { FieldErrors } from "react-hook-form";
import { Amounts } from "@/lib/constants";
import AutocompleteFormInput from "../form-item";

interface ICupcakeAmountProps {
    control: any;
    errors: FieldErrors;
}

const CupcakeAmount = (props: ICupcakeAmountProps) => {
    return (
        // <FormContainer inputLabel="Cupcake Amount" title="Cupcake Amount">
        //     {/* SHAPE */}
        //     <Controller
        //         name="cupcakeAmount"
        //         control={props.control}
        //         render={({ field }) => (
        //             <select className={props.className} {...field}>
        //                 {Amounts.map((amount, index) => {
        //                     return (
        //                         <option key={index} value={amount}>
        //                             {amount}
        //                         </option>
        //                     );
        //                 })}
        //             </select>
        //         )}
        //     />
        // </FormContainer>
        <AutocompleteFormInput
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
