import React from "react";

import FormContainer from "../form-container";
import { Controller } from "react-hook-form";
import { Amounts } from "@/lib/constants";

interface ICupcakeAmountProps {
    control: any;
    className?: string;
}

const CupcakeAmount = (props: ICupcakeAmountProps) => {
    return (
        <FormContainer inputLabel="Cupcake Amount" title="Cupcake Amount">
            {/* SHAPE */}
            <Controller
                name="cupcakeAmount"
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

export default CupcakeAmount;
