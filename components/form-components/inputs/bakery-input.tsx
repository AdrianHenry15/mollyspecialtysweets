import React from "react";

import { FieldErrors } from "react-hook-form";
import FruitInput from "./fruit-input";
import CustomInput from "../inputs/custom-input";
import { CakeSizeAndServings } from "@/lib/types";

interface IBakeryInputProps {
    name: string;
    label: string;
    control?: any;
    options?: [];
    fruitValue?: string;
    fruitLabel?: string;
    hasFruit?: boolean;
    errors?: FieldErrors;
    errorMessage?: string;
    handleChange?: () => void;
}

const BakeryInput = (props: IBakeryInputProps) => {
    const { control, errors, name, fruitValue, label, fruitLabel, options, hasFruit, errorMessage } = props;

    return (
        <div>
            {/* <FormItem */}
            <CustomInput
                hasFruit={hasFruit}
                freeSolo
                error={errors!}
                // errorMessage={errorMessage}
                control={control}
                // title={label}
                name={name}
                options={options || []}
                label={label}
            />
            {hasFruit ? <FruitInput name={fruitValue!} label={fruitLabel!} control={control} /> : null}
        </div>
    );
};

export default BakeryInput;
