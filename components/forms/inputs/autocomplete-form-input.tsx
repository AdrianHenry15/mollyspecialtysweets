import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

import FormContainer from "../form-container";

interface IAutocompleteFormInputProps {
    control: any;
    title: string;
    name: string;
    options?: [];
    label: string;
    required?: boolean;
    autocomplete?: boolean;
    errors?: FieldErrors;
    freeSolo?: boolean;
    hasFruit?: boolean;
    textarea?: boolean;
}

const AutocompleteFormInput: React.FC<IAutocompleteFormInputProps> = ({
    control,
    title,
    name,
    options,
    label,
    required,
    autocomplete,
    errors,
    freeSolo,
    hasFruit,
    textarea,
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
                                    value={field.value || null}
                                    onChange={(event, newValue) => field.onChange(newValue)}
                                    options={options!}
                                    renderInput={(params) => <TextField {...params} label={label} />}
                                />
                            </div>
                        )}
                        {textarea && (
                            <div className="flex flex-col w-full">
                                <textarea {...field} className="border-2 border-gray-400 my-2 p-2 w-full h-40" />
                            </div>
                        )}
                    </div>
                )}
            />
            {hasFruit && <p className="italic text-xs text-zinc-500 pl-2">Fruit is an upcharge $</p>}
            {errors?.[name]?.type === "required" && <p className="text-sm text-red-600 ml-4">{label} is required.</p>}
        </FormContainer>
    );
};

export default AutocompleteFormInput;
