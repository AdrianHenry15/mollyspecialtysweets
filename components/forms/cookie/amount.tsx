import React from "react";

import FormContainer from "../form-container";
import { Controller } from "react-hook-form";
import { Amounts } from "@/lib/constants";

interface ICookieAmountProps {
    control: any;
    className?: string;
}

const CookieAmount = (props: ICookieAmountProps) => {
    return (
        <FormContainer inputLabel="Cookie Amount" title="Cookie Amount">
            {/* SHAPE */}
            <Controller
                name="cookieAmount"
                control={props.control}
                render={({ field }) => (
                    <select className={props.className} {...field}>
                        {Amounts.map((amount, index) => {
                            return (
                                <option key={index} value={amount}>
                                    {amount}
                                </option>
                            );
                        })}
                    </select>
                )}
            />
        </FormContainer>
    );
};

export default CookieAmount;
