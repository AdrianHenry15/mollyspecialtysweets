import React from "react";

import FormItem from "@/components/forms/form-item";
import { FieldErrors } from "react-hook-form";
import FruitInput from "./fruit-input";

interface IBakeryInputProps {
    control: any;
    value: string;
    label: string;
    options: [];
    fruitValue?: string;
    fruitLabel?: string;
    hasFruit?: boolean;
    errors?: FieldErrors;
    errorMessage?: string;
}

const BakeryInput = (props: IBakeryInputProps) => {
    const { control, errors, value, fruitValue, label, fruitLabel, options, hasFruit, errorMessage } = props;

    return (
        <div>
            <FormItem
                hasFruit={hasFruit}
                freeSolo
                autocomplete
                errors={errors}
                errorMessage={errorMessage}
                control={control}
                title={label}
                name={value}
                options={options}
                label={label}
            />
            {hasFruit ? <FruitInput value={fruitValue!} label={fruitLabel!} control={control} /> : null}
        </div>
    );
};

export default BakeryInput;
