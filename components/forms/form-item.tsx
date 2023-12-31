import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

import FormContainer from "./form-container";

interface IAutocompleteFormInputProps {
    control: any;
    title: string;
    name: string;
    options: [];
    label: string;
    required?: boolean;
    autocomplete?: boolean;
    textInput?: boolean;
    textarea?: boolean;
    errors?: FieldErrors;
    freeSolo?: boolean;
}

const FormItem: React.FC<IAutocompleteFormInputProps> = ({
    control,
    title,
    name,
    options,
    label,
    required = false,
    autocomplete = false,
    errors,
    freeSolo = false,
}: IAutocompleteFormInputProps) => {
    return (
        <FormContainer className="flex-col pb-10" title={title}>
            <Controller
                rules={{ required: required }}
                name={name}
                control={control}
                render={({ field }) => (
                    <div>
                        {autocomplete && (
                            <div className="flex flex-col w-full">
                                <Autocomplete
                                    className="w-full"
                                    disablePortal
                                    freeSolo={freeSolo}
                                    options={options || []}
                                    renderInput={(params) => <TextField {...field} {...params} label={label} />}
                                />
                            </div>
                        )}
                    </div>
                )}
            />
            <p className="italic text-xs text-zinc-500 pl-2">Fruit is an upcharge $</p>
            {errors && errors[name] && errors[name]!.type && errors[name]!.type === "required" && (
                <p className="text-sm text-red-600 ml-4">{label} is required.</p>
            )}
        </FormContainer>
    );
};

export default FormItem;
