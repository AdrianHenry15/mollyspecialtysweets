import React from "react";

import FormContainer from "../form-container";
import { Controller, FieldErrors } from "react-hook-form";
import { Amounts } from "@/lib/constants";
import AutocompleteFormInput from "../form-item";

interface ICookieAmountProps {
    control: any;
    errors: FieldErrors;
}

const CookieAmount = (props: ICookieAmountProps) => {
    return (
        // <FormContainer inputLabel="Cookie Amount" title="Cookie Amount">
        //     {/* SHAPE */}
        //     <Controller
        //         name="cookieAmount"
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
            errors={props.errors}
            autocomplete
            title="Cookie Amount"
            name="cookieAmount"
            options={Amounts as []}
            label="Cookie Amount"
            control={props.control}
        />
    );
};

export default CookieAmount;
