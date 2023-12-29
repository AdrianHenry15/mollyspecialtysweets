import React from "react";
import FormContainer from "./form-container";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface IAutocompleteFormInputProps {
    control: any;
    title: string;
    name: string;
    options: any;
    label: string;
}

const AutocompleteFormInput = (props: IAutocompleteFormInputProps) => {
    return (
        <FormContainer className="flex-col" title={props.title}>
            <Controller
                name={props.name}
                control={props.control}
                render={({ field }) => (
                    <div className="flex flex-col w-full">
                        <Autocomplete
                            className="w-full"
                            disablePortal
                            freeSolo
                            id="combo-box-demo"
                            options={props.options}
                            renderInput={(params) => <TextField {...field} {...params} label={props.label} />}
                        />
                    </div>
                )}
            />
            <p className="italic text-xs text-zinc-500 pl-2">Fruit is an upcharge $</p>
        </FormContainer>
    );
};

export default AutocompleteFormInput;
